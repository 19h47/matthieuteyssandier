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
			enterDelay: 0,
			exitDelay: 0,
		});

		load.on('loading', (transition, oldContainer) => {
			console.info('Load.loading', transition);
			gsap.to(oldContainer, { duration: 0.3, opacity: 0, onComplete: () => window.scrollTo(0, 0) });
		});

		load.on('loaded', (transition, oldContainer, newContainer) => {
			console.info('Load.loaded', transition);

			this.call('destroy', oldContainer, 'app');
			this.call('update', newContainer, 'app');
			// this.call('scrollTo', { target: 'top' }, 'Scroll', 'main');

			gsap.set(newContainer, { duration: 0.5, opacity: 0 });
		});

		load.on('ready', (transition, newContainer) => {
			console.info('Load.ready!', transition);

			gsap.to(newContainer, { duration: 0.5, opacity: 1 });
		});
	}
}

export default Load;
