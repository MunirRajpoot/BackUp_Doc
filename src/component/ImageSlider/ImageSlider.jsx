'use client';
import React, { useRef, useState } from 'react';

const ImageSlider = ({ image1, image2, alt1 = '', alt2 = '' }) => {
    const containerRef = useRef(null);
    const [sliderPos, setSliderPos] = useState(50); // percentage

    const handleMove = (e) => {
        const bounds = containerRef.current.getBoundingClientRect();
        const clientX = e.type.includes('touch')
            ? e.touches[0].clientX
            : e.clientX;
        let newPos = ((clientX - bounds.left) / bounds.width) * 100;
        newPos = Math.max(0, Math.min(100, newPos));
        setSliderPos(newPos);
    };

    return (
        <div
            ref={containerRef}
            className="relative w-[400px] h-[350px] overflow-hidden rounded-lg cursor-ew-resize"
            onMouseMove={(e) => e.buttons === 1 && handleMove(e)}
            onTouchMove={handleMove}
        >
            {/* Background Image */}
            <img
                src={image2}
                alt={alt2}
                className="absolute top-0 left-0 w-full h-full object-contain"
            />

            {/* Foreground Image (clipped) */}
            <div
                className="absolute top-0 left-0 h-full overflow-hidden"
                style={{ width: `${sliderPos}%` }}
            >
                <img
                    src={image1}
                    alt={alt1}
                    className="w-full h-full object-contain"
                />
            </div>

            {/* Slider Bar */}
            <div
                className="absolute top-0 h-full w-[2px] bg-white z-10"
                style={{ left: `${sliderPos}%` }}
            />

            {/* Handle */}
            <div
                className="absolute top-1/2 z-20 w-5 h-5 rounded-full bg-white border border-gray-400 -translate-y-1/2 -translate-x-1/2"
                style={{ left: `${sliderPos}%` }}
                onMouseDown={(e) => e.preventDefault()} // prevent unwanted drag image
            />
        </div>
    );
};

export default ImageSlider;
