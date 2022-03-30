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

		this.$progress = this.el.querySelector('.js-loader-progress');
	}

	init() {
		this.timeline = gsap.timeline({
			paused: true,
			defaults: { ease: 'power4.out' },
			onStart: () => {
				this.$progress.classList.remove('opacity-0');
				this.$progress.classList.add('opacity-100');
			},
		});

		this.timeline.from(this.$progress, { textContent: 0, snap: { textContent: 1 } }, 1.5);
	}
}

export default Loader;
