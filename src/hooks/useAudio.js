import { useState, useEffect, useRef } from 'react';

// Firebase Storage URLs for audio files
const hebrewMusicFile = 'https://firebasestorage.googleapis.com/v0/b/soulroom-74c97.firebasestorage.app/o/Fondo%20Musical%20para%20orar.mp3?alt=media';
const shofarMusicFile = 'https://firebasestorage.googleapis.com/v0/b/soulroom-74c97.firebasestorage.app/o/Shofar%20guerra%20espiritual.mp3?alt=media&token=95900420-b89a-467f-bff3-2b2dd7936edb';

export const useAudio = () => {
    const audioCtxRef = useRef(null);
    const gainNodeRef = useRef(null);
    const sourceRef = useRef(null);
    const htmlAudioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(null);
    const [volume, setVolume] = useState(0.5);

    const initAudio = () => {
        if (!audioCtxRef.current) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            audioCtxRef.current = new AudioContext();
            gainNodeRef.current = audioCtxRef.current.createGain();
            gainNodeRef.current.connect(audioCtxRef.current.destination);
        }
        if (audioCtxRef.current.state === 'suspended') {
            audioCtxRef.current.resume();
        }
    };

    const stop = (reset = true) => {
        if (gainNodeRef.current) {
            gainNodeRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.1);
        }

        setTimeout(() => {
            if (sourceRef.current) {
                if (sourceRef.current.stop) sourceRef.current.stop();
                if (sourceRef.current.disconnect) sourceRef.current.disconnect();
                sourceRef.current = null;
            }
        }, 200);

        if (reset) {
            setIsPlaying(false);
            setCurrentTrack(null);
        }
    };

    const playRain = () => {
        const ctx = audioCtxRef.current;
        const bufferSize = 2 * ctx.sampleRate;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            data[i] = (white + white) / 2;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 800;

        noise.connect(filter);
        filter.connect(gainNodeRef.current);
        noise.start();

        return noise;
    };

    const playAmbientPad = () => {
        const ctx = audioCtxRef.current;
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const osc3 = ctx.createOscillator();

        osc1.type = 'sine'; osc1.frequency.value = 130.81; // C3
        osc2.type = 'sine'; osc2.frequency.value = 196.00; // G3
        osc3.type = 'sine'; osc3.frequency.value = 293.66; // D4

        const padGain = ctx.createGain();
        padGain.gain.value = 0.3;

        osc1.connect(padGain);
        osc2.connect(padGain);
        osc3.connect(padGain);
        padGain.connect(gainNodeRef.current);

        osc1.start();
        osc2.start();
        osc3.start();

        return {
            stop: () => { osc1.stop(); osc2.stop(); osc3.stop(); },
            disconnect: () => { padGain.disconnect(); }
        };
    };

    const playDrone = () => {
        const ctx = audioCtxRef.current;
        const osc = ctx.createOscillator();
        osc.type = 'triangle';
        osc.frequency.value = 55.00;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 200;

        const lfo = ctx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.value = 0.5;
        const lfoGain = ctx.createGain();
        lfoGain.gain.value = 100;

        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);

        osc.connect(filter);
        filter.connect(gainNodeRef.current);

        osc.start();
        lfo.start();

        return {
            stop: () => { osc.stop(); lfo.stop(); },
            disconnect: () => { filter.disconnect(); }
        };
    };

    const playShofar = () => {
        const audio = new Audio(shofarMusicFile);
        audio.loop = true;
        audio.volume = volume;
        htmlAudioRef.current = audio;
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => console.log('Audio play was prevented:', error));
        }
        return {
            stop: () => { audio.pause(); audio.currentTime = 0; },
            disconnect: () => { audio.src = ''; }
        };
    };

    const playHebrew = () => {
        const audio = new Audio(hebrewMusicFile);
        audio.loop = true;
        audio.volume = volume;
        htmlAudioRef.current = audio;
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => console.log('Audio play was prevented:', error));
        }
        return {
            stop: () => { audio.pause(); audio.currentTime = 0; },
            disconnect: () => { audio.src = ''; }
        };
    };

    const playTrack = (type) => {
        // Toggle off if same track
        if (currentTrack === type) {
            stop();
            return;
        }

        // Stop HTML audio if playing
        if (htmlAudioRef.current) {
            htmlAudioRef.current.pause();
            htmlAudioRef.current.currentTime = 0;
            htmlAudioRef.current = null;
        }

        // Stop Web Audio sources
        if (sourceRef.current) {
            if (sourceRef.current.stop) sourceRef.current.stop();
            if (sourceRef.current.disconnect) sourceRef.current.disconnect();
            sourceRef.current = null;
        }

        let source;
        if (type === 'shofar') {
            source = playShofar();
        } else if (type === 'hebrew') {
            source = playHebrew();
        }

        if (source) {
            sourceRef.current = source;
            setIsPlaying(true);
            setCurrentTrack(type);
        }
    };

    // Watch volume changes and apply them
    useEffect(() => {
        if (gainNodeRef.current && audioCtxRef.current) {
            gainNodeRef.current.gain.setValueAtTime(volume, audioCtxRef.current.currentTime);
        }
        if (htmlAudioRef.current) {
            htmlAudioRef.current.volume = volume;
        }
    }, [volume]);

    const setVolumeLevel = (val) => {
        setVolume(val);
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (audioCtxRef.current) audioCtxRef.current.close();
            if (htmlAudioRef.current) {
                htmlAudioRef.current.pause();
                htmlAudioRef.current = null;
            }
        };
    }, []);

    return {
        isPlaying,
        currentTrack,
        playTrack,
        stop,
        volume,
        setVolume: setVolumeLevel
    };
};
