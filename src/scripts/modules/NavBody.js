import { module as M } from 'modujs';

class NavBody extends M {
	constructor(m) {
		super(m);

		this.handleKeyup = this.handleKeyup.bind(this);

		document.addEventListener('keyup', this.handleKeyup);
	}

	handleKeyup({ key }) {
		if ('Escape' === key) {
			this.close();
		}
	}

	open() {
		this.el.classList.add('is-active');

		this.call('play', null, 'TextInview', `text-inview-nav-body-${this.getData('id')}`);

		setTimeout(() => {
			this.call(
				'tweenFromTo',
				'image',
				'Reveal',
				`case-study-nav-body-${this.getData('id')}`,
			);
		}, 750);

		return true;
	}

	close() {
		this.el.classList.remove('is-active');

		this.call('reverse', null, 'TextInview', `text-inview-nav-body-${this.getData('id')}`);
		this.call('reverse', null, 'Reveal', `case-study-nav-body-${this.getData('id')}`);


		return true;
	}

	destroy() {
		document.removeEventListener('keyup', this.handleKeydown);
	}
}

export default NavBody;
