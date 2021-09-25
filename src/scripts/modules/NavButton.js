import { module as M } from 'modujs';
import { html } from 'utils/environment';

class NavButton extends M {
	constructor(m) {
		super(m);

		this.events = {
			click: 'toggle',
		};
	}

	init() {
		this.color = this.getData('color');
	}

	toggle({ clientX, clientY }) {
		const fn = this.getData('function');

		if ('open' === fn) {
			html.classList.add('has-nav-open');
		}

		if ('close' === fn) {
			html.classList.remove('has-nav-open');
		}

		return this.call(fn, { color: this.color, x: clientX, y: clientY }, 'NavBackdrop');
	}
}

export default NavButton;
