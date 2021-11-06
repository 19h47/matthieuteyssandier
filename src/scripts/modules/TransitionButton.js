import { module as M } from 'modujs';

class TransitionButton extends M {
	constructor(m) {
		super(m);

		this.events = {
			click: 'click'
		}
	}

	click() {
		this.call('set', { color: this.getData('color') }, 'Transition');
	}
}

export default TransitionButton;
