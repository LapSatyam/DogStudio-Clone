import * as THREE from "three";
import { OrbitControls, useGLTF, useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { normalMap } from "three/tsl";

const Dog = () => {
  const model = useGLTF("./models/dog.drc.glb");

  useThree(({ camera, scene, gl }) => {
    camera.position.z = 0.42;
  });

  const texture = useTexture({
    normalMap: "./dog_normals.jpg",
  });

  model.scene.traverse((child) => {
    if (child.name.includes("DOG")) {
      child.material = new THREE.MeshMatcapMaterial({
        normalMap: texture.normalMap,
      });
    }
  });

  return (
    <>
      <primitive
        object={model.scene}
        position={[0.2, -0.55, 0]}
        rotation={[0, Math.PI / 5.5, 0]}
      />
      <directionalLight color={0xffffff} position={[0, 5, 5]} intensity={10} />
      <OrbitControls />
    </>
  );
};

export default Dog;
