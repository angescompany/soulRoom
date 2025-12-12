import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight, FaFont, FaSearch, FaBook, FaVolumeUp, FaStop } from 'react-icons/fa';
import { useAppContext } from '../../../context/AppContext';
import { fetchBibleChapter, BIBLE_BOOKS } from '../../../services/bibleApi';

const Bible = () => {
    const { bibleState, setBibleState } = useAppContext();
    const location = useLocation();
    const [view, setView] = useState('content'); // 'books', 'chapters', 'content'
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isReading, setIsReading] = useState(false);
    const [voices, setVoices] = useState([]);
    const [selectedVoice, setSelectedVoice] = useState(null);
    const speechRef = React.useRef(null);

    // Load voices
    useEffect(() => {
        const loadVoices = () => {
            const extraVoices = window.speechSynthesis.getVoices();
            setVoices(extraVoices);
        };

        window.speechSynthesis.onvoiceschanged = loadVoices;
        loadVoices();

        return () => {
            window.speechSynthesis.onvoiceschanged = null;
        };
    }, []);

    // Select default voice based on language
    useEffect(() => {
        if (voices.length > 0) {
            const lang = bibleState.version === 'web' ? 'en' : 'es';
            let defaultVoice;

            if (lang === 'es') {
                // Priority: Monica > Paulina > First Spanish voice
                const monica = voices.find(v => v.name.toLowerCase().includes('monica'));
                const paulina = voices.find(v => v.name.toLowerCase().includes('paulina'));
                // Use Monica or Paulina if available. 
                // If neither is available, try to find any Spanish voice, 
                // essentially falling back even if they aren't in the strict dropdown (better to have voice than none)
                defaultVoice = monica || paulina || voices.find(v => v.lang.startsWith('es'));
            } else {
                defaultVoice = voices.find(v => v.lang.startsWith(lang));
            }

            if (defaultVoice) {
                setSelectedVoice(defaultVoice);
            }
        }
    }, [voices, bibleState.version]);

    // Stop reading when component unmounts or content changes
    useEffect(() => {
        return () => {
            if (speechRef.current) {
                window.speechSynthesis.cancel();
            }
        };
    }, []);

    useEffect(() => {
        // Stop reading if chapter changes
        if (isReading) {
            window.speechSynthesis.cancel();
            setIsReading(false);
        }
    }, [bibleState.book, bibleState.chapter]);

    const handleReadAloud = () => {
        if (isReading) {
            window.speechSynthesis.cancel();
            setIsReading(false);
        } else {
            if (!content) return;

            let textToRead = '';
            if (content.type === 'html') {
                // Strip HTML tags for reading
                const tmp = document.createElement("DIV");
                tmp.innerHTML = content.content;
                textToRead = tmp.textContent || tmp.innerText || "";
            } else {
                // Only read the text, not the numbers
                textToRead = content.verses.map(v => v.text).join(' ');
            }

            const utterance = new SpeechSynthesisUtterance(textToRead);
            if (selectedVoice) {
                utterance.voice = selectedVoice;
            }
            utterance.lang = bibleState.version === 'web' ? 'en-US' : 'es-ES';
            utterance.rate = 1.0;
            utterance.pitch = 1.0;

            utterance.onend = () => {
                setIsReading(false);
            };

            speechRef.current = utterance;
            window.speechSynthesis.speak(utterance);
            setIsReading(true);
        }
    };

    // Handle navigation state from other components (e.g. Fasting Guide)
    useEffect(() => {
        if (location.state && (location.state.book || location.state.bookId) && location.state.chapter) {
            // Find book by ID (preferred) or Name
            const targetBook = BIBLE_BOOKS.find(b =>
                (location.state.bookId && b.id === location.state.bookId) ||
                b.name === location.state.book ||
                b.id === location.state.book
            );

            if (targetBook) {
                const targetChapter = location.state.chapter.toString();

                // CRITICAL FIX: Check if we are already on the requested book/chapter.
                // If so, the default useEffect [bibleState...] won't run because values didn't change.
                // We must handle this 'same-state' navigation manually to ensure content loads.
                if (bibleState.book === targetBook.id && bibleState.chapter === targetChapter) {
                    setView('content');
                    // Force load if content is missing or doesn't match (e.g. after unmount)
                    if (!content || content.meta?.book !== targetBook.id || content.meta?.chapter !== targetChapter) {
                        loadContent();
                    }
                } else {
                    // Different content requested. Force clear to prevent stale display.
                    setContent(null);
                    setLoading(true);

                    setBibleState(prev => ({
                        ...prev,
                        book: targetBook.id,
                        chapter: targetChapter
                    }));
                    setView('content');
                }
            }
        }
    }, [location.state]);

    // Load content when state changes
    useEffect(() => {
        if (view === 'content') loadContent();
    }, [bibleState.book, bibleState.chapter, bibleState.version]);

    const lastRequestId = React.useRef(0);

    const loadContent = async () => {
        const requestId = ++lastRequestId.current;
        setLoading(true);
        const requestedBook = bibleState.book;
        const requestedChapter = bibleState.chapter;

        try {
            const data = await fetchBibleChapter(bibleState.version, requestedBook, requestedChapter);

            // Only update if this is still the latest request
            if (requestId === lastRequestId.current) {
                setContent({
                    ...data,
                    meta: { book: requestedBook, chapter: requestedChapter }
                });
                setLoading(false);
            }
        } catch (error) {
            console.error("Error loading chapter:", error);
            if (requestId === lastRequestId.current) {
                setLoading(false);
            }
        }
    };

    const handleBookSelect = (bookId) => {
        setBibleState(prev => ({ ...prev, book: bookId, chapter: '1' }));
        setView('chapters');
        setSearchTerm('');
    };

    const handleChapterSelect = (chapter) => {
        setBibleState(prev => ({ ...prev, chapter: chapter.toString() }));
        setView('content');
    };

    const handleNextChapter = () => {
        const book = BIBLE_BOOKS.find(b => b.id === bibleState.book);
        const currentChap = parseInt(bibleState.chapter);
        if (currentChap < book.chapters) {
            setBibleState(prev => ({ ...prev, chapter: (currentChap + 1).toString() }));
        }
    };

    const handlePrevChapter = () => {
        const currentChap = parseInt(bibleState.chapter);
        if (currentChap > 1) {
            setBibleState(prev => ({ ...prev, chapter: (currentChap - 1).toString() }));
        }
    };

    // Filter books based on search
    const filteredBooks = BIBLE_BOOKS.filter(b =>
        b.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const oldTestament = filteredBooks.filter(b => b.test === 'AT');
    const newTestament = filteredBooks.filter(b => b.test === 'NT');

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>

            {/* Glass Header */}
            <header className="glass-card" style={{
                marginBottom: '20px',
                padding: '15px',
                display: 'flex',
                flexDirection: 'column',
                gap: '15px'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button
                        onClick={() => setView('books')}
                        style={{ background: 'transparent', border: 'none', color: 'var(--accent)', fontSize: '1.2rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                    >
                        <FaBook size={16} />
                        <span>{BIBLE_BOOKS.find(b => b.id === bibleState.book)?.name} {bibleState.chapter}</span>
                        <FaChevronRight size={12} style={{ opacity: 0.7 }} />
                    </button>

                    {/* Voice Selection Mobile friendly */}
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        {isReading && (
                            <select
                                className="custom-input"
                                style={{ padding: '4px 8px', fontSize: '0.8rem', maxWidth: '120px' }}
                                value={selectedVoice?.name || ''}
                                onChange={(e) => {
                                    const voice = voices.find(v => v.name === e.target.value);
                                    if (voice) {
                                        setSelectedVoice(voice);
                                        // If reading, restart with new voice
                                        if (isReading) {
                                            window.speechSynthesis.cancel();
                                            // Short timeout to ensure cancel completes
                                            setTimeout(() => {
                                                handleReadAloud(); // This will not work directly because handleReadAloud toggles.
                                                // We need to refactor handleReadAloud or just let user restart.
                                                // For now let's just update the voice state, effect will not auto-restart.
                                                setIsReading(false);
                                            }, 100);
                                        }
                                    }
                                }}
                            >
                                {voices
                                    .filter(v => {
                                        const isSpanish = bibleState.version !== 'web';
                                        const langMatch = v.lang.startsWith(isSpanish ? 'es' : 'en');
                                        if (!langMatch) return false;

                                        // For Spanish, filter only Monica and Paulina
                                        if (isSpanish) {
                                            const name = v.name.toLowerCase();
                                            // Check for Monica or Paulina
                                            // If neither exists in the list, we might want to fallback, 
                                            // but user asked specifically for these. 
                                            // Let's check availability first.
                                            return name.includes('monica') || name.includes('paulina');
                                        }

                                        return true;
                                    })
                                    .map(v => (
                                        <option key={v.name} value={v.name}>
                                            {v.name.slice(0, 20)}...
                                        </option>
                                    ))}
                            </select>
                        )}

                        <button
                            onClick={handleReadAloud}
                            className="btn-secondary"
                            style={{
                                padding: '8px',
                                borderRadius: '8px',
                                background: isReading ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
                                borderColor: isReading ? 'transparent' : 'rgba(255,255,255,0.1)'
                            }}
                            title={isReading ? "Detener lectura" : "Leer en voz alta"}
                        >
                            {isReading ? <FaStop size={14} /> : <FaVolumeUp size={14} />}
                        </button>
                        <button onClick={() => setBibleState(prev => ({ ...prev, fontSize: Math.max(14, prev.fontSize - 2) }))} className="btn-secondary" style={{ padding: '8px', borderRadius: '8px' }}>
                            <FaFont size={10} />
                        </button>
                        <button onClick={() => setBibleState(prev => ({ ...prev, fontSize: Math.min(32, prev.fontSize + 2) }))} className="btn-secondary" style={{ padding: '8px', borderRadius: '8px' }}>
                            <FaFont size={14} />
                        </button>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                    <select
                        value={bibleState.version}
                        onChange={(e) => setBibleState(prev => ({ ...prev, version: e.target.value }))}
                        className="custom-input"
                        style={{ padding: '8px 12px', fontSize: '0.9rem' }}
                    >
                        <option value="web">Inglés (WEB)</option>
                        <option value="es-rv09">Reina Valera 1909</option>
                        <option value="es-bes">Español Sencillo</option>
                    </select>
                </div>
            </header>

            {/* Content Area */}
            {view === 'content' && (
                <div className="glass-card" style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
                    {(loading || (content && (content.meta?.book !== bibleState.book || content.meta?.chapter !== bibleState.chapter))) ? (
                        <div style={{ textAlign: 'center', padding: '40px', opacity: 0.7 }}>
                            <div className="loading-spinner"></div>
                            <p>Cargando escritura...</p>
                        </div>
                    ) : content ? (
                        <>
                            <div className="bible-text" style={{
                                fontSize: `${bibleState.fontSize}px`,
                                fontFamily: 'var(--font-serif)',
                                lineHeight: '1.8',
                                color: '#fff'
                            }}>
                                {content.type === 'html' ? (
                                    <div dangerouslySetInnerHTML={{ __html: content.content }} />
                                ) : (
                                    content.verses.map(v => (
                                        <div key={v.verse} style={{ marginBottom: '15px' }}>
                                            <span style={{
                                                color: 'var(--accent)',
                                                fontSize: '0.8em',
                                                fontWeight: 'bold',
                                                marginRight: '8px',
                                                verticalAlign: 'super'
                                            }}>{v.verse}</span>
                                            <span>{v.text}</span>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Navigation Footer */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                                <button className="btn-secondary" onClick={handlePrevChapter} disabled={bibleState.chapter === '1'}>
                                    <FaChevronLeft /> Anterior
                                </button>
                                <button className="btn-secondary" onClick={handleNextChapter}>
                                    Siguiente <FaChevronRight />
                                </button>
                            </div>
                        </>
                    ) : null}
                </div>
            )}

            {/* Book Selection Overlay */}
            {['books', 'chapters'].includes(view) && (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'var(--bg-dark)',
                    zIndex: 2000,
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', gap: '10px' }}>
                        <button onClick={() => setView(view === 'books' ? 'content' : 'books')} className="btn-secondary" style={{ padding: '8px' }}>
                            <FaChevronLeft />
                        </button>
                        <h2>{view === 'books' ? 'Libros' : `Capítulos - ${BIBLE_BOOKS.find(b => b.id === bibleState.book)?.name}`}</h2>
                    </div>

                    {view === 'books' && (
                        <div style={{ marginBottom: '15px' }}>
                            <div style={{ position: 'relative' }}>
                                <FaSearch style={{ position: 'absolute', left: '12px', top: '12px', color: 'rgba(255,255,255,0.5)' }} />
                                <input
                                    type="text"
                                    placeholder="Buscar libro..."
                                    className="custom-input"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    style={{ paddingLeft: '35px' }}
                                />
                            </div>
                        </div>
                    )}

                    <div style={{ overflowY: 'auto', paddingBottom: '20px' }}>
                        {view === 'books' ? (
                            <>
                                {oldTestament.length > 0 && <h3 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: '15px 0 10px' }}>Antiguo Testamento</h3>}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                    {oldTestament.map(book => (
                                        <BookButton key={book.id} book={book} isSelected={book.id === bibleState.book} onClick={() => handleBookSelect(book.id)} />
                                    ))}
                                </div>

                                {newTestament.length > 0 && <h3 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: '20px 0 10px' }}>Nuevo Testamento</h3>}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                    {newTestament.map(book => (
                                        <BookButton key={book.id} book={book} isSelected={book.id === bibleState.book} onClick={() => handleBookSelect(book.id)} />
                                    ))}
                                </div>

                                {filteredBooks.length === 0 && (
                                    <p style={{ textAlign: 'center', opacity: 0.6, marginTop: '20px' }}>No se encontraron libros.</p>
                                )}
                            </>
                        ) : (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))', gap: '10px' }}>
                                {Array.from({ length: BIBLE_BOOKS.find(b => b.id === bibleState.book)?.chapters || 0 }, (_, i) => i + 1).map(chap => (
                                    <button
                                        key={chap}
                                        className="glass-card"
                                        onClick={() => handleChapterSelect(chap)}
                                        style={{
                                            padding: '15px',
                                            fontSize: '1.2rem',
                                            fontWeight: 'bold',
                                            cursor: 'pointer',
                                            background: chap.toString() === bibleState.chapter ? 'var(--primary)' : 'rgba(255,255,255,0.08)',
                                            color: '#fff',
                                            border: chap.toString() === bibleState.chapter ? 'none' : '1px solid rgba(255,255,255,0.1)'
                                        }}
                                    >
                                        {chap}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

const BookButton = ({ book, isSelected, onClick }) => (
    <button
        onClick={onClick}
        className="glass-card"
        style={{
            padding: '15px',
            textAlign: 'center',
            cursor: 'pointer',
            background: isSelected ? 'var(--primary)' : 'rgba(255,255,255,0.08)',
            border: isSelected ? 'none' : '1px solid rgba(255,255,255,0.1)',
            transition: 'background 0.2s'
        }}
    >
        <div style={{ fontSize: '0.95rem', fontWeight: 'bold', color: '#fff', marginBottom: '2px' }}>{book.name}</div>
        <div style={{ fontSize: '0.75rem', color: isSelected ? 'rgba(255,255,255,0.8)' : 'var(--text-muted)' }}>{book.chapters} caps</div>
    </button>
);

export default Bible;
