import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTimer } from '../hooks/useTimer';

import { auth, googleProvider, db } from '../services/firebase';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';


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
    const [warRoomState, setWarRoomState] = useState(() => loadState('warRoomState', { isOpen: false, activeGuideId: null }));


    const [isDataLoaded, setIsDataLoaded] = useState(false);

    // Persistence Effects
    // User persistence is handled by Firebase Auth, removed manual local storage sync
    const saveToFirestore = (key, data) => {
        if (user && isDataLoaded) { // Only save if user is logged in AND data has been loaded from server
            setDoc(doc(db, 'users', user.uid), { [key]: data }, { merge: true }).catch(e => console.error("Sync error", e));
        }
    };

    useEffect(() => {
        localStorage.setItem('settings', JSON.stringify(settings));
        saveToFirestore('settings', settings);
    }, [settings, user, isDataLoaded]);

    useEffect(() => {
        localStorage.setItem('fastingHistory', JSON.stringify(fastingHistory));
        saveToFirestore('fastingHistory', fastingHistory);
    }, [fastingHistory, user, isDataLoaded]);

    useEffect(() => {
        localStorage.setItem('prayingHistory', JSON.stringify(prayingHistory));
        saveToFirestore('prayingHistory', prayingHistory);
    }, [prayingHistory, user, isDataLoaded]);

    useEffect(() => {
        localStorage.setItem('favoriteVerses', JSON.stringify(favoriteVerses));
        saveToFirestore('favoriteVerses', favoriteVerses);
    }, [favoriteVerses, user, isDataLoaded]);

    useEffect(() => {
        localStorage.setItem('bibleState', JSON.stringify(bibleState));
        saveToFirestore('bibleState', bibleState);
    }, [bibleState, user, isDataLoaded]);

    useEffect(() => {
        localStorage.setItem('activeFastingPlanId', JSON.stringify(activeFastingPlanId));
        saveToFirestore('activeFastingPlanId', activeFastingPlanId);
    }, [activeFastingPlanId, user, isDataLoaded]);

    useEffect(() => {
        localStorage.setItem('warRoomState', JSON.stringify(warRoomState));
        saveToFirestore('warRoomState', warRoomState);
    }, [warRoomState, user, isDataLoaded]);

    // Firestore Listener (One-way Sync Remote -> Local on login)
    useEffect(() => {
        if (!user) {
            setIsDataLoaded(false); // Reset on logout
            return;
        }
        const unsubscribe = onSnapshot(doc(db, 'users', user.uid), (doc) => {
            if (doc.exists()) {
                const data = doc.data();
                // Batch updates or individual checks
                if (data.settings) setSettings(prev => JSON.stringify(prev) !== JSON.stringify(data.settings) ? data.settings : prev);
                if (data.fastingHistory) setFastingHistory(prev => JSON.stringify(prev) !== JSON.stringify(data.fastingHistory) ? data.fastingHistory : prev);
                if (data.prayingHistory) setPrayingHistory(prev => JSON.stringify(prev) !== JSON.stringify(data.prayingHistory) ? data.prayingHistory : prev);
                if (data.favoriteVerses) setFavoriteVerses(prev => JSON.stringify(prev) !== JSON.stringify(data.favoriteVerses) ? data.favoriteVerses : prev);
                if (data.bibleState) setBibleState(prev => JSON.stringify(prev) !== JSON.stringify(data.bibleState) ? data.bibleState : prev);
                if (data.activeFastingPlanId) setActiveFastingPlanId(prev => prev !== data.activeFastingPlanId ? data.activeFastingPlanId : prev);
                if (data.warRoomState) setWarRoomState(prev => JSON.stringify(prev) !== JSON.stringify(data.warRoomState) ? data.warRoomState : prev);
                if (data.prayerRequests) setPrayerRequests(prev => JSON.stringify(prev) !== JSON.stringify(data.prayerRequests) ? data.prayerRequests : prev);
                if (data.prayerAlarms) setPrayerAlarms(prev => JSON.stringify(prev) !== JSON.stringify(data.prayerAlarms) ? data.prayerAlarms : prev);
            }
            setIsDataLoaded(true); // Mark as loaded so we can start saving changes
        }, (error) => {
            console.error("Firestore Error:", error);
            // If permission denied, likely rules not deployed or caching issue. 
            // We allow local usage by marking data as loaded effectively (or just leave it, but that blocks saving).
            // Let's set loaded to true so user can at least use app locally even if sync fails
            if (error.code === 'permission-denied') {
                console.warn("Permission denied. Ensure Firestore rules are deployed.");
            }
            setIsDataLoaded(true);
        });
        return () => unsubscribe();
    }, [user]);

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
        if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
            try {
                new Notification('SoulRoom', { body: msg, icon: '/vite.svg' });
            } catch (e) { console.warn("Notification error (mobile?)", e); }
        }
    };

    const handleTimerComplete = (msg) => {
        if (settings.sounds) playSound();
        if (settings.notifications) sendNotification(msg);
    };

    const fastingTimer = useTimer(0, () => handleTimerComplete("¡Has completado tu tiempo de ayuno!"));
    const prayerTimer = useTimer(0, () => handleTimerComplete("¡Tiempo de oración finalizado!"));

    // warRoomState persistence moved to main persistence block above


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

    // Prayer Alarms Logic
    const [prayerAlarms, setPrayerAlarms] = useState(() => loadState('prayerAlarms', {
        morning: false, // 6:00
        noon: false,    // 12:00
        evening: false, // 18:00
        custom: '',     // HH:MM
        frequency: false // Every 4h (8, 12, 16, 20)
    }));

    useEffect(() => {
        localStorage.setItem('prayerAlarms', JSON.stringify(prayerAlarms));
        saveToFirestore('prayerAlarms', prayerAlarms);
    }, [prayerAlarms, user]);

    // Check Alarms Interval
    useEffect(() => {
        const checkAlarms = () => {
            if (!settings.notifications) return; // Respect global notification setting
            if (typeof Notification === 'undefined' || Notification.permission !== 'granted') return;

            const now = new Date();
            const h = now.getHours();
            const m = now.getMinutes();
            const timeStr = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;

            // Helper to fire alarm
            const fireAlarm = (title, body) => {
                try {
                    new Notification(title, { body, icon: '/vite.svg' });
                } catch (e) { console.warn("Alarm notification error", e); }
                if (settings.sounds) playSound();
            };

            // Predefined
            if (prayerAlarms.morning && h === 6 && m === 0) fireAlarm("Hora de Oración", "¡Son las 6:00 AM! Comienza tu día con Dios.");
            if (prayerAlarms.noon && h === 12 && m === 0) fireAlarm("Hora de Oración", "¡Son las 12:00 PM! Tómate un momento para orar.");
            if (prayerAlarms.evening && h === 18 && m === 0) fireAlarm("Hora de Oración", "¡Son las 6:00 PM! Cierra tu día con gratitud.");

            // Custom
            if (prayerAlarms.custom === timeStr) fireAlarm("Alarma Personalizada", "Es tu tiempo definido para orar.");

            // Frequency (Every 4h: 8, 12, 16, 20)
            if (prayerAlarms.frequency && m === 0) {
                if ([8, 12, 16, 20].includes(h)) {
                    if (h === 12 && prayerAlarms.noon) return;
                    fireAlarm("Recordatorio de Oración", "Mantente conectado. Un momento para orar.");
                }
            }
        };

        const interval = setInterval(() => {
            checkAlarms();
        }, 60000); // Check every minute

        return () => clearInterval(interval);
        return () => clearInterval(interval);
    }, [prayerAlarms, settings.notifications, settings.sounds]);

    // Prayer Requests Logic
    const [prayerRequests, setPrayerRequests] = useState(() => loadState('prayerRequests', []));

    useEffect(() => {
        localStorage.setItem('prayerRequests', JSON.stringify(prayerRequests));
        saveToFirestore('prayerRequests', prayerRequests);
    }, [prayerRequests, user, isDataLoaded]);

    const addPrayerRequest = (text) => {
        const newRequest = {
            id: Date.now().toString(),
            text,
            createdAt: new Date().toISOString(),
            answered: false,
            answeredAt: null
        };
        setPrayerRequests(prev => [newRequest, ...prev]);
    };

    const togglePrayerRequest = (id) => {
        setPrayerRequests(prev => prev.map(req => {
            if (req.id === id) {
                return {
                    ...req,
                    answered: !req.answered,
                    answeredAt: !req.answered ? new Date().toISOString() : null
                };
            }
            return req;
        }));
    };

    const deletePrayerRequest = (id) => {
        setPrayerRequests(prev => prev.filter(req => req.id !== id));
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
        warRoomState, setWarRoomState,
        prayerAlarms, setPrayerAlarms, // Exported
        prayerRequests, addPrayerRequest, togglePrayerRequest, deletePrayerRequest
    };




    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};
