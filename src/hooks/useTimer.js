import { useState, useEffect, useRef } from 'react';

export const useTimer = (initialSeconds = 0, onComplete) => {
    const [totalSeconds, setTotalSeconds] = useState(initialSeconds);
    const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds);
    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    // UseRef for interval to clear it effectively
    const intervalRef = useRef(null);
    const endTimeRef = useRef(null);

    const start = (seconds) => {
        const time = seconds || totalSeconds;
        if (time <= 0) return;

        setTotalSeconds(time);
        setRemainingSeconds(time);
        setIsRunning(true);
        setIsPaused(false);

        // Calculate end time for drift-less timing
        endTimeRef.current = Date.now() + time * 1000;

        runTimer();
    };

    const runTimer = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            const now = Date.now();
            const left = Math.ceil((endTimeRef.current - now) / 1000);

            if (left <= 0) {
                clearInterval(intervalRef.current);
                setRemainingSeconds(0);
                setIsRunning(false);
                if (onComplete) onComplete();
            } else {
                setRemainingSeconds(left);
            }
        }, 100);
    };

    const pause = () => {
        if (!isRunning) return;
        clearInterval(intervalRef.current);
        setIsRunning(false);
        setIsPaused(true);
    };

    const resume = () => {
        if (!isPaused || remainingSeconds <= 0) return;
        setIsRunning(true);
        setIsPaused(false);
        // Recalculate end time based on remaining
        endTimeRef.current = Date.now() + remainingSeconds * 1000;
        runTimer();
    };

    const reset = () => {
        clearInterval(intervalRef.current);
        setIsRunning(false);
        setIsPaused(false);
        setRemainingSeconds(totalSeconds);
    };

    const stop = () => {
        clearInterval(intervalRef.current);
        setIsRunning(false);
        setIsPaused(false);
        setRemainingSeconds(0);
    };

    // Cleanup
    useEffect(() => {
        return () => clearInterval(intervalRef.current);
    }, []);

    const progress = totalSeconds > 0 ? (remainingSeconds / totalSeconds) * 100 : 0;

    // Helper formats
    const formatTime = () => {
        const hours = Math.floor(remainingSeconds / 3600);
        const mins = Math.floor((remainingSeconds % 3600) / 60);
        const secs = remainingSeconds % 60;
        return {
            display: `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`,
            hours, mins, secs
        };
    };

    return {
        totalSeconds,
        remainingSeconds,
        isRunning,
        isPaused,
        start,
        pause,
        resume,
        reset,
        stop,
        progress,
        formatTime
    };
};
