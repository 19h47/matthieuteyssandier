import React, { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';

import TextInView from './text-in-view';

import shuffle from '../utils/shuffle';

const Loader = ({ onComplete, colors }) => {
    // const [counterWidth, setcounterWidth] = useState(0);
    // const [counterChildWidth, setcounterChildWidth] = useState(0);

    const timeline = useMemo(() => gsap.timeline({
        paused: true, onComplete: () => onComplete(true),
        immediateRender: true,
    }), []);

    const loaderRef = useRef();
    const countdownRef = useRef();
    const colorsRef = useRef([]);

    useEffect(() => {
        const countdown = { progress: 0 };

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

        // timeline.fromTo(
        //     counterChildNode.current,
        //     {
        //         x: 0,
        //     },

        //     { x: `${counterWidth - counterChildWidth}px`, duration: 2 },
        //     'start',
        // );

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

        timeline.to(loaderRef.current, { autoAlpha: 0 });

        timeline.play();
    }, [onComplete]);

    return (
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
                        <div className="col-2 padding-0" style={{ overflow: 'hidden' }}>
                            <TextInView className="d-inline-block">
                                100 — <span ref={countdownRef}>0</span>
                            </TextInView>
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
