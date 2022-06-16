/* global matthieuteyssandier */
import {
	Bodies,
	Engine,
	Render,
	Runner,
	Composite,
	Composites,
	Mouse,
	MouseConstraint,
	World,
} from 'matter-js';
import { module as M } from '@19h47/modular';

window.decomp = require('poly-decomp');
require('pathseg');

class Error extends M {
	init() {
		this.engine = Engine.create();
		this.world = this.engine.world;
		const { width, height } = this.el.getBoundingClientRect();
		const { colors, template_directory_uri: templateDirectoryUri } = matthieuteyssandier;

		this.render = Render.create({
			element: this.el,
			engine: this.engine,
			options: {
				background: 'transparent',
				wireframes: false,
				width,
				height,
			},
		});

		Render.run(this.render);

		// create runner
		this.runner = Runner.create();
		Runner.run(this.runner, this.engine);

		// Matter.Composites.stack(xx, yy, columns, rows, columnGap, rowGap, callback)
		// Matter.Bodies.circle(x, y, radius, [options], [maxSides])
		const radius = [553, 133, 268, 212, 553, 212, 212, 212, 212, 553, 553];
		const stack = Composites.stack(0, 0, radius.length, 2, 0, 0, (x, y, i) =>
			Bodies.circle(x, y, ((radius[i] / 4) * width) / 1920, {
				render: {
					opacity: 1,
					fillStyle: colors[Math.floor(Math.random() * colors.length)],
				},
			}),
		);

		Composite.add(this.world, stack);

		// Matter.Bodies.rectangle(x, y, width, height, [options])
		const walls = [
			Bodies.rectangle(width / 2, -25, width, 50, { isStatic: true }), // Top
			Bodies.rectangle(width / 2, height + 25, width, 50, { isStatic: true }), // Bottom
			Bodies.rectangle(width + 25, height / 2, 50, height, { isStatic: true }), // Right
			Bodies.rectangle(-25, height / 2, 50, height, { isStatic: true }), // Left
		];

		Composite.add(this.world, walls);

		// 404
		const svg404 = Bodies.rectangle(
			width / 2,
			0,
			(589.6 * width) / 1920,
			(248.7 * height) / 1080,
			{
				render: {
					sprite: {
						texture: `${templateDirectoryUri}/dist/img/svg/404.svg`,
					},
				},
			},
		);

		Composite.add(this.world, svg404);

		// svgBackToHome
		const svgBackToHome = Bodies.rectangle(
			width / 2,
			0,
			(349.4 * width) / 1920,
			(128.4 * height) / 1080,
			{
				label: 'svgBackToHome',
				render: {
					sprite: {
						texture: `${templateDirectoryUri}/dist/img/svg/back-to-home.svg`,
					},
				},
			},
		);

		Composite.add(this.world, svgBackToHome);

		// add mouse control
		const mouse = Mouse.create(this.render.canvas);
		const mouseConstraint = MouseConstraint.create(this.engine, {
			mouse,
			constraint: {
				stiffness: 0.2,
				render: {
					visible: false,
				},
			},
		});

		Composite.add(this.world, mouseConstraint);

		this.el.addEventListener(
			'click',
			() => {
				if (mouseConstraint.body && 'svgBackToHome' === mouseConstraint.body.label) {
					this.call('goTo', matthieuteyssandier.home_url, 'Load');
				}
			},
			false,
		);

		// keep the mouse in sync with rendering
		this.render.mouse = mouse;

		// fit the render viewport to the scene
		Render.lookAt(this.render, {
			min: { x: 0, y: 0 },
			max: { x: width, y: height },
		});
	}

	destroy() {
		console.log('Error.destroy()');

		Render.stop(this.render); // this only stop renderer but not destroy canvas
		World.clear(this.engine.world);
		Engine.clear(this.engine);
	}
}

export default Error;
