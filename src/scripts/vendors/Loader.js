import { gsap } from 'gsap';

/**
 * @file    vendor/Loader.js
 * @type    class
 *
 * @author  Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 */
class Loader {
	constructor() {
		this.el = document.querySelector('.js-loader');
	}

	init() {
		this.timeline = gsap.timeline({
			paused: true,
		});

		this.timeline.to(
			this.el,
			{ duration: 1.5, autoAlpha: 0 },
		);
	}
}

export default Loader;
