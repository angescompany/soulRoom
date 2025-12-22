import React, { useState } from 'react';
import { FaBook, FaChevronRight, FaTimes, FaBible, FaQuestionCircle, FaHandHoldingHeart, FaFemale, FaShieldAlt, FaGift, FaGlobeAmericas, FaRing, FaHourglassHalf, FaExclamationTriangle } from 'react-icons/fa';

const TOPICS_DATA = [
    {
        id: 1,
        title: "¿Se pierde la Salvación? (Seguridad Eterna)",
        icon: <FaQuestionCircle />,
        gradient: "linear-gradient(135deg, #FF9966 0%, #FF5E62 100%)",
        detailContent: (
            <>
                <p style={{ fontStyle: 'italic', color: '#ccc', marginBottom: '20px', borderLeft: '3px solid #FF5E62', paddingLeft: '15px' }}>
                    Este es uno de los debates más sensibles. Algunos creen que la salvación es un regalo irrevocable de Dios ("Salvo siempre salvo"), mientras que otros sostienen que el creyente tiene la responsabilidad de permanecer fiel y que, al decidir vivir en pecado continuo, puede alejarse de la gracia.
                </p>

                <h4 style={{ color: '#FF9966', marginTop: '20px', marginBottom: '10px' }}>📜 Versículos Clave</h4>

                <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '15px', marginBottom: '15px' }}>
                    <p style={{ margin: '5px 0' }}><strong style={{ color: '#fff' }}>A favor de la Seguridad Eterna:</strong> "Y yo les doy vida eterna; y no perecerán jamás, ni nadie las arrebatará de mi mano." (Juan 10:28)</p>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '15px' }}>
                    <p style={{ margin: '5px 0' }}><strong style={{ color: '#fff' }}>A favor de la Perseverancia:</strong> "Porque es imposible que los que una vez fueron iluminados... y recayeron, sean otra vez renovados para arrepentimiento..." (Hebreos 6:4-6)</p>
                </div>

                <h4 style={{ color: '#FF9966', marginTop: '20px', marginBottom: '10px' }}>💡 Resumen</h4>
                <p>La Biblia nos da seguridad para no vivir con miedo, pero nos advierte para no vivir con negligencia. La verdadera salvación produce frutos de obediencia.</p>
            </>
        )
    },
    {
        id: 2,
        title: "Predestinación vs. Libre Albedrío",
        icon: <FaBible />,
        gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        detailContent: (
            <>
                <p style={{ fontStyle: 'italic', color: '#ccc', marginBottom: '20px', borderLeft: '3px solid #764ba2', paddingLeft: '15px' }}>
                    ¿Fuimos elegidos por Dios antes de nacer o nosotros elegimos a Dios libremente? La Biblia enseña ambas verdades: la soberanía absoluta de Dios y la responsabilidad humana. Es un misterio divino difícil de entender para la mente finita.
                </p>

                <h4 style={{ color: '#667eea', marginTop: '20px', marginBottom: '10px' }}>📜 Versículos Clave</h4>

                <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '15px', marginBottom: '15px' }}>
                    <p style={{ margin: '5px 0' }}><strong style={{ color: '#fff' }}>Soberanía de Dios:</strong> "Según nos escogió en él antes de la fundación del mundo, para que fuésemos santos..." (Efesios 1:4)</p>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '15px' }}>
                    <p style={{ margin: '5px 0' }}><strong style={{ color: '#fff' }}>Libertad Humana:</strong> "Y el que quiera, tome del agua de la vida gratuitamente." (Apocalipsis 22:17)</p>
                </div>

                <h4 style={{ color: '#667eea', marginTop: '20px', marginBottom: '10px' }}>💡 Resumen</h4>
                <p>Dios está en control de la historia y, al mismo tiempo, nuestras decisiones son reales y tienen consecuencias. No necesitamos entender cómo funcionan juntas, solo confiar y predicar.</p>
            </>
        )
    },
    {
        id: 3,
        title: "El Diezmo en el Nuevo Testamento",
        icon: <FaHandHoldingHeart />,
        gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        detailContent: (
            <>
                <p style={{ fontStyle: 'italic', color: '#ccc', marginBottom: '20px', borderLeft: '3px solid #00f2fe', paddingLeft: '15px' }}>
                    En el Antiguo Testamento, el diezmo (10%) era una ley para sostener el templo. En el Nuevo Pacto, el debate gira en torno a si esa ley sigue vigente o si Jesús elevó el estándar hacia una generosidad voluntaria y sacrificial, sin un porcentaje fijo.
                </p>

                <h4 style={{ color: '#00f2fe', marginTop: '20px', marginBottom: '10px' }}>📜 Versículos Clave</h4>

                <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '15px', marginBottom: '15px' }}>
                    <p style={{ margin: '5px 0' }}><strong style={{ color: '#fff' }}>El Principio del Diezmo:</strong> "Traed todos los diezmos al alfolí y haya alimento en mi casa..." (Malaquías 3:10)</p>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '15px' }}>
                    <p style={{ margin: '5px 0' }}><strong style={{ color: '#fff' }}>La Generosidad en la Gracia:</strong> "Cada uno dé como propuso en su corazón: no con tristeza, ni por necesidad, porque Dios ama al dador alegre." (2 Corintios 9:7)</p>
                </div>

                <h4 style={{ color: '#00f2fe', marginTop: '20px', marginBottom: '10px' }}>💡 Resumen</h4>
                <p>El Nuevo Testamento no impone un impuesto, sino que invita a una generosidad que a menudo supera el 10%. Damos no para pagar una deuda, sino como respuesta de gratitud.</p>
            </>
        )
    },
    {
        id: 4,
        title: "La Mujer en el Liderazgo (Pastorado)",
        icon: <FaFemale />,
        gradient: "linear-gradient(135deg, #FF512F 0%, #DD2476 100%)",
        detailContent: (
            <>
                <p style={{ fontStyle: 'italic', color: '#ccc', marginBottom: '20px', borderLeft: '3px solid #DD2476', paddingLeft: '15px' }}>
                    ¿Puede una mujer enseñar y tener autoridad sobre una congregación? Algunos ven prohibiciones específicas en las cartas de Pablo como normas culturales de la época, mientras que otros las ven como un orden de creación permanente.
                </p>

                <h4 style={{ color: '#FF512F', marginTop: '20px', marginBottom: '10px' }}>📜 Versículos Clave</h4>

                <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '15px', marginBottom: '15px' }}>
                    <p style={{ margin: '5px 0' }}><strong style={{ color: '#fff' }}>Postura Tradicional:</strong> "Porque no permito a la mujer enseñar, ni ejercer dominio sobre el hombre, sino estar en silencio." (1 Timoteo 2:12)</p>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '15px' }}>
                    <p style={{ margin: '5px 0' }}><strong style={{ color: '#fff' }}>Postura de Igualdad:</strong> "Ya no hay judío ni griego; no hay esclavo ni libre; no hay varón ni mujer; porque todos vosotros sois uno en Cristo Jesús." (Gálatas 3:28)</p>
                </div>

                <h4 style={{ color: '#FF512F', marginTop: '20px', marginBottom: '10px' }}>💡 Resumen</h4>
                <p>Aunque los roles en la iglesia son debatidos, el valor, la dignidad y el uso de los dones espirituales de la mujer son indiscutibles y vitales para el cuerpo de Cristo.</p>
            </>
        )
    },
    {
        id: 5,
        title: "Guerra Espiritual: ¿Hasta dónde?",
        icon: <FaShieldAlt />,
        gradient: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
        detailContent: (
            <>
                <p style={{ fontStyle: 'italic', color: '#ccc', marginBottom: '20px', borderLeft: '3px solid #38ef7d', paddingLeft: '15px' }}>
                    El mundo espiritual es real, pero existen dos extremos peligrosos: ignorar al diablo por completo o ver al diablo en cada problema de la vida. ¿Debemos "atar y reprender" constantemente o simplemente someternos a Dios?
                </p>

                <h4 style={{ color: '#11998e', marginTop: '20px', marginBottom: '10px' }}>📜 Versículos Clave</h4>

                <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '15px', marginBottom: '15px' }}>
                    <p style={{ margin: '5px 0' }}><strong style={{ color: '#fff' }}>Nuestra Autoridad:</strong> "He aquí os doy potestad de hollar serpientes y escorpiones, y sobre toda fuerza del enemigo..." (Lucas 10:19)</p>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '15px' }}>
                    <p style={{ margin: '5px 0' }}><strong style={{ color: '#fff' }}>El Enfoque Correcto:</strong> "Someteos, pues, a Dios; resistid al diablo, y huirá de vosotros." (Santiago 4:7)</p>
                </div>

                <h4 style={{ color: '#11998e', marginTop: '20px', marginBottom: '10px' }}>💡 Resumen</h4>
                <p>La verdadera guerra espiritual no es gritarle a la oscuridad, sino encender la luz. Nuestra mayor arma es una vida de obediencia y sumisión a Dios; así el enemigo no tiene lugar.</p>
            </>
        )
    },
    {
        id: 6,
        title: "Dones Espirituales: ¿Cesaron o continúan?",
        icon: <FaGift />,
        gradient: "linear-gradient(135deg, #FC466B 0%, #3F5EFB 100%)",
        detailContent: (
            <>
                <p style={{ fontStyle: 'italic', color: '#ccc', marginBottom: '20px', borderLeft: '3px solid #3F5EFB', paddingLeft: '15px' }}>
                    El debate se centra en si los dones "milagrosos" (lenguas, profecía, sanidad) eran exclusivos para la época de los apóstoles para establecer la iglesia (Cesacionismo) o si están disponibles y vigentes para todos los creyentes hoy en día (Continuacionismo/Pentecostalismo).
                </p>

                <h4 style={{ color: '#FC466B', marginTop: '20px', marginBottom: '10px' }}>📜 Versículos Clave</h4>

                <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '15px', marginBottom: '15px' }}>
                    <p style={{ margin: '5px 0' }}><strong style={{ color: '#fff' }}>Postura de Continuidad:</strong> "Y estas señales seguirán a los que creen: En mi nombre echarán fuera demonios; hablarán nuevas lenguas..." (Marcos 16:17)</p>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '15px' }}>
                    <p style={{ margin: '5px 0' }}><strong style={{ color: '#fff' }}>Postura de Cese:</strong> "El amor nunca deja de ser; pero las profecías se acabarán, y cesarán las lenguas, y la ciencia acabará." (1 Corintios 13:8)</p>
                </div>

                <h4 style={{ color: '#FC466B', marginTop: '20px', marginBottom: '10px' }}>💡 Resumen</h4>
                <p>Independientemente de la postura teológica, la Biblia es clara en que el fruto del Espíritu (amor, gozo, paz) es superior y más necesario que cualquier don espectacular.</p>
            </>
        )
    },
    {
        id: 7,
        title: "Creación vs. Evolución (Génesis 1)",
        icon: <FaGlobeAmericas />,
        gradient: "linear-gradient(135deg, #00b09b 0%, #96c93d 100%)",
        detailContent: (
            <>
                <p style={{ fontStyle: 'italic', color: '#ccc', marginBottom: '20px', borderLeft: '3px solid #96c93d', paddingLeft: '15px' }}>
                    ¿Cómo debemos interpretar los "días" de la creación? ¿Son días literales de 24 horas (Creacionismo de Tierra Joven) o periodos geológicos largos que podrían coincidir con la ciencia moderna? Este tema confronta la interpretación literal con la científica.
                </p>

                <h4 style={{ color: '#00b09b', marginTop: '20px', marginBottom: '10px' }}>📜 Versículos Clave</h4>

                <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '15px', marginBottom: '15px' }}>
                    <p style={{ margin: '5px 0' }}><strong style={{ color: '#fff' }}>Creación Literal:</strong> "Y fue la tarde y la mañana un día." (Génesis 1:5 - sugiriendo ciclos solares).</p>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '15px' }}>
                    <p style={{ margin: '5px 0' }}><strong style={{ color: '#fff' }}>Tiempo Divino:</strong> "Para con el Señor un día es como mil años, y mil años como un día." (2 Pedro 3:8 - sugiriendo que el tiempo de Dios no es cronológico).</p>
                </div>

                <h4 style={{ color: '#00b09b', marginTop: '20px', marginBottom: '10px' }}>💡 Resumen</h4>
                <p>Lo esencial de la fe no es el "cómo" o el "cuándo" exacto se formó el universo, sino el "Quién". Dios es el diseñador inteligente detrás de todo lo que existe.</p>
            </>
        )
    },
    {
        id: 8,
        title: "El Divorcio y el Recasamiento",
        icon: <FaRing />,
        gradient: "linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%)",
        detailContent: (
            <>
                <p style={{ fontStyle: 'italic', color: '#ccc', marginBottom: '20px', borderLeft: '3px solid #4A00E0', paddingLeft: '15px' }}>
                    El matrimonio es sagrado, pero el divorcio es una realidad dolorosa. El debate surge sobre si un cristiano divorciado puede volver a casarse o si eso constituye adulterio perpetuo. Las excepciones bíblicas suelen ser el adulterio y el abandono.
                </p>

                <h4 style={{ color: '#8E2DE2', marginTop: '20px', marginBottom: '10px' }}>📜 Versículos Clave</h4>

                <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '15px', marginBottom: '15px' }}>
                    <p style={{ margin: '5px 0' }}><strong style={{ color: '#fff' }}>El Ideal de Dios:</strong> "Lo que Dios juntó, no lo separe el hombre... yo aborrezco el divorcio." (Mateo 19:6; Malaquías 2:16)</p>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '15px' }}>
                    <p style={{ margin: '5px 0' }}><strong style={{ color: '#fff' }}>La Cláusula de Excepción:</strong> "Cualquiera que repudia a su mujer, salvo por causa de fornicación, y se casa con otra, adultera." (Mateo 19:9)</p>
                </div>

                <h4 style={{ color: '#8E2DE2', marginTop: '20px', marginBottom: '10px' }}>💡 Resumen</h4>
                <p>Dios aborrece el divorcio por el dolor que causa, pero ama a las personas divorciadas. Aunque la reconciliación es el ideal, la gracia de Dios cubre nuestras rupturas y ofrece nuevos comienzos.</p>
            </>
        )
    },
    {
        id: 9,
        title: "El Rapto y el Fin de los Tiempos",
        icon: <FaHourglassHalf />,
        gradient: "linear-gradient(135deg, #c31432 0%, #240b36 100%)",
        detailContent: (
            <>
                <p style={{ fontStyle: 'italic', color: '#ccc', marginBottom: '20px', borderLeft: '3px solid #240b36', paddingLeft: '15px' }}>
                    La Escatología (estudio del fin) divide opiniones sobre cuándo Jesús buscará a su iglesia. ¿Será antes de la Gran Tribulación para librarnos de la ira (Pre-tribulacionismo) o al final de todo (Post-tribulacionismo)?
                </p>

                <h4 style={{ color: '#c31432', marginTop: '20px', marginBottom: '10px' }}>📜 Versículos Clave</h4>

                <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '15px', marginBottom: '15px' }}>
                    <p style={{ margin: '5px 0' }}><strong style={{ color: '#fff' }}>El Arrebatamiento:</strong> "Luego nosotros los que vivimos... seremos arrebatados juntamente con ellos en las nubes para recibir al Señor en el aire." (1 Tesalonicenses 4:17)</p>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '15px' }}>
                    <p style={{ margin: '5px 0' }}><strong style={{ color: '#fff' }}>La Advertencia:</strong> "Pero de aquel día y de la hora nadie sabe, ni aun los ángeles que están en el cielo, ni el Hijo, sino el Padre." (Marcos 13:32)</p>
                </div>

                <h4 style={{ color: '#c31432', marginTop: '20px', marginBottom: '10px' }}>💡 Resumen</h4>
                <p>Más importante que tener un calendario exacto del futuro es vivir preparados hoy. La promesa central es que Cristo volverá y la victoria final es suya.</p>
            </>
        )
    },
    {
        id: 10,
        title: "El \"Pecado Imperdonable\"",
        icon: <FaExclamationTriangle />,
        gradient: "linear-gradient(135deg, #16222A 0%, #3A6073 100%)",
        detailContent: (
            <>
                <p style={{ fontStyle: 'italic', color: '#ccc', marginBottom: '20px', borderLeft: '3px solid #3A6073', paddingLeft: '15px' }}>
                    Jesús habló de la "blasfemia contra el Espíritu Santo" como el único pecado que no tiene perdón. Esto genera mucha ansiedad en creyentes que temen haberlo cometido por un mal pensamiento o un error. La mayoría de teólogos coinciden en que no es un acto momentáneo, sino un rechazo persistente y final a la verdad de Dios.
                </p>

                <h4 style={{ color: '#16222A', marginTop: '20px', marginBottom: '10px' }}>📜 Versículos Clave</h4>

                <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '15px', marginBottom: '15px' }}>
                    <p style={{ margin: '5px 0' }}><strong style={{ color: '#fff' }}>La Sentencia:</strong> "A cualquiera que dijere alguna palabra contra el Hijo del Hombre, le será perdonado; pero al que hable contra el Espíritu Santo, no le será perdonado..." (Mateo 12:32)</p>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '15px' }}>
                    <p style={{ margin: '5px 0' }}><strong style={{ color: '#fff' }}>La Promesa de Perdón:</strong> "Si confesamos nuestros pecados, él es fiel y justo para perdonar nuestros pecados, y limpiarnos de toda maldad." (1 Juan 1:9)</p>
                </div>

                <h4 style={{ color: '#16222A', marginTop: '20px', marginBottom: '10px' }}>💡 Resumen</h4>
                <p>No temas. Si te preocupa haberlo cometido, es la prueba de que no lo has hecho, porque tu corazón sigue sensible a Dios.</p>
            </>
        )
    }
];

const TopicsOfInterest = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState(null);

    return (
        <div style={{ marginTop: '20px', marginBottom: '20px' }}>
            {/* Simple Button/Card to Open the List */}
            <div
                onClick={() => setIsOpen(true)}
                style={{
                    background: 'linear-gradient(to right, #2C3E50, #4CA1AF)',
                    borderRadius: '16px',
                    padding: '20px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                    transition: 'transform 0.2s',
                    color: '#fff'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.02)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{
                        background: 'rgba(255,255,255,0.2)',
                        padding: '12px',
                        borderRadius: '50%',
                        fontSize: '1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <FaBible />
                    </div>
                    <div>
                        <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 'bold' }}>Temas de Interés</h3>
                        <p style={{ margin: 0, fontSize: '0.9rem', color: 'rgba(255,255,255,0.9)' }}>Preguntas difíciles, respuestas bíblicas.</p>
                    </div>
                </div>
                <FaChevronRight />
            </div>

            {/* MAIN MODAL: Topics List */}
            {isOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    zIndex: 9999,
                    background: '#121212',
                    overflowY: 'auto',
                    animation: 'fadeIn 0.2s ease',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    {/* Header */}
                    <div style={{
                        padding: '20px',
                        background: 'rgba(255,255,255,0.05)',
                        backdropFilter: 'blur(10px)',
                        position: 'sticky',
                        top: 0,
                        zIndex: 10,
                        borderBottom: '1px solid rgba(255,255,255,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <h2 style={{ margin: 0, color: '#fff', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <FaBible color="#4CA1AF" /> Temas de Interés
                        </h2>
                        <button
                            onClick={() => setIsOpen(false)}
                            style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', padding: '8px', borderRadius: '50%', cursor: 'pointer', display: 'flex' }}
                        >
                            <FaTimes size={20} />
                        </button>
                    </div>

                    {/* Content List */}
                    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {TOPICS_DATA.map((topic) => (
                            <div
                                key={topic.id}
                                onClick={() => setSelectedTopic(topic)}
                                style={{
                                    background: 'rgba(255,255,255,0.05)',
                                    borderRadius: '12px',
                                    padding: '15px',
                                    border: '1px solid rgba(255,255,255,0.05)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '15px',
                                    cursor: 'pointer',
                                    transition: 'background 0.2s'
                                }}
                            >
                                <div style={{
                                    width: '40px', height: '40px',
                                    background: topic.gradient,
                                    borderRadius: '10px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: '#fff',
                                    flexShrink: 0
                                }}>
                                    {topic.icon}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h4 style={{ margin: 0, color: '#E0E0E0', fontSize: '0.95rem' }}>{topic.title}</h4>
                                </div>
                                <FaChevronRight color="rgba(255,255,255,0.3)" size={14} />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* DETAIL MODAL: Selected Topic */}
            {selectedTopic && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    zIndex: 10000,
                    background: '#1a1a1a',
                    display: 'flex',
                    flexDirection: 'column',
                    animation: 'slideInRight 0.3s ease'
                }}>
                    {/* Header */}
                    <div style={{
                        padding: '20px',
                        background: selectedTopic.gradient,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '15px',
                        color: '#fff',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
                    }}>
                        <button
                            onClick={() => setSelectedTopic(null)}
                            style={{ background: 'rgba(0,0,0,0.2)', border: 'none', color: '#fff', width: '35px', height: '35px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}
                        >
                            &larr;
                        </button>
                        <h2 style={{ margin: 0, fontSize: '1.1rem', flex: 1, fontWeight: 'bold', lineHeight: '1.2' }}>{selectedTopic.title}</h2>
                    </div>

                    {/* Content */}
                    <div style={{ padding: '25px', overflowY: 'auto', flex: 1, color: '#e0e0e0', lineHeight: '1.6' }}>
                        {selectedTopic.detailContent}

                        <button
                            onClick={() => setSelectedTopic(null)}
                            style={{
                                width: '100%',
                                padding: '15px',
                                marginTop: '40px',
                                background: 'rgba(255,255,255,0.1)',
                                border: 'none',
                                borderRadius: '12px',
                                color: '#fff',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                marginBottom: '20px'
                            }}
                        >
                            Volver a la lista
                        </button>
                    </div>
                </div>
            )}

            <style>
                {`
                    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                    @keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
                `}
            </style>
        </div>
    );
};

export default TopicsOfInterest;
