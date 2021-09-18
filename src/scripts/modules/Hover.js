import { module as M } from 'modujs';
import gsap from 'gsap';
import { ellipse as drawEllipse } from 'utils/draw';

class Hover extends M {
	constructor(m) {
		super(m);

		this.props = {
			radiusX: 0,
			radiusY: 0,
			width: 0,
			height: 0,
			color: '#000000',
		};
	}

	init() {
		this.handleMouseenter = this.handleMouseenter.bind(this);
		this.handleMouseleave = this.handleMouseleave.bind(this);

		this.el.addEventListener('mouseenter', this.handleMouseenter);
		this.el.addEventListener('mouseleave', this.handleMouseleave);

		const { offsetWidth: width, offsetHeight: height } = this.$('canvas')[0];

		this.$('canvas')[0].width = width;
		this.$('canvas')[0].height = height;

		this.props = {
			radiusX: width / Math.sqrt(2),
			radiusY: height / Math.sqrt(2),
			width,
			height,
		};

		this.context = this.$('canvas')[0].getContext('2d');
		this.context.fillStyle = this.getData('color');

		this.timeline = gsap.timeline({ paused: true, onUpdate: () => drawEllipse(this.props, this.context) });

		this.timeline.to(this.props, {
			duration: 1.5,
			ease: 'power4.inOut',
			radiusX: width / 2,
			radiusY: height / 2,
		});
	}

	handleMouseenter() {
		this.timeline.timeScale(1);
		this.timeline.play();
	}

	handleMouseleave() {
		this.timeline.timeScale(1.5);
		this.timeline.reverse();
	}
}

export default Hover;
