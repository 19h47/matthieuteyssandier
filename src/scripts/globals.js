/* global feature */
import svg4everybody from 'svg4everybody';
import { html } from './utils/environment'

function globals() {
	svg4everybody();

	const isTouch = feature.touch;

	if (isTouch) {
		html.classList.add('is-touch');
	}

	window.isTouch = isTouch;
}

export default globals;
