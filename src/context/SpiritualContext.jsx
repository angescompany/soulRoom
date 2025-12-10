import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTimer } from '../hooks/useTimer';
import { useSettings } from './SettingsContext';

const SpiritualContext = createContext();

export const useSpiritual = () => useContext(SpiritualContext);

export const SpiritualProvider = ({ children }) => {
    const { playSound, sendNotification } = useSettings();

    // Helper to load state
    const loadState = (key, defaultValue) => {
        try {
            const stored = localStorage.getItem(key);
            return stored ? JSON.parse(stored) : defaultValue;
        } catch (e) {
            return defaultValue;
        }
    };

    // --- State Definition ---
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

    // --- Persistence Effects ---
    useEffect(() => localStorage.setItem('fastingHistory', JSON.stringify(fastingHistory)), [fastingHistory]);
    useEffect(() => localStorage.setItem('prayingHistory', JSON.stringify(prayingHistory)), [prayingHistory]);
    useEffect(() => localStorage.setItem('favoriteVerses', JSON.stringify(favoriteVerses)), [favoriteVerses]);
    useEffect(() => localStorage.setItem('bibleState', JSON.stringify(bibleState)), [bibleState]);
    useEffect(() => localStorage.setItem('activeFastingPlanId', JSON.stringify(activeFastingPlanId)), [activeFastingPlanId]);
    useEffect(() => localStorage.setItem('warRoomState', JSON.stringify(warRoomState)), [warRoomState]);

    // --- Actions ---
    const addFastingEntry = (duration) => {
        const entry = { date: new Date().toISOString(), duration };
        setFastingHistory(prev => [entry, ...prev]);
        setActiveFastingPlanId(null);
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

    const clearSpiritualData = () => {
        setFastingHistory([]);
        setPrayingHistory([]);
        setFavoriteVerses([]);
        setActiveFastingPlanId(null);
        // Note: We don't clear localStorage manually here if we rely on the effects to sync "[]", 
        // but explicit clear might be safer for "Reset App". 
        // For now, let's trust the state updates to sync empty arrays.
    };

    // --- Timers ---
    const handleTimerComplete = (msg) => {
        playSound();
        sendNotification(msg);
    };

    const fastingTimer = useTimer(0, () => handleTimerComplete("¡Has completado tu tiempo de ayuno!"));
    const prayerTimer = useTimer(0, () => handleTimerComplete("¡Tiempo de oración finalizado!"));

    const value = {
        fastingHistory, addFastingEntry,
        prayingHistory, addPrayingEntry,
        favoriteVerses, toggleFavoriteVerse,
        bibleState, setBibleState,
        activeFastingPlanId, setActiveFastingPlanId,
        warRoomState, setWarRoomState,
        fastingTimer,
        prayerTimer,
        clearSpiritualData
    };

    return (
        <SpiritualContext.Provider value={value}>
            {children}
        </SpiritualContext.Provider>
    );
};
