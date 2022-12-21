import { Canvas } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  OrbitControls,
  AccumulativeShadows,
} from "@react-three/drei";
import { TextGlass } from "./TextGlass";
import { Text } from "./Text";
import { useControls, button } from "leva";

export const Mesh = () => {
  const { viewMode, ...config } = useControls({
    viewMode: false,
  });
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
        <TextGlass
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
          position={[-27.5, -2, -10.25]}
          scale={3.5}
        >
          I am
        </TextGlass>
        <TextGlass
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
          position={[-2, 11.5, -12.75]}
        >
          RinGoku
        </TextGlass>
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
          position={[20, 10, 12]}
          scale={2}
          onClick={() => (window.location.href = "/aboutme")}
        >
          AboutMe
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
          position={[-40, -10, -10]}
          scale={2}
          onClick={() => (window.location.href = "/article")}
        >
          Article
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
          minAzimuthAngle={!viewMode ? 0 : undefined}
          maxAzimuthAngle={!viewMode ? 0 : undefined}
          minPolarAngle={!viewMode ? 0 : Math.PI / 3}
          maxPolarAngle={!viewMode ? 0 : Math.PI / 3}
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
            mapSize={1920}
            bias={0.0001}
          />
        </AccumulativeShadows>
      </Canvas>
    </>
  );
};
