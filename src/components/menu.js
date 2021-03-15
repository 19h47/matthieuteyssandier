import React, { useRef, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';

import useMousePosition from '../hooks/use-mouse-position';
import { AppContext } from '../provider';

const Container = styled.div`
padding-top: 34px;
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 5;
    opacity: ${props => props.$active ? '1' : '0'};
    visibility: ${props => props.$active ? 'visible' : 'hidden'};
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

const TextInView = styled.div`
	clip-path: inset(0 0 100% 0);
`;

const diameter = (w, h, x, y) => {
    const width = Math.max(w - x, x) * 2;
    const height = Math.max(h - y, y) * 2;
    const diameter = Math.sqrt(width * width + height * height);
    return diameter;
};

const Menu = () => {
    const { x, y } = useMousePosition();
    const context = useRef(null);
    const canvas = useRef();
    const container = useRef();
    const { color, setColor, menu, setMenu } = useContext(AppContext);
    const paramsRef = useRef({ x: 0, y: 0, radius: 0 });

    const draw = (x, y, radius) => {
        context.current.fillStyle = color;
        context.current.beginPath();
        context.current.ellipse(x, y, radius, radius, Math.PI, 0, 2 * Math.PI);
        context.current.fill();
    };

    useEffect(() => {
        if (color) {
            const radius = diameter(canvas.current.width, canvas.current.height, x, y) / 2;
            const params = {
                x: x,
                y: y,
                radius: 0,
            };

            paramsRef.current.x = x;
            paramsRef.current.y = y;

            gsap.to(container.current.querySelector('.js-button'), {
                clipPath: 'inset(0 0 0% 0)',
                duration: 1.5,
                ease: 'power4.inOut',
            });

            gsap.to(params, {
                duration: 1.5,
                ease: 'power4.out',
                radius: radius,
                onUpdate: () => draw(params.x, params.y, params.radius),
                onStart: () => {
                    document.documentElement.style.setProperty('overflow', 'hidden');
                    document.documentElement.style.setProperty('height', '100%');
                },
            });
        }
    }, [color]);

    useEffect(() => {
        const { offsetWidth: width, offsetHeight: height } = canvas.current;

        canvas.current.width = width;
        canvas.current.height = height;

        context.current = canvas.current.getContext('2d');

        const handleResize = e => {
            context.current.canvas.height = window.innerHeight;
            context.current.canvas.width = window.innerWidth;
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleClick = () => {
        const radius = diameter(canvas.current.width, canvas.current.height, x, y) / 2;

        paramsRef.current.radius = radius;

        gsap.to(container.current.querySelector('.js-button'), {
            clipPath: 'inset(0 0 100% 0)',
            duration: 1.5,
            ease: 'power4.inOut',
        });

        gsap.to(paramsRef.current, {
            duration: 1.5,
            ease: 'power4.out',
            radius: 0,
            onUpdate: () => {
                context.current.clearRect(0, 0, canvas.current.width, canvas.current.height);
                draw(paramsRef.current.x, paramsRef.current.y, paramsRef.current.radius);
            },
            onComplete: () => {
                setMenu(false);
                document.documentElement.style.removeProperty('overflow');
                document.documentElement.style.removeProperty('height');
            },
            onStart: () => {
                setColor(null);
            },
        });
    };

    return (
        <Container $active={menu} ref={container}>
            <Canvas ref={canvas} />
            <div className="Site-container">
                <div className="row">
                    <div className="col-2">
                        <TextInView className="js-button">
                            <button
                                type="button"
                                onClick={handleClick}
                                style={{
                                    textTransform: 'uppercase',
                                }}>
                                Quitter le menu
							</button>
                        </TextInView>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Menu;
