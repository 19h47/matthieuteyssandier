import { module as M } from 'modujs';

class CopyButton extends M {
	constructor(m) {
		super(m);

		this.events = {
			click: 'copy',
		};
	}

	async copy() {

		if (this.copyTimeout !== undefined) {
			clearTimeout(this.copyTimeout);
		}

		this.copyTimeout = setTimeout(() => {
			this.$('label')[0].innerText = this.getData('label');
		}, 1500);

		const item = this.getData('item');
		const { state } = await navigator.permissions.query({ name: 'clipboard-write' })

		if ('granted' === state || 'prompt' === state) {
			navigator.clipboard.writeText(item).then(
				() => {
					this.$('label')[0].innerText = this.getData('success');
				},
				() => {
					this.$('label')[0].innerText = this.getData('error');
				},
			);
		} else {
			this.$('label')[0].innerText = this.getData('error');
		}
	}

	destroy() {
		super.destroy();
	}
}

export default CopyButton;
