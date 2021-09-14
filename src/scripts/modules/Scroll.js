import { module as M } from 'modujs';
import { Native } from 'locomotive-scroll';

import { html } from 'utils/environment';

const isOntop = () => {
	const top = window.pageYOffset || document.documentElement.scrollTop;

	if (0 === top) {
		html.classList.add('is-ontop');
	} else {
		html.classList.remove('is-ontop');
	}
}

class Scroll extends M {
	init() {
		// console.info('Scroll.init');

		this.scroll = new Native({
			el: this.el,
			getDirection: true,
			resetNativeScroll: false,
		});

		this.direction = 'down';

		this.scroll.on('scroll', ({ direction }) => {
			html.setAttribute('data-direction', direction || 'down');
			this.direction = direction;

			isOntop();
		});

		isOntop();

		this.scroll.on('call', (func, way, obj) => {
			if (obj.el.id) {
				this.call(func[0], { way, obj, direction: this.direction }, func[1], obj.id);
			}
		});
	}

	update() {
		return this.scroll.update();
	}

	stop() {
		return this.scroll.stop();
	}

	start() {
		return this.scroll.start();
	}

	destroy() {
		this.scroll.destroy();
	}

	scrollTo({ target, options = {} }) {
		this.scroll.scrollTo(target, options)
	}
}

export default Scroll;
