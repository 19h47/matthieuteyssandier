import { module as M } from 'modujs';

import { html } from 'utils/environment';
import { disableScroll, enableScroll } from 'utils/scroll';

class Nav extends M {
	constructor(m) {
		super(m);

		this.handleKeyup = this.handleKeyup.bind(this);
		this.isOpen = this.el.classList.contains('is-open');

		document.addEventListener('keyup', this.handleKeyup);
	}

	handleKeyup({ key }) {
		if ('Escape' === key) {
			this.close();
		}
	}

	toggle() {
		if (this.isOpen) {
			return this.close();
		}

		return this.open();
	}

	open() {
		if (this.isOpen) return false;

		this.isOpen = true;

		this.el.classList.add('is-open');

		// When panel is open, disableScroll
		disableScroll();
		html.classList.add('has-nav-open');
		this.call('stop', false, 'Scroll', 'main');

		return true;
	}

	close() {
		if (!this.isOpen) return false;

		this.isOpen = false;

		this.el.classList.remove('is-open');

		// When panel is closed, enableScroll
		enableScroll();
		html.classList.remove('has-nav-open');
		this.call('start', false, 'Scroll', 'main');

		return true;
	}

	destroy() {
		document.removeEventListener('keyup', this.handleKeydown);
	}
}

export default Nav;
