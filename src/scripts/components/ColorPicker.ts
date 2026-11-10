import gsap from "gsap";
import { Piece } from "piecesjs";

const STEP = 0.1;

/**
 * Header dots (views/components/color-picker.html.twig): they spread out
 * from under the first one on hover or keyboard focus, and fold back,
 * a little faster, when the pointer and the focus leave. They stay spread
 * while a preview is open, and fold once the last one is closed.
 * Under `prefers-reduced-motion: reduce`, they spread and fold at once.
 */
class ColorPicker extends Piece {
	#mm: ReturnType<typeof gsap.matchMedia> | null = null;
	#timeline: gsap.core.Timeline | null = null;
	#reduce = false;

	constructor() {
		super("ColorPicker");
	}

	mount(): void {
		if (this.hasAttribute("data-static")) {
			return;
		}

		// Rebuilt when the dot size changes (`lg`) or the motion preference does.
		this.#mm = gsap.matchMedia();
		this.#mm.add(
			{ lg: "(min-width: 64rem)", reduce: "(prefers-reduced-motion: reduce)" },
			(context) => {
				this.#reduce = Boolean(context.conditions?.reduce);
				this.#timeline = this.#build();

				return () => {
					this.#timeline = null;
				};
			},
		);

		this.on("pointerenter", this, this.#open);
		this.on("pointerleave", this, this.#close);
		this.on("focusin", this, this.#handleFocusIn);
		this.on("focusout", this, this.#handleFocusOut);
		// `toggle` does not bubble: listened in the capture phase.
		document.addEventListener("toggle", this.#handleToggle, true);
	}

	unmount(): void {
		this.off("pointerenter", this, this.#open);
		this.off("pointerleave", this, this.#close);
		this.off("focusin", this, this.#handleFocusIn);
		this.off("focusout", this, this.#handleFocusOut);
		document.removeEventListener("toggle", this.#handleToggle, true);

		this.#mm?.revert();
		this.#mm = null;
	}

	/**
	 * The list unclips, then each dot slides from under the first one and
	 * shows, the last dot first. A dot takes the pointer only once in place:
	 * sliding under the pointer, it is not pressed or hovered on its way.
	 */
	#build(): gsap.core.Timeline {
		const $list = this.domAttr("list") as HTMLElement;
		const $items = this.domAttrAll<HTMLElement>("item");
		const count = $items.length;
		const size = $items[0].offsetWidth;
		const gap = parseFloat(getComputedStyle($list).columnGap) || 0;
		const stagger = (index: number): number => (count - index) * STEP;

		const timeline = gsap.timeline({ paused: true, defaults: { ease: "power4.out" } });

		timeline.fromTo(
			$list,
			{ clipPath: `inset(0px ${(count - 1) * (size + gap)}px 0px 0px)` },
			{ clipPath: "inset(0px 0px 0px 0px)", duration: count * STEP },
			0,
		);
		timeline.fromTo(
			$items,
			{ x: (index: number) => -index * (size + gap) },
			{ x: 0, duration: (count - 1) * STEP, stagger },
			STEP,
		);
		timeline.fromTo(
			$items,
			{ opacity: (index: number) => (0 === index ? 1 : 0) },
			{ opacity: 1, duration: STEP, stagger },
			STEP,
		);
		// Played back, the timeline sets each dot back to `none` as soon as it leaves its place.
		$items.slice(1).forEach(($item, index) => {
			const $button = $item.querySelector("button");

			gsap.set($button, { pointerEvents: "none" });
			timeline.set(
				$button,
				{ pointerEvents: "auto" },
				STEP + stagger(index + 1) + (count - 1) * STEP,
			);
		});

		return timeline;
	}

	#open = (): void => {
		if (this.#reduce) {
			this.#timeline?.progress(1);

			return;
		}

		this.#timeline?.timeScale(1).play();
	};

	#close = (): void => {
		if (document.querySelector("dialog[data-preview][open]")) {
			return;
		}

		if (this.matches(":hover") || this.querySelector(":focus-visible")) {
			return;
		}

		if (this.#reduce) {
			this.#timeline?.progress(0);

			return;
		}

		this.#timeline?.timeScale(1.25).reverse();
	};

	// Focus given back by a closing dialog is not keyboard focus: it does not spread the dots.
	#handleFocusIn = (event: FocusEvent): void => {
		if (event.target instanceof Element && event.target.matches(":focus-visible")) {
			this.#open();
		}
	};

	#handleFocusOut = (event: FocusEvent): void => {
		if (!(event.relatedTarget instanceof Node && this.contains(event.relatedTarget))) {
			this.#close();
		}
	};

	#handleToggle = (event: Event): void => {
		const { target, newState } = event as ToggleEvent;

		if (
			"closed" === newState &&
			target instanceof HTMLDialogElement &&
			target.hasAttribute("data-preview")
		) {
			this.#close();
		}
	};
}

customElements.define("mt-color-picker", ColorPicker);
