/* global imagesLoaded, matthieuteyssandier */
import modular from 'modujs';
import * as modules from 'modules';
import Loader from 'vendors/Loader';
import { html } from 'utils/environment';
import favicon from 'utils/favicon';
import globals from './globals';

const { colors } = matthieuteyssandier;

favicon(colors[Math.floor(Math.random() * colors.length)]);

// eslint-disable-next-line new-cap
const app = new modular({
	modules,
});

function init() {
	globals();

	app.init(app);

	html.classList.add('is-loaded');
	html.classList.add('is-ready');
	html.classList.add('is-first-hit');
	html.classList.remove('is-loading');
}

window.onload = () => {
	const $style = document.getElementById('matthieuteyssandier-main-css');
	const loader = new Loader();
	loader.init();


	imagesLoaded(document.querySelector('.page-content'), async () => {
		await loader.timeline.play();

		if ($style) {
			if ($style.isLoaded) {
				init();
			} else {
				$style.addEventListener('load', () => init());
			}
		} else {
			console.warn('The "main-css" stylesheet not found');
		}
	});
};
