import React from 'react';
import Lottie from 'react-lottie';
import animationData from '..//assets//eye.json'; // Import the Lottie animation JSON file

const EyeAnimation = ({ isVisible }) => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div className="eye-animation" style={{ width: 24, height: 24 }}>
            <Lottie options={defaultOptions} isStopped={!isVisible} />
        </div>
    );
};

export default EyeAnimation;