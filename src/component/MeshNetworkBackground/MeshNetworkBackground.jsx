'use client'
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Preload } from '@react-three/drei';
import * as THREE from 'three';

function NetworkPoints() {
    const ref = useRef();

    const positions = new Float32Array(
        Array.from({ length: 1500 }, () => (Math.random() - 0.5) * 10)
    );

    useFrame(() => {
        ref.current.rotation.y += 0.001;
    });

    return (
        <group rotation={[0, 0, 0]}>
            <Points ref={ref} positions={positions}>
                <PointMaterial
                    transparent
                    color="#1447ff"  // Light Blue (you can also try "#007bff" or "#1e90ff")
                    size={0.04}      // Slightly larger to look like glowing stars
                    sizeAttenuation
                    depthWrite={false}
                />
            </Points>
        </group>
    );
}

export default function MeshNetworkBackground() {
    return (
        <Canvas
            camera={{ position: [0, 0, 5], fov: 75 }}
            style={{ position: 'absolute', top: 0, left: 0, zIndex: -1 }}
        >
            <ambientLight intensity={0.5} />
            <NetworkPoints />
            <Preload all />
        </Canvas>
    );
}
