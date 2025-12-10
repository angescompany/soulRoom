import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTimer } from '../hooks/useTimer';

import { auth, googleProvider } from '../services/firebase';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';


const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
    // Initial State loading from localStorage
    const loadState = (key, defaultValue) => {
        try {
            const stored = localStorage.getItem(key);
            return stored ? JSON.parse(stored) : defaultValue;
        } catch (e) {
            console.error(`Error loading ${key}`, e);
            return defaultValue;
        }
    };

    const [user, setUser] = useState(null);

    // Auth Listener
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser({
                    name: currentUser.displayName,
                    email: currentUser.email,
                    avatar: currentUser.photoURL,
                    uid: currentUser.uid,
                    joinDate: currentUser.metadata.creationTime
                });
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);

    const [settings, setSettings] = useState(() => loadState('settings', {
        darkMode: false,
        notifications: true,
        sounds: true
    }));

    const [fastingHistory, setFastingHistory] = useState(() => loadState('fastingHistory', []));
    const [prayingHistory, setPrayingHistory] = useState(() => loadState('prayingHistory', []));
    const [favoriteVerses, setFavoriteVerses] = useState(() => loadState('favoriteVerses', []));
    const [bibleState, setBibleState] = useState(() => loadState('bibleState', {
        version: 'web',
        book: 'genesys',
        chapter: '1',
        fontSize: 18
    }));
    const [activeFastingPlanId, setActiveFastingPlanId] = useState(() => loadState('activeFastingPlanId', null));

    // Persistence Effects
    // User persistence is handled by Firebase Auth, removed manual local storage sync
    useEffect(() => localStorage.setItem('settings', JSON.stringify(settings)), [settings]);
    useEffect(() => localStorage.setItem('fastingHistory', JSON.stringify(fastingHistory)), [fastingHistory]);
    useEffect(() => localStorage.setItem('prayingHistory', JSON.stringify(prayingHistory)), [prayingHistory]);
    useEffect(() => localStorage.setItem('favoriteVerses', JSON.stringify(favoriteVerses)), [favoriteVerses]);
    useEffect(() => localStorage.setItem('bibleState', JSON.stringify(bibleState)), [bibleState]);
    useEffect(() => localStorage.setItem('activeFastingPlanId', JSON.stringify(activeFastingPlanId)), [activeFastingPlanId]);

    // Theme Effect
    useEffect(() => {
        if (settings.darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [settings.darkMode]);

    // Actions
    const addFastingEntry = (duration) => {
        const entry = { date: new Date().toISOString(), duration };
        setFastingHistory(prev => [entry, ...prev]);
        setActiveFastingPlanId(null); // Clear plan on completion
    };

    const addPrayingEntry = (duration) => {
        const entry = { date: new Date().toISOString(), duration };
        setPrayingHistory(prev => [entry, ...prev]);
    };

    const toggleFavoriteVerse = (verse) => {
        setFavoriteVerses(prev => {
            const exists = prev.some(v => v.reference === verse.reference);
            if (exists) return prev.filter(v => v.reference !== verse.reference);
            return [...prev, verse];
        });
    };

    const clearAllData = () => {
        localStorage.clear();
        setFastingHistory([]);
        setPrayingHistory([]);
        setFavoriteVerses([]);
        setActiveFastingPlanId(null);
        // Reload to reset defaults completely or just set states
        window.location.reload();
    };

    // Global Timer for Fasting (lifted state)
    // Audio & Notification Helpers
    const playSound = () => {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.frequency.setValueAtTime(440, ctx.currentTime);
            osc.type = 'sine';
            osc.start();
            gain.gain.setValueAtTime(0.1, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.5);
            osc.stop(ctx.currentTime + 0.5);
        } catch (e) {
            console.error("Audio error", e);
        }
    };

    const sendNotification = (msg) => {
        if (Notification.permission === 'granted') {
            new Notification('SoulRoom', { body: msg, icon: '/vite.svg' });
        }
    };

    const handleTimerComplete = (msg) => {
        if (settings.sounds) playSound();
        if (settings.notifications) sendNotification(msg);
    };

    const fastingTimer = useTimer(0, () => handleTimerComplete("¡Has completado tu tiempo de ayuno!"));
    const prayerTimer = useTimer(0, () => handleTimerComplete("¡Tiempo de oración finalizado!"));
    const [warRoomState, setWarRoomState] = useState(() => loadState('warRoomState', { isOpen: false, activeGuideId: null }));

    useEffect(() => localStorage.setItem('warRoomState', JSON.stringify(warRoomState)), [warRoomState]);

    const login = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error("Login Error:", error);
            alert("Error al iniciar sesión: " + error.message);
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null); // Explicit clear
            // clearAllData(); // Uncomment if logout should wipe layout settings
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };

    const value = {
        user, setUser, login, logout,
        settings, setSettings,
        fastingHistory, addFastingEntry,
        prayingHistory, addPrayingEntry,
        favoriteVerses, toggleFavoriteVerse,
        bibleState, setBibleState,
        clearAllData,
        fastingTimer, // Exported Globally
        activeFastingPlanId, setActiveFastingPlanId,
        prayerTimer,
        warRoomState, setWarRoomState
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};
