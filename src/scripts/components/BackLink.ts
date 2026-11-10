import { Piece } from "piecesjs";

/**
 * Points its link back to the page of the site the visitor came from, when
 * there is one. Otherwise the link keeps its own destination.
 */
class BackLink extends Piece {
	constructor() {
		super("BackLink");
	}

	mount(): void {
		const $link = this.querySelector("a");

		if (!$link || !document.referrer) {
			return;
		}

		const referrer = new URL(document.referrer);

		if (referrer.origin === window.location.origin && referrer.href !== window.location.href) {
			$link.href = referrer.href;
		}
	}
}

customElements.define("mt-back-link", BackLink);
