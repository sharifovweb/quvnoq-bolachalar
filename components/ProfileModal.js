'use client';

import { useState, useEffect } from 'react';
import sound from '../lib/sound';
import StorageManager from '../lib/storage';

const AVATARS = ['🦁', '🐰', '🐻', '🦊', '🚀', '🦉', '🐼', '🦄', '🐯', '🐬', '🎨', '⚡'];

export default function ProfileModal({ onClose }) {
  const [user, setUser] = useState({
    name: 'Azizbek',
    avatar: '🦁',
    level: 1,
    totalScore: 450,
    stars: 18,
    badges: ['🌟 Birinchi Qadam', '🦁 Jasur Bilimdon']
  });

  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('🦁');

  useEffect(() => {
    const current = StorageManager.getUser();
    setUser(current);
    setName(current.name || 'Azizbek');
    setSelectedAvatar(current.avatar || '🦁');
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    sound.correct();
    const updated = {
      ...user,
      name: name.trim() || 'Bolajon',
      avatar: selectedAvatar
    };
    StorageManager.saveUser(updated);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '520px', padding: '1.75rem' }}>
        <button className="modal-close" onClick={onClose} title="Yopish">✕</button>

        {/* Sarlavha */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.25rem' }}>{selectedAvatar}</div>
          <h2 style={{ fontSize: '1.65rem', color: '#0F172A', marginBottom: '0.25rem' }}>
            Mening Qahramonim (Profil)
          </h2>
          <p style={{ color: '#64748B', fontWeight: 600, fontSize: '0.9rem' }}>
            Sevimli qahramoningizni tanlang va ismingizni kiriting!
          </p>
        </div>

        <form onSubmit={handleSave}>
          {/* Avatar tanlash */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.85rem',
              fontWeight: 700,
              color: '#334155',
              marginBottom: '0.5rem'
            }}>
              Sevimli Maskotni Tanlang:
            </label>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(6, 1fr)',
              gap: '0.5rem'
            }}>
              {AVATARS.map((av) => (
                <button
                  key={av}
                  type="button"
                  onClick={() => {
                    sound.pop();
                    setSelectedAvatar(av);
                  }}
                  style={{
                    fontSize: '1.8rem',
                    padding: '0.45rem',
                    borderRadius: '14px',
                    border: '2px solid',
                    borderColor: selectedAvatar === av ? '#FF5E36' : '#E2E8F0',
                    background: selectedAvatar === av ? '#FFF3EE' : '#FFFFFF',
                    cursor: 'pointer',
                    transform: selectedAvatar === av ? 'scale(1.1)' : 'scale(1)',
                    transition: 'all 0.15s'
                  }}
                >
                  {av}
                </button>
              ))}
            </div>
          </div>

          {/* Ism kiritish */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.85rem',
              fontWeight: 700,
              color: '#334155',
              marginBottom: '0.35rem'
            }}>
              Ismingiz:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.65rem 0.95rem',
                borderRadius: '12px',
                border: '1.5px solid #CBD5E1',
                fontSize: '1rem',
                fontFamily: 'inherit',
                fontWeight: 700,
                outline: 'none'
              }}
            />
          </div>

          {/* Yutuqlar va Statistika */}
          <div style={{
            background: '#FFFBEB',
            borderRadius: '16px',
            padding: '1rem',
            border: '1.5px solid #FCD34D',
            marginBottom: '1.5rem',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            textAlign: 'center'
          }}>
            <div>
              <div style={{ fontSize: '0.78rem', color: '#92400E', fontWeight: 700 }}>Daraja</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#B45309' }}>{user.level || 1}-lvl</div>
            </div>
            <div>
              <div style={{ fontSize: '0.78rem', color: '#92400E', fontWeight: 700 }}>Yulduzlar</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#D97706' }}>⭐ {user.stars || 0}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.78rem', color: '#92400E', fontWeight: 700 }}>Jami Ball</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#FF5E36' }}>{user.totalScore || 0}</div>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.8rem', fontSize: '1.05rem' }}
          >
            <span>💾 Saqlash</span>
          </button>
        </form>
      </div>
    </div>
  );
}
