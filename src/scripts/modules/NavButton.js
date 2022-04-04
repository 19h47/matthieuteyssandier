import { module as M } from '@19h47/modular';
import { html, scroll } from 'utils/environment';

class NavButton extends M {
	constructor(m) {
		super(m);

		this.color = this.getData('color');

		this.events = {
			click: 'toggle',
		};
	}

	toggle() {
		console.info('NavButton.toggle()', { color: this.color, x: scroll.x, y: scroll.y });

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

		setTimeout(() => this.call('open', null, 'NavItem', this.getData('id')), 500);
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
