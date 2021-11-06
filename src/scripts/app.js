/* global matthieuteyssandier */
import modular from 'modujs';
import Guid from 'vendors/Guid';
import * as modules from 'modules';
import Loader from 'vendors/Loader';
import { html, scroll, production } from 'utils/environment';
import favicon from 'utils/favicon';

const { colors } = matthieuteyssandier;

favicon(colors[Math.floor(Math.random() * colors.length)]);

if (false === production) {
	const guid = new Guid(16);

	guid.init();
}

// eslint-disable-next-line new-cap
const app = new modular({
	modules,
});

function init() {
	app.init(app);

	html.classList.add('is-loaded');
	html.classList.add('is-ready');
	html.classList.add('is-first-hit');
	html.classList.remove('is-loading');

	window.addEventListener('mousemove', ({ clientX, clientY }) => {
		scroll.x = clientX;
		scroll.y = clientY;
	});
}

window.onload = async () => {
	const $style = document.getElementById(`${matthieuteyssandier.text_domain}-main-css`);
	const loader = new Loader();
	loader.init();

	await loader.timeline.play();

	if ($style) {
		if ($style.isLoaded) {
			init();
		} else {
			$style.addEventListener('load', () => init());
		}
	} else {
		console.warn(`"${matthieuteyssandier.text_domain}-main-css" stylesheet not found`);
	}

};
