import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const NumberCounter = ({ targetNumber }) => {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const { ref, inView } = useInView({ triggerOnce: true });

    useEffect(() => {
        if (inView) {
            setIsVisible(true);
        }
    }, [inView]);

    useEffect(() => {
        let start = 0;
        const end = targetNumber;
        const duration = 1000; // Change as needed
        const stepTime = Math.abs(Math.floor(duration / (end - start)));

        if (isVisible) {
            const timer = setInterval(() => {
                start += 1;
                setCount(start);
                if (start === end) {
                    clearInterval(timer);
                }
            }, stepTime);
            return () => clearInterval(timer);
        }
    }, [isVisible, targetNumber]);

    return (
        <div className='inline-block' ref={ref}>
            <span>{count}</span>
        </div>
    );
};

export default NumberCounter;