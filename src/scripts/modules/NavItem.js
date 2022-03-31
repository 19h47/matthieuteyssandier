import { module as M } from 'modujs';

class NavItem extends M {
	open() {
		this.el.classList.remove('opacity-0', 'invisible');
		this.el.classList.add('opacity-100', 'visible');

		this.$('cat').forEach(($cat, index) => {
			$cat.style.setProperty('transition-delay', `${((this.$('cat').length - 1) - index) * 0.1}s`);
			$cat.classList.add('is-inview');
		});

		this.$('item').forEach($item => {
			$item.classList.add('is-inview');
		});
	}

	close() {
		this.el.classList.remove('opacity-100', 'visible');
		this.el.classList.add('opacity-0', 'invisible');


		this.$('cat').forEach(($cat, index) => {
			$cat.classList.remove('is-inview');
			$cat.style.setProperty('transition-delay', `${index * 0.1}s`);
		});

		this.$('item').forEach($item => {
			$item.classList.remove('is-inview');
		});
	}
}

export default NavItem;
