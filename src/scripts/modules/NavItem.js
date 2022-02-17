import { module as M } from 'modujs';

class NavItem extends M {
	open() {
		this.el.classList.remove('opacity-0', 'invisible');
		this.el.classList.add('opacity-100', 'visible');
	}

	close() {
		this.el.classList.remove('opacity-100', 'visible');
		this.el.classList.add('opacity-0', 'invisible');
	}
}

export default NavItem;
