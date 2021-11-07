import { module as M } from 'modujs';
import gsap from 'gsap';

class TextInview extends M {
	constructor(m) {
		super(m);

		this.timeline = gsap.timeline({ paused: true });

		this.timeline.to(this.el, {
			clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
			duration: 1.5,
			ease: 'power4.inOut',
		});
	}

	play() {
		console.log('TextInview.play');

		this.timeline.play();
	}

	reverse() {
		console.log('TextInview.reverse');

		this.timeline.reverse();
	}
}

export default TextInview;
