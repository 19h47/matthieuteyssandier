import { Piece } from "piecesjs";

const RESET_DELAY = 1500;

/**
 * Copies `data-copy` of its button to the clipboard. The button shows the
 * outcome for a moment, and a status region announces it.
 */
class CopyButton extends Piece {
	#$button: HTMLButtonElement | null = null;
	#$label: HTMLElement | null = null;
	#$status: HTMLElement | null = null;
	#label = "";
	#timeout: number | undefined;

	constructor() {
		super("CopyButton");
	}

	mount(): void {
		this.#$button = this.domAttr("button") as HTMLButtonElement | null;
		this.#$label = this.querySelector<HTMLElement>(".button__label");
		this.#$status = this.domAttr("status") as HTMLElement | null;
		this.#label = this.#$label?.textContent ?? "";

		this.on("click", this.#$button, this.#copy);
	}

	unmount(): void {
		this.off("click", this.#$button, this.#copy);
		window.clearTimeout(this.#timeout);
	}

	#copy = async (): Promise<void> => {
		const value = this.#$button?.dataset.copy ?? "";

		try {
			await navigator.clipboard.writeText(value);
			this.#show(this.dataset.success ?? "");
		} catch {
			this.#show(this.dataset.error ?? "");
		}
	};

	#show(message: string): void {
		this.#setLabel(message);

		if (this.#$status) {
			this.#$status.textContent = message;
		}

		window.clearTimeout(this.#timeout);
		this.#timeout = window.setTimeout(() => this.#setLabel(this.#label), RESET_DELAY);
	}

	#setLabel(text: string): void {
		if (!this.#$label) {
			return;
		}

		this.#$label.textContent = text;
		this.#$label.dataset.text = text;
	}
}

customElements.define("mt-copy-button", CopyButton);
