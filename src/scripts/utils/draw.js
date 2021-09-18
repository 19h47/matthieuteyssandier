const rect = (props, context) => {
	const { width, height } = props;

	context.clearRect(width, 0, -width, height);
	context.beginPath();
	context.rect(width, 0, -width, height);
	context.fill();
};

const ellipse = (props, context) => {
	const { width, height, radiusX, radiusY } = props;

	context.clearRect(width, 0, -width, height);

	context.beginPath();
	context.ellipse(width / 2, height / 2, radiusX, radiusY, Math.PI, 0, 2 * Math.PI);

	context.rect(width, 0, -width, height);
	context.fill();
};

export { rect, ellipse }
