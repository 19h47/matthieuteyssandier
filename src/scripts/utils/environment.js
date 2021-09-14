const html = document.documentElement;
const { body } = document;
const isDebug = html.hasAttribute('data-debug');

const scroll = {
	left: 0,
	top: 0,
};

const breakpoints = {
	md: window.matchMedia('(min-width: 950px)')
}


export { html, body, isDebug, scroll, breakpoints };
