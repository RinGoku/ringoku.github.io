import { useRef } from "react";
import { RGBELoader } from "three-stdlib";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  useFBO,
  Center,
  Text3D,
  Instance,
  Instances,
  Environment,
  Lightformer,
  OrbitControls,
  RandomizedLight,
  AccumulativeShadows,
} from "@react-three/drei";
import { MeshRefractionMaterial } from "./MeshRefractionMaterial";

export const Mesh = () => {
  return (
    <>
      <Canvas
        shadows
        orthographic
        camera={{ position: [10, 20, 20], zoom: 20 }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <color attach="background" args={["#f2f2f5"]} />
        {/** The text and the grid */}
        <Text
          config={{
            clearcoat: 1,
            clearcoatRoughness: 0.25,
            uRefractPower: 0.25,
            uTransparent: 0.25,
            uIntensity: 1.3,
            uNoise: 0.03,
            uSat: 1,
            uColor: "#e26686",
            gColor: "#ff7a7a",
            shadow: "#80446c",
            autoRotate: false,
          }}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -1, 2.25]}
        >
          Sakou
        </Text>
        <Text
          config={{
            clearcoat: 0,
            clearcoatRoughness: 0.25,
            uRefractPower: 0.25,
            uTransparent: 0.25,
            uIntensity: 1.3,
            uNoise: 0.03,
            uSat: 1,
            uColor: "#e26686",
            gColor: "#ff7a7a",
            shadow: "#80446c",
            autoRotate: false,
          }}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[-10, 10, 12]}
          onClick={() => (window.location.href = "/aboutme")}
        >
          AboutMe
        </Text>
        {/** Controls */}
        <OrbitControls
          autoRotate={false}
          autoRotateSpeed={-0.1}
          zoomSpeed={0.25}
          minZoom={20}
          maxZoom={140}
          enablePan={false}
          dampingFactor={0.05}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 3}
        />
        <Environment resolution={32}>
          <group rotation={[-Math.PI / 2, 0, 0]}>
            <Lightformer
              intensity={10}
              rotation-x={Math.PI / 2}
              position={[0, 5, -9]}
              scale={[10, 10, 1]}
            />
            <Lightformer
              intensity={4}
              rotation-y={Math.PI / 2}
              position={[-5, 1, -1]}
              scale={[10, 2, 1]}
            />
            <Lightformer
              intensity={20}
              rotation-y={Math.PI / 2}
              position={[-5, -1, -1]}
              scale={[10, 2, 1]}
            />
            <Lightformer
              intensity={10}
              rotation-y={-Math.PI / 2}
              position={[10, 1, 0]}
              scale={[20, 2, 1]}
            />
            <Lightformer
              type="ring"
              intensity={10}
              rotation-y={Math.PI / 2}
              position={[-0.1, -1, -5]}
              scale={10}
            />
          </group>
        </Environment>
        {/** Soft shadows */}
        <AccumulativeShadows
          temporal
          color="#492891"
          frames={100}
          colorBlend={5}
          toneMapped={true}
          alphaTest={0.9}
          opacity={1}
          scale={30}
          position={[0, -1.01, 0]}
        >
          <ambientLight
            shadow="#80446c"
            intensity={1}
            position={[0, 10, -10]}
            size={15}
            mapSize={1024}
            bias={0.0001}
          />
        </AccumulativeShadows>
      </Canvas>
    </>
  );
};

// const Grid = ({ number = 23, lineWidth = 0.026, height = 0.5 }) => (
//   // Renders a grid and crosses as instances
//   <Instances position={[0, -1.02, 0]}>
//     <planeGeometry args={[lineWidth, height]} />
//     <meshBasicMaterial color="#999" />
//     {Array.from({ length: number }, (_, y) =>
//       Array.from({ length: number }, (_, x) => (
//         <group
//           key={x + ":" + y}
//           position={[
//             x * 2 - Math.floor(number / 2) * 2,
//             -0.01,
//             y * 2 - Math.floor(number / 2) * 2,
//           ]}
//         >
//           <Instance rotation={[-Math.PI / 2, 0, 0]} />
//           <Instance rotation={[-Math.PI / 2, 0, Math.PI / 2]} />
//         </group>
//       ))
//     )}
//     <gridHelper args={[100, 100, "#bbb", "#bbb"]} position={[0, -0.01, 0]} />
//   </Instances>
// );

const Text = ({
  children,
  config,
  scale = 5,
  font = "/Inter_Medium_Regular.json",
  ...props
}) => {
  const ref = useRef();
  const fbo = useFBO(1024);
  const texture = useLoader(
    RGBELoader,
    "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/aerodynamics_workshop_1k.hdr"
  );

  let oldBg;
  useFrame((state) => {
    // Hide the outer groups contents
    ref.current.visible = false;
    // Set render target to the local buffer
    state.gl.setRenderTarget(fbo);
    // Save the current background and set the HDR as the new BG
    // This is what creates the reflections
    oldBg = state.scene.background;
    state.scene.background = texture;
    // Render into the buffer
    state.gl.render(state.scene, state.camera);
    // Set old state back
    state.scene.background = oldBg;
    state.gl.setRenderTarget(null);
    ref.current.visible = true;
  });

  return (
    <>
      <group ref={ref}>
        <Center scale={[0.8, 1, 1]} front top {...props}>
          <Text3D
            castShadow
            bevelEnabled
            font={font}
            scale={5}
            letterSpacing={-0.03}
            height={0.25}
            bevelSize={0.01}
            bevelSegments={10}
            curveSegments={128}
            bevelThickness={0.01}
          >
            {children}
            {/** Pass the rendered buffer into the refraction shader */}
            <MeshRefractionMaterial uSceneTex={fbo.texture} {...config} />
          </Text3D>
        </Center>
        {/* <Grid /> */}
      </group>
      {/** Double up the text as a flat layer at the bottom for more interesting refraction */}
      <Center scale={[0.8, 1, 1]} front top {...props}>
        <Text3D
          font={font}
          scale={5}
          letterSpacing={-0.03}
          height={0.01}
          curveSegments={32}
        >
          {children}
          <meshBasicMaterial color={config.gColor} />
        </Text3D>
      </Center>
    </>
  );
};
