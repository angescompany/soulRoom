import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaPlay, FaPause, FaUndo, FaCheck, FaDungeon, FaBell, FaTrash } from 'react-icons/fa';
import { useTimer } from '../../../hooks/useTimer';
import { useAppContext } from '../../../context/AppContext';
import TimerDisplay from '../../Shared/TimerDisplay';
import WarRoom from '../../WarRoom/WarRoom';

const Prayer = () => {
    const [activeModal, setActiveModal] = useState(null); // 'alarms', 'requests', 'focus'
    const {
        prayerTimer: timer,
        warRoomState,
        setWarRoomState,
        prayerAlarms,
        setPrayerAlarms,
        addPrayingEntry,
        prayerRequests,
        addPrayerRequest,
        togglePrayerRequest,
        deletePrayerRequest
    } = useAppContext();
    const [newRequestText, setNewRequestText] = useState('');
    const location = useLocation();
    const [customMinutes, setCustomMinutes] = useState('');

    // Notification Permission State
    const [perm, setPerm] = useState(typeof Notification !== 'undefined' ? Notification.permission : 'default');

    const [showFocusAlert, setShowFocusAlert] = useState(false);
    const [dontShowAgain, setDontShowAgain] = useState(false);

    const requestPermission = () => {
        if (typeof Notification === 'undefined') return;
        Notification.requestPermission().then(permission => {
            setPerm(permission);
        });
    };

    const toggleAlarm = (key) => {
        if (typeof Notification !== 'undefined' && Notification.permission !== 'granted') requestPermission();
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

    const handleAddRequest = (e) => {
        e.preventDefault();
        if (!newRequestText.trim()) return;
        addPrayerRequest(newRequestText);
        setNewRequestText('');
    };

    const activeRequests = prayerRequests.filter(req => !req.answered);

    return (
        <>
            <div className="active-window" style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <header style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <h1>Oración</h1>
                </header>

                <div className="timer-section" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <TimerDisplay
                        time={timer.formatTime()}
                        progress={timer.progress}
                        totalSeconds={timer.totalSeconds}
                    />

                    {/* Timer Running View - Show Active Requests */}
                    {timer.isRunning && activeRequests.length > 0 && (
                        <div className="active-requests-carousel" style={{ marginTop: '20px', padding: '0 20px', marginBottom: '40px' }}>
                            <p style={{ textAlign: 'center', opacity: 0.7, fontSize: '0.9rem', marginBottom: '10px' }}>Intercede por:</p>
                            <div className="glass-card" style={{ padding: '15px', display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '150px', overflowY: 'auto' }}>
                                {activeRequests.map(req => (
                                    <div key={req.id} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)' }}></div>
                                        <span style={{ fontSize: '0.95rem' }}>{req.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="timer-controls" style={{ marginTop: 'auto', marginBottom: '30px', padding: '0 20px' }}>
                        {!timer.isRunning && !timer.isPaused ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                    {/* Alarms Button */}
                                    <button
                                        className="glass-card"
                                        onClick={() => setActiveModal('alarms')}
                                        style={{ padding: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer', border: prayerAlarms.morning || prayerAlarms.noon || prayerAlarms.evening || prayerAlarms.frequency ? '1px solid var(--accent)' : '1px solid rgba(255,255,255,0.1)' }}
                                    >
                                        <FaBell size={20} color={prayerAlarms.morning || prayerAlarms.noon || prayerAlarms.evening || prayerAlarms.frequency ? 'var(--accent)' : 'white'} />
                                        <span style={{ fontSize: '0.9rem', color: '#fff' }}>Alarmas</span>
                                    </button>

                                    {/* Requests Button */}
                                    <button
                                        className="glass-card"
                                        onClick={() => setActiveModal('requests')}
                                        style={{ padding: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                                    >
                                        <FaCheck size={20} color="white" />
                                        <span style={{ fontSize: '0.9rem', color: '#fff' }}>Peticiones</span>
                                    </button>
                                </div>

                                {/* Custom Time Input & Presets */}
                                <div className="glass-card" style={{ padding: '15px' }}>
                                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '15px' }}>
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
                                            <FaPlay size={12} />
                                        </button>
                                    </div>
                                </div>

                                {/* War Room Button */}
                                <button
                                    onClick={initiateWarRoom}
                                    className="glass-card"
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '15px',
                                        padding: '15px',
                                        background: 'linear-gradient(45deg, rgba(157, 80, 187, 0.2), rgba(0,0,0,0))',
                                        border: '1px solid rgba(157, 80, 187, 0.4)',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <div style={{ background: 'var(--accent)', padding: '10px', borderRadius: '10px', color: '#000' }}>
                                        <FaDungeon size={20} />
                                    </div>
                                    <div style={{ textAlign: 'left' }}>
                                        <h3 style={{ fontSize: '1rem', marginBottom: '2px', color: '#fff' }}>Cuarto de Guerra</h3>
                                        <p style={{ fontSize: '0.75rem', margin: 0, opacity: 0.8 }}>Modo inmersivo</p>
                                    </div>
                                </button>

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
                </div>
            </div>

            {/* --- Modals --- */}

            {/* ALARMS MODAL */}
            {activeModal === 'alarms' && (
                <Modal onClose={() => setActiveModal(null)} title="Configurar Frecuencia">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                        {perm !== 'granted' && perm !== 'denied' && (
                            <div style={{ padding: '10px', background: 'rgba(255, 193, 7, 0.2)', borderRadius: '8px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <span>Habilita notificaciones.</span>
                                <button onClick={requestPermission} style={{ textDecoration: 'underline', background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>Activar</button>
                            </div>
                        )}

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                            <AlarmToggle label="6 AM" active={prayerAlarms?.morning} onClick={() => toggleAlarm('morning')} />
                            <AlarmToggle label="12 PM" active={prayerAlarms?.noon} onClick={() => toggleAlarm('noon')} />
                            <AlarmToggle label="6 PM" active={prayerAlarms?.evening} onClick={() => toggleAlarm('evening')} />
                        </div>

                        <div className="glass-card" style={{ padding: '15px' }}>
                            <label style={{ fontSize: '0.9rem', display: 'block', marginBottom: '8px' }}>Hora Personalizada</label>
                            <input
                                type="time"
                                className="custom-input"
                                value={prayerAlarms?.custom || ''}
                                onChange={handleCustomAlarmChange}
                            />
                        </div>

                        <div className="glass-card" style={{ padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ fontSize: '1rem' }}>Frecuente</span>
                                <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>Avisar cada 4 horas</span>
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

                        <button className="btn-primary" onClick={() => setActiveModal(null)} style={{ width: '100%', marginTop: '10px' }}>Guardar</button>
                    </div>
                </Modal>
            )}

            {/* REQUESTS MODAL */}
            {activeModal === 'requests' && (
                <Modal onClose={() => setActiveModal(null)} title="Peticiones de Oración">
                    {/* Add New */}
                    <form onSubmit={handleAddRequest} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                        <input
                            type="text"
                            className="custom-input"
                            placeholder="Nueva petición..."
                            value={newRequestText}
                            onChange={(e) => setNewRequestText(e.target.value)}
                        />
                        <button type="submit" className="btn-primary" style={{ borderRadius: '12px', padding: '0 20px' }}>+</button>
                    </form>

                    <div style={{ maxHeight: '300px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {prayerRequests.length === 0 && (
                            <p style={{ textAlign: 'center', opacity: 0.5, padding: '20px' }}>No tienes peticiones activas.</p>
                        )}
                        {prayerRequests.map(req => (
                            <div key={req.id} className="glass-card" style={{ padding: '15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', opacity: req.answered ? 0.6 : 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flex: 1 }}>
                                    <button
                                        onClick={() => togglePrayerRequest(req.id)}
                                        style={{
                                            width: '24px', height: '24px', borderRadius: '50%',
                                            border: '2px solid var(--accent)', background: req.answered ? 'var(--accent)' : 'transparent',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: 0
                                        }}
                                    >
                                        {req.answered && <FaCheck size={12} color="#000" />}
                                    </button>
                                    <span style={{ textDecoration: req.answered ? 'line-through' : 'none', fontSize: '0.95rem' }}>{req.text}</span>
                                </div>
                                <button onClick={() => deletePrayerRequest(req.id)} style={{ background: 'none', border: 'none', color: '#ff4757', cursor: 'pointer', opacity: 0.5 }}>
                                    <FaTrash />
                                </button>
                            </div>
                        ))}
                    </div>
                </Modal>
            )}

            {/* FOCUS ALERT COMPONENT (Previously Implemented) */}
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

            {/* WAR ROOM (Previously Implemented) */}
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

// --- Helpers ---

const Modal = ({ title, children, onClose }) => (
    <div style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(0,0,0,0.8)',
        backdropFilter: 'blur(5px)',
        zIndex: 3000,
        display: 'flex',
        alignItems: 'flex-end', // Bottom sheet style for mobile
        justifyContent: 'center'
    }}>
        <div className="glass-card" style={{
            width: '100%', maxWidth: '500px',
            borderBottomLeftRadius: 0, borderBottomRightRadius: 0,
            borderRadius: '25px 25px 0 0',
            padding: '25px',
            animation: 'slideUp 0.3s ease-out'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.2rem' }}>{title}</h3>
                <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '30px', height: '30px', color: '#fff', cursor: 'pointer' }}>×</button>
            </div>
            {children}
        </div>
    </div>
);

const AlarmToggle = ({ label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`btn-secondary ${active ? 'active' : ''}`}
        style={{
            background: active ? 'var(--accent)' : 'rgba(255,255,255,0.05)',
            color: active ? '#000' : '#fff',
            border: active ? 'none' : '1px solid rgba(255,255,255,0.1)',
            fontSize: '0.9rem',
            padding: '15px 10px',
            borderRadius: '12px',
            cursor: 'pointer'
        }}
    >
        {label}
    </button>
);

export default Prayer;
