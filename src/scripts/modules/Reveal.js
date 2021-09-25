import { module as M } from 'modujs';
import gsap from 'gsap';
import { rect as drawRect, ellipse as drawEllipse } from 'utils/draw';

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
			x: width / 2,
			y: height / 2,
		};

		this.context = this.$('canvas')[0].getContext('2d');
		this.context.fillStyle = this.getData('color');

		this.timeline = gsap.timeline({
			paused: true,
			onComplete: () => {
				gsap.set(this.el, { clearProps: 'all' });
			},
		});
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
			onUpdate: () => drawEllipse(this.props, this.context, true, true),
		});
	}

	play() {
		this.timeline.play();
	}
}

export default Reveal;
