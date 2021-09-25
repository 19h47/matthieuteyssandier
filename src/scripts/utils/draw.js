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
const ellipse = (props, context, clear = true, negative = false) => {
	const { width, height, x = width, y = height, radiusX, radiusY = radiusX, color = null } = props;

	if (clear) {
		context.clearRect(width, 0, -width, height);
	}

	if (color) {
		context.fillStyle = color;
	}

	context.beginPath();
	context.ellipse(x, y, radiusX, radiusY, Math.PI, 0, 2 * Math.PI, true);

	if (negative) {
		context.rect(0, 0, width, height);
	}

	context.fill();
};

export { rect, ellipse }
