import { Canvas } from "@react-three/fiber";
import Dog from "./components/Dog"; 

const App = () => { 

  return (
    <>
      <main className="relative">
        <Canvas
         className="h-screen! w-screen fixed! top-0 left-0 -z-1 bg-[url('./bg.png')] bg-cover">
          <Dog />
        </Canvas>
        <section id="secrion1"></section>
        <section></section>
        <section id="section3" ></section>
      </main>
    </>
  );
};

export default App;
