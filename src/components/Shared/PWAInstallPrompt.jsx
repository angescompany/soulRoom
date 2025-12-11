import React, { useState, useEffect } from 'react';
import { FaDownload, FaTimes, FaApple } from 'react-icons/fa';

const PWAInstallPrompt = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showIOSPrompt, setShowIOSPrompt] = useState(false);
    const [isInstalled, setIsInstalled] = useState(false);

    useEffect(() => {
        // Check if already installed
        if (window.matchMedia('(display-mode: standalone)').matches) {
            setIsInstalled(true);
        }

        // Android / Desktop Chrome: Capture the event
        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        // iOS Detection
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        const isStandalone = window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches;

        if (isIOS && !isStandalone) {
            // Wait a bit before showing to not be annoying immediately
            setTimeout(() => setShowIOSPrompt(true), 3000);
        }

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            setDeferredPrompt(null);
        }
    };

    if (isInstalled) return null;

    // Render Android/Desktop Install Button
    if (deferredPrompt) {
        return (
            <div className="pwa-install-toast glass-card" style={styles.toast}>
                <div style={styles.content}>
                    <div style={styles.icon}><FaDownload /></div>
                    <div>
                        <h4 style={{ margin: 0, color: '#fff' }}>Instalar App</h4>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: '#ccc' }}>Acceso rápido y pantalla completa</p>
                    </div>
                </div>
                <div style={styles.actions}>
                    <button onClick={() => setDeferredPrompt(null)} style={styles.closeBtn}><FaTimes /></button>
                    <button onClick={handleInstallClick} className="btn-primary" style={styles.installBtn}>Instalar</button>
                </div>
            </div>
        );
    }

    // Render iOS Instructions
    if (showIOSPrompt) {
        return (
            <div className="pwa-install-toast glass-card" style={styles.toast}>
                <div style={styles.content}>
                    <div style={styles.icon}><FaApple /></div>
                    <div>
                        <h4 style={{ margin: 0, color: '#fff' }}>Instalar en iPhone</h4>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: '#ccc' }}>
                            1. Toca el botón <strong>Compartir</strong> <span style={{ fontSize: '1.2rem' }}>⎋</span><br />
                            2. Selecciona <strong>"Agregar a Inicio"</strong>
                        </p>
                    </div>
                </div>
                <button onClick={() => setShowIOSPrompt(false)} style={styles.closeBtnAbsolute}><FaTimes /></button>
            </div>
        );
    }

    return null;
};

const styles = {
    toast: {
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        right: '20px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        padding: '15px',
        animation: 'slideUp 0.5s ease-out'
    },
    content: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        marginBottom: '10px'
    },
    icon: {
        fontSize: '1.5rem',
        color: 'var(--accent)'
    },
    actions: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '10px',
        alignItems: 'center'
    },
    installBtn: {
        padding: '8px 20px',
        fontSize: '0.9rem'
    },
    closeBtn: {
        background: 'none',
        border: 'none',
        color: '#aaa',
        cursor: 'pointer',
        fontSize: '1rem',
        padding: '8px'
    },
    closeBtnAbsolute: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        background: 'none',
        border: 'none',
        color: '#aaa',
        cursor: 'pointer'
    }
};

export default PWAInstallPrompt;
