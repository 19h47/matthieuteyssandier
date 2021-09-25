import { module as M } from 'modujs';
import gsap from 'gsap';

class Expand extends M {
	init() {
		this.anim = gsap.fromTo(
			this.el,
			{
				scale: 0.5,
			},
			{
				scale: 1,
				duration: 1,
				ease: 'power4.out',
			},
		);
		this.anim.pause();
	}

	progress(value) {
		this.anim.progress(Math.min(Math.max(value, 0), 1));
	}
}

export default Expand;
