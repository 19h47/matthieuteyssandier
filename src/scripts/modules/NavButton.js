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
		const fn = this.getData('function') || 'close';

		if ('open' === fn) {
			this.open();
		}

		if ('close' === fn) {
			this.close();
		}

		this.call(fn, { color: this.color, x: scroll.x, y: scroll.y }, 'NavBackdrop');
	}

	open() {
		html.classList.add('has-nav-open');

		html.style.setProperty('overflow', 'hidden');
		html.style.setProperty('height', '100%');

		this.call('stop', false, 'Scroll', 'main');
		this.call('close', null, 'NavItem');
		this.call('open', null, 'NavItem', this.getData('id'));
	}

	close() {
		html.classList.remove('has-nav-open');

		html.style.removeProperty('overflow');
		html.style.removeProperty('height');

		this.call('start', null, 'Scroll', 'main');
		this.call('close', null, 'NavItem');
	}
}

export default NavButton;
