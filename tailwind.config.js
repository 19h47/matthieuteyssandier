/**
 * Tailwind config
 */


const fontSize = require('./tailwind/tailwind.config.fontSize');
const minHeight = require('./tailwind/tailwind.config.minHeight');
const spacing = require('./tailwind/tailwind.config.spacing');
const transitionDuration = require('./tailwind/tailwind.config.transitionDuration');
const transitionProperty = require('./tailwind/tailwind.config.transitionProperty');
const transitionTimingFunction = require('./tailwind/tailwind.config.transitionTimingFunction');

const lineHeight = {};

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
	plugins: [],
};
