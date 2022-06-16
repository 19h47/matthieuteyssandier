import { module as M } from '@19h47/modular';

const safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

class CopyButton extends M {
	constructor(m) {
		super(m);

		this.events = {
			click: 'copy',
		};

		// console.log(navigator.userAgent);
	}

	async copy() {
		if (this.copyTimeout !== undefined) {
			clearTimeout(this.copyTimeout);
		}

		this.copyTimeout = setTimeout(() => {
			this.$('label')[0].innerText = this.getData('label');
			this.$('label')[0].setAttribute('data-text', this.getData('label'));
		}, 1500);

		const item = this.getData('item');

		// Safari doesn't support Permissions API
		if (safari) {
			return this.writeText(item);
		}

		const { state } = await navigator.permissions.query({ name: 'clipboard-write' });

		if ('granted' === state || 'prompt' === state) {
			this.writeText(item);
		} else {
			this.$('label')[0].innerText = this.getData('error');
			this.$('label')[0].setAttribute('data-text', this.getData('error'));
		}

		return true;
	}

	writeText(item) {
		navigator.clipboard.writeText(item).then(
			() => {
				this.$('label')[0].innerText = this.getData('success');
				this.$('label')[0].setAttribute('data-text', this.getData('success'));
			},
			() => {
				this.$('label')[0].innerText = this.getData('error');
				this.$('label')[0].setAttribute('data-text', this.getData('error'));
			},
		);
	}

	destroy() {
		super.destroy();
	}
}

export default CopyButton;
