import { module as M } from 'modujs';
import { body } from 'utils/environment';

class ThemeSwitcher extends M {
	constructor(m) {
		super(m);

		this.events = {
			click: 'toggle'
		}
	}

	// eslint-disable-next-line class-methods-use-this
	toggle() {
		const { theme } = body.dataset;

		if ('light' === theme) {
			body.classList.remove('bg-gray-light', 'text-black');
			body.classList.add('bg-red-very-dark', 'text-gray-light');
			body.setAttribute('data-theme', 'dark');
		}

		if ('dark' === theme) {
			body.classList.remove('bg-red-very-dark', 'text-gray-light');
			body.classList.add('bg-gray-light', 'text-black');
			body.setAttribute('data-theme', 'light');
		}
	}
}

export default ThemeSwitcher
