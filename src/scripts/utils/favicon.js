const favicon = (color = '#000000') => {

	const img = new Image();
	const canvas = document.createElement('canvas');
	const context = canvas.getContext('2d');
	const link = document.createElement('link');

	canvas.width = 16;
	canvas.height = 16;

	context.drawImage(img, 0, 0);

	context.fillStyle = color;
	context.arc(8, 8, 8, 0, 2 * Math.PI);
	context.fill();

	link.rel = 'shortcut icon';
	link.type = 'image/x-icon';
	link.sizes = '16x16';
	link.href = canvas.toDataURL();

	document.getElementsByTagName('head')[0].appendChild(link);
}

export default favicon;
