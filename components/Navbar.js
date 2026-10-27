'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import sound from '../lib/sound';
import StorageManager from '../lib/storage';

export default function Navbar({ onOpenProfile, onOpenTeacher, onOpenRoomJoin }) {
  const [user, setUser] = useState({ name: 'Azizbek', avatar: '🦁', stars: 18, totalScore: 450 });
  const [soundOn, setSoundOn] = useState(true);
  const [musicOn, setMusicOn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setUser(StorageManager.getUser());
    const handleUpdate = () => setUser(StorageManager.getUser());
    window.addEventListener('qb_user_updated', handleUpdate);
    return () => window.removeEventListener('qb_user_updated', handleUpdate);
  }, []);

  const handleToggleSound = () => {
    const newState = sound.toggleSound();
    setSoundOn(newState);
    if (newState) sound.click();
  };

  const handleToggleMusic = () => {
    sound.init();
    const newState = sound.toggleMusic();
    setMusicOn(newState);
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(16px)',
      borderBottom: '3px solid #FFE4D6',
      boxShadow: '0 4px 20px rgba(255, 94, 54, 0.08)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.65rem 1.25rem'
      }}>
        {/* Brend Logo */}
        <a href="#" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.85rem',
          textDecoration: 'none'
        }}>
          <div style={{
            position: 'relative',
            width: '52px',
            height: '52px',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 6px 16px rgba(255, 94, 54, 0.25)',
            border: '2px solid #FFD166'
          }}>
            <Image
              src="/images/logo.jpg"
              alt="Quvnoq Bolachalar Logo"
              width={52}
              height={52}
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
          <div>
            <div style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.45rem',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #FF5E36, #FF9F1C)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1.1
            }}>
              Quvnoq Bolachalar
            </div>
            <div style={{
              fontSize: '0.78rem',
              color: 'var(--text-muted)',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem'
            }}>
              <span style={{ color: '#FF5E36', fontWeight: 800 }}>Muallif: Odilova Mahsudaxon</span>
              <span>✨</span>
            </div>
          </div>
        </a>

        {/* Desktop Navigatsiya */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.25rem'
        }} className="desktop-nav">
          <a href="#games" style={navLinkStyle}>
            <span>🎮</span> O'yinlar
          </a>
          <a href="#rooms" style={navLinkStyle}>
            <span>🔑</span> Xona Kodu
          </a>
          <a href="#craft" style={navLinkStyle}>
            <span>🎨</span> Mozaika
          </a>
          <a href="#diploma" style={navLinkStyle}>
            <span>📜</span> Faxriy Diplom
          </a>
          <a href="#leaderboard" style={navLinkStyle}>
            <span>🏆</span> Chempionlar
          </a>
          <button 
            onClick={onOpenTeacher}
            style={{
              ...navLinkStyle,
              background: '#FFF3EE',
              color: '#FF5E36',
              borderRadius: '20px',
              padding: '0.4rem 0.9rem',
              border: '1.5px solid #FFD8C9',
              cursor: 'pointer'
            }}
          >
            <span>👩‍🏫</span> Ustoz Kabineti
          </button>
        </nav>

        {/* Foydalanuvchi va Ovoz boshqaruvi */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          {/* Ovoz va Musiqa tugmalari */}
          <button
            onClick={handleToggleSound}
            title={soundOn ? "Ovozlarni o'chirish" : "Ovozlarni yoqish"}
            style={iconBtnStyle}
          >
            {soundOn ? '🔊' : '🔇'}
          </button>

          <button
            onClick={handleToggleMusic}
            title={musicOn ? "Musiqani to'xtatish" : "Quvnoq musiqani yoqish"}
            style={{
              ...iconBtnStyle,
              background: musicOn ? '#E0F2FE' : '#F1F5F9',
              borderColor: musicOn ? '#38BDF8' : '#E2E8F0'
            }}
          >
            {musicOn ? '🎵' : '🎼'}
          </button>

          {/* Foydalanuvchi profili */}
          <button
            onClick={onOpenProfile}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'linear-gradient(135deg, #FFFBEB, #FEF3C7)',
              border: '2px solid #FCD34D',
              borderRadius: 'var(--radius-full)',
              padding: '0.35rem 0.85rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            title="Profilni o'zgartirish"
          >
            <span style={{ fontSize: '1.35rem' }}>{user.avatar || '🦁'}</span>
            <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: '#92400E'
              }}>
                {user.name || 'Bolajon'}
              </div>
              <div style={{
                fontSize: '0.72rem',
                fontWeight: 800,
                color: '#D97706',
                display: 'flex',
                alignItems: 'center',
                gap: '0.2rem'
              }}>
                <span>⭐</span> {user.stars || 0}
              </div>
            </div>
          </button>

          {/* Mobil Menyu Tugmasi */}
          <button
            onClick={() => {
              sound.click();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="mobile-burger-btn"
            style={{
              ...iconBtnStyle,
              background: mobileMenuOpen ? '#FFE4D6' : '#F8FAFC',
              borderColor: mobileMenuOpen ? '#FF5E36' : '#E2E8F0',
              display: 'none'
            }}
            title="Menyuni ochish"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobil Ochiladigan Menyu */}
      {mobileMenuOpen && (
        <div style={{
          background: '#FFFFFF',
          borderTop: '2px solid #FFE4D6',
          padding: '1rem 1.25rem',
          display: 'grid',
          gap: '0.85rem',
          boxShadow: '0 12px 25px rgba(0,0,0,0.08)',
          animation: 'fadeIn 0.2s ease-out'
        }}>
          <a
            href="#games"
            onClick={() => setMobileMenuOpen(false)}
            style={mobileNavLinkStyle}
          >
            <span>🎮</span> O'yinlar Saltanati
          </a>
          <a
            href="#rooms"
            onClick={() => setMobileMenuOpen(false)}
            style={mobileNavLinkStyle}
          >
            <span>🔑</span> Xona Kodu orqali Kirish
          </a>
          <a
            href="#craft"
            onClick={() => setMobileMenuOpen(false)}
            style={mobileNavLinkStyle}
          >
            <span>🎨</span> Mozaika & Hunar
          </a>
          <a
            href="#diploma"
            onClick={() => setMobileMenuOpen(false)}
            style={mobileNavLinkStyle}
          >
            <span>📜</span> Faxriy Diplom Yaratish
          </a>
          <a
            href="#leaderboard"
            onClick={() => setMobileMenuOpen(false)}
            style={mobileNavLinkStyle}
          >
            <span>🏆</span> Chempionlar Reytingi
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenTeacher();
            }}
            style={{
              ...mobileNavLinkStyle,
              background: '#FFF3EE',
              color: '#FF5E36',
              borderRadius: '14px',
              padding: '0.65rem 1rem',
              border: '1.5px solid #FFD8C9'
            }}
          >
            <span>👩‍🏫</span> Ustoz Kabineti
          </button>
        </div>
      )}
    </header>
  );
}

const mobileNavLinkStyle = {
  fontFamily: 'var(--font-heading)',
  fontSize: '1.05rem',
  fontWeight: 700,
  color: 'var(--text-main)',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: '0.65rem',
  padding: '0.5rem 0.25rem',
  background: 'none',
  border: 'none',
  width: '100%',
  textAlign: 'left',
  cursor: 'pointer'
};

const navLinkStyle = {
  fontFamily: 'var(--font-heading)',
  fontSize: '0.98rem',
  fontWeight: 600,
  color: 'var(--text-main)',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
  transition: 'color 0.2s',
  background: 'none',
  border: 'none'
};

const iconBtnStyle = {
  width: '38px',
  height: '38px',
  borderRadius: '50%',
  border: '1.5px solid #E2E8F0',
  background: '#F8FAFC',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.1rem',
  cursor: 'pointer',
  transition: 'all 0.2s'
};
