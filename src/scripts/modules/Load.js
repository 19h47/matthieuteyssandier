import { module as M } from 'modujs';
import modularLoad from 'modularload';
import { gsap } from 'gsap';

class Load extends M {
	// eslint-disable-next-line no-useless-constructor
	constructor(m) {
		super(m);
	}

	init() {
		// eslint-disable-next-line new-cap
		const load = new modularLoad({
			enterDelay: 500,
			exitDelay: 500,
			transitions: {
				caseStudy: { enterDelay: 1000, exitDelay: 1000 },
			},
		});

		// eslint-disable-next-line no-unused-vars
		load.on('loading', (transition, oldContainer) => {
			console.info('Load.loading', transition);

			if ('caseStudy' === transition) {
				this.call('enter', { delay: 0.25 }, 'Transition');

				setTimeout(() => {
					window.scrollTo(0, 0);
				}, 1525)

				return;
			}

			gsap.to(oldContainer, {
				duration: 0.3,
				opacity: 0,
				onComplete: () => window.scrollTo(0, 0),
			});
		});

		load.on('loaded', (transition, oldContainer, newContainer) => {
			console.info('Load.loaded', transition);

			this.call('destroy', oldContainer, 'app');
			// this.call('scrollTo', { target: 'top' }, 'Scroll', 'main');

			gsap.set(newContainer, { opacity: 0 });
		});

		load.on('ready', (transition, newContainer) => {
			console.info('Load.ready', transition);

			this.call('update', newContainer, 'app');

			if ('caseStudy' === transition) {
				this.call('exit', null, 'Transition');
			}

			gsap.to(newContainer, { duration: 0.5, opacity: 1 });
		});

		load.on('images', () => {
			console.log('Load.images');
			this.call('update', null, 'Scroll', 'main');
		});
	}
}

export default Load;
