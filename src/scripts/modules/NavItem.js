import { module as M } from 'modujs';

class NavItem extends M {
	open() {
		this.el.classList.remove('opacity-0', 'invisible');
		this.el.classList.add('opacity-100', 'visible');

		this.$('item').forEach($tag => {
			$tag.classList.add('is-inview');
		});
	}

	close() {
		this.el.classList.remove('opacity-100', 'visible');
		this.el.classList.add('opacity-0', 'invisible');

		this.$('item').forEach($tag => {
			$tag.classList.remove('is-inview');
		});
	}
}

export default NavItem;
