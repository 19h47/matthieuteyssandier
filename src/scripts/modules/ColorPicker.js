import { module as M } from 'modujs';
import { html } from 'utils/environment';
import gsap from 'gsap';

let WIDTH = 20;
const MARGIN = 6;

class ColorPicker extends M {
	constructor(m) {
		super(m);

		this.events = {
			mouseover: 'mouseover',
			mouseout: 'mouseout',
		};

		if (window.matchMedia("(min-width: 1024px)").matches) {
			WIDTH = 48
		}

		this.el.style.setProperty('width', `${WIDTH}px`);
	}

	init() {
		const { children } = this.el.firstElementChild;

		const width = children.length * WIDTH + (children.length - 1) * MARGIN;

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
				x: index => (WIDTH * index + MARGIN * index) * -1, // widths + margins
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

	mouseover() {
		this.timeline.timeScale(1);
		this.timeline.play();
	}

	mouseout() {
		if (!html.classList.contains('has-nav-open')) {
			this.close();
		}
	}

	close() {
		this.timeline.timeScale(1.25);
		this.timeline.reverse();
	}
}

export default ColorPicker;
