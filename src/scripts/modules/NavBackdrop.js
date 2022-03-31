import { module as M } from 'modujs';
import Circle from 'vendors/Circle';

class NavBackdrop extends M {
	init() {
		this.circle = new Circle(this.el);
	}

	open({ color, x, y }) {
		this.circle.open({ color, x, y });
	}

	close() {
		this.circle.close().then(() => this.call('close', null, 'ColorPicker'));
	}

	destroy() {
		this.circle.destroy();
	}
}

export default NavBackdrop;
