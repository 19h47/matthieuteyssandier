/**
 * Draw rect
 *
 *
 * @param {object} props
 * @param {object} context
 */
const rect = (props, context) => {
	const { width, height } = props;

	context.clearRect(width, 0, -width, height);
	context.beginPath();
	context.rect(width, 0, -width, height);
	context.fill();
};

/**
 * Draw ellipse
 *
 *
 * @param {object} props
 * @param {object} context
 */
const ellipse = (props, context) => {
	const { width, height, radiusX, radiusY } = props;

	context.clearRect(width, 0, -width, height);

	context.beginPath();
	context.ellipse(width / 2, height / 2, radiusX, radiusY, Math.PI, 0, 2 * Math.PI, true);

	context.rect(0, 0, width, height);
	context.fill();
};

export { rect, ellipse }
