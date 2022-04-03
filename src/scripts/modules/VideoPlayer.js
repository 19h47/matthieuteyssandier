import { module as M } from '@19h47/modular';

class VideoPlayer extends M {
	constructor(m) {
		super(m);

		this.events = {
			click: {
				button: 'handleClick'
			}
		}

		this.state = true;
	}

	init() {
		this.initEvents();

		// console.log(this.$('button')[0]);
	}

	handleClick() {
		// console.log(this.play);
		this.handlePlay('play')
	}

	handlePlay(state) {

		this.play = 'play' === state;


		if (this.play) {
			this.el.classList.add('is-played');
		}

		if (!this.play) {
			this.el.classList.remove('is-played');
		}


		return this.$('video')[0][state]();
	}

	initEvents() {
		this.$('video')[0].addEventListener('play', () => this.handlePlay('play'));
		this.$('video')[0].addEventListener('pause', () => this.handlePlay('pause'));
	}
}

export default VideoPlayer;
