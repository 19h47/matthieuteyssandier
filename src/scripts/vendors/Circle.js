import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';

import diameter from 'utils/math';
import { ellipse as drawEllipse } from 'utils/draw';

gsap.registerPlugin(CustomEase);

CustomEase.create('custom', 'M0,0,C0.11,0.494,0.192,0.726,0.318,0.852,0.45,0.984,0.504,1,1,1');

const defaults = {
	radius: 0,
	color: '#000000',
	x: 0,
	y: 0,
}

class Circle {
	constructor(el, args = {}) {

		this.el = el;
		this.context = el.getContext('2d');

		const { radius, color, x, y } = { ...defaults, ...args };

		this.radius = radius;
		this.color = color;
		this.x = x;
		this.y = y;

		window.addEventListener('resize', () => this.resize());

		this.resize();
	}


	open({ color, x, y }) {
		// console.info('Circle.open()', { color, x, y });

		this.x = x;
		this.y = y;
		this.radius = diameter(this.el.width, this.el.height, x, y);
		this.color = color;

		const props = {
			height: this.el.height,
			width: this.el.width,
			color,
			x,
			y,
			radiusX: 0,
		};

		return gsap.to(props, {
			duration: 1.5,
			ease: 'power4.inOut',
			radiusX: this.radius,
			onUpdate: () => this.draw(props, false),
			// onComplete: () => console.log('Circle.open.onComplete'),
		});
	}

	close() {
		const props = {
			width: this.el.width,
			height: this.el.height,
			color: this.color,
			x: this.x,
			y: this.y,
			radiusX: this.radius,
		};

		return gsap.to(props, {
			duration: 1,
			ease: 'power4.out',
			radiusX: 0,
			onUpdate: () => this.draw(props),
		});
	}

	draw(props = {}, clear = true) {
		drawEllipse(props, this.context, clear)
	}


	resize() {
		const { offsetWidth: width, offsetHeight: height } = this.el;

		this.el.width = width;
		this.el.height = height;
	}

	destroy() {
		window.removeEventListener('resize', this.resize);
	}
}

export default Circle;
