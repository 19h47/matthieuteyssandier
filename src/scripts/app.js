/* global matthieuteyssandier */
import modular from '@19h47/modular';
import Loader from 'vendors/Loader';
import { body, html, scroll } from 'utils/environment';
import favicon from 'utils/favicon';
import { gsap } from 'gsap';

const { colors } = matthieuteyssandier;

favicon(gsap.utils.random(colors));

// eslint-disable-next-line new-cap
const app = new modular({ modules: [] });

function init() {
	app.initModules();

	html.classList.add('is-loaded');
	html.classList.add('is-ready');
	html.classList.add('is-first-load');
	html.classList.remove('is-loading');
	body.classList.remove('cursor-wait');

	window.addEventListener('mousemove', ({ clientX, clientY }) => {
		scroll.x = clientX;
		scroll.y = clientY;
	});

	setTimeout(() => {
		html.classList.add('has-dom-ready');
	}, 500);
}

window.onload = async () => {
	const $style = document.getElementById(`${matthieuteyssandier.text_domain}-main-css`);
	const loader = new Loader();

	loader.init();

	await Promise.all([loader.timeline.play(), app.collectModules(app)]);

	if ($style) {
		if ($style.isLoaded) {
			init();
		} else {
			$style.addEventListener('load', () => init());
		}
	} else {
		console.warn(`The "${matthieuteyssandier.text_domain}-main-css" stylesheet not found`);
	}
};
