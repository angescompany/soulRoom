import React, { useState } from 'react';
import { FaBookBible, FaChevronRight, FaXmark, FaHeart, FaCross, FaShieldHalved, FaDove, FaHandHoldingHeart, FaStar, FaHandsPraying, FaFire, FaLock, FaCloudSun, FaBolt, FaUsers, FaSeedling, FaScaleBalanced, FaLeaf } from 'react-icons/fa6';

const VERSES_BY_TOPIC = [
    {
        id: 'fe',
        title: 'Fe',
        icon: <FaStar />,
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        verses: [
            { reference: 'Hebreos 11:1', text: 'Es, pues, la fe la certeza de lo que se espera, la convicción de lo que no se ve.' },
            { reference: 'Romanos 10:17', text: 'Así que la fe es por el oír, y el oír, por la palabra de Dios.' },
            { reference: 'Marcos 11:24', text: 'Por tanto, os digo que todo lo que pidiereis orando, creed que lo recibiréis, y os vendrá.' },
            { reference: 'Hebreos 11:6', text: 'Pero sin fe es imposible agradar a Dios; porque es necesario que el que se acerca a Dios crea que le hay, y que es galardonador de los que le buscan.' },
            { reference: '2 Corintios 5:7', text: 'Porque por fe andamos, no por vista.' },
            { reference: 'Santiago 1:6', text: 'Pero pida con fe, no dudando nada; porque el que duda es semejante a la onda del mar, que es arrastrada por el viento.' }
        ]
    },
    {
        id: 'jesus',
        title: 'Jesús',
        icon: <FaCross />,
        gradient: 'linear-gradient(135deg, #FF512F 0%, #DD2476 100%)',
        verses: [
            { reference: 'Juan 14:6', text: 'Yo soy el camino, y la verdad, y la vida; nadie viene al Padre, sino por mí.' },
            { reference: 'Juan 3:16', text: 'Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.' },
            { reference: 'Filipenses 2:10-11', text: 'Para que en el nombre de Jesús se doble toda rodilla... y toda lengua confiese que Jesucristo es el Señor.' },
            { reference: 'Colosenses 1:15', text: 'Él es la imagen del Dios invisible, el primogénito de toda creación.' },
            { reference: 'Hebreos 13:8', text: 'Jesucristo es el mismo ayer, y hoy, y por los siglos.' },
            { reference: 'Juan 11:25', text: 'Le dijo Jesús: Yo soy la resurrección y la vida; el que cree en mí, aunque esté muerto, vivirá.' }
        ]
    },
    {
        id: 'temor',
        title: 'Temor y Ansiedad',
        icon: <FaShieldHalved />,
        gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
        verses: [
            { reference: 'Isaías 41:10', text: 'No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios que te esfuerzo.' },
            { reference: 'Filipenses 4:6-7', text: 'Por nada estéis afanosos, sino sean conocidas vuestras peticiones delante de Dios... Y la paz de Dios guardará vuestros corazones.' },
            { reference: '2 Timoteo 1:7', text: 'Porque no nos ha dado Dios espíritu de cobardía, sino de poder, de amor y de dominio propio.' },
            { reference: 'Salmos 34:4', text: 'Busqué a Jehová, y él me oyó, y me libró de todos mis temores.' },
            { reference: 'Salmos 23:4', text: 'Aunque ande en valle de sombra de muerte, no temeré mal alguno, porque tú estarás conmigo.' },
            { reference: '1 Pedro 5:7', text: 'Echando toda vuestra ansiedad sobre él, porque él tiene cuidado de vosotros.' }
        ]
    },
    {
        id: 'liberacion',
        title: 'Liberación',
        icon: <FaDove />,
        gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        verses: [
            { reference: 'Juan 8:36', text: 'Así que, si el Hijo os libertare, seréis verdaderamente libres.' },
            { reference: 'Gálatas 5:1', text: 'Estad, pues, firmes en la libertad con que Cristo nos hizo libres.' },
            { reference: 'Romanos 8:2', text: 'Porque la ley del Espíritu de vida en Cristo Jesús me ha librado de la ley del pecado y de la muerte.' },
            { reference: 'Salmos 107:14', text: 'Los sacó de las tinieblas y de la sombra de muerte, y rompió sus prisiones.' },
            { reference: 'Isaías 61:1', text: 'El Espíritu del Señor está sobre mí... a proclamar libertad a los cautivos.' },
            { reference: '2 Corintios 3:17', text: 'Porque el Señor es el Espíritu; y donde está el Espíritu del Señor, allí hay libertad.' }
        ]
    },
    {
        id: 'amor',
        title: 'Amor de Dios',
        icon: <FaHeart />,
        gradient: 'linear-gradient(135deg, #fc466b 0%, #3f5efb 100%)',
        verses: [
            { reference: 'Romanos 8:38-39', text: 'Por lo cual estoy seguro de que ni la muerte, ni la vida... nos podrá separar del amor de Dios.' },
            { reference: '1 Juan 4:8', text: 'El que no ama, no ha conocido a Dios; porque Dios es amor.' },
            { reference: 'Jeremías 31:3', text: 'Con amor eterno te he amado; por tanto, te prolongué mi misericordia.' },
            { reference: 'Efesios 3:18-19', text: 'Seáis plenamente capaces de comprender... cuál sea la anchura, la longitud, la profundidad y la altura del amor de Cristo.' },
            { reference: 'Romanos 5:8', text: 'Mas Dios muestra su amor para con nosotros, en que siendo aún pecadores, Cristo murió por nosotros.' },
            { reference: 'Salmos 136:26', text: 'Alabad al Dios de los cielos, porque para siempre es su misericordia.' }
        ]
    },
    {
        id: 'perdon',
        title: 'Perdón',
        icon: <FaHandHoldingHeart />,
        gradient: 'linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%)',
        verses: [
            { reference: '1 Juan 1:9', text: 'Si confesamos nuestros pecados, él es fiel y justo para perdonar nuestros pecados, y limpiarnos de toda maldad.' },
            { reference: 'Efesios 1:7', text: 'En quien tenemos redención por su sangre, el perdón de pecados según las riquezas de su gracia.' },
            { reference: 'Mateo 6:14', text: 'Porque si perdonáis a los hombres sus ofensas, os perdonará también a vosotros vuestro Padre celestial.' },
            { reference: 'Colosenses 3:13', text: 'Soportándoos unos a otros, y perdonándoos... como Cristo os perdonó.' },
            { reference: 'Salmos 103:12', text: 'Cuanto está lejos el oriente del occidente, hizo alejar de nosotros nuestras rebeliones.' },
            { reference: 'Isaías 1:18', text: 'Si vuestros pecados fueren como la grana, como la nieve serán emblanquecidos.' }
        ]
    },
    {
        id: 'oracion',
        title: 'Oración',
        icon: <FaHandsPraying />,
        gradient: 'linear-gradient(135deg, #FF9966 0%, #FF5E62 100%)',
        verses: [
            { reference: 'Filipenses 4:6', text: 'Por nada estéis afanosos, sino sean conocidas vuestras peticiones delante de Dios en toda oración y ruego.' },
            { reference: 'Mateo 7:7', text: 'Pedid, y se os dará; buscad, y hallaréis; llamad, y se os abrirá.' },
            { reference: 'Jeremías 29:12', text: 'Entonces me invocaréis, y vendréis y oraréis a mí, y yo os oiré.' },
            { reference: '1 Tesalonicenses 5:17', text: 'Orad sin cesar.' },
            { reference: 'Santiago 5:16', text: 'La oración eficaz del justo puede mucho.' },
            { reference: 'Mateo 6:6', text: 'Mas tú, cuando ores, entra en tu aposento... y tu Padre que ve en lo secreto te recompensará.' }
        ]
    },
    {
        id: 'espiritu',
        title: 'Espíritu Santo',
        icon: <FaFire />,
        gradient: 'linear-gradient(135deg, #f12711 0%, #f5af19 100%)',
        verses: [
            { reference: 'Hechos 1:8', text: 'Pero recibiréis poder, cuando haya venido sobre vosotros el Espíritu Santo.' },
            { reference: 'Juan 14:26', text: 'Mas el Consolador, el Espíritu Santo... él os enseñará todas las cosas.' },
            { reference: 'Gálatas 5:22-23', text: 'Mas el fruto del Espíritu es amor, gozo, paz, paciencia, benignidad, bondad, fe, mansedumbre, templanza.' },
            { reference: 'Romanos 8:26', text: 'El Espíritu nos ayuda en nuestra debilidad... intercede por nosotros con gemidos indecibles.' },
            { reference: 'Juan 16:13', text: 'Pero cuando venga el Espíritu de verdad, él os guiará a toda la verdad.' },
            { reference: 'Efesios 5:18', text: 'Antes bien sed llenos del Espíritu.' }
        ]
    },
    {
        id: 'proteccion',
        title: 'Protección',
        icon: <FaLock />,
        gradient: 'linear-gradient(135deg, #16222A 0%, #3A6073 100%)',
        verses: [
            { reference: 'Salmos 91:1-2', text: 'El que habita al abrigo del Altísimo morará bajo la sombra del Omnipotente.' },
            { reference: 'Salmos 121:7-8', text: 'Jehová te guardará de todo mal; él guardará tu alma.' },
            { reference: 'Proverbios 18:10', text: 'Torre fuerte es el nombre de Jehová; A él correrá el justo, y será levantado.' },
            { reference: '2 Tesalonicenses 3:3', text: 'Pero fiel es el Señor, que os afirmará y guardará del mal.' },
            { reference: 'Salmos 46:1', text: 'Dios es nuestro amparo y fortaleza, nuestro pronto auxilio en las tribulaciones.' },
            { reference: 'Nahúm 1:7', text: 'Jehová es bueno, fortaleza en el día de la angustia; y conoce a los que en él confían.' }
        ]
    },
    {
        id: 'esperanza',
        title: 'Esperanza',
        icon: <FaCloudSun />,
        gradient: 'linear-gradient(135deg, #00b09b 0%, #96c93d 100%)',
        verses: [
            { reference: 'Jeremías 29:11', text: 'Porque yo sé los pensamientos que tengo acerca de vosotros... pensamientos de paz, y no de mal, para daros el fin que esperáis.' },
            { reference: 'Romanos 15:13', text: 'Y el Dios de esperanza os llene de todo gozo y paz en el creer.' },
            { reference: 'Hebreos 6:19', text: 'La cual tenemos como segura y firme ancla del alma.' },
            { reference: 'Romanos 5:5', text: 'Y la esperanza no avergüenza; porque el amor de Dios ha sido derramado en nuestros corazones.' },
            { reference: 'Lamentaciones 3:22-23', text: 'Por la misericordia de Jehová no hemos sido consumidos... nueva es cada mañana.' },
            { reference: 'Salmos 42:11', text: 'Espera en Dios; porque aún he de alabarle, salvación mía y Dios mío.' }
        ]
    },
    {
        id: 'fortaleza',
        title: 'Fortaleza',
        icon: <FaBolt />,
        gradient: 'linear-gradient(135deg, #c31432 0%, #240b36 100%)',
        verses: [
            { reference: 'Filipenses 4:13', text: 'Todo lo puedo en Cristo que me fortalece.' },
            { reference: 'Isaías 40:31', text: 'Pero los que esperan a Jehová tendrán nuevas fuerzas; levantarán alas como las águilas.' },
            { reference: 'Josué 1:9', text: 'Mira que te mando que te esfuerces y seas valiente; no temas ni desmayes.' },
            { reference: 'Efesios 6:10', text: 'Fortaleceos en el Señor, y en el poder de su fuerza.' },
            { reference: '2 Corintios 12:9', text: 'Bástate mi gracia; porque mi poder se perfecciona en la debilidad.' },
            { reference: 'Nehemías 8:10', text: 'El gozo de Jehová es vuestra fuerza.' }
        ]
    },
    {
        id: 'familia',
        title: 'Familia',
        icon: <FaUsers />,
        gradient: 'linear-gradient(135deg, #56CCF2 0%, #2F80ED 100%)',
        verses: [
            { reference: 'Josué 24:15', text: 'Pero yo y mi casa serviremos a Jehová.' },
            { reference: 'Proverbios 22:6', text: 'Instruye al niño en su camino, y aun cuando fuere viejo no se apartará de él.' },
            { reference: 'Efesios 6:1-3', text: 'Hijos, obedeced en el Señor a vuestros padres, porque esto es justo.' },
            { reference: 'Salmos 127:3', text: 'He aquí, herencia de Jehová son los hijos; cosa de estima el fruto del vientre.' },
            { reference: 'Colosenses 3:21', text: 'Padres, no exasperéis a vuestros hijos, para que no se desalienten.' },
            { reference: 'Deuteronomio 6:6-7', text: 'Y estas palabras... las repetirás a tus hijos, y hablarás de ellas.' }
        ]
    },
    {
        id: 'sanidad',
        title: 'Sanidad',
        icon: <FaLeaf />,
        gradient: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)',
        verses: [
            { reference: 'Éxodo 15:26', text: 'Yo soy Jehová tu sanador.' },
            { reference: 'Isaías 53:5', text: 'Por su llaga fuimos nosotros curados.' },
            { reference: 'Jeremías 30:17', text: 'Mas yo haré venir sanidad para ti, y sanaré tus heridas, dice Jehová.' },
            { reference: 'Santiago 5:15', text: 'Y la oración de fe salvará al enfermo, y el Señor lo levantará.' },
            { reference: '3 Juan 1:2', text: 'Amado, yo deseo que tú seas prosperado en todas las cosas, y que tengas salud.' },
            { reference: 'Salmos 103:3', text: 'Él es quien perdona todas tus iniquidades, el que sana todas tus dolencias.' }
        ]
    },
    {
        id: 'provisión',
        title: 'Provisión',
        icon: <FaSeedling />,
        gradient: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)',
        verses: [
            { reference: 'Filipenses 4:19', text: 'Mi Dios, pues, suplirá todo lo que os falta conforme a sus riquezas en gloria.' },
            { reference: 'Mateo 6:33', text: 'Mas buscad primeramente el reino de Dios... y todas estas cosas os serán añadidas.' },
            { reference: 'Salmos 37:25', text: 'Joven fui, y he envejecido, y no he visto justo desamparado, ni su descendencia que mendigue pan.' },
            { reference: 'Salmos 23:1', text: 'Jehová es mi pastor; nada me faltará.' },
            { reference: 'Deuteronomio 8:18', text: 'Acuérdate de Jehová tu Dios, porque él te da el poder para hacer las riquezas.' },
            { reference: '2 Corintios 9:8', text: 'Y poderoso es Dios para hacer que abunde en vosotros toda gracia.' }
        ]
    },
    {
        id: 'sabiduria',
        title: 'Sabiduría',
        icon: <FaScaleBalanced />,
        gradient: 'linear-gradient(135deg, #654ea3 0%, #eaafc8 100%)',
        verses: [
            { reference: 'Santiago 1:5', text: 'Y si alguno de vosotros tiene falta de sabiduría, pídala a Dios... y le será dada.' },
            { reference: 'Proverbios 3:5-6', text: 'Fíate de Jehová de todo tu corazón, y no te apoyes en tu propia prudencia.' },
            { reference: 'Proverbios 9:10', text: 'El temor de Jehová es el principio de la sabiduría.' },
            { reference: 'Colosenses 3:16', text: 'La palabra de Cristo more en abundancia en vosotros, enseñándoos y exhortándoos unos a otros en toda sabiduría.' },
            { reference: 'Proverbios 4:7', text: 'Sabiduría ante todo; adquiere sabiduría; y sobre todas tus posesiones adquiere inteligencia.' },
            { reference: 'Eclesiastés 7:12', text: 'Porque escudo es la ciencia, y escudo es el dinero; mas la sabiduría excede, en que da vida a sus poseedores.' }
        ]
    }
];

const VersesByTopic = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState(null);

    return (
        <div style={{ marginTop: '20px', marginBottom: '20px' }}>
            {/* Trigger Button/Card */}
            <div
                onClick={() => setIsOpen(true)}
                style={{
                    background: 'linear-gradient(to right, #1e3c72, #2a5298)',
                    borderRadius: '16px',
                    padding: '20px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                    transition: 'transform 0.2s',
                    color: '#fff',
                    marginBottom: '15px'
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
                        <FaBookBible />
                    </div>
                    <div>
                        <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 'bold' }}>Versículos por Tema</h3>
                        <p style={{ margin: 0, fontSize: '0.9rem', color: 'rgba(255,255,255,0.9)' }}>Fe, Jesús, Temor, Liberación y más.</p>
                    </div>
                </div>
                <FaChevronRight />
            </div>

            {/* LIST MODAL */}
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
                            <FaBookBible color="#2a5298" /> Versículos por Tema
                        </h2>
                        <button
                            onClick={() => setIsOpen(false)}
                            style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', padding: '8px', borderRadius: '50%', cursor: 'pointer', display: 'flex' }}
                        >
                            <FaXmark size={20} />
                        </button>
                    </div>

                    {/* Categories Grid */}
                    <div style={{ padding: '20px' }}>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                            gap: '12px'
                        }}>
                            {VERSES_BY_TOPIC.map((topic) => (
                                <div
                                    key={topic.id}
                                    onClick={() => setSelectedTopic(topic)}
                                    style={{
                                        background: topic.gradient,
                                        borderRadius: '14px',
                                        padding: '20px 15px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '10px',
                                        transition: 'transform 0.2s, box-shadow 0.2s',
                                        boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                                        minHeight: '100px'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-3px)';
                                        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.4)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
                                    }}
                                >
                                    <div style={{
                                        fontSize: '1.8rem',
                                        color: 'rgba(255,255,255,0.95)'
                                    }}>
                                        {topic.icon}
                                    </div>
                                    <span style={{
                                        color: '#fff',
                                        fontWeight: '600',
                                        fontSize: '0.9rem',
                                        textAlign: 'center'
                                    }}>
                                        {topic.title}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* DETAIL MODAL */}
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
                        <div style={{ fontSize: '1.5rem' }}>{selectedTopic.icon}</div>
                        <h2 style={{ margin: 0, fontSize: '1.2rem', flex: 1, fontWeight: 'bold' }}>{selectedTopic.title}</h2>
                    </div>

                    {/* Verses Content */}
                    <div style={{ padding: '20px', overflowY: 'auto', flex: 1 }}>
                        <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '20px', fontSize: '0.9rem' }}>
                            Versículos para fortalecer tu fe sobre este tema:
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            {selectedTopic.verses.map((verse, index) => (
                                <div
                                    key={index}
                                    style={{
                                        background: 'rgba(255,255,255,0.05)',
                                        borderRadius: '12px',
                                        padding: '18px',
                                        borderLeft: `4px solid ${selectedTopic.gradient.includes('#') ? selectedTopic.gradient.match(/#[a-fA-F0-9]{6}/)?.[0] : '#667eea'}`
                                    }}
                                >
                                    <p style={{
                                        color: '#e0e0e0',
                                        fontSize: '0.95rem',
                                        lineHeight: '1.6',
                                        margin: 0,
                                        marginBottom: '10px',
                                        fontStyle: 'italic'
                                    }}>
                                        "{verse.text}"
                                    </p>
                                    <span style={{
                                        color: 'rgba(255,255,255,0.6)',
                                        fontSize: '0.85rem',
                                        fontWeight: '600'
                                    }}>
                                        — {verse.reference}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => setSelectedTopic(null)}
                            style={{
                                width: '100%',
                                padding: '15px',
                                marginTop: '30px',
                                background: 'rgba(255,255,255,0.1)',
                                border: 'none',
                                borderRadius: '12px',
                                color: '#fff',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                marginBottom: '40px'
                            }}
                        >
                            Volver a Temas
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

export default VersesByTopic;
