import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaUtensils, FaPrayingHands, FaBookOpen, FaUser } from 'react-icons/fa';

const BottomNav = () => {
    return (
        <nav className="bottom-nav-container">
            <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <FaHome />
                <span>Inicio</span>
            </NavLink>
            <NavLink to="/fasting" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <FaUtensils />
                <span>Ayuno</span>
            </NavLink>
            <NavLink to="/prayer" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <FaPrayingHands />
                <span>Orar</span>
            </NavLink>
            <NavLink to="/bible" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <FaBookOpen />
                <span>Biblia</span>
            </NavLink>
            <NavLink to="/profile" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <FaUser />
                <span>Perfil</span>
            </NavLink>
        </nav>
    );
};

export default BottomNav;
