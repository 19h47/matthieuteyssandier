import gsap from "gsap";
import { EVENTS } from "@agencecinq/utils";
import type { BeforeCloseDetail, BeforeOpenDetail } from "@agencecinq/modal";
import { Piece } from "piecesjs";

import { EASE_OUT } from "../animations/easing";

const REDUCE = "(prefers-reduced-motion: reduce)";
/** Pointer presses older than this are not the one that opened the preview. */
const POINTER_TTL = 1000;

type Point = { x: number; y: number };

/**
 * Case study previews (views/components/preview.html.twig), as the canvas
 * of the previous theme drew them.
 *
 * Opening: the color (`reveal`) grows from the pointer, then the entries
 * (`entry`, then `close`) come in. A dot of an open preview opens the next
 * one over it: its color grows over the previous one, which keeps growing
 * underneath, while the previous entries leave; once the screen is covered,
 * the previews underneath close. Closing: the entries leave while the color
 * shrinks into its origin. Entries leave as the CSS transitions of the
 * previous theme did: from where they are, with the ease of their entrance,
 * fading in 0.45s and going down, the last one first.
 *
 * Dots may be pressed faster than the animations run: a new preview covers
 * every open one, a closing one finishes closing under it, and pressing the
 * dot of a covered preview brings it back on top.
 */
class Previews extends Piece {
	#pointer: (Point & { target: EventTarget | null; time: number }) | null = null;
	#origins = new WeakMap<HTMLDialogElement, Point>();
	#reveals = new WeakMap<HTMLDialogElement, gsap.core.Tween>();
	#entries = new WeakMap<HTMLDialogElement, gsap.core.Timeline>();
	/** Previews each open preview covers, until they are closed underneath. */
	#below = new Map<HTMLDialogElement, Set<HTMLDialogElement>>();
	/** Settles the deferred close (`waitUntil`) of a closing preview. */
	#pending = new Map<HTMLDialogElement, () => void>();

	constructor() {
		super("Previews");
	}

	mount(): void {
		this.on("pointerdown", document, this.#handlePointerDown);
		this.on(EVENTS.MODAL_BEFORE_OPEN, document.documentElement, this.#handleBeforeOpen);
		this.on(EVENTS.MODAL_BEFORE_CLOSE, document.documentElement, this.#handleBeforeClose);
		// `toggle` does not bubble, and `command` runs before the modal: both in the capture phase.
		document.addEventListener("toggle", this.#handleToggle, true);
		document.addEventListener("command", this.#handleCommand, true);
	}

	unmount(): void {
		this.off("pointerdown", document, this.#handlePointerDown);
		this.off(EVENTS.MODAL_BEFORE_OPEN, document.documentElement, this.#handleBeforeOpen);
		this.off(EVENTS.MODAL_BEFORE_CLOSE, document.documentElement, this.#handleBeforeClose);
		document.removeEventListener("toggle", this.#handleToggle, true);
		document.removeEventListener("command", this.#handleCommand, true);
	}

	#handlePointerDown = (event: PointerEvent): void => {
		this.#pointer = {
			x: event.clientX,
			y: event.clientY,
			target: event.target,
			time: event.timeStamp,
		};
	};

	#handleBeforeOpen = (event: Event): void => {
		const { modal, trigger } = (event as CustomEvent<BeforeOpenDetail>).detail;
		const $dialog = this.#preview(modal);

		if (!$dialog) {
			return;
		}

		const origin = this.#origin(trigger, event.timeStamp);
		const { $reveal, $entries, $close } = this.#parts($dialog);
		// Open previews are covered; closing ones finish closing on their own.
		const $covered = Array.from(
			document.querySelectorAll<HTMLDialogElement>("dialog[data-preview][open]"),
		).filter(($open) => $open !== $dialog && !this.#pending.has($open));

		this.#origins.set($dialog, origin);
		this.#stop($dialog);
		this.#below.forEach((set) => set.delete($dialog));
		$covered.forEach(($open) => {
			this.#below.delete($open);
			// The color keeps growing underneath.
			this.#leave($open);
		});
		this.#below.set($dialog, new Set($covered));

		if (window.matchMedia(REDUCE).matches) {
			gsap.set([$reveal, ...$entries, ...$close], { clearProps: "all" });
			// Shown at once: the previews underneath can go as soon as this one is open.
			$dialog.addEventListener("toggle", () => this.#closeBelow($dialog), { once: true });

			return;
		}

		this.#reveals.set(
			$dialog,
			gsap.fromTo(
				$reveal,
				{ clipPath: this.#circle(origin, 0) },
				{
					clipPath: this.#circle(origin, this.#radius(origin)),
					duration: 1.5,
					ease: "power4.inOut",
					onComplete: () => this.#closeBelow($dialog),
				},
			),
		);

		const entries = gsap.timeline({ delay: 0.5, defaults: { ease: EASE_OUT } });

		entries.fromTo(
			$entries,
			{ autoAlpha: 0, y: 40 },
			{ autoAlpha: 1, y: 0, duration: 1, stagger: 0.1 },
			0,
		);
		entries.fromTo($close, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.45 }, 0.3);

		this.#entries.set($dialog, entries);
	};

	#handleBeforeClose = (event: Event): void => {
		const { modal, waitUntil } = (event as CustomEvent<BeforeCloseDetail>).detail;
		const $dialog = this.#preview(modal);

		if (!$dialog) {
			return;
		}

		// Closed before it covered the screen: the previews underneath go now.
		this.#closeBelow($dialog);

		if (window.matchMedia(REDUCE).matches) {
			this.#stop($dialog);

			return;
		}

		const origin = this.#origins.get($dialog) ?? this.#center();
		const { $reveal } = this.#parts($dialog);

		this.#leave($dialog);
		this.#reveals.get($dialog)?.kill();
		this.#reveals.set(
			$dialog,
			gsap.to($reveal, {
				clipPath: this.#circle(origin, 0),
				duration: 1,
				ease: "power4.out",
				// The entries are faded out by then.
				onComplete: () => this.#settle($dialog),
			}),
		);

		waitUntil(new Promise<void>((resolve) => this.#pending.set($dialog, resolve)));
	};

	/**
	 * A dot pressed for a preview still open under the top one: that preview
	 * closes at once, so that the modal opens it again, on top.
	 */
	#handleCommand = (event: Event): void => {
		const { command, source, target } = event as Event & {
			command?: string;
			source?: Element | null;
		};

		if (
			"show-modal" !== command ||
			!(target instanceof HTMLDialogElement) ||
			!target.hasAttribute("data-preview") ||
			!target.open ||
			this.#pending.has(target) ||
			source?.closest("dialog") === target
		) {
			return;
		}

		this.#stop(target);
		this.#below.forEach((set) => set.delete(target));
		target.close();
	};

	/**
	 * The dialog gives the focus back to the element focused before it
	 * opened. When that was a dot of a preview closed since, the focus goes
	 * to the dot of the page header instead.
	 */
	#handleToggle = (event: Event): void => {
		const { target, newState } = event as ToggleEvent;

		if (
			"closed" !== newState ||
			!(target instanceof HTMLDialogElement) ||
			!target.hasAttribute("data-preview")
		) {
			return;
		}

		if (document.activeElement && document.activeElement !== document.body) {
			return;
		}

		document
			.querySelector<HTMLElement>(`button[commandfor="${target.id}"]:not(dialog *)`)
			?.focus({ preventScroll: true });
	};

	/** Closes the previews under this one: hidden, they need no closing animation. */
	#closeBelow($dialog: HTMLDialogElement): void {
		const $covered = this.#below.get($dialog) ?? new Set<HTMLDialogElement>();

		this.#below.delete($dialog);
		$covered.forEach(($open) => {
			this.#stop($open);

			if ($open.open) {
				// Straight on the element, skipping the modal hooks.
				$open.close();
			}
		});
	}

	/** Entries leave from where they are; an entrance not started yet never comes. */
	#leave($dialog: HTMLDialogElement): void {
		const { $entries, $close } = this.#parts($dialog);
		const leave = gsap.timeline({ defaults: { ease: EASE_OUT } });

		this.#entries.get($dialog)?.kill();
		leave.to($entries, { y: 40, duration: 1, stagger: { each: 0.1, from: "end" } }, 0);
		leave.to([...$entries, ...$close], { autoAlpha: 0, duration: 0.45 }, 0);
		this.#entries.set($dialog, leave);
	}

	/** Kills the animations of a preview, and settles its close if one is pending. */
	#stop($dialog: HTMLDialogElement): void {
		this.#reveals.get($dialog)?.kill();
		this.#entries.get($dialog)?.kill();
		this.#reveals.delete($dialog);
		this.#entries.delete($dialog);
		this.#settle($dialog);
	}

	#settle($dialog: HTMLDialogElement): void {
		const resolve = this.#pending.get($dialog);

		this.#pending.delete($dialog);
		resolve?.();
	}

	#parts($dialog: HTMLDialogElement): {
		$reveal: HTMLElement;
		$entries: HTMLElement[];
		$close: HTMLElement[];
	} {
		return {
			$reveal: $dialog.querySelector<HTMLElement>('[data-dom="reveal"]') as HTMLElement,
			$entries: Array.from($dialog.querySelectorAll<HTMLElement>('[data-dom="entry"]')),
			$close: Array.from($dialog.querySelectorAll<HTMLElement>('[data-dom="close"]')),
		};
	}

	/** Where the pointer pressed the trigger, else the center of the trigger, else of the screen. */
	#origin(trigger: HTMLElement | null, time: number): Point {
		if (
			trigger &&
			this.#pointer &&
			this.#pointer.target instanceof Node &&
			trigger.contains(this.#pointer.target) &&
			time - this.#pointer.time < POINTER_TTL
		) {
			return { x: this.#pointer.x, y: this.#pointer.y };
		}

		if (trigger) {
			const { left, top, width, height } = trigger.getBoundingClientRect();

			return { x: left + width / 2, y: top + height / 2 };
		}

		return this.#center();
	}

	#center(): Point {
		return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
	}

	/** Twice the distance to the farthest corner, as the canvas circle had. */
	#radius({ x, y }: Point): number {
		return Math.hypot(
			Math.max(window.innerWidth - x, x) * 2,
			Math.max(window.innerHeight - y, y) * 2,
		);
	}

	#circle({ x, y }: Point, radius: number): string {
		return `circle(${radius}px at ${x}px ${y}px)`;
	}

	#preview(id: string): HTMLDialogElement | null {
		const $dialog = document.getElementById(id);

		return $dialog instanceof HTMLDialogElement && $dialog.hasAttribute("data-preview")
			? $dialog
			: null;
	}
}

customElements.define("mt-previews", Previews);
