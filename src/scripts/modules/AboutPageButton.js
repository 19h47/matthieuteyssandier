import { module as M } from 'modujs';

class AboutPageButton extends M {
	open() {
		const { label, url } = JSON.parse(this.getData('open'));

		this.el.setAttribute('href', url);
		this.el.classList.add('is-open');

		this.$('label')[0].setAttribute('text', label);
		this.$('label')[0].classList.remove('translate-y-0');
		this.$('label')[0].classList.add('-translate-y-full');

		setTimeout(() => {
			this.$('label')[0].innerHTML = label;
		}, 1000);
	}

	close({ url: oldUrl }) {
		const { url, label } = JSON.parse(this.getData('close'));

		this.el.setAttribute('href', oldUrl || url);
		this.el.classList.remove('is-open');

		this.$('label')[0].innerHTML = label;

		this.$('label')[0].classList.remove('-translate-y-full');
		this.$('label')[0].classList.add('translate-y-0');

		setTimeout(() => {
			this.$('label')[0].setAttribute('text', label);
		}, 1000);
	}
}

export default AboutPageButton;
