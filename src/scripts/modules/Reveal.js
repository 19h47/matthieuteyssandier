import { module as M } from 'modujs';
import gsap from 'gsap';

const drawRect = (props, context) => {
	const { width, height, color } = props;

	context.clearRect(width, 0, -width, height);
	context.fillStyle = color;
	context.beginPath();
	context.rect(width, 0, -width, height);
	context.fill();
};

const drawEllipse = (props, context) => {
	const { width, height, radiusX, radiusY, color } = props;

	context.clearRect(width, 0, -width, height);
	context.fillStyle = color;
	context.beginPath();
	context.ellipse(width / 2, height / 2, radiusX, radiusY, Math.PI, 0, 2 * Math.PI);
	context.rect(width, 0, -width, height);
	context.fill();
};

class Reveal extends M {
	constructor(m) {
		super(m);

		const { offsetWidth: width, offsetHeight: height } = this.$('canvas')[0];

		this.$('canvas')[0].width = width;
		this.$('canvas')[0].height = height;

		this.props = {
			radiusX: 0,
			radiusY: 0,
			width,
			height: 0,
			color: this.getData('color') || 'rgba(255, 255, 255, 0)',
		};

		this.context = this.$('canvas')[0].getContext('2d');

		this.timeline = gsap.timeline({ paused: true, immediateRender: true });
		this.timeline.set(this.el, { pointerEvents: 'none' });

		this.timeline.to(this.props, {
			duration: 1,
			ease: 'power4.inOut',
			height,
			onUpdate: () => drawRect(this.props, this.context),
		});

		this.timeline.set(this.$('image')[0], { autoAlpha: 1 });

		this.timeline.to(this.props, {
			duration: 1,
			ease: 'power4.inOut',
			radiusX: width / Math.sqrt(2),
			radiusY: height / Math.sqrt(2),
			onUpdate: () => drawEllipse(this.props, this.context),
		});

		this.timeline.set(this.el, { clearProps: 'all' });
	}

	play() {
		this.timeline.play();
	}
}

export default Reveal;
