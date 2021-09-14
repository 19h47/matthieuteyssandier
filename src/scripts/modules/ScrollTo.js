import { module as M } from 'modujs';
import { html } from '../utils/environment'

class ScrollTo extends M {
	constructor(m) {
		super(m);

		this.events = {
			click: 'handleClick'
		}
	}

	init() {
		this.$target = document.querySelector(this.getData('target')) || document.querySelector(this.el.getAttribute('href'))
	}

	handleClick(event) {
		event.preventDefault()

		if (this.getData('top')) {
			this.call('scrollTo', [0], 'Scroll', 'main')
		} else if (this.$target) {
			this.call('scrollTo', [this.$target, -80], 'Scroll', 'main')

			html.classList.remove('has-menu-open');
		}
	}
}

export default ScrollTo
