import { module as M } from 'modujs';
import { scroll } from 'utils/environment';
import { ellipse as drawEllipse } from 'utils/draw';
import diameter from 'utils/math';
import gsap from 'gsap';

class Transition extends M {
	init() {
		const { offsetWidth: width, offsetHeight: height } = this.el;

		this.el.width = width;
		this.el.height = height;

		this.radius = 0;
		this.color = '#000000';

		this.context = this.el.getContext('2d');

		this.mouse = {
			x: 0,
			y: 0,
		};
	}

	enter() {
		const { x, y } = scroll;

		this.radius = diameter(this.el.width, this.el.height, x, y);

		const props = {
			height: this.el.height,
			width: this.el.width,
			color: this.color,
			x,
			y,
			radiusX: 0,
		};

		gsap.to(props, {
			duration: 1.5,
			ease: 'power4.inOut',
			radiusX: this.radius,
			onUpdate: () => drawEllipse(props, this.context, false),
		});
	}

	exit() {
		const props = {
			height: this.el.height,
			width: this.el.width,
			color: this.color,
			radiusX: this.radius,
		};

		gsap.to(props, {
			duration: 1,
			ease: 'power4.out',
			radiusX: 0,
			onUpdate: () => drawEllipse({ ...props, ...{ x: scroll.x, y: scroll.y } }, this.context, true),
		});
	}

	set({ color }) {
		this.color = color;
	}
}

export default Transition;
