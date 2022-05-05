import { Bodies, Engine, Render, Runner, Composite, Composites, Mouse, MouseConstraint } from 'matter-js';
import { module as M } from '@19h47/modular';

class Error extends M {
	init() {
		const engine = Engine.create();
		const { world } = engine;

		const { width, height } = this.el.getBoundingClientRect();

		const render = Render.create({
			element: this.el,
			engine,
			options: {
				background: 'transparent',
				wireframes: false,
				width,
				height,
				// showAngleIndicator: true,
			}
		});

		Render.run(render);

		// create runner
		const runner = Runner.create();
		Runner.run(runner, engine);

		// add bodies
		const stack = Composites.stack(20, 20, 10, 5, 0, 0, (x, y) => Bodies.circle(x, y, 4));

		Composite.add(world, stack);

		Composite.add(world, [

			Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
			Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
			Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
			Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
		]);

		// add mouse control
		const mouse = Mouse.create(render.canvas);
		const mouseConstraint = MouseConstraint.create(engine, {
			mouse,
			constraint: {
				stiffness: 0.2,
				render: {
					visible: false
				}
			}
		});

		Composite.add(world, mouseConstraint);

		// keep the mouse in sync with rendering
		render.mouse = mouse;

		// fit the render viewport to the scene
		Render.lookAt(render, {
			min: { x: 0, y: 0 },
			max: { x: width, y: height }
		});
	}
}

export default Error;
