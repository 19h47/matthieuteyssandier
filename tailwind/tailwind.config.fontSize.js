const rem = value => `${value / 16}rem`;
const clamp = (min, max, multiplier) =>
	`clamp(${rem(min)}, calc(${rem(min)} + ((1vw - 3.75px) * ${multiplier})), ${rem(max)})`;

module.exports = {
	'text-base': clamp(16, 24, 0.5178),
	'text-sm': clamp(20, 40, 1.2945),
	'6xl': clamp(35, 70, 2.2654),
	'7xl': [clamp(40, 80, 2.589), 0.85],
	'8xl': [clamp(50, 100, 3.2362), 0.9],
};
