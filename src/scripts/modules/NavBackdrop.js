import { module as M } from 'modujs';
import gsap from 'gsap';
import { CustomEase } from "gsap/CustomEase";

import { ellipse as drawEllipse } from 'utils/draw';
import diameter from 'utils/math';

gsap.registerPlugin(CustomEase);

CustomEase.create("custom", "M0,0,C0.11,0.494,0.192,0.726,0.318,0.852,0.45,0.984,0.504,1,1,1");

console.log(CustomEase);

class NavBackdrop extends M {
	init() {
		this.resize = this.resize.bind(this);

		window.addEventListener('resize', this.resize);

		this.resize();

		this.radius = 0;
		this.color = '#000000';
		this.x = 0;
		this.y = 0;

		this.context = this.el.getContext('2d');
	}

	open({ color, x, y }) {
		console.log({ color, x, y });

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

		gsap.to(props, {
			duration: 1.5,
			ease: 'power4.out',
			radiusX: this.radius,
			onUpdate: () => drawEllipse(props, this.context, false),
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

		gsap.to(props, {
			duration: 1,
			ease: 'power4.out',
			radiusX: 0,
			onUpdate: () => drawEllipse(props, this.context, true),
			onComplete: () => this.call('close', null, 'ColorPicker'),
		});
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

export default NavBackdrop;
