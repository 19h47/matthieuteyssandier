import React, { useRef, useContext, useEffect, useMemo } from 'react';
import { gsap } from 'gsap';

import { Container, TextInView, Ul } from './style';
import { AppContext } from '../../provider';
import MenuItem from '../MenuItem';
import CanvasMenu from '../CanvasMenu';

const Menu = ({ caseStudies }) => {
    const container = useRef();
    const { color, setColor, menu, setMenu } = useContext(AppContext);
    const timeline = useMemo(() => gsap.timeline({ paused: true, immediateRender: true }), []);

    const handleClick = () => {
        setColor(null);
        setMenu(false);
    };

    const close = () => {
        timeline.to(container.current.querySelector('.js-button'), {
            clipPath: 'inset(0 0 100% 0)',
            duration: 1.5,
            ease: 'power4.inOut',
        });

        timeline.set(container.current, { delay: 2, autoAlpha: 0 });

        timeline.play();
    };

    useEffect(() => {
        if (!menu) {
            close();
        }
    }, [menu]);

    useEffect(() => {
        if (color) {
            gsap.set(container.current, { autoAlpha: 1 });
            gsap.to(container.current.querySelector('.js-button'), {
                clipPath: 'inset(0 0 0% 0)',
                duration: 1.5,
                ease: 'power4.inOut',
            });
        }
    }, [color]);

    return (
        <Container $active={menu} ref={container}>
            <CanvasMenu />
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
