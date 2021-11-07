import { module as M } from 'modujs';
import { html, scroll } from 'utils/environment';

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

	toggle() {
		const fn = this.getData('function');

		if ('open' === fn) {
			this.call('close', null, 'NavBody');

			html.style.setProperty('overflow', 'hidden');
			html.style.setProperty('height', '100%');

			html.classList.add('has-nav-open');

			this.call('stop', false, 'Scroll', 'main');
		}

		if ('close' === fn) {
			html.classList.remove('has-nav-open');

			html.style.removeProperty('overflow');
			html.style.removeProperty('height');

			this.call('start', null, 'Scroll', 'main');
		}

		this.call(fn, null, 'NavBody', this.getData('id'));
		this.call(fn, { color: this.color, x: scroll.x, y: scroll.y }, 'NavBackdrop');
	}
}

export default NavButton;
