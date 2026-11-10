import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import viteSvgSpriteWrapper from "vite-svg-sprite-wrapper";
import viteCompression from "vite-plugin-compression";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
	base: "",
	build: {
		manifest: true,
		outDir: "dist",
		assetsDir: "src",
	},
	plugins: [
		tailwindcss(),
		laravel({
			publicDirectory: "dist",
			input: ["src/stylesheets/styles.css", "src/scripts/app.js"],
			refresh: ["**/*.php", "**/*.twig"],
		}),
		viteSvgSpriteWrapper({
			icons: "src/icons/*.svg",
			outputDir: "public",
			sprite: {
				shape: {
					transform: [
						{
							svgo: {
								plugins: [
									{
										name: "preset-default",
										params: {
											overrides: {
												removeUnknownsAndDefaults: {
													defaultAttrs: false,
												},
											},
										},
									},
								],
							},
						},
					],
				},
			},
		}),
		viteCompression(),
	],
});
