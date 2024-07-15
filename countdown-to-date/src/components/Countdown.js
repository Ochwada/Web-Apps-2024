import React, { useState, useEffect } from 'react';
import AnimatedBackground from './AnimatedBackground';
import flag from '../assets/croatian_flag.png'; // Make sure the image path is correct

function calculateTimeLeft(now, targetDate) {
    const difference = +targetDate - +now;
    let timeLeft = {};
    if (difference > 0) {
        timeLeft = {
            months: Math.floor(difference / (1000 * 60 * 60 * 24 * 30.44)),
            days: Math.floor((difference / (1000 * 60 * 60 * 24)) % 30.44),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / (1000 * 60)) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };
    }
    return timeLeft;
}

function Countdown() {
    const targetDate = new Date("2025-05-21");
    const [now, setNow] = useState(new Date()); // State to keep track of the current time
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(new Date(), targetDate));

    useEffect(() => {
        const timer = setInterval(() => {
            const newNow = new Date();
            setNow(newNow);
            setTimeLeft(calculateTimeLeft(newNow, targetDate));
        }, 1000);
        return () => clearInterval(timer);
    }, [targetDate]);

    const timerComponents = Object.keys(timeLeft).map((interval) => {
        if (!timeLeft[interval]) {
            return;
        }
        return (
            <div className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-500 py-2 px-4" key={interval}>
                {timeLeft[interval]} {interval.toUpperCase()}
            </div>
        );
    });

    const formatDate = (date) => {
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    };

    return (
        <div className="relative w-full h-screen bg-white">
            <AnimatedBackground />
            <div className="absolute top-0 w-full text-center p-5 bg-white">
                <div className="flex justify-center items-center mb-10">
                    <img src={flag} alt="Croatian Flag" style={{ height: '50px' }} />
                    <h1 className="text-4xl md:text-6xl text-red-600 font-bold ml-3">Time to D-Day! Get ready girls</h1>
                </div>
            </div>
            <div className="absolute top-1/3 w-full text-center">
                {timerComponents.length ? timerComponents : <span className="text-3xl md:text-5xl lg:text-7xl font-bold">Time's up!</span>}
                <div className="text-base md:text-lg lg:text-xl text-gray-400 font-medium mt-5">
                    <p>Today's Date: {formatDate(now)}</p>
                    <p>Target Date: {formatDate(targetDate)}</p>
                </div>
            </div>
        </div>
    );
}

export default Countdown;
