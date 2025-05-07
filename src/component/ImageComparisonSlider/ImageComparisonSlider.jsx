import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

export default function ImageComparisonSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const bounds = containerRef.current.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const percentage = (x / bounds.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  const handleTouchMove = (e) => {
    if (!containerRef.current) return;
    const bounds = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - bounds.left;
    const percentage = (x / bounds.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-4xl mx-auto h-[400px] overflow-hidden rounded-xl shadow-xl border border-gray-700"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >

      <Image
        src="/images/image 7.png"
        alt="Before Image"
        layout="fill"
        objectFit="cover"
      />

      {/* Left Image (before) with clipping */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        {/* Right Image (after) */}
        <Image
          src="/images/image 8.png"
          alt="After Image"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
        />
      </div>

      {/* Slider bar */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-col-resize"
        style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black text-white text-xs px-1 py-0.5 rounded">
          X
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-2 left-2 bg-gray-800 text-white text-sm px-2 py-1 rounded">
        Before
      </div>
      <div className="absolute top-2 right-2 bg-red-600 text-white text-sm px-2 py-1 rounded">
        After
      </div>
    </div>
  );
}
