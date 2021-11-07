import { gsap } from 'gsap';
import shuffle from 'utils/shuffle';
import { disableScroll, enableScroll } from 'utils/scroll';

/**
 * @file    vendor/Loader.js
 * @type    class
 *
 * @author  Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 */
class Loader {
	constructor() {
		disableScroll();

		this.el = document.querySelector('.js-loader');
		this.$countdown = this.el.querySelector('.js-countdown');
		this.$counter = this.el.querySelector('.js-counter');

		this.colors = gsap.utils.toArray(this.el.querySelectorAll('.js-color'));
		this.texts = gsap.utils.toArray(this.el.querySelectorAll('.js-text-inview'));

		this.countdown = { progress: 0 };
	}

	init() {
		this.timeline = gsap.timeline({
			paused: true,
		});

		this.timeline.set(shuffle(this.colors), { opacity: 1 });

		this.timeline.to(
			this.countdown,
			{
				duration: 2,
				progress: '+=100',
				roundProps: 'progress',
				onUpdate: () => {
					this.$countdown.innerHTML = this.countdown.progress;
				},
			},
			'start',
		);

		this.timeline.fromTo(
			this.texts,
			{ clipPath: 'inset(0 0 100% 0)' },
			{ clipPath: 'inset(0 0 0% 0)', duration: 1.5, ease: 'power4.inOut' },
			'start',
		);

		this.timeline.fromTo(
			this.$counter,
			{
				x: 0,
			},

			{ x: `100%`, duration: 2 },
			'start',
		);

		this.timeline.fromTo(
			shuffle(this.colors),
			{
				scale: 0,
			},
			{
				scale: 1,
				duration: 1,
				stagger: 0.1,
			},
			'start',
		);

		this.timeline.to(shuffle(this.colors), {
			scale: 0,
			opacity: 0,
			stagger: 0.1,
			duration: 0.6,
			transformOrigin: 'center',
		});

		this.timeline.fromTo(
			this.texts,
			{ clipPath: 'inset(0 0 0% 0)' },
			{ clipPath: 'inset(0 0 100% 0)', duration: 1.5, ease: 'power4.inOut' },
			'-=1',
		);

		this.timeline.set(this.el, { autoAlpha: 0, onComplete: enableScroll });
	}
}

export default Loader;
