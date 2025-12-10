import React, { useState, useRef } from 'react';
import { FaUser, FaCog, FaMoon, FaBell, FaVolumeUp, FaTrash, FaPen, FaMedal } from 'react-icons/fa';
import { useAppContext } from '../../../context/AppContext';
import Achievements from './Achievements';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import { auth, storage } from '../../../services/firebase';

const Profile = () => {
    const { user, setUser, settings, setSettings, fastingHistory, prayingHistory, clearAllData, login } = useAppContext();

    const [uploading, setUploading] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [statusMsg, setStatusMsg] = useState('');
    const fileInputRef = useRef(null);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        setStatusMsg('Procesando...');
        setImageError(false);

        // Optimistic update
        const localUrl = URL.createObjectURL(file);
        setUser(prev => ({ ...prev, avatar: localUrl }));

        try {
            const storageRef = ref(storage, `avatars/${user.uid}/${file.name}`);
            const snapshot = await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);

            await updateProfile(auth.currentUser, { photoURL: downloadURL });
            setUser(prev => ({ ...prev, avatar: downloadURL }));

            setStatusMsg('¡Guardado!');
            setTimeout(() => setStatusMsg(''), 3000);
        } catch (error) {
            console.error('Upload error (CORS):', error);
            setStatusMsg('CORS activo: Vista local.');
            setTimeout(() => setStatusMsg(''), 4000);
        } finally {
            setUploading(false);
        }
    };

    if (!user) {
        return (
            <div style={{ padding: '40px 20px', textAlign: 'center', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🔐</div>
                <h2 style={{ marginBottom: '10px' }}>Inicia Sesión</h2>
                <p style={{ opacity: 0.7, marginBottom: '30px' }}>Guarda tu progreso en la nube y accede desde cualquier dispositivo.</p>
                <button
                    onClick={login}
                    className="glass-card"
                    style={{
                        padding: '15px 30px',
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        background: 'var(--primary)',
                        border: 'none',
                        color: 'white',
                        display: 'flex', alignItems: 'center', gap: '10px'
                    }}
                >
                    <FaUser /> Iniciar con Google
                </button>
            </div>
        );
    }

    // Stats Logic
    const totalFastingTime = fastingHistory.reduce((acc, curr) => acc + curr.duration, 0);
    const totalPrayingTime = prayingHistory.reduce((acc, curr) => acc + curr.duration, 0);
    const streak = 0;

    const stats = {
        totalFasts: fastingHistory.length,
        totalPrayers: prayingHistory.length,
        totalFastingTime,
        totalPrayingTime,
        streak
    };

    const handleUpdateName = (e) => {
        setUser({ ...user, name: e.target.value });
    };

    const toggleSetting = async (key) => {
        const newValue = !settings[key];

        if (key === 'notifications' && newValue === true) {
            if ('Notification' in window) {
                if (Notification.permission !== 'granted') {
                    const permission = await Notification.requestPermission();
                    if (permission !== 'granted') {
                        alert('Debes permitir las notificaciones en tu navegador para activar esta función.');
                        return;
                    }
                }
            }
        }

        setSettings({ ...settings, [key]: newValue });
    };

    return (
        <div style={{ paddingBottom: '40px' }}>
            {/* Header / Avatar */}
            <div style={{ textAlign: 'center', marginBottom: '30px', paddingTop: '20px' }}>
                <div style={{
                    position: 'relative',
                    width: '120px',
                    height: '120px',
                    margin: '0 auto 15px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                    border: '4px solid rgba(255,255,255,0.1)',
                    overflow: 'hidden'
                }}>
                    {user.avatar && !imageError ? (
                        <img
                            src={user.avatar}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={() => setImageError(true)}
                            alt="Profile"
                        />
                    ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--primary)', fontSize: '3rem', color: '#fff' }}>
                            {user.name ? user.name.charAt(0).toUpperCase() : <FaUser />}
                        </div>
                    )}

                    {/* Loading Overlay */}
                    {uploading && (
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div className="spinner-small" style={{ width: '20px', height: '20px', border: '2px solid #fff', borderTop: '2px solid transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                        </div>
                    )}

                    <button
                        onClick={() => fileInputRef.current.click()}
                        disabled={uploading}
                        style={{
                            position: 'absolute',
                            bottom: '5px',
                            right: '5px',
                            background: 'white',
                            border: 'none',
                            borderRadius: '50%',
                            width: '35px',
                            height: '35px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--primary)',
                            cursor: 'pointer',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                        }}
                    >
                        <FaPen size={14} />
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                        accept="image/*"
                    />
                </div>

                {/* Status Message */}
                {statusMsg && (
                    <div style={{ paddingBottom: '10px' }}>
                        <p style={{
                            display: 'inline-block',
                            margin: '0',
                            fontSize: '0.85rem',
                            color: statusMsg.includes('CORS') || statusMsg.includes('Error') ? '#ffdd59' : '#00b894',
                            background: 'rgba(0, 0, 0, 0.3)',
                            padding: '6px 16px',
                            borderRadius: '20px',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}>
                            {statusMsg}
                        </p>
                    </div>
                )}

                <input
                    type="text"
                    value={user.name || ''}
                    onChange={handleUpdateName}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'white',
                        fontSize: '1.8rem',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        width: '100%',
                        outline: 'none'
                    }}
                    placeholder="Tu Nombre"
                />
                <p style={{ opacity: 0.6, fontSize: '0.9rem' }}>Miembro desde {user.joinDate ? new Date(user.joinDate).getFullYear() : new Date().getFullYear()}</p>
            </div>

            {/* Stats Overview */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '30px' }}>
                <div className="glass-card" style={{ textAlign: 'center', padding: '15px' }}>
                    <h3 style={{ fontSize: '1.8rem', color: 'var(--accent)' }}>{Math.floor(totalFastingTime / 3600)}h</h3>
                    <p style={{ fontSize: '0.8rem' }}>Tiempo Ayunando</p>
                </div>
                <div className="glass-card" style={{ textAlign: 'center', padding: '15px' }}>
                    <h3 style={{ fontSize: '1.8rem', color: 'var(--accent)' }}>{Math.floor(totalPrayingTime / 3600)}h</h3>
                    <p style={{ fontSize: '0.8rem' }}>Tiempo Orando</p>
                </div>
            </div>

            {/* Achievements Section */}
            <div style={{ marginBottom: '30px' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FaMedal color="var(--accent)" /> Logros
                </h3>
                <Achievements stats={stats} />
            </div>

            {/* Settings */}
            <h3 style={{ fontSize: '1.2rem', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FaCog color="var(--text-muted)" /> Configuración
            </h3>
            <div className="glass-card" style={{ padding: '0 20px' }}>
                <SettingRow
                    icon={<FaMoon />}
                    label="Modo Oscuro"
                    checked={settings.darkMode}
                    onChange={() => toggleSetting('darkMode')}
                />
                <SettingRow
                    icon={<FaBell />}
                    label="Notificaciones"
                    checked={settings.notifications}
                    onChange={() => toggleSetting('notifications')}
                />
                <SettingRow
                    icon={<FaVolumeUp />}
                    label="Sonidos"
                    checked={settings.sounds}
                    onChange={() => toggleSetting('sounds')}
                    last
                />
            </div>

            <button
                className="btn-text danger"
                onClick={() => { if (confirm('¿Borrar todos los datos?')) clearAllData() }}
                style={{
                    color: '#ff4757',
                    background: 'rgba(255, 71, 87, 0.1)',
                    padding: '15px',
                    borderRadius: '12px',
                    marginTop: '30px',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    border: '1px solid rgba(255, 71, 87, 0.2)',
                    cursor: 'pointer'
                }}
            >
                <FaTrash /> Borrar Datos
            </button>
        </div>
    );
};

const SettingRow = ({ icon, label, checked, onChange, last }) => (
    <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 0',
        borderBottom: last ? 'none' : '1px solid rgba(255,255,255,0.05)'
    }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ color: 'var(--text-muted)' }}>{icon}</span>
            <span style={{ fontWeight: '500' }}>{label}</span>
        </div>
        <label className="switch">
            <input type="checkbox" checked={checked} onChange={onChange} />
            <span className="slider"></span>
        </label>
    </div>
);

export default Profile;
