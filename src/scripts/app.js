import { load } from "piecesjs";

load("cinq-modal", async () => {
	// Invoker commands open and close the modal: Safari 26.2, Chrome 139 for request-close.
	if (!("command" in HTMLButtonElement.prototype)) {
		await import("invokers-polyfill");
	}

	await import("@agencecinq/modal");
});
load("mt-loader", () => import("./components/Loader.ts"));
load("mt-color-picker", () => import("./components/ColorPicker.ts"));
load("mt-previews", () => import("./components/Previews.ts"));
load("mt-animations", () => import("./components/Animations.ts"));
load("mt-copy-button", () => import("./components/CopyButton.ts"));
load("mt-video", () => import("./components/Video.ts"));
load("mt-back-link", () => import("./components/BackLink.ts"));
load("mt-gravity", () => import("./components/Gravity.ts"));
