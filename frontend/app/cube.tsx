"use client";

import { LUTCubeLoader } from 'postprocessing'
import { Bloom, EffectComposer, LUT } from '@react-three/postprocessing'
import { Canvas, useLoader, useFrame } from '@react-three/fiber'

export default function Cube() {   
    const texture = useLoader(LUTCubeLoader, '/lut/F-6800-STD.cube')

    return (
        <LUT lut={texture} />
    )
}