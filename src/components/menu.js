import React, { useRef, useContext, useEffect, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';

import useMousePosition from '../hooks/use-mouse-position';
import { AppContext } from '../provider';

const Container = styled.div`
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 5;
	// transition: background-color 0.5s cubic-bezier(0.42, 0, 0.58, 1);
	// will-change: background-color;
	// background-color: ${props => (props.color ? props.color : 'transparent')};
	display: ${props => (props.color ? 'block' : 'none')};
`;

const Canvas = styled.canvas`
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 100%;
`;

const diameter = (w, h, x, y) => {
    const width = Math.max(w - x, x) * 2;
    const height = Math.max(h - y, y) * 2;
    const diameter = Math.sqrt(width * width + height * height);
    return diameter;
}

const Menu = () => {
    const { x, y } = useMousePosition();
    const context = useRef(null);
    const canvas = useRef(null);
    const canvasProps = useRef({
        width: 0,
        height: 0,
        x,
        y,
    });
    const { color, toggleColor } = useContext(AppContext);

    const draw = () => {
        if (canvas.current) {
            const { x, y, radiusX, radiusY } = canvasProps.current;

            context.current.fillStyle = color;
            context.current.beginPath();
            context.current.ellipse(x, y, radiusX, radiusY, Math.PI, 0, 2 * Math.PI);
            context.current.fill();
        }
    };

    const clear = () => {
        if (canvas.current) {
            const { width, height } = canvasProps.current;

            context.current.clearRect(0, 0, width, height);
            context.current.beginPath();
        }
    }

    useEffect(() => {
        if (color) {
            const radius = diameter(canvas.current.width, canvas.current.height, x, y)

            canvasProps.current.x = x;
            canvasProps.current.y = y;

            canvasProps.current.radiusX = 0;
            canvasProps.current.radiusY = 0;

            gsap.fromTo(canvasProps.current, { radiusX: 0, radiusY: 0 }, {
                duration: 3,
                ease: 'power4.out',
                radiusX: radius,
                radiusY: radius,
                onUpdate: draw,
            });
            // draw();
        }

        return clear()
    }, [color]);

    useLayoutEffect(() => {
        console.log('menu');
        if (canvas.current) {
            const { offsetWidth: width, offsetHeight: height } = canvas.current;

            canvas.current.width = width;
            canvas.current.height = height;

            canvasProps.current.width = width;
            canvasProps.current.height = height;

            context.current = canvas.current.getContext('2d');
        }
    });

    return (
        <Container color={color} style={{ paddingTop: '34px' }}>
            <Canvas ref={canvas} />
            <div className="Site-container">
                <div className="row">
                    <div className="col-2">
                        <button type="button" onClick={() => toggleColor(null)} style={{ textTransform: 'uppercase' }}>
                            Quitter le menu
						</button>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Menu;
