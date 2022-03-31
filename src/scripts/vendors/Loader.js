import { gsap } from 'gsap';
import Circle from 'vendors/Circle';

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
		this.$canvas = this.el.querySelector('.js-loader-canvas');
		this.items = [...this.el.querySelectorAll('.js-loader-item')];
		[this.item] = this.items;

		this.itemBoundingClientRect = this.item.getBoundingClientRect();
		this.itemParentBoundingClientRect = this.item.parentElement.getBoundingClientRect();

		this.circle = new Circle(this.$canvas);

		gsap.set(this.$progress, { opacity: 0 });
		gsap.set(this.items, {
			opacity: 0,
			x: `-${this.itemParentBoundingClientRect.width - this.itemBoundingClientRect.width}px`,
		});
	}

	init() {
		this.timeline = gsap.timeline({
			paused: true,
			defaults: { ease: 'power4.out' },
			onStart: () => {
				this.$progress.classList.remove('opacity-0');
				this.$progress.classList.add('opacity-100');
			},
			onComplete: () => {
				console.log('onComplete');
				this.$progress.classList.remove('opacity-100');
				this.$progress.classList.add('opacity-0');
			},
		});

		this.timeline.to(this.$progress, { duration: 0.5, opacity: 1 }, 0);
		this.timeline.to(this.items, { duration: 0.5, opacity: 1 }, 0);

		this.timeline.from(
			this.$progress,
			{ duration: 3, textContent: 0, snap: { textContent: 1 } },
			0,
		);

		this.timeline.to(this.items, { x: 0, duration: 1.5, stagger: 0.1 }, 0.5);

		return this.timeline.add(
			() =>
				this.circle.open({
					color: this.$canvas.getAttribute('data-color'),
					x:
						this.itemParentBoundingClientRect.right -
						this.itemBoundingClientRect.width / 2,
					y:
						this.itemParentBoundingClientRect.top +
						this.itemBoundingClientRect.height / 2,
				}),
			1.5 + (this.items.length * 0.1),
		);
	}
}

export default Loader;
