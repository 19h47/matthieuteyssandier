import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Loader = ({ onComplete }) => {
    const counterRef = useRef();
    const elRef = useRef();

    useEffect(() => {
        const counter = { progress: 0 };
        const timeline = gsap.timeline({
            paused: true,
            onComplete: () => onComplete(true),
        });

        timeline.to(counter, {
            duration: 10,
            progress: '+=100',
            roundProps: 'progress',
            onUpdate: () => (counterRef.current.innerHTML = counter.progress),
        });

        timeline.to(elRef.current, { duration: 0.3, autoAlpha: 0 });

        timeline.play();
    }, [onComplete]);

    return (
        <div className="Loader" ref={elRef}>
            <div className="Site-container" style={{ height: '100%' }}>
                <div className="row" style={{ height: '100%', alignItems: 'center' }}>
                    <div
                        className="col-3"
                        style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            100 — <span ref={counterRef}>0</span>
                        </div>{' '}
						MT©2020
					</div>
                </div>
            </div>
        </div>
    );
};

export default Loader;
