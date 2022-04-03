import { module as M } from '@19h47/modular';

class CaseStudies extends M {
	constructor(m) {
		super(m);

		this.events = {
			mouseenter: {
				item: 'grow',
			},
		};

		this.$('item').forEach($item => $item.addEventListener('focus', this.grow.bind(this)));
	}

	grow({ currentTarget }) {
		// console.log('grow', currentTarget);

		this.$('item').forEach($item => {
			$item.classList.add('lg:grow-0.2');
			$item.classList.remove('lg:grow-0.8');
		});

		this.$('title').forEach($title => {
			$title.classList.add('lg:opacity-0');
			$title.classList.add('lg:translate-y-10');
			$title.classList.remove('lg:opacity-100');
			$title.classList.remove('lg:translate-y-0');
		});

		currentTarget.classList.remove('lg:grow-0.2');
		currentTarget.classList.add('lg:grow-0.8');

		this.$('title', currentTarget)[0].classList.remove('lg:opacity-0');
		this.$('title', currentTarget)[0].classList.remove('lg:translate-y-10');
		this.$('title', currentTarget)[0].classList.add('lg:opacity-100');
		this.$('title', currentTarget)[0].classList.add('lg:translate-y-0');
	}
}

export default CaseStudies;
