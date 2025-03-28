import React, { useState, useEffect } from 'react';
import danceGif from '../assets/icegif-425.gif';

function DancingGif() {
    // Setting initial position state
    const [position, setPosition] = useState({ top: '50%', left: '50%' });

    useEffect(() => {
        const moveGif = () => {
            // Generate random positions for top and left
            const top = Math.random() * (window.innerHeight - 100);
            const left = Math.random() * (window.innerWidth - 100);

            // Update position state
            setPosition({ top: `${top}px`, left: `${left}px` });
        };

        // Set an interval to move the gif every 2 seconds
        const intervalId = setInterval(moveGif, 2000);

        // Clear interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    return (
        <img src={danceGif} alt="Dancing Gif" style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(10%, -50%)',
            width: '200px'  // Reduced size
        }} />
    );
}

export default DancingGif;
