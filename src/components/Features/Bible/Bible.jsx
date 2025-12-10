import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight, FaFont, FaSearch, FaBook } from 'react-icons/fa';
import { useAppContext } from '../../../context/AppContext';
import { fetchBibleChapter, BIBLE_BOOKS } from '../../../services/bibleApi';

const Bible = () => {
    const { bibleState, setBibleState } = useAppContext();
    const location = useLocation();
    const [view, setView] = useState('content'); // 'books', 'chapters', 'content'
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

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
                // Force clear previous content to prevent stale display
                setContent(null);
                setLoading(true);

                setBibleState(prev => ({
                    ...prev,
                    book: targetBook.id,
                    chapter: location.state.chapter.toString()
                }));
                setView('content');
            }
        }
    }, [location.state]);

    // Load content when state changes
    useEffect(() => {
        if (view === 'content') loadContent();
    }, [bibleState.book, bibleState.chapter, bibleState.version]);

    const loadContent = async () => {
        setLoading(true);
        const data = await fetchBibleChapter(bibleState.version, bibleState.book, bibleState.chapter);
        setContent(data);
        setLoading(false);
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

                    <div style={{ display: 'flex', gap: '10px' }}>
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
                    {loading ? (
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
