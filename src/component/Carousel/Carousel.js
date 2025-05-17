'use client';
import Image from 'next/image';
import { useState } from 'react';

const Carousel = ({ results, showAnalyzed, zoom, rotation }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? results.length - 1 : prevIndex - 1
        );
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === results.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <div className="w-full h-96 relative flex items-center justify-center">
            <Image
                src={`${process.env.NEXT_PUBLIC_SERVER_URL}${showAnalyzed ? results[currentIndex]?.file_path : results[currentIndex]?.image_url}`}
                alt={`Image ${currentIndex + 1}`}
                className="max-w-full max-h-full object-contain rounded-xl transition-transform duration-300 shadow-lg"
                style={{
                    transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
                }}
            />
            <button
                onClick={prevSlide}
                className="absolute left-2 bg-gray-800 text-white p-2 rounded hover:bg-gray-700"
            >
                &#8592;
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-2 bg-gray-800 text-white p-2 rounded hover:bg-gray-700"
            >
                &#8594;
            </button>
        </div>
    );
};

export default Carousel;
