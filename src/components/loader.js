import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

import shuffle from '../utils/shuffle';

const Loader = ({ onComplete, colors }) => {
    const counterRef = useRef();
    const titleRef = useRef();
    const elRef = useRef();
    const colorsRef = useRef([]);

    useEffect(() => {
        const counter = { progress: 0 };
        const timeline = gsap.timeline({
            paused: true,
            onComplete: () => onComplete(true),
        });

        const counterWidth = counterRef.current.firstChild.getBoundingClientRect().width;
        const counterChildWidth = counterRef.current.firstChild.firstChild.getBoundingClientRect().width;

        timeline.fromTo(
            [counterRef.current.firstChild, titleRef.current.firstChild],
            {
                y: '100%',
            },
            { y: 0, duration: 0.7, stagger: 0.1 },
        );

        timeline.to(
            counter,
            {
                duration: 10,
                progress: '+=100',
                roundProps: 'progress',
                onUpdate: () =>
                    (counterRef.current.querySelector('span').innerHTML = counter.progress),
            },
            'start',
        );

        timeline.fromTo(
            counterRef.current.firstChild.firstChild,
            {
                x: 0,
            },

            { x: `${counterWidth - counterChildWidth}px`, duration: 10 },
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

        // timeline.to(
        //     shuffle(colorsRef.current),
        //     {
        //         scaleX: `${378 / 157}`,
        //         transformOrigin: 'left center',
        //         duration: 0.3,
        //     },
        // );

        // timeline.to(shuffle(colorsRef.current), { scaleX: 1, stagger: 0.1, duration: 0.6, transformOrigin: 'right center', })
        timeline.to(shuffle(colorsRef.current), { scale: 0, opacity: 0, stagger: 0.1, duration: 0.6, transformOrigin: 'center', })
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
                    <div className="row" style={{ height: '100%', alignItems: 'center' }}>
                        <div className="col-2 padding-0" style={{ overflow: 'hidden' }} ref={counterRef}>
                            <div>
                                <div style={{ display: 'inline-block' }}>
                                    100 — <span>0</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-1 padding-0" style={{ overflow: 'hidden' }} ref={titleRef}>
                            <div>MT©2020</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loader;
