import React, { useEffect, useState } from 'react';
import { FaPlay, FaPause, FaVolumeUp, FaTimes, FaCloudRain, FaMusic, FaPlaceOfWorship, FaBookOpen, FaPencilAlt, FaHome, FaHeartbeat, FaCoins, FaChild, FaRing, FaCloudSun, FaHandHoldingHeart, FaShieldAlt, FaMountain, FaYoutube } from 'react-icons/fa';
import { useAudio } from '../../hooks/useAudio';
import { useAppContext } from '../../context/AppContext';
import TimerDisplay from '../Shared/TimerDisplay';

const PRAYER_GUIDES = [
    {
        id: 'custom',
        title: 'Cómo Orar (Guía Libre)',
        icon: <FaPencilAlt />,
        simple: [
            { title: "Adoración", text: '"Dios, tú eres grande y poderoso..." (Alaba quién es Él).' },
            { title: "Confesión", text: '"Perdóname por..." (Limpia tu corazón).' },
            { title: "Agradecimiento", text: '"Gracias por..." (Reconoce sus bondades).' },
            { title: "Súplica", text: '"Señor, te pido por..." (Presenta tu petición específica).' }
        ],
        deep: [
            { title: "1. Posicionamiento", text: '"Me visto con la armadura de Dios (Efesios 6). Estoy sentado en lugares celestiales con Cristo."' },
            { title: "2. Identificación", text: '"Identifico la raíz de este problema (temor, escasez, enfermedad) y la llevo a la luz."' },
            { title: "3. Declaración", text: '"Escrito está..." (Usa una promesa bíblica específica para tu caso).' },
            { title: "4. Autoridad", text: '"En el nombre de Jesús, ato y reprendo la oposición. Desato la voluntad de Dios."' },
            { title: "5. Sellado", text: '"Sello esta oración con la sangre de Jesús. Hecho está. Amén."' }
        ]
    },
    {
        id: 'family',
        title: 'Familia y Hogar',
        icon: <FaHome />,
        simple: [
            { text: "Señor, gracias por mi familia. Te pido que tu paz reine en nuestro hogar." },
            { text: "Ayúdanos a amarnos, perdonarnos y entendernos mejor cada día." },
            { text: "Protege nuestra entrada y nuestra salida." }
        ],
        deep: [
            { title: "Padre Celestial", text: "Vengo ante ti como sacerdote/sacerdotisa de mi hogar." },
            { title: "Protección", text: "Levanto un vallado de protección alrededor de mi familia. Cancelo toda estrategia de división." },
            { title: "Declaración", text: 'Declaro Josué 24:15: "Yo y mi casa serviremos a Jehová". Rompo toda maldición generacional.' }
        ]
    },
    {
        id: 'health',
        title: 'Salud y Sanidad',
        icon: <FaHeartbeat />,
        simple: [
            { text: "Dios mío, te entrego mi salud y la de mis seres queridos." },
            { text: "Fortalece mi cuerpo, mente y espíritu." },
            { text: "Si hay enfermedad, te pido tu sanidad." }
        ],
        deep: [
            { title: "Jehová Rapha", text: 'Me paro sobre la promesa de Isaías 53:5: "Por sus llagas fuimos nosotros curados".' },
            { title: "Reprensión", text: "Reprendo todo espíritu de enfermedad, toda dolencia crónica y todo ataque contra mi cuerpo físico." },
            { title: "Vida", text: "Declaro vida y vida en abundancia. Mi cuerpo es templo del Espíritu Santo." }
        ]
    },
    {
        id: 'finances',
        title: 'Finanzas y Provisión',
        icon: <FaCoins />,
        simple: [
            { text: "Señor, gracias porque tú eres mi proveedor." },
            { text: "Ayúdame a administrar bien lo que me das." },
            { text: "Abre puertas de bendición y trabajo." }
        ],
        deep: [
            { title: "Jehová Jireh", text: "Rompo toda mentalidad de escasez y pobreza." },
            { title: "Reprensión", text: "Reprendo al devorador sobre mis finanzas en el nombre de Jesús." },
            { title: "Bendición", text: "Declaro que soy cabeza y no cola. Abro mis manos para recibir ideas creativas y favor." }
        ]
    },
    {
        id: 'children',
        title: 'Hijos y Descendencia',
        icon: <FaChild />,
        simple: [
            { text: "Señor, te presento a mis hijos. Guárdalos de todo mal." },
            { text: "Dales sabiduría en sus decisiones y buenos amigos." },
            { text: "Que conozcan tu amor desde jóvenes." }
        ],
        deep: [
            { title: "Vallado de Fuego", text: "Levanto un vallado de fuego alrededor de mis hijos (Zacarías 2:5)." },
            { title: "Cancelación", text: "Cancelo toda influencia del mundo, vicios y malas compañías." },
            { title: "Profecía", text: "Profetizo destino, propósito y pureza sobre sus vidas. Son linaje escogido." }
        ]
    },
    {
        id: 'marriage',
        title: 'Matrimonio y Unidad',
        icon: <FaRing />,
        simple: [
            { text: "Dios, bendice mi matrimonio. Ayúdanos a ser pacientes." },
            { text: "Restaura lo que se ha roto y reaviva nuestro amor." },
            { text: "Que seas tú el centro de nuestra unión." }
        ],
        deep: [
            { title: "Pacto", text: "Ato y echo fuera todo espíritu de división, orgullo y adulterio." },
            { title: "Sanidad", text: "Sanamos nuestro corazón de ofensas pasadas." },
            { title: "Unidad", text: 'Establezco Eclesiastés 4:12: "Cordón de tres dobleces no se rompe pronto".' }
        ]
    },
    {
        id: 'anxiety',
        title: 'Paz contra Ansiedad',
        icon: <FaCloudSun />,
        simple: [
            { text: "Señor, mi mente está inquieta. Te entrego mis preocupaciones." },
            { text: "Dame tu paz que sobrepasa todo entendimiento." },
            { text: "Ayúdame a confiar en que tú tienes el control." }
        ],
        deep: [
            { title: "Príncipe de Paz", text: "Rechazo y resisto al espíritu de temor y ansiedad (2 Timoteo 1:7)." },
            { title: "Cautiverio", text: "Llevo cautivo todo pensamiento a la obediencia a Cristo." },
            { title: "Orden", text: "Ordeno a la tormenta en mi mente: ¡Calla, enmudece! Recibo claridad ahora." }
        ]
    },
    {
        id: 'forgiveness',
        title: 'Perdón y Libertad',
        icon: <FaHandHoldingHeart />,
        simple: [
            { text: "Dios, me cuesta perdonar. Ayúdame a soltar el rencor." },
            { text: "Decido perdonar a quienes me ofendieron." },
            { text: "Sana mi corazón y hazme libre de la amargura." }
        ],
        deep: [
            { title: "Misericordia", text: "Decido cortar la raíz de amargura antes de que contamine mi espíritu." },
            { title: "Soltar", text: "Suelto el juicio y la venganza; son tuyos." },
            { title: "Libertad", text: "Declaro mi corazón sano, limpio y listo para amar de nuevo. ¡Soy libre!" }
        ]
    },
    {
        id: 'protection',
        title: 'Protección Divina',
        icon: <FaShieldAlt />,
        simple: [
            { text: "Señor, escóndeme bajo tus alas." },
            { text: "Líbranos de accidentes, violencia y todo mal." },
            { text: "Confío en que tus ángeles acampan a nuestro alrededor." }
        ],
        deep: [
            { title: "Jehová Nissi", text: "Me visto con toda la armadura de Dios (Efesios 6)." },
            { title: "Sangre de Jesús", text: "Invoco la sangre de Jesús sobre los dinteles de mi casa." },
            { title: "Ceguera", text: "Ciego los ojos del enemigo contra mi vida. Soy invisible para las tinieblas." }
        ]
    },
    {
        id: 'purpose',
        title: 'Fe y Propósito',
        icon: <FaMountain />,
        simple: [
            { text: "Señor, quiero hacer tu voluntad." },
            { text: "Guíame en mis decisiones y muéstrame el camino." },
            { text: "Heme aquí, envíame a mí." }
        ],
        deep: [
            { title: "Autor de la Fe", text: "Despierta el don que hay en mí. No fui creado para la mediocridad." },
            { title: "Rompimiento", text: "Rompo la parálisis y la duda. Declaro Jeremías 29:11 sobre mi futuro." },
            { title: "Destino", text: "Alineo mis sueños con tu voluntad perfecta. ¡Soy instrumento de tu gloria!" }
        ]
    }
];

const WarRoom = ({ timer, onClose, initialGuideId, onGuideSelect }) => {
    const audio = useAudio();
    const { fastingTimer } = useAppContext(); // Get global fasting timer
    const [selectedGuide, setSelectedGuide] = useState(null);
    const [guideMode, setGuideMode] = useState('simple'); // 'simple' or 'deep'
    const [showGuideSelector, setShowGuideSelector] = useState(false);
    const [activeVideo, setActiveVideo] = useState(null);

    // Videos de oración guiada
    const PRAYER_VIDEOS = [
        {
            id: 'warfare',
            title: 'Oración de Guerra Espiritual',
            subtitle: 'Versículos para derrotar huestes de maldad',
            videoId: 'f0L2PPK1VMI',
            color: '#ff6b6b'
        },
        {
            id: 'blessing',
            title: 'Oración de Bendición',
            subtitle: 'Versículos para pedir bendición y favor',
            videoId: 'PxnRFloLizs',
            color: '#ffd700'
        }
    ];

    // Auto-select guide if ID passed
    useEffect(() => {
        if (initialGuideId) {
            const guide = PRAYER_GUIDES.find(g => g.id === initialGuideId);
            if (guide) {
                setSelectedGuide(guide);
            }
        }
    }, [initialGuideId]);

    // Cleanup audio on unmount
    useEffect(() => {
        return () => audio.stop();
    }, []);

    // Heartbeat Animation Style
    const heartbeatStyle = `
        @keyframes heartbeat {
            0% { box-shadow: 0 0 0 0 rgba(255, 64, 129, 0); background: rgba(0,0,0,0.3); }
            15% { box-shadow: 0 0 15px 0 rgba(255, 64, 129, 0.4); background: rgba(255, 64, 129, 0.2); }
            30% { box-shadow: 0 0 0 0 rgba(255, 64, 129, 0); background: rgba(0,0,0,0.3); }
            45% { box-shadow: 0 0 15px 0 rgba(255, 64, 129, 0.4); background: rgba(255, 64, 129, 0.2); }
            60% { box-shadow: 0 0 0 0 rgba(255, 64, 129, 0); background: rgba(0,0,0,0.3); }
            100% { box-shadow: 0 0 0 0 rgba(255, 64, 129, 0); background: rgba(0,0,0,0.3); }
        }
    `;

    return (
        <div className="war-room-container">
            <style>{heartbeatStyle}</style>

            {/* Default War Room View (Visible only when no guide is selected or explicitly actively reading) */}
            {/* ... Actually, if selectedGuide is active, do we hide the main WarRoom controls (Audio/Big Timer)? 
                The user says: "el reloj de oracion se va a mostrar pequeño... la guia va a ocupar la pantalla".
                This implies a Full Screen replacement view.
            */}

            {!selectedGuide ? (
                <>
                    {/* Header */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '20px',
                        flexShrink: 0
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <FaPlaceOfWorship size={24} color="#ffd700" />
                            <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Cuarto de Guerra</h1>
                        </div>
                        <button
                            onClick={onClose}
                            style={{
                                background: 'rgba(255, 255, 255, 0.1)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                color: 'white',
                                padding: '8px 15px',
                                borderRadius: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px',
                                cursor: 'pointer'
                            }}
                        >
                            <FaTimes /> Salir
                        </button>
                    </div>

                    <p style={{
                        fontStyle: 'italic',
                        opacity: 0.8,
                        fontSize: '1rem',
                        maxWidth: '90%',
                        textAlign: 'center',
                        margin: '0 auto 20px auto',
                        color: 'var(--accent)',
                        flexShrink: 0
                    }}>
                        "Cierra la puerta, y ora a tu Padre que está en secreto..."
                    </p>

                    <div className="scroll-hide" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', overflowY: 'auto', width: '100%', paddingBottom: '100px', overscrollBehavior: 'contain' }}>
                        <div style={{ marginBottom: '30px' }}>
                            <TimerDisplay
                                time={timer.formatTime()}
                                progress={timer.progress}
                                totalSeconds={timer.totalSeconds}
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
                            {timer.isRunning ? (
                                <button onClick={timer.pause} className="circle-btn-lg">
                                    <FaPause />
                                </button>
                            ) : (
                                <button onClick={timer.resume} className="circle-btn-lg">
                                    <FaPlay />
                                </button>
                            )}
                        </div>

                        <div className="glass-card" style={{ width: '100%', maxWidth: '400px', padding: '15px', marginBottom: '20px' }}>
                            <h3 style={{ fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', opacity: 0.8 }}>
                                <FaVolumeUp /> Atmósfera
                            </h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '15px' }}>
                                <AudioButton icon={<FaCloudRain />} label="Lluvia" active={audio.currentTrack === 'rain'} onClick={() => audio.playTrack('rain')} />
                                <AudioButton icon={<FaMusic />} label="Piano" active={audio.currentTrack === 'piano'} onClick={() => audio.playTrack('piano')} />
                                <AudioButton icon={<FaPlaceOfWorship />} label="Adoración" active={audio.currentTrack === 'worship'} onClick={() => audio.playTrack('worship')} />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>Volumen</span>
                                <input type="range" min="0" max="1" step="0.01" value={audio.volume} onChange={(e) => audio.setVolume(parseFloat(e.target.value))} style={{ flex: 1, accentColor: 'var(--accent)' }} />
                            </div>
                        </div>

                        <div style={{ width: '100%', maxWidth: '400px', marginBottom: '20px' }}>
                            <button
                                className="glass-card"
                                onClick={() => setShowGuideSelector(true)}
                                style={{
                                    width: '100%',
                                    padding: '20px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    gap: '12px',
                                    fontSize: '1.1rem',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    background: 'linear-gradient(135deg, rgba(157, 80, 187, 0.3) 0%, rgba(157, 80, 187, 0.1) 100%)',
                                    border: '1px solid rgba(157, 80, 187, 0.5)',
                                    color: '#fff',
                                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                                }}
                            >
                                <FaBookOpen color="var(--accent)" /> Abrir Manual de Guerra
                            </button>
                        </div>

                        {/* Sección de Videos de Oración */}
                        <div className="glass-card" style={{ width: '100%', maxWidth: '400px', padding: '15px', marginBottom: '20px' }}>
                            <h3 style={{ fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px', opacity: 0.8 }}>
                                <FaYoutube color="#ff0000" /> Oraciones Guiadas
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {PRAYER_VIDEOS.map(video => (
                                    <button
                                        key={video.id}
                                        onClick={() => setActiveVideo(video)}
                                        style={{
                                            background: `linear-gradient(135deg, ${video.color}22 0%, ${video.color}11 100%)`,
                                            border: `1px solid ${video.color}44`,
                                            borderRadius: '12px',
                                            padding: '15px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            cursor: 'pointer',
                                            textAlign: 'left',
                                            color: '#fff',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        <div style={{
                                            width: '45px',
                                            height: '45px',
                                            borderRadius: '50%',
                                            background: `${video.color}33`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0
                                        }}>
                                            <FaPlay color={video.color} size={16} />
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '3px' }}>{video.title}</div>
                                            <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>{video.subtitle}</div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                /* ACTIVE STRATEGY VIEW (Full Screen Overlay) */
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

                    {/* Top Status Bar */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '15px',
                        paddingBottom: '15px',
                        borderBottom: '1px solid rgba(255,255,255,0.1)'
                    }}>
                        <button
                            onClick={() => { setSelectedGuide(null); if (onGuideSelect) onGuideSelect(null); }}
                            style={{ background: 'none', border: 'none', color: '#fff', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', opacity: 0.8 }}
                        >
                            <FaTimes /> Cerrar Guía
                        </button>

                        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                            {/* Mini War Room Timer */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', color: '#ffd700', background: 'rgba(0,0,0,0.3)', padding: '5px 10px', borderRadius: '15px' }}>
                                <span style={{ fontSize: '0.8rem' }}>⏳</span> {timer.formatTime().display}
                            </div>

                            {/* Mini Fasting Timer (Heartbeat) */}
                            {fastingTimer.isRunning && (
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    fontSize: '0.9rem',
                                    color: '#ff4081',
                                    background: 'rgba(0,0,0,0.3)',
                                    padding: '5px 10px',
                                    borderRadius: '15px',
                                    animation: 'heartbeat 1.5s infinite'
                                }}>
                                    <FaHeartbeat /> {fastingTimer.formatTime().display}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Guide Header */}
                    <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '1.3rem', color: 'var(--accent)', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                            {selectedGuide.icon} {selectedGuide.title}
                        </h2>

                        {/* Selector Tabs */}
                        <div style={{ display: 'inline-flex', background: 'rgba(0,0,0,0.3)', borderRadius: '10px', padding: '4px' }}>
                            <button
                                onClick={() => setGuideMode('simple')}
                                style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: guideMode === 'simple' ? 'var(--primary)' : 'transparent', color: guideMode === 'simple' ? '#fff' : 'rgba(255,255,255,0.6)', cursor: 'pointer', fontSize: '0.9rem' }}
                            >
                                Oración Simple
                            </button>
                            <button
                                onClick={() => setGuideMode('deep')}
                                style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: guideMode === 'deep' ? 'var(--primary)' : 'transparent', color: guideMode === 'deep' ? '#fff' : 'rgba(255,255,255,0.6)', cursor: 'pointer', fontSize: '0.9rem' }}
                            >
                                Estratégica (Guerra)
                            </button>
                        </div>
                    </div>

                    {/* Scrollable Content (Full Height) */}
                    <div
                        className="scroll-hide"
                        style={{
                            flex: 1,
                            overflowY: 'auto',
                            padding: '10px 5px 120px 5px', /* Increased bottom padding to clear nav */
                            WebkitOverflowScrolling: 'touch',
                            overscrollBehavior: 'contain'
                        }}
                    >
                        {/* Inline style block removed as class handles it */}
                        {guideMode === 'simple' ? (
                            <div style={{ display: 'grid', gap: '15px' }}>
                                {selectedGuide.simple.map((item, idx) => (
                                    <div key={idx} className="glass-card" style={{ padding: '20px', lineHeight: '1.6' }}>
                                        {item.title && <strong style={{ color: 'var(--accent)', display: 'block', marginBottom: '8px', fontSize: '1.1rem' }}>{item.title}</strong>}
                                        <div style={{ fontSize: '1.1rem' }}>{item.text}</div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div style={{ display: 'grid', gap: '15px' }}>
                                {selectedGuide.deep.map((item, idx) => (
                                    <div key={idx} className="glass-card" style={{ padding: '20px', borderLeft: '4px solid var(--primary)', lineHeight: '1.6' }}>
                                        <strong style={{ display: 'block', marginBottom: '8px', color: 'var(--accent)', fontSize: '1.1rem' }}>{item.title}</strong>
                                        <div style={{ fontSize: '1.1rem', opacity: 0.95 }}>{item.text}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Guide Selector Modal (Same as before) */}
            {showGuideSelector && (
                <div className="guide-selector-modal" style={{ overscrollBehavior: 'contain' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', position: 'relative', flexShrink: 0 }}>
                        <button
                            onClick={() => setShowGuideSelector(false)}
                            style={{
                                position: 'absolute',
                                left: 0,
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--accent)',
                                fontSize: '1rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px',
                                cursor: 'pointer'
                            }}
                        >
                            <FaTimes /> Volver
                        </button>
                        <h2 style={{ flex: 1, textAlign: 'center', margin: 0, fontSize: '1.2rem' }}>Estrategias de Oración</h2>
                    </div>

                    <div style={{
                        overflowY: 'scroll',
                        flex: 1,
                        paddingBottom: '120px', /* Increased bottom padding */
                        minHeight: 0,
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        WebkitOverflowScrolling: 'touch',
                        display: 'grid',
                        gap: '10px',
                        alignContent: 'start',
                        overscrollBehavior: 'contain' /* Prevent scrolling background */
                    }}>
                        {PRAYER_GUIDES.map(guide => (
                            <button
                                key={guide.id}
                                className="glass-card"
                                onClick={() => {
                                    setSelectedGuide(guide);
                                    if (onGuideSelect) onGuideSelect(guide.id);
                                    setShowGuideSelector(false);
                                }}
                                style={{
                                    padding: '18px',
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '15px',
                                    background: 'rgba(255,255,255,0.08)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    width: '100%'
                                }}
                            >
                                <div style={{ fontSize: '1.4rem', color: 'var(--accent)' }}>{guide.icon}</div>
                                <span style={{ fontSize: '1.1rem', fontWeight: 600, color: '#fff' }}>{guide.title}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )
            }

            {/* Video Player Modal */}
            {activeVideo && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.95)',
                    zIndex: 3000,
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '20px'
                }}>
                    {/* Header */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginBottom: '15px'
                    }}>
                        {/* Close button row */}
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                            <button
                                onClick={() => setActiveVideo(null)}
                                style={{
                                    background: 'rgba(255, 255, 255, 0.15)',
                                    border: 'none',
                                    color: 'white',
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    fontSize: '1rem'
                                }}
                            >
                                <FaTimes />
                            </button>
                        </div>
                        {/* Title */}
                        <div style={{ textAlign: 'center' }}>
                            <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#fff' }}>{activeVideo.title}</h3>
                            <p style={{ margin: '5px 0 0 0', fontSize: '0.85rem', opacity: 0.7, color: '#fff' }}>{activeVideo.subtitle}</p>
                        </div>
                    </div>

                    {/* Video Container */}
                    <div style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '15px',
                        overflow: 'hidden'
                    }}>
                        <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${activeVideo.videoId}?autoplay=1&rel=0`}
                            title={activeVideo.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{
                                maxWidth: '100%',
                                maxHeight: '70vh',
                                aspectRatio: '16/9',
                                borderRadius: '15px'
                            }}
                        ></iframe>
                    </div>
                </div>
            )}
        </div >
    );
};

const AudioButton = ({ icon, label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`audio-btn ${active ? 'active' : ''}`}
    >
        <span style={{ fontSize: '1.2rem' }}>{icon}</span>
        <span style={{ fontSize: '0.7rem' }}>{label}</span>
    </button>
);

export default WarRoom;
