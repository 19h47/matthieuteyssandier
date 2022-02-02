import { module as M } from 'modujs';
import { html } from 'utils/environment';

class InfoButton extends M {
	constructor(m) {
		super(m);

		this.isOpen = this.el.classList.contains('has-info-open');

		this.events = {
			click: 'toggle',
		};
	}

	toggle() {
		if (this.isOpen) return this.close();

		return this.open();
	}

	open() {
		if (this.isOpen) return false;

		this.isOpen = true;

		html.classList.add('has-info-open');

		html.style.setProperty('overflow', 'hidden');
		html.style.setProperty('height', '100%');

		return this.call('stop', false, 'Scroll', 'main');
	}

	close() {
		if (!this.isOpen) return false;

		this.isOpen = false;

		html.classList.remove('has-info-open');

		html.style.removeProperty('overflow');
		html.style.removeProperty('height');

		return this.call('start', null, 'Scroll', 'main');
	}
}

export default InfoButton;
