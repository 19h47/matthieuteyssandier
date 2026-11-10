import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Piece } from "piecesjs";

import { reveal } from "../animations/reveal";

gsap.registerPlugin(ScrollTrigger);

const MOTION = "(prefers-reduced-motion: no-preference)";

/**
 * Page scroll animations, opted in with `data-reveal`.
 * Nothing runs when the visitor prefers reduced motion, and switching
 * the preference reverts everything (`gsap.matchMedia`).
 */
class Animations extends Piece {
	#mm: ReturnType<typeof gsap.matchMedia> | null = null;

	constructor() {
		super("Animations");
	}

	mount(): void {
		this.#mm = gsap.matchMedia();
		this.#mm.add(MOTION, () => {
			reveal();
		});
	}

	unmount(): void {
		this.#mm?.revert();
		this.#mm = null;
	}
}

customElements.define("mt-animations", Animations);
