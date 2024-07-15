import React, { useState, useEffect } from 'react';
import AnimatedBackground from './AnimatedBackground';
import flag from '../assets/croatian_flag.png'; // Make sure the path is correct based on your project structure

function calculateTimeLeft() {
    const now = new Date();
    const targetDate = new Date("2025-05-21");
    const difference = +targetDate - +now;

    let timeLeft = {};
    if (difference > 0) {
        const months = Math.floor(difference / (1000 * 60 * 60 * 24 * 30.44));
        const days = Math.floor((difference / (1000 * 60 * 60 * 24)) % 30.44);
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        timeLeft = {
            months,
            days,
            hours,
            minutes,
            seconds,
        };
    }

    return timeLeft;
}

function Countdown() {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });

    const timerComponents = Object.keys(timeLeft).map((interval) => {
        if (!timeLeft[interval]) {
            return;
        }

        return (
            <div className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-500" key={interval}>
                {timeLeft[interval]} {interval.toUpperCase()}
            </div>
        );
    });

    return (
        <div className="relative w-full h-screen bg-white">
            <AnimatedBackground />
            <div className="absolute top-0 w-full text-center p-5 bg-white">
                <div className="flex justify-center items-center">
                    <img src={flag} alt="Croatian Flag" style={{ height: '50px' }} />
                    <h1 className="text-4xl md:text-6xl text-red-600 font-bold ml-3">Time to D-Day! Get ready girls</h1>
                </div>
            </div>
            <div className="absolute top-1/2 w-full text-center">
                {timerComponents.length ? timerComponents : <span className="text-3xl md:text-5xl lg:text-7xl font-bold">Time's up!</span>}
            </div>
        </div>
    );
}

export default Countdown;
