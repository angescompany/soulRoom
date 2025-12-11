import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaPlay, FaPause, FaUndo, FaCheck, FaDungeon, FaBell } from 'react-icons/fa';
import { useTimer } from '../../../hooks/useTimer';
import { useAppContext } from '../../../context/AppContext';
import TimerDisplay from '../../Shared/TimerDisplay';
import WarRoom from '../../WarRoom/WarRoom';

const Prayer = () => {
    const { addPrayingEntry, prayerTimer: timer, warRoomState, setWarRoomState, prayerAlarms, setPrayerAlarms } = useAppContext();
    const location = useLocation();
    const [customMinutes, setCustomMinutes] = useState('');

    // Notification Permission State
    const [perm, setPerm] = useState(Notification.permission);

    const [showFocusAlert, setShowFocusAlert] = useState(false);
    const [dontShowAgain, setDontShowAgain] = useState(false);

    const requestPermission = () => {
        Notification.requestPermission().then(permission => {
            setPerm(permission);
        });
    };

    const toggleAlarm = (key) => {
        if (Notification.permission !== 'granted') requestPermission();
        setPrayerAlarms(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleCustomAlarmChange = (e) => {
        setPrayerAlarms(prev => ({ ...prev, custom: e.target.value }));
    };

    const initiateWarRoom = () => {
        const isHidden = localStorage.getItem('hideWarRoomAlert');
        if (isHidden === 'true') {
            enterWarRoom();
        } else {
            setShowFocusAlert(true);
        }
    };

    const enterWarRoom = () => {
        if (dontShowAgain) {
            localStorage.setItem('hideWarRoomAlert', 'true');
        }
        setShowFocusAlert(false);
        if (!timer.isRunning) handlePreset(30); // Only start if not running
        setTimeout(() => setWarRoomState(prev => ({ ...prev, isOpen: true })), 100);
    };

    // Handle deep linking to War Room
    useEffect(() => {
        if (location.state && location.state.openWarRoom) {
            setWarRoomState(prev => ({
                ...prev,
                isOpen: true,
                activeGuideId: location.state.guideId || prev.activeGuideId
            }));

            // Ensure timer is running if entering via deep link
            if (!timer.isRunning) handlePreset(30);
        }
    }, [location.state]);

    const onComplete = () => {
        alert("Tiempo de Oración Completado!");
        addPrayingEntry(timer.totalSeconds);
    };

    const handlePreset = (minutes) => {
        timer.start(minutes * 60);
    };

    const handleCustomStart = () => {
        const m = parseInt(customMinutes);
        if (m > 0) {
            timer.start(m * 60);
        }
    };

    return (
        <>
            <div className="active-window">
                <header style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <h1>Oración</h1>
                </header>

                <div className="timer-section">
                    <TimerDisplay
                        time={timer.formatTime()}
                        progress={timer.progress}
                        totalSeconds={timer.totalSeconds}
                    />

                    <div className="timer-controls" style={{ marginTop: '30px', marginBottom: '30px' }}>
                        {!timer.isRunning && !timer.isPaused ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                {/* War Room Card */}
                                <button
                                    onClick={initiateWarRoom}
                                    className="glass-card"
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '15px',
                                        padding: '20px',
                                        background: 'linear-gradient(45deg, rgba(157, 80, 187, 0.2), rgba(0,0,0,0))',
                                        border: '1px solid rgba(157, 80, 187, 0.4)',
                                        cursor: 'pointer',
                                        textAlign: 'left'
                                    }}
                                >
                                    <div style={{ background: 'var(--accent)', padding: '12px', borderRadius: '12px', color: '#000' }}>
                                        <FaDungeon size={24} />
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: '1.1rem', marginBottom: '2px', color: '#fff' }}>Cuarto de Guerra</h3>
                                        <p style={{ fontSize: '0.8rem', margin: 0 }}>Modo inmersivo • 30m</p>
                                    </div>
                                </button>

                                {/* Standard Controls */}
                                <div className="glass-card">
                                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '20px' }}>
                                        <button className="btn-secondary" onClick={() => handlePreset(15)}>15m</button>
                                        <button className="btn-secondary" onClick={() => handlePreset(30)}>30m</button>
                                        <button className="btn-secondary" onClick={() => handlePreset(60)}>1h</button>
                                    </div>

                                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                        <input
                                            type="number"
                                            placeholder="Minutos"
                                            className="custom-input"
                                            value={customMinutes}
                                            onChange={(e) => setCustomMinutes(e.target.value)}
                                        />
                                        <button className="btn-primary" onClick={handleCustomStart} style={{ padding: '12px', borderRadius: '12px' }}>
                                            <FaCheck />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                                <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                                    {timer.isRunning ? (
                                        <button className="btn-secondary" onClick={timer.pause} style={{ width: '60px', height: '60px', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <FaPause />
                                        </button>
                                    ) : (
                                        <button className="btn-primary" onClick={timer.resume} style={{ width: '60px', height: '60px', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <FaPlay />
                                        </button>
                                    )}
                                    <button className="btn-secondary" onClick={timer.reset} style={{ width: '60px', height: '60px', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <FaUndo />
                                    </button>
                                </div>

                                {!warRoomState.isOpen && (
                                    <button className="btn-text" onClick={initiateWarRoom} style={{ color: 'var(--accent)', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <FaDungeon /> Entrar al Cuarto de Guerra
                                    </button>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Prayer Alarms Section */}
                    {/* Only show when not in timer mode, or always? User request didn't specify, but better to keep UI clean. 
                        Let's keep it visible since user might want to set alarm while praying or checking app.
                        However, usually timer-controls takes space. 
                    */}
                    <div className="glass-card">
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '15px', color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <FaBell /> Alarmas de Oración
                        </h3>

                        {perm !== 'granted' && perm !== 'denied' && (
                            <div style={{ marginBottom: '15px', padding: '10px', background: 'rgba(255, 193, 7, 0.2)', borderRadius: '8px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <span>Habilita notificaciones para recibir las alarmas.</span>
                                <button onClick={requestPermission} style={{ textDecoration: 'underline', background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>Activar</button>
                            </div>
                        )}

                        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                            <AlarmToggle label="6 AM" active={prayerAlarms?.morning} onClick={() => toggleAlarm('morning')} />
                            <AlarmToggle label="12 PM" active={prayerAlarms?.noon} onClick={() => toggleAlarm('noon')} />
                            <AlarmToggle label="6 PM" active={prayerAlarms?.evening} onClick={() => toggleAlarm('evening')} />
                        </div>

                        <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <label style={{ fontSize: '0.9rem', minWidth: '80px' }}>Personalizada:</label>
                            <input
                                type="time"
                                className="custom-input"
                                style={{ flex: 1 }}
                                value={prayerAlarms?.custom || ''}
                                onChange={handleCustomAlarmChange}
                            />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '15px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ fontSize: '1rem' }}>Recordatorio Frecuente</span>
                                <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>Avisar cada 4 horas (día)</span>
                            </div>
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={prayerAlarms?.frequency || false}
                                    onChange={() => toggleAlarm('frequency')}
                                />
                                <span className="slider round"></span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Focus Alert Modal */}
            {showFocusAlert && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.8)',
                    zIndex: 2000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px'
                }}>
                    <div className="glass-card" style={{ maxWidth: '400px', width: '100%', textAlign: 'center' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '10px' }}>⚔️</div>
                        <h2 style={{ marginBottom: '10px' }}>Entrando al Cuarto de Guerra</h2>
                        <p style={{ marginBottom: '20px' }}>Estás a punto de entrar en un tiempo de enfoque total. Cierra distracciones, apaga notificaciones.</p>

                        <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', gap: '10px', alignItems: 'center' }}>
                            <input
                                type="checkbox"
                                id="dontShow"
                                checked={dontShowAgain}
                                onChange={(e) => setDontShowAgain(e.target.checked)}
                            />
                            <label htmlFor="dontShow" style={{ fontSize: '0.9rem', opacity: 0.8 }}>No volver a mostrar</label>
                        </div>

                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                            <button className="btn-secondary" onClick={() => setShowFocusAlert(false)}>Cancelar</button>
                            <button className="btn-primary" onClick={enterWarRoom}>Entrar</button>
                        </div>
                    </div>
                </div>
            )}

            {/* War Room Overlay */}
            {warRoomState.isOpen && (
                <WarRoom
                    timer={timer}
                    onClose={() => setWarRoomState(prev => ({ ...prev, isOpen: false }))}
                    initialGuideId={warRoomState.activeGuideId}
                    onGuideSelect={(id) => setWarRoomState(prev => ({ ...prev, activeGuideId: id }))}
                />
            )}
        </>
    );
};

// Helper Component for Alarm Toggles
const AlarmToggle = ({ label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`btn-secondary ${active ? 'active' : ''}`}
        style={{
            flex: 1,
            margin: '0 5px',
            background: active ? 'var(--accent)' : 'rgba(255,255,255,0.1)',
            color: active ? '#000' : '#fff',
            border: active ? 'none' : '1px solid rgba(255,255,255,0.2)',
            fontSize: '0.9rem',
            padding: '10px'
        }}
    >
        {label}
    </button>
);

export default Prayer;
