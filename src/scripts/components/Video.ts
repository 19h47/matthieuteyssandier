import { Piece } from "piecesjs";

const MOTION = "(prefers-reduced-motion: no-preference)";

/**
 * Plays its muted video unless the visitor prefers reduced motion, and lets
 * the button pause and resume it. The button label and icon follow the
 * video state.
 */
class Video extends Piece {
	#$video: HTMLVideoElement | null = null;
	#$toggle: HTMLButtonElement | null = null;

	constructor() {
		super("Video");
	}

	mount(): void {
		this.#$video = this.domAttr("video") as HTMLVideoElement | null;
		this.#$toggle = this.domAttr("toggle") as HTMLButtonElement | null;

		this.on("click", this.#$toggle, this.#toggle);
		this.on("play", this.#$video, this.#sync);
		this.on("pause", this.#$video, this.#sync);

		if (window.matchMedia(MOTION).matches) {
			// Rejected when the browser blocks autoplay: the button stays on "play".
			this.#$video?.play().catch(() => {});
		}
	}

	unmount(): void {
		this.off("click", this.#$toggle, this.#toggle);
		this.off("play", this.#$video, this.#sync);
		this.off("pause", this.#$video, this.#sync);
	}

	#toggle = (): void => {
		if (this.#$video?.paused) {
			this.#$video.play().catch(() => {});
		} else {
			this.#$video?.pause();
		}
	};

	#sync = (): void => {
		const paused = this.#$video?.paused ?? true;
		const label = (paused ? this.dataset.play : this.dataset.pause) ?? "";

		this.#$toggle?.setAttribute("aria-label", label);
		(this.domAttr("play") as Element | null)?.classList.toggle("hidden", !paused);
		(this.domAttr("pause") as Element | null)?.classList.toggle("hidden", paused);
	};
}

customElements.define("mt-video", Video);
