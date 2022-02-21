import { module as M } from 'modujs';

class AboutPageButton extends M {
	open() {
		const { url, label } = JSON.parse(this.getData('open'));

		this.el.setAttribute('href', url);
		this.$('label')[0].innerHTML = label;
	}

	close({ url: oldUrl }) {
		const { url, label } = JSON.parse(this.getData('close'));

		this.el.setAttribute('href', oldUrl || url);
		this.$('label')[0].innerHTML = label;
	}
}

export default AboutPageButton;
