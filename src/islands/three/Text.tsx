import { useRef } from "react";
import { RGBELoader } from "three-stdlib";
import { useFrame, useLoader } from "@react-three/fiber";
import { useFBO, Center, Text3D } from "@react-three/drei";
import { MeshRefractionMaterial } from "./MeshRefractionMaterial";

export const Text = ({
  children,
  config,
  scale = 5,
  font = "/Inter_Medium_Regular.json",
  ...props
}) => {
  const fbo = useFBO(1024);
  const texture = useLoader(
    RGBELoader,
    "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/aerodynamics_workshop_1k.hdr"
  );

  let oldBg;
  useFrame((state) => {
    // Hide the outer groups contents
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
  });

  return (
    <>
      <Center scale={[0.8, 1, 1]} front top {...props}>
        <Text3D
          font={font}
          scale={3.5}
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
