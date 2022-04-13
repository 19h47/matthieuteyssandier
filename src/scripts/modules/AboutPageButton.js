import { module as M } from '@19h47/modular';
import gsap from 'gsap'

class AboutPageButton extends M {
	open() {
		const { label, url } = JSON.parse(this.getData('open'));

		this.el.setAttribute('href', url);
		this.el.classList.add('is-open');

		this.$('label')[0].setAttribute('data-text', label);
		this.$('label')[0].classList.remove('translate-y-0');
		this.$('label')[0].classList.add('-translate-y-full');

		gsap.delayedCall(() => {
			this.$('label')[0].innerHTML = label;
		}, 1);
	}

	close({ url: oldUrl }) {
		const { url, label } = JSON.parse(this.getData('close'));

		this.el.setAttribute('href', oldUrl || url);
		this.el.classList.remove('is-open');

		this.$('label')[0].innerHTML = label;

		this.$('label')[0].classList.remove('-translate-y-full');
		this.$('label')[0].classList.add('translate-y-0');

		gsap.delayedCall(() => {
			this.$('label')[0].setAttribute('data-text', label);
		}, 1000);
	}
}

export default AboutPageButton;
