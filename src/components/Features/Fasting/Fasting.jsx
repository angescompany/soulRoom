import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlay, FaPause, FaUndo, FaCheck, FaLink, FaShieldAlt, FaHeartbeat, FaHome, FaRing, FaHandHoldingHeart, FaTimes } from 'react-icons/fa';
import { useTimer } from '../../../hooks/useTimer';
import { useAppContext } from '../../../context/AppContext';
import TimerDisplay from '../../Shared/TimerDisplay';

const FASTING_PLANS = [
    {
        id: 'isaiah58',
        title: 'El Rompimiento (Isaías 58)',
        description: 'Rompe yugos de opresión.',
        icon: <FaLink />,
        color: '#ff9800',
        schedule: [
            {
                percent: 0,
                type: 'start',
                text: 'Inicio: Consagra este tiempo.',
                modalContent: 'Padre, te doy gracias por este día. Te presento este ayuno de rompimiento delante de Ti. Pido Tu fortaleza para romper todo yugo de opresión y guía en este momento. En el nombre de Jesús.'
            },
            { percent: 20, type: 'reading', ref: 'Isaías 58', book: 'Isaías', bookId: 'isaiah', chapter: 58, text: 'Lee: "¿Es este el ayuno...?"' },
            { percent: 40, type: 'prayer', focus: 'Libertad', warRoomId: 'custom', guide: 'Pide perdón por la indiferencia.' },
            {
                percent: 100,
                type: 'end',
                text: 'Victoria: ¡Tu luz despuntará!',
                modalContent: 'Padre, entrego este ayuno confiando en tu voluntad buena, agradable y perfecta. Declaro que mi luz despuntará como el alba y mi sanidad se dejará ver pronto. Amén.'
            }
        ]
    },
    {
        id: 'esther',
        title: 'Favor y Protección (Ester)',
        description: 'Intercesión por causas difíciles.',
        icon: <FaShieldAlt />,
        color: '#e91e63',
        schedule: [
            {
                percent: 0,
                type: 'start',
                text: 'Inicio: "Si perezco, que perezca".',
                modalContent: 'Padre, vengo ante Ti buscando Tu favor. Te presento este ayuno te pido fortaleza y estrategia divina. Que se extienda el cetro de Tu gracia sobre mi petición.'
            },
            { percent: 30, type: 'reading', ref: 'Ester 4', book: 'Ester', bookId: 'esther', chapter: 4, text: 'Lee el llamado a la intercesión.' },
            { percent: 60, type: 'prayer', focus: 'Favor', warRoomId: 'protection', guide: 'Ora para hallar gracia ante el Rey.' },
            {
                percent: 100,
                type: 'end',
                text: 'Cierre: El cetro de favor.',
                modalContent: 'Padre, entrego este ayuno confiando en tu voluntad buena, agradable y perfecta. Recibo Tu favor y protección sobre mi vida y circunstancias. Amén.'
            }
        ]
    },
    {
        id: 'health',
        title: 'Salud y Sanidad',
        description: 'Por sanidad física y espiritual.',
        icon: <FaHeartbeat />,
        color: '#4caf50',
        schedule: [
            {
                percent: 0,
                type: 'start',
                text: 'Inicio: Entrega tu cuerpo.',
                modalContent: 'Padre, te doy gracias por mi vida. Te presento mi cuerpo y salud en este ayuno. Pido Tu fortaleza sanadora y guía en este proceso de restauración.'
            },
            { percent: 30, type: 'reading', ref: 'Isaías 53', book: 'Isaías', bookId: 'isaiah', chapter: 53, text: 'Por sus llagas fuimos curados.' },
            { percent: 60, type: 'prayer', focus: 'Sanidad', warRoomId: 'health', guide: 'Declara restauración total.' },
            {
                percent: 100,
                type: 'end',
                text: 'Cierre: Recibe nueva fuerza.',
                modalContent: 'Padre, entrego este ayuno confiando en tu voluntad buena, agradable y perfecta. Declaro sanidad completa sobre mi cuerpo, alma y espíritu. Amén.'
            }
        ]
    },
    {
        id: 'family',
        title: 'Familia y Hogar',
        description: 'Paz y protección en casa.',
        icon: <FaHome />,
        color: '#2196f3',
        schedule: [
            {
                percent: 0,
                type: 'start',
                text: 'Inicio: Invita a Dios.',
                modalContent: 'Padre, te doy gracias por mi familia. Te presento este ayuno por mi hogar. Pido Tu fortaleza, unión y guía para que Tú reines en nuestra casa.'
            },
            { percent: 30, type: 'reading', ref: 'Josué 24', book: 'Josué', bookId: 'joshua', chapter: 24, text: 'Yo y mi casa serviremos a Jehová.' },
            { percent: 60, type: 'prayer', focus: 'Unidad', warRoomId: 'family', guide: 'Rompe toda división familiar.' },
            {
                percent: 100,
                type: 'end',
                text: 'Cierre: Tu hogar es un altar.',
                modalContent: 'Padre, entrego este ayuno confiando en tu voluntad buena, agradable y perfecta. Consagro mi hogar a Ti; que Tu paz reine en cada rincón. Amén.'
            }
        ]
    },
    {
        id: 'marriage',
        title: 'Matrimonio y Unidad',
        description: 'Restauración y amor.',
        icon: <FaRing />,
        color: '#9c27b0',
        schedule: [
            {
                percent: 0,
                type: 'start',
                text: 'Inicio: Renueva tu pacto.',
                modalContent: 'Padre, te presento mi matrimonio. Pido Tu fortaleza para amar como Tú amas y Tu guía para restaurar cualquier brecha. Bendice nuestra unión.'
            },
            { percent: 30, type: 'reading', ref: 'Efesios 5', book: 'Efesios', bookId: 'ephesians', chapter: 5, text: 'Someteos unos a otros en amor.' },
            { percent: 60, type: 'prayer', focus: 'Amor', warRoomId: 'marriage', guide: 'Ora por el corazón de tu cónyuge.' },
            {
                percent: 100,
                type: 'end',
                text: 'Cierre: Cordón de tres dobleces.',
                modalContent: 'Padre, entrego este ayuno confiando en tu voluntad buena, agradable y perfecta. Que nuestro matrimonio sea un reflejo de Tu amor y fidelidad. Amén.'
            }
        ]
    },
    {
        id: 'forgiveness',
        title: 'Perdón y Libertad',
        description: 'Soltar ofensas y sanar.',
        icon: <FaHandHoldingHeart />,
        color: '#00bcd4',
        schedule: [
            {
                percent: 0,
                type: 'start',
                text: 'Inicio: Decide soltar la carga.',
                modalContent: 'Padre, decido perdonar. Te presento este ayuno para limpiar mi corazón. Pido Tu fortaleza para soltar toda ofensa y Tu guía hacia la libertad.'
            },
            { percent: 30, type: 'reading', ref: 'Mateo 6', book: 'Mateo', bookId: 'matthew', chapter: 6, text: 'Si perdonáis, seréis perdonados.' },
            { percent: 60, type: 'prayer', focus: 'Perdón', warRoomId: 'forgiveness', guide: 'Bendice a quien te ofendió.' },
            {
                percent: 100,
                type: 'end',
                text: 'Cierre: Eres libre.',
                modalContent: 'Padre, entrego este ayuno confiando en tu voluntad buena, agradable y perfecta. Recibo Tu paz y declaro mi corazón libre de toda amargura. Amén.'
            }
        ]
    }
];

const Fasting = () => {
    // Consume Global Timer
    // Consume Global Timer
    const { addFastingEntry, fastingTimer: timer, activeFastingPlanId, setActiveFastingPlanId } = useAppContext();
    const navigate = useNavigate();
    const [customHours, setCustomHours] = useState('');

    // Derive selected plan from global state
    const selectedPlan = FASTING_PLANS.find(p => p.id === activeFastingPlanId);

    const [showPlanSelector, setShowPlanSelector] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    // Effect to handle completion notification if needed
    // Assuming the global timer sets isRunning=false when done.
    // We can check if it just finished. 
    // unique logic for "just finished" might need a ref to track previous state, 
    // but for now let's ensure basic controls work.

    const handlePreset = (hours) => {
        timer.start(hours * 3600);
    };

    const handleCustomStart = () => {
        const h = parseInt(customHours);
        if (h > 0) {
            timer.start(h * 3600);
        }
    };

    const handleStepClick = (step) => {
        if (step.type === 'start' || step.type === 'end') {
            setModalContent(step.modalContent);
        } else if (step.type === 'reading') {
            navigate('/bible', { state: { book: step.book, bookId: step.bookId, chapter: step.chapter } });
        } else if (step.type === 'prayer') {
            navigate('/prayer', { state: { openWarRoom: true, guideId: step.warRoomId } });
        }
    };

    return (
        <div className="active-window" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <header style={{ textAlign: 'center', marginBottom: '20px', flexShrink: 0 }}>
                <h1 style={{ fontSize: '2rem' }}>Ayuno</h1>
                {selectedPlan && !timer.isRunning && (
                    <div style={{
                        marginTop: '10px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: `${selectedPlan.color}20`,
                        color: selectedPlan.color,
                        padding: '5px 15px',
                        borderRadius: '20px',
                        fontSize: '0.9rem'
                    }}>
                        {selectedPlan.icon} {selectedPlan.title}
                        <button onClick={() => setActiveFastingPlanId(null)} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', opacity: 0.7, paddingLeft: '5px' }}>×</button>
                    </div>
                )}
            </header>

            <div className="timer-section" style={{ flexShrink: 0, marginBottom: '20px' }}>
                <TimerDisplay
                    time={timer.formatTime()}
                    progress={timer.progress}
                    totalSeconds={timer.totalSeconds}
                />

                <div className="timer-controls" style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>

                    {!timer.isRunning && !timer.isPaused ? (
                        <>
                            {!selectedPlan && (
                                <button
                                    onClick={() => setShowPlanSelector(true)}
                                    style={{
                                        width: '100%',
                                        padding: '20px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: '15px',
                                        fontSize: '1.1rem',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        background: 'linear-gradient(135deg, rgba(81, 45, 168, 0.4) 0%, rgba(124, 77, 255, 0.4) 100%)',
                                        border: '1px solid rgba(124, 77, 255, 0.5)',
                                        borderRadius: '20px',
                                        color: '#fff',
                                        boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
                                        backdropFilter: 'blur(8px)',
                                        marginBottom: '10px',
                                        transition: 'transform 0.2s'
                                    }}
                                    onMouseDown={(e) => e.target.style.transform = 'scale(0.98)'}
                                    onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
                                >
                                    <div style={{
                                        background: '#fff',
                                        color: 'var(--primary)',
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '0.9rem',
                                        boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                                    }}>
                                        <FaLink />
                                    </div>
                                    Seleccionar Propósito
                                </button>
                            )}

                            <div className="glass-card" style={{ padding: '20px', width: '100%' }}>
                                <p style={{ textAlign: 'center', marginBottom: '15px', opacity: 0.8 }}>Selecciona duración</p>

                                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '20px' }}>
                                    <button className="btn-secondary" onClick={() => handlePreset(16)}>16h</button>
                                    <button className="btn-secondary" onClick={() => handlePreset(24)}>24h</button>
                                    <button className="btn-secondary" onClick={() => handlePreset(48)}>48h</button>
                                </div>

                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    <input
                                        type="number"
                                        placeholder="Horas Personalizadas"
                                        className="custom-input"
                                        value={customHours}
                                        onChange={(e) => setCustomHours(e.target.value)}
                                    />
                                    <button className="btn-primary" onClick={handleCustomStart} style={{ padding: '12px', borderRadius: '12px' }}>
                                        <FaCheck />
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
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
                            <button className="btn-secondary" onClick={() => { timer.reset(); addFastingEntry(timer.totalSeconds - timer.remainingSeconds); }} style={{ width: '60px', height: '60px', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <FaUndo />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Fasting Guide Timeline - Only visible when running and plan selected */}
            {(timer.isRunning || timer.isPaused) && selectedPlan && selectedPlan.schedule && (
                <div className="glass-card" style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
                    <h3 style={{ fontSize: '1rem', color: selectedPlan.color, marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {selectedPlan.icon} Guía de Ayuno
                    </h3>
                    <div style={{ position: 'relative', paddingLeft: '15px' }}>
                        {/* Timeline Line */}
                        <div style={{ position: 'absolute', top: '10px', bottom: '10px', left: '0', width: '2px', background: 'rgba(255,255,255,0.1)' }}></div>

                        {selectedPlan.schedule.map((step, idx) => (
                            <div
                                key={idx}
                                onClick={() => handleStepClick(step)}
                                style={{
                                    position: 'relative',
                                    marginBottom: '20px',
                                    paddingLeft: '15px',
                                    cursor: 'pointer', /* Clickable indication */
                                    transition: 'transform 0.2s',
                                    borderRadius: '8px',
                                    paddingRight: '10px'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                            >
                                {/* Dot */}
                                <div style={{
                                    position: 'absolute',
                                    left: '-14px',
                                    top: '5px',
                                    width: '10px',
                                    height: '10px',
                                    borderRadius: '50%',
                                    background: timer.progress >= step.percent ? selectedPlan.color : '#444',
                                    border: '2px solid var(--bg-dark)'
                                }}></div>

                                <div style={{ opacity: timer.progress >= step.percent ? 1 : 0.5 }}>
                                    <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--accent)', marginBottom: '2px' }}>
                                        {step.type === 'start' && 'INICIO'}
                                        {step.type === 'reading' && 'LECTURA'}
                                        {step.type === 'prayer' && 'ORACIÓN'}
                                        {step.type === 'quote' && 'FRASE'}
                                        {step.type === 'end' && 'FIN'}
                                    </div>
                                    <div style={{ fontSize: '0.9rem' }}>{step.text}</div>
                                    {step.focus && <div style={{ fontSize: '0.8rem', fontStyle: 'italic', color: 'var(--text-muted)' }}>Enfoque: {step.focus}</div>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Plan Selector Modal */}
            {showPlanSelector && (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'var(--bg-dark)',
                    zIndex: 100,
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Elige un Propósito</h2>
                    <div style={{ overflowY: 'auto', display: 'grid', gap: '15px', paddingBottom: '20px' }}>
                        {FASTING_PLANS.map(plan => (
                            <button
                                key={plan.id}
                                className="glass-card"
                                onClick={() => { setActiveFastingPlanId(plan.id); setShowPlanSelector(false); }}
                                style={{
                                    padding: '20px',
                                    textAlign: 'left',
                                    borderLeft: `4px solid ${plan.color}`,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '15px',
                                    transition: 'transform 0.2s'
                                }}
                            >
                                <div style={{
                                    fontSize: '1.2rem',
                                    color: plan.color,
                                    background: `${plan.color}20`,
                                    padding: '12px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>{plan.icon}</div>
                                <div>
                                    <h3 style={{ fontSize: '1.1rem', marginBottom: '5px', color: plan.color }}>{plan.title}</h3>
                                    <p style={{ fontSize: '0.85rem', opacity: 0.8, margin: 0, color: '#ccc' }}>{plan.description}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                    <button onClick={() => setShowPlanSelector(false)} className="btn-secondary" style={{ marginTop: 'auto' }}>Cancelar</button>
                </div>
            )}

            {/* Guide Text Modal */}
            {modalContent && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0,0,0,0.85)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2000,
                    padding: '20px'
                }}>
                    <div className="glass-card" style={{ maxWidth: '400px', width: '100%', position: 'relative', border: '1px solid var(--accent)', padding: '30px' }}>
                        <button
                            onClick={() => setModalContent(null)}
                            style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', color: '#fff', fontSize: '1.2rem', cursor: 'pointer', opacity: 0.7 }}
                        >
                            <FaTimes />
                        </button>
                        <FaHandHoldingHeart size={40} color="var(--accent)" style={{ display: 'block', margin: '0 auto 20px auto' }} />
                        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', textAlign: 'center', color: '#fff', margin: 0 }}>
                            "{modalContent}"
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Fasting;
