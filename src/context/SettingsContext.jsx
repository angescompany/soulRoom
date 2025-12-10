import React, { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
    // Helper to load state
    const loadState = (key, defaultValue) => {
        try {
            const stored = localStorage.getItem(key);
            return stored ? JSON.parse(stored) : defaultValue;
        } catch (e) {
            return defaultValue;
        }
    };

    const [settings, setSettings] = useState(() => loadState('settings', {
        darkMode: false,
        notifications: true,
        sounds: true
    }));

    // Persistence
    useEffect(() => {
        localStorage.setItem('settings', JSON.stringify(settings));
    }, [settings]);

    // Theme Effect
    useEffect(() => {
        if (settings.darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [settings.darkMode]);

    // Audio & Notification Helpers
    const playSound = () => {
        if (!settings.sounds) return;
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
        if (!settings.notifications) return;
        if (Notification.permission === 'granted') {
            new Notification('SoulRoom', { body: msg, icon: '/vite.svg' });
        }
    };

    const toggleSetting = async (key) => {
        const newValue = !settings[key];

        if (key === 'notifications' && newValue === true) {
            if ('Notification' in window) {
                if (Notification.permission !== 'granted') {
                    const permission = await Notification.requestPermission();
                    if (permission !== 'granted') {
                        alert('Debes permitir las notificaciones en tu navegador para activar esta función.');
                        return;
                    }
                }
            }
        }

        setSettings(prev => ({ ...prev, [key]: newValue }));
    };

    const value = {
        settings,
        setSettings,
        toggleSetting,
        playSound,
        sendNotification
    };

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    );
};
