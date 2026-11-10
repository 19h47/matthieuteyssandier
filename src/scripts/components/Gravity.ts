import {
	Bodies,
	Composite,
	Composites,
	Engine,
	Mouse,
	MouseConstraint,
	Render,
	Runner,
} from "matter-js";
import { Piece } from "piecesjs";

import backToHome from "../../img/svg/back-to-home.svg?url";
import notFound from "../../img/svg/404.svg?url";

/** Ball sizes on a 1920px wide screen; the radius is a quarter of each. */
const RADII = [553, 133, 268, 212, 553, 212, 212, 212, 212, 553, 553];
const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 1080;
const WALL = 50;
const BACK_TO_HOME = "back-to-home";

/**
 * 404: balls in the colors of `data-colors` and the "404" and "Back to home"
 * pictures fall into the screen and can be thrown with the pointer.
 * Clicking "Back to home" leads to `data-home`.
 */
class Gravity extends Piece {
	#engine: Engine | null = null;
	#render: Render | null = null;
	#runner: Runner | null = null;
	#mouseConstraint: MouseConstraint | null = null;

	constructor() {
		super("Gravity");
	}

	mount(): void {
		const { width, height } = this.getBoundingClientRect();
		const colors: string[] = JSON.parse(this.dataset.colors ?? "[]");

		this.#engine = Engine.create();
		this.#render = Render.create({
			element: this,
			engine: this.#engine,
			options: { background: "transparent", wireframes: false, width, height },
		});
		this.#runner = Runner.create();

		const balls = Composites.stack(
			0,
			0,
			RADII.length,
			2,
			0,
			0,
			(x: number, y: number, index: number) =>
				Bodies.circle(x, y, ((RADII[index] / 4) * width) / DESIGN_WIDTH, {
					render: { fillStyle: colors[Math.floor(Math.random() * colors.length)] },
				}),
		);

		const walls = [
			Bodies.rectangle(width / 2, -WALL / 2, width, WALL, { isStatic: true }),
			Bodies.rectangle(width / 2, height + WALL / 2, width, WALL, { isStatic: true }),
			Bodies.rectangle(width + WALL / 2, height / 2, WALL, height, { isStatic: true }),
			Bodies.rectangle(-WALL / 2, height / 2, WALL, height, { isStatic: true }),
		];

		const pictures = [
			Bodies.rectangle(
				width / 2,
				0,
				(589.6 * width) / DESIGN_WIDTH,
				(248.7 * height) / DESIGN_HEIGHT,
				{
					render: { sprite: { texture: notFound, xScale: 1, yScale: 1 } },
				},
			),
			Bodies.rectangle(
				width / 2,
				0,
				(349.4 * width) / DESIGN_WIDTH,
				(128.4 * height) / DESIGN_HEIGHT,
				{
					label: BACK_TO_HOME,
					render: { sprite: { texture: backToHome, xScale: 1, yScale: 1 } },
				},
			),
		];

		const mouse = Mouse.create(this.#render.canvas);

		this.#mouseConstraint = MouseConstraint.create(this.#engine, {
			mouse,
			constraint: { stiffness: 0.2, render: { visible: false } },
		});
		this.#render.mouse = mouse;

		Composite.add(this.#engine.world, [balls, ...walls, ...pictures, this.#mouseConstraint]);

		Render.run(this.#render);
		Runner.run(this.#runner, this.#engine);

		this.on("click", this, this.#handleClick);
	}

	unmount(): void {
		this.off("click", this, this.#handleClick);

		if (this.#render) {
			Render.stop(this.#render);
			this.#render.canvas.remove();
		}

		if (this.#runner) {
			Runner.stop(this.#runner);
		}

		if (this.#engine) {
			Composite.clear(this.#engine.world, false);
			Engine.clear(this.#engine);
		}

		this.#engine = null;
		this.#render = null;
		this.#runner = null;
		this.#mouseConstraint = null;
	}

	#handleClick = (): void => {
		if (BACK_TO_HOME === this.#mouseConstraint?.body?.label && this.dataset.home) {
			window.location.assign(this.dataset.home);
		}
	};
}

customElements.define("mt-gravity", Gravity);
