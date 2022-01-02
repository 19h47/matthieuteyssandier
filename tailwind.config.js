const spacing = {
	'1/12': `${(1 / 12) * 100}%`,
	'2/12': `${(2 / 12) * 100}%`,
};

const fontSize = {
	'15xl': `${180 / 16}rem`,
};

const lineHeight = {};

const colors = {
	black: '#242021',
	gray: { dark: '#7A7A78' }
};

const borderRadius = {
	'5xl': `${40 / 16}rem`,
};

const textIndent = {
	'1/3': `${(1 / 3) * 100}%`,
}

module.exports = {
	content: ['./views/**/*.twig', './src/**/*.{html,js}', './includes/**/*.php'],
	corePlugins: {
		container: false,
	},
	theme: {
		colors,
		extend: {
			borderRadius,
			fontSize,
			lineHeight,
			spacing,
			textIndent
		},
	},
	plugins: [],
};
