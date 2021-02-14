import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

import TextInView from './text-in-view';

import shuffle from '../utils/shuffle';

const Loader = ({ onComplete, colors }) => {
    const counterRef = useRef();
    const currentRef = useRef();
    const elRef = useRef();
    const colorsRef = useRef([]);

    useEffect(() => {
        const counter = { progress: 0 };
        const timeline = gsap.timeline({
            paused: true,
            onComplete: () => onComplete(true),
        });

        const counterWidth = counterRef.current.getBoundingClientRect().width;
        const counterChildWidth = counterRef.current.firstChild.getBoundingClientRect().width;

        timeline.to(
            counter,
            {
                duration: 2,
                progress: '+=100',
                roundProps: 'progress',
                onUpdate: () =>
                    (currentRef.current.innerHTML = counter.progress),
            },
            'start',
        );

        timeline.fromTo(
            counterRef.current.firstChild,
            {
                x: 0,
            },

            { x: `${counterWidth - counterChildWidth}px`, duration: 2 },
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
        timeline.to(elRef.current, { autoAlpha: 0 });

        timeline.play();
    }, [onComplete, counterRef]);

    return (
        <div className="Loader" ref={elRef}>
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
                        <div
                            className="col-2 padding-0"
                            style={{ overflow: 'hidden' }}
                        >
                            <div ref={counterRef}>
                                <TextInView className="d-inline-block">
                                    100 — <span ref={currentRef}>0</span>
                                </TextInView>
                            </div>
                        </div>
                        <div className="col-1 padding-0">
                            <TextInView>MT©2020</TextInView>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loader;
