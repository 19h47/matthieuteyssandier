import { module as M } from 'modujs';

class CaseStudies extends M {
	constructor(m) {
		super(m);

		this.events = {
			mouseenter: {
				item: 'grow',
			},
		};
	}

	grow({ currentTarget }) {
		console.log('grow', currentTarget);

		this.$('item').forEach($item => {
			$item.classList.add('md:grow-0.2');
			$item.classList.remove('md:grow-0.8');
		});

		this.$('title').forEach($title => {
			$title.classList.add('opacity-0');
			$title.classList.remove('opacity-100');
		});

		currentTarget.classList.remove('md:grow-0.2');
		currentTarget.classList.add('md:grow-0.8');

		this.$('title', currentTarget)[0].classList.remove('opacity-0');
		this.$('title', currentTarget)[0].classList.add('opacity-100');
	}
}

export default CaseStudies;
