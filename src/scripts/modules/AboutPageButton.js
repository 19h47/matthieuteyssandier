import { module as M } from 'modujs';

class AboutPageButton extends M {
	open() {
		const { url } = JSON.parse(this.getData('open'));

		this.el.setAttribute('href', url);

		this.$('label')[0].classList.remove('translate-y-0');
		this.$('label')[0].classList.add('-translate-y-full');
	}

	close({ url: oldUrl }) {
		const { url } = JSON.parse(this.getData('close'));

		this.el.setAttribute('href', oldUrl || url);

		this.$('label')[0].classList.remove('-translate-y-full');
		this.$('label')[0].classList.add('translate-y-0');
	}
}

export default AboutPageButton;
