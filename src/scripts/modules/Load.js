import { module as M } from 'modujs';
import modularLoad from 'modularload';
import { body, html } from 'utils/environment';
import { gsap } from 'gsap';

class Load extends M {
	// eslint-disable-next-line no-useless-constructor
	constructor(m) {
		super(m);
	}

	init() {
		// eslint-disable-next-line new-cap
		const load = new modularLoad({
			enterDelay: 1000,
			exitDelay: 1000,
		});

		// eslint-disable-next-line no-unused-vars
		load.on('loading', (transition, oldContainer) => {
			console.info('Load.loading', transition);

			gsap.to(oldContainer, { duration: 0.3, opacity: 0 });

			if (html.classList.contains('has-nav-open')) {
				this.call('close', null, 'NavButton');
				this.call('close', null, 'NavItem');
				this.call('close', null, 'NavBackdrop');
			}
		});

		load.on('loaded', (transition, oldContainer, newContainer) => {
			console.info('Load.loaded', transition);

			this.call('destroy', oldContainer, 'app');

			gsap.set(newContainer, { opacity: 0 });

			const { mode, template } = newContainer.dataset;
			const { url } = oldContainer.dataset;

			if ('light' === mode) {
				body.classList.remove('bg-red-very-dark', 'text-gray-light');
				body.classList.add('bg-gray-light', 'text-black');
				body.setAttribute('data-mode', 'light');
			}

			if ('dark' === mode) {
				body.classList.remove('bg-gray-light', 'text-black');
				body.classList.add('bg-red-very-dark', 'text-gray-light');
				body.setAttribute('data-mode', 'dark');
			}

			console.log(template);

			if ('about-page' === template) {
				this.call('close', { url }, 'AboutPageButton');
			}

			if ('about-page' !== template) {
				this.call('open', null, 'AboutPageButton');
			}
		});

		load.on('ready', (transition, newContainer) => {
			// console.info('Load.ready', transition);

			this.call('update', newContainer, 'app');

			gsap.to(newContainer, { duration: 1, ease: 'power4.out', opacity: 1 });
		});

		load.on('images', () => {
			// console.log('Load.images');
			this.call('update', null, 'Scroll', 'main');
		});
	}
}

export default Load;
