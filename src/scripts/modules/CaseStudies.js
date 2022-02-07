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

		currentTarget.classList.remove('md:grow-0.2');
		currentTarget.classList.add('md:grow-0.8');
	}
}

export default CaseStudies;
