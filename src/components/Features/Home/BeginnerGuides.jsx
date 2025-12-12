import React, { useState } from 'react';
import { FaPrayingHands, FaBookOpen, FaUtensils, FaTimes, FaChevronRight, FaCross, FaCrown, FaCloud } from 'react-icons/fa';

const GUIDES_DATA = [
    {
        id: 'prayer',
        icon: <FaPrayingHands />,
        title: "Cómo Empezar a Orar",
        subtitle: "Tu Tiempo a Solas",
        gradient: "linear-gradient(135deg, #FF9966 0%, #FF5E62 100%)",
        modalTitle: "Tu Tiempo a Solas: Guía Práctica de Oración",
        modalContent: (
            <>
                <p style={{ fontStyle: 'italic', color: '#ccc', marginBottom: '20px', borderLeft: '3px solid #FF5E62', paddingLeft: '15px' }}>
                    "Mas tú, cuando ores, entra en tu cuarto, y cerrada la puerta, ora a tu Padre que está en secreto; y tu Padre que ve en lo secreto te recompensará en público." <br />— Mateo 6:6
                </p>
                <p>Esta guía te ayuda a establecer tu "cuarto de oración" personal y efectivo.</p>

                <h4 style={{ color: '#FF9966', marginTop: '20px', marginBottom: '10px' }}>1. Prepara tu Espacio y Corazón</h4>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li style={{ marginBottom: '10px' }}><strong>⏳ Elige un Momento:</strong> Busca un momento del día donde tengas al menos 15 minutos ininterrumpidos.</li>
                    <li style={{ marginBottom: '10px' }}><strong>🏠 Designa un Lugar:</strong> Encuentra un rincón tranquilo lejos del teléfono y distracciones.</li>
                    <li style={{ marginBottom: '10px' }}><strong>🧘 Postura:</strong> No hay una postura "correcta". Lo importante es la actitud de tu corazón.</li>
                </ul>

                <h4 style={{ color: '#FF9966', marginTop: '20px', marginBottom: '10px' }}>2. La Estructura (Método ACTS)</h4>
                <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '15px' }}>
                    <p style={{ margin: '5px 0' }}><strong>Adoración:</strong> Alabar a Dios por lo que Él es.</p>
                    <p style={{ margin: '5px 0' }}><strong>Confesión:</strong> Pedir perdón por nuestros errores.</p>
                    <p style={{ margin: '5px 0' }}><strong>Tes (Thanksgiving - Acción de Gracias):</strong> Gratitud por lo que Él hace.</p>
                    <p style={{ margin: '5px 0' }}><strong>Súplica:</strong> Presentar nuestras necesidades y las de otros.</p>
                </div>

                <h4 style={{ color: '#FF9966', marginTop: '20px', marginBottom: '10px' }}>3. Oración Modelo</h4>
                <p>Comienza con el <strong>Padrenuestro</strong> (Mateo 6:9-13). Deja que sea la base de lo que luego se convierta en tus propias palabras.</p>
            </>
        )
    },
    {
        id: 'bible',
        icon: <FaBookOpen />,
        title: "Cómo Leer la Palabra",
        subtitle: "Encontrando la Voz de Dios",
        gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        modalTitle: "Encontrando la Voz de Dios: Guía de Lectura Bíblica",
        modalContent: (
            <>
                <p style={{ fontStyle: 'italic', color: '#ccc', marginBottom: '20px', borderLeft: '3px solid #764ba2', paddingLeft: '15px' }}>
                    "Lámpara es a mis pies tu palabra, y lumbrera a mi camino." <br />— Salmos 119:105
                </p>
                <p>La Biblia es cómo Dios te habla. Esta guía te muestra cómo escucharle de forma efectiva.</p>

                <h4 style={{ color: '#667eea', marginTop: '20px', marginBottom: '10px' }}>1. ¿Por Dónde Empezar?</h4>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li style={{ marginBottom: '10px' }}>❤️ <strong>Evangelio de Juan:</strong> Conocerás el corazón de Jesús.</li>
                    <li style={{ marginBottom: '10px' }}>🎶 <strong>Salmos:</strong> Para aprender a orar y expresar tus emociones.</li>
                    <li style={{ marginBottom: '10px' }}>💡 <strong>Proverbios:</strong> Consejos prácticos para la vida diaria.</li>
                </ul>

                <h4 style={{ color: '#667eea', marginTop: '20px', marginBottom: '10px' }}>2. Método "LITE"</h4>
                <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '15px' }}>
                    <p><strong>L</strong>ee el pasaje para comprender el contexto.</p>
                    <p><strong>I</strong>nvestiga qué dice acerca de Dios y del ser humano.</p>
                    <p><strong>T</strong>ransforma: ¿Hay un mandato u obediencia?</p>
                    <p><strong>E</strong>scribe y Ora: Anota un versículo clave.</p>
                </div>

                <h4 style={{ color: '#667eea', marginTop: '20px', marginBottom: '10px' }}>3. Consistencia</h4>
                <p>Es mejor leer 10 minutos todos los días que 2 horas solo un domingo. Antes de abrir la Biblia, ora: "Señor, abre mis ojos".</p>
            </>
        )
    },
    {
        id: 'fasting',
        icon: <FaUtensils />,
        title: "Cómo Empezar a Ayunar",
        subtitle: "Conectando Profundamente",
        gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        modalTitle: "Conectando Profundamente: Guía de Ayuno",
        modalContent: (
            <>
                <p style={{ fontStyle: 'italic', color: '#ccc', marginBottom: '20px', borderLeft: '3px solid #00f2fe', paddingLeft: '15px' }}>
                    "El ayuno es negarle a tu cuerpo algo temporal para que tu espíritu pueda recibir algo eterno."
                </p>
                <p>El ayuno no es una dieta; es una herramienta espiritual.</p>

                <h4 style={{ color: '#00f2fe', marginTop: '20px', marginBottom: '10px' }}>1. Entendiendo el Propósito</h4>
                <p>El objetivo no es sufrir hambre, sino reemplazar el tiempo de comida con oración. Ayunamos para buscar dirección o arrepentimiento.</p>

                <h4 style={{ color: '#00f2fe', marginTop: '20px', marginBottom: '10px' }}>2. Tipos de Ayuno Iniciales</h4>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li style={{ marginBottom: '10px' }}>🍎 <strong>Ayuno Parcial (Daniel):</strong> Solo frutas, vegetales y agua.</li>
                    <li style={{ marginBottom: '10px' }}>🕛 <strong>Ayuno de una comida:</strong> Saltarse el almuerzo para orar.</li>
                    <li style={{ marginBottom: '10px' }}>📱 <strong>Ayuno de Medios:</strong> Sin redes sociales ni TV.</li>
                </ul>

                <h4 style={{ color: '#00f2fe', marginTop: '20px', marginBottom: '10px' }}>3. Preparación y Cierre</h4>
                <p>Define tu objetivo antes de empezar. Hidrátate bien. Al terminar, come algo ligero (fruta o caldo) para evitar malestar.</p>
            </>
        )
    },
    {
        id: 'cross',
        icon: <FaCross />,
        title: "La Importancia de la Cruz",
        subtitle: "El Fundamento de Todo",
        gradient: "linear-gradient(135deg, #FF512F 0%, #DD2476 100%)", // Red/Pink gradient for sacrifice/love
        modalTitle: "El Regalo de Dios: La Cruz y la Salvación",
        modalContent: (
            <>
                <p style={{ fontStyle: 'italic', color: '#ccc', marginBottom: '20px', borderLeft: '3px solid #DD2476', paddingLeft: '15px' }}>
                    "Mas Dios muestra su amor para con nosotros, en que siendo aún pecadores, Cristo murió por nosotros." <br />— Romanos 5:8
                </p>
                <p>Esta es la verdad más grande: la vida cristiana comienza con un regalo inmerecido que Jesús hizo por ti.</p>

                <h4 style={{ color: '#FF512F', marginTop: '20px', marginBottom: '10px' }}>1. El Problema: Separados de Dios</h4>
                <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '15px' }}>
                    <p><strong>El Pecado:</strong> Es todo lo que nos aleja de Dios. No importa cuán buenos seamos, el pecado crea una barrera impasable.</p>
                    <p style={{ fontSize: '0.9rem', color: '#aaa', marginTop: '5px' }}>"Por cuanto todos pecaron, y están destituidos de la gloria de Dios." (Romanos 3:23)</p>
                </div>

                <h4 style={{ color: '#FF512F', marginTop: '20px', marginBottom: '10px' }}>2. La Solución: El Sacrificio</h4>
                <p>Nadie podía cruzar esa barrera. <strong>Jesús fue el puente.</strong> Su muerte pagó por tus errores para que tú pudieras recibir el perdón.</p>

                <h4 style={{ color: '#FF512F', marginTop: '20px', marginBottom: '10px' }}>3. El Regalo: Gracia</h4>
                <p>La salvación no se gana con obras o esfuerzo. Es un <strong>regalo gratuito</strong> de Dios.</p>
                <p style={{ fontSize: '0.9rem', color: '#aaa', marginTop: '5px' }}>"Porque por gracia sois salvos por medio de la fe... no por obras." (Efesios 2:8-9)</p>

                <h4 style={{ color: '#FF512F', marginTop: '20px', marginBottom: '10px' }}>4. Tu Respuesta: Paso de Fe</h4>
                <p>Recibir este regalo es simple:</p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li style={{ marginBottom: '10px' }}>❤️ <strong>Cree</strong> que Jesús murió y resucitó por ti.</li>
                    <li style={{ marginBottom: '10px' }}>🗣️ <strong>Confiesa</strong> que Él es tu Señor.</li>
                </ul>
                <p style={{ fontSize: '0.9rem', color: '#aaa', marginTop: '5px' }}>"Si confesares con tu boca que Jesús es el Señor... serás salvo." (Romanos 10:9)</p>
            </>
        )
    },
    {
        id: 'messiah',
        icon: <FaCrown />,
        title: "¿Por Qué Jesús es el Mesías?",
        subtitle: "La Evidencia Histórica",
        gradient: "linear-gradient(135deg, #FDC830 0%, #F37335 100%)", // Gold/Orange for Royalty
        modalTitle: "La Evidencia Histórica: ¿Por Qué Jesús es el Mesías?",
        modalContent: (
            <>
                <p style={{ fontStyle: 'italic', color: '#ccc', marginBottom: '20px', borderLeft: '3px solid #F37335', paddingLeft: '15px' }}>
                    La identidad de Jesús como el Mesías no es una creencia ciega, sino el cumplimiento de cientos de profecías dadas siglos antes.
                </p>

                <h4 style={{ color: '#FDC830', marginTop: '20px', marginBottom: '10px' }}>1. El Significado de "Mesías"</h4>
                <p>Significa <strong>"El Ungido"</strong> (Cristo en griego). Él debía cumplir tres roles: Profeta, Sacerdote (sacrificio) y Rey.</p>

                <h4 style={{ color: '#FDC830', marginTop: '20px', marginBottom: '10px' }}>2. Profecías Cumplidas (Evidencia)</h4>
                <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '15px' }}>
                    <div style={{ marginBottom: '15px' }}>
                        <strong style={{ color: '#fff' }}>📍 Lugar de Nacimiento</strong>
                        <div style={{ fontSize: '0.9rem', color: '#aaa', marginLeft: '10px' }}>
                            Profecía: Miqueas 5:2 (Belén)<br />
                            Cumplimiento: Mateo 2:1
                        </div>
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <strong style={{ color: '#fff' }}>✝️ Manera de Morir</strong>
                        <div style={{ fontSize: '0.9rem', color: '#aaa', marginLeft: '10px' }}>
                            Profecía: Salmos 22:16 (Horadaron mis manos)<br />
                            Cumplimiento: Juan 19:34
                        </div>
                    </div>
                    <div>
                        <strong style={{ color: '#fff' }}>🌅 La Resurrección</strong>
                        <div style={{ fontSize: '0.9rem', color: '#aaa', marginLeft: '10px' }}>
                            Profecía: Salmos 16:10<br />
                            Cumplimiento: Hechos 2:24
                        </div>
                    </div>
                </div>

                <h4 style={{ color: '#FDC830', marginTop: '20px', marginBottom: '10px' }}>3. Conexión con la Cruz</h4>
                <p>El sufrimiento no fue un accidente. Daniel 9:26 predijo que <em>"se quitará la vida al Mesías, mas no por sí"</em>. Murió como el sacrificio perfecto.</p>

                <h4 style={{ color: '#FDC830', marginTop: '20px', marginBottom: '10px' }}>4. Tu Decisión</h4>
                <p>Si Jesús es el Mesías prometido, Su autoridad es absoluta. Creer en Él es confiar en Su capacidad para perdonarte y darte vida eterna.</p>
            </>
        )
    },
    {
        id: 'trinity',
        icon: <FaCloud />,
        title: "La Trinidad",
        subtitle: "Un Solo Dios, Tres Personas",
        gradient: "linear-gradient(135deg, #2980B9 0%, #6DD5FA 100%)", // Blue/Sky gradient
        modalTitle: "Entendiendo al Dios Verdadero: Padre, Hijo y Espíritu Santo",
        modalContent: (
            <>
                <p style={{ fontStyle: 'italic', color: '#ccc', marginBottom: '20px', borderLeft: '3px solid #6DD5FA', paddingLeft: '15px' }}>
                    Existe un solo Dios verdadero que se manifiesta en tres personas distintas, pero inseparables: Padre, Hijo y Espíritu Santo.
                </p>

                <h4 style={{ color: '#6DD5FA', marginTop: '20px', marginBottom: '10px' }}>1. El Concepto Básico: Tres en Uno</h4>
                <p>No creemos en tres dioses. Las tres personas son co-iguales, co-eternas y actúan siempre en perfecta unidad.</p>

                <h4 style={{ color: '#6DD5FA', marginTop: '20px', marginBottom: '10px' }}>2. Evidencia Bíblica</h4>
                <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '15px' }}>
                    <div style={{ marginBottom: '15px' }}>
                        <strong style={{ color: '#fff' }}>👑 Dios Padre (El Creador)</strong>
                        <div style={{ fontSize: '0.9rem', color: '#aaa', marginLeft: '10px' }}>
                            "Hay un solo Dios y Padre de todos..." (Efesios 4:6)
                        </div>
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <strong style={{ color: '#fff' }}>✝️ Dios Hijo (El Salvador)</strong>
                        <div style={{ fontSize: '0.9rem', color: '#aaa', marginLeft: '10px' }}>
                            "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo..." (Juan 3:16)
                        </div>
                    </div>
                    <div>
                        <strong style={{ color: '#fff' }}>🔥 Dios Espíritu Santo (El Consolador)</strong>
                        <div style={{ fontSize: '0.9rem', color: '#aaa', marginLeft: '10px' }}>
                            "...seréis llenos del Espíritu Santo." (Hechos 1:8)
                        </div>
                    </div>
                </div>

                <h4 style={{ color: '#6DD5FA', marginTop: '20px', marginBottom: '10px' }}>3. La Trinidad en Acción</h4>
                <p>En el <strong>Bautismo de Jesús</strong> (Mateo 3), vemos al Hijo en el agua, al Espíritu descendiendo como paloma y al Padre hablando desde el cielo.</p>

                <h4 style={{ color: '#6DD5FA', marginTop: '20px', marginBottom: '10px' }}>4. Tu Conexión</h4>
                <p>Tenemos acceso a Dios en toda Su plenitud: al amor del Padre, por el sacrificio del Hijo, y mediante el poder del Espíritu Santo.</p>
            </>
        )
    }
];

const BeginnerGuides = () => {
    const [selectedGuide, setSelectedGuide] = useState(null);

    return (
        <div style={{ marginTop: '30px', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '1.1rem', marginBottom: '15px', color: '#fff' }}>Primeros Pasos en tu Fe</h2>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '15px'
            }}>
                {GUIDES_DATA.map((guide) => (
                    <div
                        key={guide.id}
                        onClick={() => setSelectedGuide(guide)}
                        style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '16px',
                            padding: '20px',
                            cursor: 'pointer',
                            transition: 'transform 0.2s ease, background 0.2s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '15px',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-3px)';
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                        }}
                    >
                        {/* Icon Box */}
                        <div style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '12px',
                            background: guide.gradient,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                            fontSize: '1.2rem',
                            flexShrink: 0
                        }}>
                            {guide.icon}
                        </div>

                        {/* Text */}
                        <div style={{ flex: 1 }}>
                            <h3 style={{ fontSize: '1rem', fontWeight: 'bold', margin: '0 0 5px 0', color: '#fff' }}>{guide.title}</h3>
                            <p style={{ fontSize: '0.8rem', margin: 0, color: 'rgba(255, 255, 255, 0.7)' }}>{guide.subtitle}</p>
                        </div>

                        <FaChevronRight size={14} color="rgba(255,255,255,0.3)" />
                    </div>
                ))}
            </div>

            {/* Modal */}
            {selectedGuide && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    zIndex: 10000,
                    background: 'rgba(0, 0, 0, 0.85)',
                    backdropFilter: 'blur(5px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px',
                    animation: 'fadeIn 0.2s ease'
                }} onClick={() => setSelectedGuide(null)}>
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            background: '#1a1a1a',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '20px',
                            width: '100%',
                            maxWidth: '500px',
                            maxHeight: '85vh',
                            overflowY: 'auto',
                            position: 'relative',
                            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                            animation: 'slideUp 0.3s ease'
                        }}
                    >
                        {/* Header Image/Gradient */}
                        <div style={{
                            height: '120px',
                            background: selectedGuide.gradient,
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <button
                                onClick={() => setSelectedGuide(null)}
                                style={{
                                    position: 'absolute',
                                    top: '15px',
                                    right: '15px',
                                    background: 'rgba(0,0,0,0.3)',
                                    border: 'none',
                                    color: '#fff',
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '50%',
                                    cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}
                            >
                                <FaTimes />
                            </button>
                            <div style={{ fontSize: '3rem', color: 'rgba(255,255,255,0.3)' }}>
                                {selectedGuide.icon}
                            </div>
                        </div>

                        {/* Content */}
                        <div style={{ padding: '25px', color: '#fff', lineHeight: '1.6' }}>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '20px', lineHeight: '1.3' }}>{selectedGuide.modalTitle}</h2>
                            <div style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.9)' }}>
                                {selectedGuide.modalContent}
                            </div>

                            <button
                                onClick={() => setSelectedGuide(null)}
                                style={{
                                    width: '100%',
                                    padding: '15px',
                                    marginTop: '30px',
                                    background: 'rgba(255,255,255,0.1)',
                                    border: 'none',
                                    borderRadius: '12px',
                                    color: '#fff',
                                    fontWeight: 'bold',
                                    cursor: 'pointer'
                                }}
                            >
                                Entendido
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style>
                {`
                    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                    @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
                `}
            </style>
        </div>
    );
};

export default BeginnerGuides;
