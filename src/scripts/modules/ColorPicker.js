import { module as M } from 'modujs';
import gsap from 'gsap';

class ColorPicker extends M {
	init() {
		const WIDTH = 20;

		this.handleMouseenter = this.handleMouseenter.bind(this);
		this.handleMouseleave = this.handleMouseleave.bind(this);

		this.el.addEventListener('mouseenter', this.handleMouseenter);
		this.el.addEventListener('mouseleave', this.handleMouseleave);

		const { children } = this.el.firstElementChild;

		const width = children.length * WIDTH + (children.length - 1) * 2;

		this.timeline = gsap.timeline({ paused: true, defaults: { ease: 'power4.inOut' } });

		this.timeline.fromTo(
			this.el,
			{ width: `${WIDTH}px` },
			{
				duration: children.length * 0.1,
				width,
			},
		);
		this.timeline.fromTo(
			children,
			{
				x: index => (WIDTH * index + 2 * index) * -1, // widths + margins
			},
			{
				stagger: index => (children.length - index) * 0.1,
				x: 0,
				duration: (children.length - 1) * 0.1,
			},
			`start-=${(children.length - 1) * 0.1}`,
		);
		this.timeline.fromTo(
			children,
			{
				opacity: index => (0 === index ? 1 : 0),
			},
			{
				stagger: index => (children.length - index) * 0.1,
				opacity: 1,
				duration: 0.1,
			},
			`start-=${(children.length - 1) * 0.1}`,
		);
	}

	handleMouseenter = () => {
		this.timeline.timeScale(1);
		this.timeline.play();
	};

	handleMouseleave = () => {
		this.timeline.timeScale(1.25);
		this.timeline.reverse();
	};
}

export default ColorPicker;
