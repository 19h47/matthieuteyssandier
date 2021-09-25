const html = document.documentElement;
const { body } = document;
const isDebug = html.hasAttribute('data-debug');

const scroll = {
	y: 0,
	x: 0,
};

const breakpoints = {
	md: window.matchMedia('(min-width: 950px)')
}


export { html, body, isDebug, scroll, breakpoints };
