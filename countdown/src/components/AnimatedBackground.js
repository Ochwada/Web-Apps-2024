import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function MovingCube() {
    const mesh = useRef();
    const [opacity, setOpacity] = useState(1); // Start fully opaque
    const speedX = useRef(Math.random() * 0.02 - 0.01);
    const speedY = useRef(Math.random() * 0.02 - 0.01);
    const speedZ = useRef(Math.random() * 0.02 - 0.01);
    const fadingOut = useRef(true); // Start by fading out

    useEffect(() => {
        mesh.current.position.set(Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5);
    }, []);

    useFrame(() => {
        // Rotate the cube
        mesh.current.rotation.x += speedX.current;
        mesh.current.rotation.y += speedY.current;
        mesh.current.rotation.z += speedZ.current;

        // Adjust opacity for the vanishing effect
        if (fadingOut.current) {
            setOpacity(prev => Math.max(prev - 0.005, 0)); // Decrease opacity
        } else {
            setOpacity(prev => Math.min(prev + 0.005, 1)); // Increase opacity
        }

        // When fully transparent or opaque, switch direction
        if (opacity <= 0) {
            fadingOut.current = false; // Start fading in
        } else if (opacity >= 0.7) {
            fadingOut.current = true; // Start fading out
        }
    });

    return (
        <mesh ref={mesh}>
            <boxGeometry args={[2, 2, 2]} />
            <meshBasicMaterial color="red" wireframe opacity={opacity} transparent={true} />
        </mesh>
    );
}

function AnimatedBackground() {
    return (
        <Canvas style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} />
            {Array.from({ length: 20 }, (_, i) => <MovingCube key={i} />)}
        </Canvas>
    );
}

export default AnimatedBackground;
