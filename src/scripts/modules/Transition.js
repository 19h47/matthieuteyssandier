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
	}

	enter() {
		this.x = scroll.x;
		this.y = scroll.y;
		this.radius = diameter(this.el.width, this.el.height, this.x, this.y);
		// this.color = color;

		console.log(scroll);

		const props = {
			height: this.el.height,
			width: this.el.width,
			color: this.color,
			x: this.x,
			y: this.y,
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
			x: this.x,
			y: this.y,
			radiusX: this.radius,
		};

		gsap.to(props, {
			duration: 1,
			ease: 'power4.out',
			radiusX: 0,
			onUpdate: () => drawEllipse(props, this.context, true),
		});
	}
}

export default Transition;
