const spacing = {
	43: `${172 / 16}rem`,
	'1/12': `${(1 / 12) * 100}%`,
	'2/12': `${(2 / 12) * 100}%`,
};

const fontSize = {
	'15xl': `${180 / 16}rem`,
};

const lineHeight = {};

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

module.exports = {
	content: ['./views/**/*.twig', './src/**/*.{html,js}', './includes/**/*.php'],
	corePlugins: {
		container: false,
	},
	theme: {
		extend: {
			colors,
			borderRadius,
			fontSize,
			lineHeight,
			spacing,
			textIndent,
			letterSpacing,
		},
	},
	plugins: [],
};
