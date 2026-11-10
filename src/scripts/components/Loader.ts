import gsap from "gsap";
import { Piece } from "piecesjs";

import { EASE_IN_OUT } from "../animations/easing";

/**
 * Arrival loader (views/components/loader.html.twig). Plays when the
 * head script set `data-loading` on the root, then removes it, which lets
 * the header and the page entrances run, and removes itself.
 */
class Loader extends Piece {
	#timeline: gsap.core.Timeline | null = null;

	constructor() {
		super("Loader");
	}

	mount(): void {
		if (!document.documentElement.hasAttribute("data-loading")) {
			this.remove();

			return;
		}

		const $progress = this.domAttr("progress") as HTMLElement;
		const $track = this.domAttr("track") as HTMLElement;
		const $reveal = this.domAttr("reveal") as HTMLElement;
		const $dots = this.domAttrAll<HTMLElement>("dot");
		const $last = $dots[$dots.length - 1];

		const track = $track.getBoundingClientRect();
		const dot = $last.getBoundingClientRect();
		const origin = `${dot.left + dot.width / 2}px ${dot.top + dot.height / 2}px`;
		const counter = { value: 0 };

		// Each dot starts at the left end of the track and slides to the right end.
		gsap.set($dots, { x: -(track.width - dot.width) });

		this.#timeline = gsap.timeline({ defaults: { ease: "power4.out" }, onComplete: this.#finish });

		this.#timeline.to([$progress, $last], { opacity: 1, duration: 0.5 }, 0);
		this.#timeline.to(
			counter,
			{
				value: 100,
				duration: 3,
				ease: "power4.out",
				onUpdate: () => {
					$progress.textContent = Math.round(counter.value).toString();
				},
			},
			0,
		);

		$dots.forEach(($dot, index) => {
			this.#timeline?.to(
				$dot,
				{
					x: 0,
					duration: 2,
					onStart: () => gsap.set($dot, { opacity: 1 }),
					onComplete: () => gsap.set($dot, { opacity: 0 }),
				},
				0.5 + index * 0.1,
			);
		});

		this.#timeline.fromTo(
			$reveal,
			{ clipPath: `circle(0px at ${origin})` },
			{ clipPath: `circle(150vmax at ${origin})`, duration: 1.5, ease: EASE_IN_OUT },
			1.5 + $dots.length * 0.1,
		);
	}

	unmount(): void {
		this.#timeline?.kill();
		this.#timeline = null;
	}

	#finish = (): void => {
		document.documentElement.removeAttribute("data-loading");
		this.remove();
	};
}

customElements.define("mt-loader", Loader);
