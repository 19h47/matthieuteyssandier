import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { EASE_OUT } from "./easing";
import { isBelowFold } from "./viewport";

const SELECTOR = "[data-reveal]";
const OFFSET = 30;
const DURATION = 0.8;
const STAGGER = 0.06;

/**
 * Fade and lift `[data-reveal]` elements as they scroll into view.
 *
 * `ScrollTrigger.batch` staggers elements entering together (grid rows).
 * Opacity rather than autoAlpha keeps hidden links focusable: tabbing to
 * one scrolls it into view, which reveals it.
 */
export function reveal(): void {
	const targets = gsap.utils.toArray<HTMLElement>(SELECTOR).filter(isBelowFold);

	if (!targets.length) {
		return;
	}

	gsap.set(targets, { opacity: 0, y: OFFSET });

	ScrollTrigger.batch(targets, {
		start: "top 90%",
		once: true,
		onEnter: (batch) => {
			gsap.to(batch, {
				opacity: 1,
				y: 0,
				duration: DURATION,
				ease: EASE_OUT,
				stagger: STAGGER,
				overwrite: true,
				clearProps: "opacity,transform",
			});
		},
	});
}
