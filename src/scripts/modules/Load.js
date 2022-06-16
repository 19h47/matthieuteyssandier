import { module as M } from '@19h47/modular';
import modularLoad from 'modularload';
import { body, html } from 'utils/environment';
import { gsap } from 'gsap';

class Load extends M {
	init() {
		// eslint-disable-next-line new-cap
		this.load = new modularLoad({});

		// eslint-disable-next-line no-unused-vars
		this.load.on('loading', (transition, oldContainer) => {
			// console.info('Load.loading', transition);

			html.classList.remove('has-dom-ready');
			html.classList.add('is-loading');
			body.classList.add('cursor-wait');

			gsap.to(oldContainer, { duration: 0.3, opacity: 0 });

			if (html.classList.contains('has-nav-open')) {
				this.call('close', null, 'NavButton');
				this.call('close', null, 'NavItem');
				this.call('close', null, 'NavBackdrop');
			}
		});

		this.load.on('loaded', (transition, oldContainer, newContainer) => {
			// console.info('Load.loaded', transition, oldContainer, newContainer);

			html.classList.remove('is-loading');
			body.classList.remove('cursor-wait');

			this.call('destroy', oldContainer, 'app');

			gsap.set(newContainer, { opacity: 0 });


			const { url } = oldContainer.dataset;
			const { template } = newContainer.dataset;

			body.classList.remove('overflow-hidden');

			if ('front-page' === template) {
				body.classList.add('overflow-hidden');
			}

			if ('about-page' === template) {
				this.call('close', { url }, 'AboutPageButton');
			}

			if ('about-page' !== template) {
				this.call('open', null, 'AboutPageButton');
			}

			gsap.delayedCall(0.7, () => html.classList.add('has-dom-ready'));
		});

		this.load.on('ready', (_, newContainer) => {
			// console.info('Load.ready', transition);

			this.call('update', newContainer, 'app');

			const { mode } = newContainer.dataset;

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

			gsap.to(newContainer, { duration: 1, ease: 'power4.out', opacity: 1 });
		});

		this.load.on('images', () => {
			// console.log('Load.images');
			this.call('update', null, 'Scroll', 'main');
		});
	}

	goTo(href = '/') {
		this.load.goTo(href);
	}
}

export default Load;
