import { module as M } from 'modujs';
import ClipboardJS from 'clipboard';

class CopyToClipboard extends M {
	constructor(m) {
		super(m);

		const clipboard = new ClipboardJS(this.el); // eslint-disable-line no-new, no-unused-vars
	}
}

export default CopyToClipboard;
