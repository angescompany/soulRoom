import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaGoogle } from 'react-icons/fa';
import { useAppContext } from '../../../context/AppContext';

const AuthPage = () => {
    const { login, user } = useAppContext();
    const navigate = useNavigate();

    // Redirect if user is already logged in
    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleLogin = async () => {
        try {
            await login();
            // detailed redirect handled by useEffect above upon user change
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    const handleSkip = () => {
        // Allow user to proceed as guest if they really want to (or we can remove this if strict)
        navigate('/');
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
            color: '#fff',
            textAlign: 'center'
        }}>

            {/* Animated Icon or Logo */}
            <div style={{
                marginBottom: '40px',
                fontSize: '4rem',
                animation: 'float 3s ease-in-out infinite'
            }}>
                🔐
            </div>

            <h1 style={{ marginBottom: '15px', fontSize: '2rem' }}>Crea tu Cuenta</h1>
            <p style={{
                marginBottom: '40px',
                maxWidth: '300px',
                lineHeight: '1.6',
                opacity: 0.8
            }}>
                Guarda tu progreso de oraciones y ayunos en la nube para no perderlos nunca.
            </p>

            <button
                onClick={handleLogin}
                className="glass-card"
                style={{
                    padding: '18px 30px',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    background: '#fff',
                    border: 'none',
                    borderRadius: '30px',
                    color: '#333',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    width: '100%',
                    maxWidth: '300px',
                    justifyContent: 'center',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                    transition: 'transform 0.2s',
                    marginBottom: '20px'
                }}
            >
                <FaGoogle color="#DB4437" /> Continuar con Google
            </button>

            <button
                onClick={handleSkip}
                style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                }}
            >
                Continuar como Invitado
            </button>

            <style>{`
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                    100% { transform: translateY(0px); }
                }
            `}</style>
        </div>
    );
};

export default AuthPage;
