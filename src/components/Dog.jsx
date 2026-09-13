import * as THREE from "three";
import { useAnimations, useGLTF, useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Dog = () => {
  gsap.registerPlugin(useGSAP());
  gsap.registerPlugin(ScrollTrigger);

  const model = useGLTF("./models/dog.drc.glb");

  useThree(({ camera, gl }) => {
    camera.position.z = 0.42;
    gl.toneMapping = THREE.ReinhardToneMapping;
    gl.outputColorSpace = THREE.SRGBColorSpace;
  });

  const { actions } = useAnimations(model.animations, model.scene);

  useEffect(() => {
    actions["Take 001"].play();
  }, [actions]);

  const [normalMap] = useTexture(["/dog_normals.jpg"]).map((texture) => {
    texture.flipY = false;
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  });

  const [branchMap, branchNormalMap] = useTexture([
    "/branches_diffuse.jpeg",
    "/branches_normals.jpeg",
  ]).map((texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  });

  const [mat2, mat8, mat9, mat10, mat12, mat13, mat19] = useTexture([
    "./matcap/mat-2.png",
    "./matcap/mat-8.png",
    "./matcap/mat-9.png",
    "./matcap/mat-10.png",
    "./matcap/mat-12.png",
    "./matcap/mat-13.png",
    "./matcap/mat-19.png",
  ]).map((texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  });

  const material = useRef({
    uMatcap1: { value: mat19 },
    uMatcap2: { value: mat2 },
    uProgress: { value: 1.0 },
  });

  const dogMaterial = new THREE.MeshMatcapMaterial({
    normalMap: normalMap,
    matcap: mat2,
  });

  const branchMaterial = new THREE.MeshMatcapMaterial({
    normalMap: branchNormalMap,
    map: branchMap,
  });

  function onBeforeCompile(shader) {
    shader.uniforms.uMatcapTexture1 = material.current.uMatcap1;
    shader.uniforms.uMatcapTexture2 = material.current.uMatcap2;
    shader.uniforms.uProgress = material.current.uProgress;

    // Store reference to shader uniforms for GSAP animation

    shader.fragmentShader = shader.fragmentShader.replace(
      "void main() {",
      `
        uniform sampler2D uMatcapTexture1;
        uniform sampler2D uMatcapTexture2;
        uniform float uProgress;

        void main() {
        `,
    );

    shader.fragmentShader = shader.fragmentShader.replace(
      "vec4 matcapColor = texture2D( matcap, uv );",
      `
          vec4 matcapColor1 = texture2D( uMatcapTexture1, uv );
          vec4 matcapColor2 = texture2D( uMatcapTexture2, uv );
          float transitionFactor  = 0.2;
          
          float progress = smoothstep(uProgress - transitionFactor,uProgress, (vViewPosition.x+vViewPosition.y)*0.5 + 0.5);

          vec4 matcapColor = mix(matcapColor2, matcapColor1, progress );
        `,
    );
  }

  dogMaterial.onBeforeCompile = onBeforeCompile;

  model.scene.traverse((child) => {
    if (child.name.includes("DOG")) {
      child.material = dogMaterial;
    } else {
      child.material = branchMaterial;
    }
  });

  const dogModel = useRef(model);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#section1",
        endTrigger: "#section3",
        start: "top top",
        end: "bottom bottom",
        scrub: 2.5,
      },
    });

    tl.to(dogModel.current.scene.position, {
      z: "-=0.78",
      y: "+=0.1",
    })
      .to(dogModel.current.scene.rotation, {
        x: `+=${Math.PI / 12}`,
      })
      .to(
        dogModel.current.scene.rotation,
        {
          y: `-=${Math.PI}`,
          x: `-=${Math.PI / 50}`,
        },
        "third",
      )
      .to(
        dogModel.current.scene.position,
        {
          x: "-=0.4",
          z: "+=0.55",
        },
        "third",
      );
  }, []);

  useEffect(() => {
    document
      .getElementById("tommorowland")
      .addEventListener("mouseenter", () => {
        material.current.uMatcap1.value = mat19;
        gsap.to(material.current.uProgress, {
          value: 0.0,
          duration: 1,
          onComplete: () => {
            material.current.uMatcap2.value = material.current.uMatcap1.value;
            material.current.uProgress.value = 1.0;
          },
        });
      });

    document.getElementById("navy").addEventListener("mouseenter", () => {
      material.current.uMatcap1.value = mat8;
      gsap.to(material.current.uProgress, {
        value: 0.0,
        duration: 1,
        onComplete: () => {
          material.current.uMatcap2.value = material.current.uMatcap1.value;
          material.current.uProgress.value = 1.0;
        },
      });
    });

    document.getElementById("msi").addEventListener("mouseenter", () => {
      material.current.uMatcap1.value = mat9;
      gsap.to(material.current.uProgress, {
        value: 0.0,
        duration: 1,
        onComplete: () => {
          material.current.uMatcap2.value = material.current.uMatcap1.value;
          material.current.uProgress.value = 1.0;
        },
      });
    });

    document.getElementById("phone").addEventListener("mouseenter", () => {
      material.current.uMatcap1.value = mat12;
      gsap.to(material.current.uProgress, {
        value: 0.0,
        duration: 1,
        onComplete: () => {
          material.current.uMatcap2.value = material.current.uMatcap1.value;
          material.current.uProgress.value = 1.0;
        },
      });
    });

    document.getElementById("kikk").addEventListener("mouseenter", () => {
      material.current.uMatcap1.value = mat10;
      gsap.to(material.current.uProgress, {
        value: 0.0,
        duration: 1,
        onComplete: () => {
          material.current.uMatcap2.value = material.current.uMatcap1.value;
          material.current.uProgress.value = 1.0;
        },
      });
    });

    document.getElementById("kennedy").addEventListener("mouseenter", () => {
      material.current.uMatcap1.value = mat8;
      gsap.to(material.current.uProgress, {
        value: 0.0,
        duration: 1,
        onComplete: () => {
          material.current.uMatcap2.value = material.current.uMatcap1.value;
          material.current.uProgress.value = 1.0;
        },
      });
    });

    document.getElementById("opera").addEventListener("mouseenter", () => {
      material.current.uMatcap1.value = mat13;
      gsap.to(material.current.uProgress, {
        value: 0.0,
        duration: 1,
        onComplete: () => {
          material.current.uMatcap2.value = material.current.uMatcap1.value;
          material.current.uProgress.value = 1.0;
        },
      });
    });

    document.getElementById("titles").addEventListener("mouseleave", () => {
      material.current.uMatcap1.value = mat2;
    });
  });

  return (
    <>
      <primitive
        object={model.scene}
        position={[0.2, -0.55, 0]}
        rotation={[0, Math.PI / 5.5, 0]}
      />
      <directionalLight color={0xffffff} position={[0, 5, 5]} intensity={10} />
      {/* <OrbitControls /> */}
    </>
  );
};

export default Dog;
