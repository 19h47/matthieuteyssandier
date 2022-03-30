/**
 * Tailwind config
 */

const plugin = require('tailwindcss/plugin')

const fontSize = require('./tailwind/tailwind.config.fontSize');
const minHeight = require('./tailwind/tailwind.config.minHeight');
const minWidth = require('./tailwind/tailwind.config.minWidth');
const spacing = require('./tailwind/tailwind.config.spacing');
const transitionDuration = require('./tailwind/tailwind.config.transitionDuration');
const transitionProperty = require('./tailwind/tailwind.config.transitionProperty');
const transitionTimingFunction = require('./tailwind/tailwind.config.transitionTimingFunction');

const lineHeight = {
	0: '0',
	7.75: `${31 / 16}rem`,
	11: `${44 / 16}rem`,
};

const flexGrow = {
	0.2: 0.2,
	0.8: 0.8,
};

const colors = {
	black: '#242021',
	gray: { dark: '#939393', light: '#EAE9E8' },
	red: {
		bright: '#FD4D2E',
		'very-dark': '#242021',
	},
};

const borderRadius = {
	'5xl': `${40 / 16}rem`,
};

const textIndent = {
	'1/3': `${(1 / 3) * 100}%`,
};



const letterSpacing = {
	tight: '-0.01em',
};

const zIndex = {
	5: '5',
};

module.exports = {
	content: ['./views/**/*.twig', './src/**/*.{html,js}', './includes/**/*.php'],
	corePlugins: {
		container: false,
	},
	theme: {
		fontFamily: {
			body: ['Neue Montreal', 'sans-serif'],
		},
		extend: {
			colors,
			borderRadius,
			flexGrow,
			letterSpacing,
			lineHeight,
			minWidth,
			minHeight,
			spacing,
			textIndent,
			zIndex,
			fontSize,
			transitionDuration,
			transitionProperty,
			transitionTimingFunction
		},
	},
	plugins: [
		plugin(({ addVariant }) => addVariant('is-loading', 'html.is-loading &')),
		plugin(({ addVariant }) => addVariant('is-loaded', 'html.is-loaded &')),
		plugin(({ addVariant }) => addVariant('is-first-load', 'html.is-first-load &')),
		plugin(({ addVariant }) => addVariant('has-dom-ready', 'html.has-dom-ready &')),
		plugin(({ addVariant }) => addVariant('is-inview', ' &.is-inview')),
	],
};
