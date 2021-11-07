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

		this.events = {
			mouseenter: 'enter',
			mouseleave: 'leave',
			click: 'close',
		};
	}

	close() {
		this.mDestroy();

		gsap.to(this.props, {
			duration: 0.5,
			ease: 'power4.inOut',
			radiusX: 0,
			radiusY: 0,
			onUpdate: () => drawEllipse(this.props, this.context, true, true),
		});
	}

	init() {
		if (window.isMobile) {
			return;
		}

		const { offsetWidth: width, offsetHeight: height } = this.$('canvas')[0];

		this.$('canvas')[0].width = width;
		this.$('canvas')[0].height = height;

		this.props = {
			radiusX: Math.round(width / Math.sqrt(2)),
			radiusY: Math.round(height / Math.sqrt(2)),
			width,
			height,
			x: width / 2,
			y: height / 2,
		};

		this.context = this.$('canvas')[0].getContext('2d');
		this.context.fillStyle = this.getData('color');

		this.timeline = gsap.timeline({
			paused: true,
			onUpdate: () => drawEllipse(this.props, this.context, true, true),
		});

		this.timeline.to(this.props, {
			duration: 1.5,
			ease: 'power4.inOut',
			radiusX: width / 2,
			radiusY: height / 2,
		});
	}

	enter() {
		this.timeline.timeScale(1);
		this.timeline.play();
	}

	leave() {
		this.timeline.timeScale(1.5);
		this.timeline.reverse();
	}
}

export default Hover;
