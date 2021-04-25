import React, { useContext, useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';

import { AppContext } from '../provider';

import TextInView from './text-in-view';

import shuffle from '../utils/shuffle';

const Loader = ({ colors }) => {
    const { setReady, ready } = useContext(AppContext);

    const timeline = useMemo(
        () =>
            gsap.timeline({
                paused: true,
                onComplete: () => setReady(true),
                immediateRender: true,
            }),
        [setReady],
    );

    const loaderRef = useRef();
    const countdownRef = useRef();
    const colorsRef = useRef([]);

    useEffect(() => {
        const countdown = { progress: 0 };

        if (countdownRef.current) {
            timeline.set(colorsRef.current, { opacity: 1 });
            timeline.to(
                countdown,
                {
                    duration: 2,
                    progress: '+=100',
                    roundProps: 'progress',
                    onUpdate: () => (countdownRef.current.innerHTML = countdown.progress),
                },
                'start',
            );

            timeline.fromTo(
                loaderRef.current.querySelector('.js-counter'),
                {
                    x: 0,
                },

                { x: `100%`, duration: 2 },
                'start',
            );

            timeline.fromTo(
                shuffle(colorsRef.current),
                {
                    scale: 0,
                },
                {
                    scale: 1,
                    duration: 1,
                    stagger: 0.1,
                },
                'start',
            );

            timeline.to(shuffle(colorsRef.current), {
                scale: 0,
                opacity: 0,
                stagger: 0.1,
                duration: 0.6,
                transformOrigin: 'center',
            });

            timeline.fromTo(
                [...loaderRef.current.querySelectorAll('.js-text-in-view')],
                { clipPath: 'inset(0 0 0% 0)' },
                { clipPath: 'inset(0 0 100% 0)', duration: 1.5, ease: 'power4.inOut' },
                '-=1',
            );

            timeline.to(loaderRef.current, { autoAlpha: 0 });

            timeline.play();
        }
    }, [timeline]);

    return (
        <>
            {!ready && (
                <div className="Loader" ref={loaderRef}>
                    <ul className="Loader__colors">
                        {colors.slice(0, 7).map((color, index) => (
                            <li
                                className="Loader__color"
                                ref={el => (colorsRef.current[index] = el)}
                                key={color}
                                style={{
                                    color: color,
                                    left: `${Math.floor(Math.random() * 101)}%`,
                                }}></li>
                        ))}
                    </ul>
                    <div className="Loader__counter">
                        <div className="Site-container" style={{ height: '100%' }}>
                            <div className="row h-100 align-content-center">
                                <div className="col-6 col-md-2 padding-0" style={{ overflow: 'hidden' }}>
                                    <TextInView className="js-text-in-view d-inline-block js-counter">
                                        100 — <span ref={countdownRef}>0</span>
                                    </TextInView>
                                </div>
                                <div className="col-6 col-md-1 padding-0">
                                    <TextInView className="js-text-in-view d-inline-block">
                                        MT©2020
									</TextInView>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Loader;
