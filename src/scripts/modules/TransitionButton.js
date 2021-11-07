import { module as M } from 'modujs';

class TransitionButton extends M {
	constructor(m) {
		super(m);

		this.events = {
			click: 'click'
		}
	}

	init() {
		const { width, height, left, top } = this.el.getBoundingClientRect();
		this.x = (width - left) / 2;
		this.y = (height - top) / 2;
	}

	click(event) {
		console.log(event, this);
		this.call('setColor', this.getData('color'), 'Transition');
		this.call('setX', this.x, 'Transition');
		this.call('setY', this.y, 'Transition');
	}
}

export default TransitionButton;
