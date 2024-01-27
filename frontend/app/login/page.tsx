"use client"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import * as THREE from 'three'
import { useRef, useCallback, useState } from 'react'
import { Canvas, useLoader, useFrame } from '@react-three/fiber'
import { Center, Text3D } from '@react-three/drei'
import { Bloom, EffectComposer, LUT } from '@react-three/postprocessing'
import { LUTCubeLoader } from 'postprocessing'
import { Beam } from './../components/Beam'
import { Rainbow } from './../components/Rainbow'
import { Prism } from './../components/Prism'
import { Flare } from './../components/Flare'
import { Box } from './../components/Box'
import { calculateRefractionAngle, lerp, lerpV3 } from '../utils'

import dynamic from 'next/dynamic'

const LutCube = dynamic(() => import('../cube'), {
  ssr: false,
})

// import { buttonVariants } from "@/registry/new-york/ui/button"
import { UserAuthForm } from "./user-auth-form"

// export const metadata: Metadata = {
//   title: "Authentication",
//   description: "Authentication forms built using the components.",
// }

export default function AuthenticationPage() {
  return (
    <>
      <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        
        <div className="relative w-full h-full hidden flex-col bg-muted p-10 text-white dark:border-r lg:flex">

          <div className="absolute inset-0 bg-black" />
          <div className="absolute inset-0 h-full w-full">
            <Canvas orthographic gl={{ antialias: false }} camera={{ position: [0, 0, 100], zoom: 70 }}>
              <color attach="background" args={['black']} />
              <Scene />
              <EffectComposer disableNormalPass>
                <Bloom mipmapBlur levels={9} intensity={1.5} luminanceThreshold={1} luminanceSmoothing={1} />
                <LutCube />
                {/* <LUT lut={texture} /> */}
              </EffectComposer>
            </Canvas>
          </div> 
          <div className="relative z-20 flex items-center text-lg font-medium">
          <svg className="mr-2" width="24" height="30" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.5265 0.000784679C5.98416 0.0693812 1.50731 4.5886 1.50731 10.1471V22.7638C0.595941 23.3989 0 24.4547 0 25.6507C0 27.5939 1.57301 29.1669 3.51617 29.1669C5.45929 29.1669 7.03233 27.5939 7.03233 25.6507C7.03233 24.4728 6.45429 23.4309 5.56616 22.7929V10.1471C5.56616 6.77826 8.28557 4.05884 11.6544 4.05884H13.8529C17.2218 4.05884 19.9412 6.77826 19.9412 10.1471C19.9412 13.5159 17.2218 16.2353 13.8529 16.2353H13.6726C13.0325 15.3681 12.0032 14.806 10.8416 14.806C8.8985 14.806 7.32546 16.379 7.32546 18.3222C7.32546 20.2653 8.8985 21.8383 10.8416 21.8383C12.0537 21.8383 13.1218 21.2263 13.7539 20.2942H13.8529C19.4541 20.2942 24 15.7483 24 10.1471C24 4.5459 19.4541 0 13.8529 0H11.5265V0.000784679Z" fill="white"/>
          </svg> Pocketup
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Nobody cares what you did yesterday. <br></br>
                What have you done today to better yourself? &rdquo;
              </p>
              <footer className="text-sm">David Goggins</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Login
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account.
              </p>
            </div>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By using our service, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  )
}


function Scene() {
  const [isPrismHit, hitPrism] = useState(false)
  const flare = useRef(null)
  const ambient = useRef(null)
  const spot = useRef(null)
  const boxreflect = useRef(null)
  const rainbow = useRef(null)

  const rayOut = useCallback(() => hitPrism(false), [])
  const rayOver = useCallback((e) => {
    // Break raycast so the ray stops when it touches the prism
    e.stopPropagation()
    hitPrism(true)
    // Set the intensity really high on first contact
    rainbow.current.material.speed = 1
    rainbow.current.material.emissiveIntensity = 20
  }, [])

  const vec = new THREE.Vector3()
  const rayMove = useCallback(({ api, position, direction, normal }) => {
    if (!normal) return
    // Extend the line to the prisms center
    vec.toArray(api.positions, api.number++ * 3)
    // Set flare
    flare.current.position.set(position.x, position.y, -0.5)
    flare.current.rotation.set(0, 0, -Math.atan2(direction.x, direction.y))
    // Calculate refraction angles
    let angleScreenCenter = Math.atan2(-position.y, -position.x)
    const normalAngle = Math.atan2(normal.y, normal.x)
    // The angle between the ray and the normal
    const incidentAngle = angleScreenCenter - normalAngle
    // Calculate the refraction for the incident angle
    const refractionAngle = calculateRefractionAngle(incidentAngle) * 6
    // Apply the refraction
    angleScreenCenter += refractionAngle
    rainbow.current.rotation.z = angleScreenCenter
    // Set spot light
    lerpV3(spot.current.target.position, [Math.cos(angleScreenCenter), Math.sin(angleScreenCenter), 0], 0.05)
    spot.current.target.updateMatrixWorld()
  }, [])

  useFrame((state) => {
    // Tie beam to the mouse
    boxreflect.current.setRay([(state.pointer.x * state.viewport.width) / 2, (state.pointer.y * state.viewport.height) / 2, 0], [0, 0, 0])
    // Animate rainbow intensity
    lerp(rainbow.current.material, 'emissiveIntensity', isPrismHit ? 2.5 : 0, 0.1)
    spot.current.intensity = rainbow.current.material.emissiveIntensity
    // Animate ambience
    lerp(ambient.current, 'intensity', 0, 0.025)
  })

  return (
    <>
      {/* Lights */}
      <ambientLight ref={ambient} intensity={0} />
      <pointLight position={[10, -10, 0]} intensity={0.05} />
      <pointLight position={[0, 10, 0]} intensity={0.05} />
      <pointLight position={[-10, 0, 0]} intensity={0.05} />
      <spotLight ref={spot} intensity={1} distance={7} angle={1} penumbra={1} position={[0, 0, 1]} />
      {/* Caption */}
      <Center top bottom position={[0, 2, 0]}>
        <Text3D size={0.7} letterSpacing={-0.05} height={0.05} font="/fonts/Inter_Bold.json">
          
          <meshStandardMaterial color="white" />
        </Text3D>
      </Center>
      {/* Prism + blocks + reflect beam */}
      <Beam ref={boxreflect} bounce={10} far={20}>
        <Prism position={[0, -0.5, 0]} onRayOver={rayOver} onRayOut={rayOut} onRayMove={rayMove} />
        <Box position={[2.25, -3.5, 0]} rotation={[0, 0, Math.PI / 3.5]} />
        <Box position={[-2.5, -2.5, 0]} rotation={[0, 0, Math.PI / 4]} />
        <Box position={[-3, 1, 0]} rotation={[0, 0, Math.PI / 4]} />
      </Beam>
      {/* Rainbow and flares */}
      <Rainbow ref={rainbow} startRadius={0} endRadius={0.5} fade={0} />
      <Flare ref={flare} visible={isPrismHit} renderOrder={10} scale={1.25} streak={[12.5, 20, 1]} />
    </>
  )
}
