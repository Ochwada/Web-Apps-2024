import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function Box() {
    return (
        <mesh rotation={[90, 0, 20]}>
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial color="royalblue" />
        </mesh>
    );
}

function Scene() {
    return (
        <Canvas>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Box />
            <OrbitControls />
        </Canvas>
    );
}

export default Scene;
