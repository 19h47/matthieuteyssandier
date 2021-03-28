import React, { useRef, useEffect, useContext } from 'react';
import { gsap } from 'gsap';

import { Canvas } from './style';
import { AppContext } from '../../provider';

const diameter = (w, h, x, y) => {
    const width = Math.max(w - x, x) * 2;
    const height = Math.max(h - y, y) * 2;
    const diameter = Math.sqrt(width * width + height * height);
    return diameter;
};

const draw = (context, x, y, radius, color) => {
    context.current.fillStyle = color;
    context.current.beginPath();
    context.current.ellipse(x, y, radius, radius, Math.PI, 0, 2 * Math.PI);
    context.current.fill();
};

const CanvasMenu = () => {
    const contextRef = useRef(null);
    const canvasRef = useRef(null);
    const paramsRef = useRef({ x: 0, y: 0, radius: 0 });
    const {
        position: { x, y },
        color,
    } = useContext(AppContext);

    useEffect(() => {
        const { offsetWidth: width, offsetHeight: height } = canvasRef.current;

        canvasRef.current.width = width;
        canvasRef.current.height = height;

        contextRef.current = canvasRef.current.getContext('2d');
    }, []);

    useEffect(() => {
        const radius = diameter(canvasRef.current.width, canvasRef.current.height, x, y) / 2;

        if (color) {
            const params = {
                x: x,
                y: y,
                radius: 0,
            };

            paramsRef.current.x = x;
            paramsRef.current.y = y;

            gsap.to(params, {
                duration: 1.5,
                ease: 'power4.inOut',
                radius: radius,
                onUpdate: () => draw(contextRef, params.x, params.y, params.radius, color),
                onStart: () => {
                    document.documentElement.style.setProperty('overflow', 'hidden');
                    document.documentElement.style.setProperty('height', '100%');
                },
            });
        }

        if (null === color) {
            paramsRef.current.radius = radius;

            gsap.to(paramsRef.current, {
                duration: 1,
                ease: 'power4.out',
                radius: 0,
                delay: 1,
                onUpdate: () => {
                    contextRef.current.clearRect(
                        0,
                        0,
                        canvasRef.current.width,
                        canvasRef.current.height,
                    );
                    draw(
                        contextRef,
                        paramsRef.current.x,
                        paramsRef.current.y,
                        paramsRef.current.radius,
                        color,
                    );
                },
                onComplete: () => {
                    document.documentElement.style.removeProperty('overflow');
                    document.documentElement.style.removeProperty('height');
                },
            });
        }
    }, [color, x, y]);

    return <Canvas ref={canvasRef} />;
};

export default CanvasMenu;
