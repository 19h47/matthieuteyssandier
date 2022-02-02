const spacing = {
	33: `${132 / 16}rem`,
	37: `${148 / 16}rem`,
	43: `${172 / 16}rem`,
	'1/12': `${(1 / 12) * 100}%`,
	'2/12': `${(2 / 12) * 100}%`,
	'2.5/12': `${(2.5 / 12) * 100}%`,
	'9.5/12': `${(9.5 / 12) * 100}%`,
};

const minHeight = {
	223: `${892 / 16}rem`,
};

const fontSize = {
	'15xl': `${180 / 16}rem`,
};

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
			fontSize,
			letterSpacing,
			lineHeight,
			minHeight,
			spacing,
			textIndent,
			zIndex,
		},
	},
	plugins: [],
};
