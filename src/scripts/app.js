/* global imagesLoaded */
import modular from 'modujs';
import * as modules from './modules';
import globals from './globals';
import { html } from './utils/environment';

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


	imagesLoaded(document.querySelector('.page-content'), async () => {
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
