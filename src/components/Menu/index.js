import React, { useRef, useContext, useEffect } from 'react';
import { gsap } from 'gsap';

import { Container, Canvas, TextInView, Ul } from './style';
import { AppContext } from '../../provider';
import MenuItem from '../MenuItem';

const diameter = (w, h, x, y) => {
    const width = Math.max(w - x, x) * 2;
    const height = Math.max(h - y, y) * 2;
    const diameter = Math.sqrt(width * width + height * height);
    return diameter;
};

const Menu = ({ caseStudies }) => {
    const context = useRef(null);
    const canvas = useRef();
    const container = useRef();
    const {
        position: { x, y },
        color,
        setColor,
        menu,
        setMenu,
    } = useContext(AppContext);
    const paramsRef = useRef({ x: 0, y: 0, radius: 0 });

    const draw = (x, y, radius) => {
        context.current.fillStyle = color;
        context.current.beginPath();
        context.current.ellipse(x, y, radius, radius, Math.PI, 0, 2 * Math.PI);
        context.current.fill();
    };

    const close = () => {
        const radius = diameter(canvas.current.width, canvas.current.height, x, y) / 2;
        const tl = gsap.timeline({ paused: true, immediateRender: true });

        paramsRef.current.radius = radius;

        tl.to(container.current.querySelector('.js-button'), {
            clipPath: 'inset(0 0 100% 0)',
            duration: 1.5,
            ease: 'power4.inOut',
        });

        tl.to(
            paramsRef.current,
            {
                duration: 1,
                ease: 'power4.out',
                radius: 0,
                onUpdate: () => {
                    context.current.clearRect(0, 0, canvas.current.width, canvas.current.height);
                    draw(paramsRef.current.x, paramsRef.current.y, paramsRef.current.radius);
                },
                onComplete: () => {
                    document.documentElement.style.removeProperty('overflow');
                    document.documentElement.style.removeProperty('height');
                },
            },
        );
        tl.set(container.current, { autoAlpha: 0 });

        tl.play();
    };

    const handleClick = () => {
        setMenu(false);
        setColor(null);
    }

    useEffect(() => {
        if (!menu) {
            close();
        }
    }, [menu])

    useEffect(() => {
        console.log(color);
        if (color) {
            const radius = diameter(canvas.current.width, canvas.current.height, x, y) / 2;
            const params = {
                x: x,
                y: y,
                radius: 0,
            };

            paramsRef.current.x = x;
            paramsRef.current.y = y;

            gsap.set(container.current, { autoAlpha: 1 });
            gsap.to(container.current.querySelector('.js-button'), {
                clipPath: 'inset(0 0 0% 0)',
                duration: 1.5,
                ease: 'power4.inOut',
            });

            gsap.to(params, {
                duration: 1.5,
                ease: 'power4.inOut',
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
        console.log('Menu');
        const { offsetWidth: width, offsetHeight: height } = canvas.current;

        canvas.current.width = width;
        canvas.current.height = height;

        context.current = canvas.current.getContext('2d');
    }, []);

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

            <Ul>
                {caseStudies.map(caseStudy => (
                    <MenuItem key={caseStudy.node.id} caseStudy={caseStudy.node} />
                ))}
            </Ul>
        </Container>
    );
};

export default Menu;
