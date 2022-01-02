import { gsap } from 'gsap';

/**
 * @file    vendor/Loader.js
 * @type    class
 *
 * @author  Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 */
class Loader {
	init() {
		this.timeline = gsap.timeline({
			paused: true,
		});
	}
}

export default Loader;
