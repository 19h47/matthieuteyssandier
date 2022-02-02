import { module as M } from 'modujs';

class NavItem extends M {
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
		this.el.classList.remove('opacity-0 invisble');
		this.el.classList.add('opacity-100 visible');
	}

	close() {
		this.el.classList.remove('opacity-100 visible');
		this.el.classList.add('opacity-0 invisible');
	}

	destroy() {
		document.removeEventListener('keyup', this.handleKeydown);
	}
}

export default NavItem;
