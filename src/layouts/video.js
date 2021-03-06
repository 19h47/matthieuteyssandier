import React, { useState, useRef } from 'react';

import TextInView from '../components/text-in-view';
import Play from '../assets/play.inline.svg';

const LayoutVideo = ({ data, color }) => {
    const { video, caption } = data;
    const videoRef = useRef(null);
    const [play, setPlay] = useState(false);

    const handlePlay = state => {
        setPlay(state);

        state ? videoRef.current.play() : videoRef.current.pause();
    };

    return (
        <>
            {video && (
                <div className="Layout Layout--video">
                    <div className="Site-container">
                        <div className="row d-flex">
                            <div className="col-12 col-md-8 offset-md-2">
                                <div className="Video">
                                    <button
                                        className="Video__overlay"
                                        onClick={() => handlePlay(true)}
                                        style={{
                                            backgroundColor: color,
                                            opacity: play ? '0' : '1',
                                            visibility: play ? 'hidden' : 'visible',
                                        }}>
                                        <span>
                                            Lecture
											<Play />
                                        </span>
                                    </button>
                                    <video
                                        ref={videoRef}
                                        controls
                                        muted
                                        playsInline
                                        src={video.localFile.url}
                                        style={{ verticalAlign: 'middle' }}
                                        onPlay={() => handlePlay(true)}
                                        onPause={() => handlePlay(false)}
                                    />
                                </div>
                                {caption && (
                                    <TextInView>
                                        <p className="Layout__caption">{caption}</p>
                                    </TextInView>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default LayoutVideo;
