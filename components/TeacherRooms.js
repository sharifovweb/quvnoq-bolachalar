'use client';

import { useState, useEffect } from 'react';
import sound from '../lib/sound';
import StorageManager from '../lib/storage';

export default function TeacherRooms({ onJoinRoom, onOpenTeacher }) {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    setRooms(StorageManager.getRooms());
    const handleUpdate = () => setRooms(StorageManager.getRooms());
    window.addEventListener('qb_rooms_updated', handleUpdate);
    return () => window.removeEventListener('qb_rooms_updated', handleUpdate);
  }, []);

  const handleJoin = (code) => {
    sound.click();
    onJoinRoom(code);
  };

  return (
    <section id="rooms" style={{
      padding: '3.5rem 0',
      background: 'linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(241, 245, 249, 0.6) 100%)'
    }}>
      <div className="container">
        {/* Sarlavha */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: '#FEF3C7',
              color: '#B45309',
              padding: '0.35rem 0.95rem',
              borderRadius: 'var(--radius-full)',
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: '0.88rem',
              marginBottom: '0.5rem'
            }}>
              <span>🏫</span> Sinfxona & Guruh Bellashuvlari
            </div>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', color: '#0F172A' }}>
              Faol Musobaqalar va Xona Kodlari 🔑
            </h2>
            <p style={{ color: '#64748B', fontWeight: 600, fontSize: '0.98rem' }}>
              Ustozlar tomonidan e'lon qilingan 4 xonali kodlar orqali sinfdoshlaringiz bilan birga bellashing!
            </p>
          </div>

          <button
            onClick={onOpenTeacher}
            className="btn btn-secondary"
            style={{ padding: '0.75rem 1.4rem' }}
          >
            <span>➕</span> Yangi Musobaqa Yaratish
          </button>
        </div>

        {/* Xonalar ro'yxati */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.25rem'
        }}>
          {rooms.map((room) => (
            <div
              key={room.code}
              className="card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '1.4rem',
                border: '2px solid #E2E8F0',
                background: '#FFFFFF'
              }}
            >
              <div>
                {/* Kod va Holat */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '0.85rem'
                }}>
                  <div style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.6rem',
                    fontWeight: 900,
                    letterSpacing: '2px',
                    color: '#FF5E36',
                    background: '#FFF5F0',
                    padding: '0.3rem 0.85rem',
                    borderRadius: '12px',
                    border: '1.5px dashed #FF8E53'
                  }}>
                    {room.code}
                  </div>

                  <span className="badge" style={{
                    background: '#DCFCE7',
                    color: '#15803D',
                    fontSize: '0.78rem'
                  }}>
                    ● Faol xona
                  </span>
                </div>

                <h3 style={{
                  fontSize: '1.15rem',
                  color: '#0F172A',
                  marginBottom: '0.5rem',
                  lineHeight: 1.3
                }}>
                  {room.title}
                </h3>

                <div style={{
                  fontSize: '0.85rem',
                  color: '#64748B',
                  marginBottom: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}>
                  <span>👩‍🏫 Ustoz:</span> <strong>{room.teacher}</strong>
                </div>

                <div style={{
                  display: 'flex',
                  gap: '0.5rem',
                  flexWrap: 'wrap',
                  marginBottom: '1rem',
                  fontSize: '0.8rem',
                  color: '#475569'
                }}>
                  <span style={pillStyle}>🎯 {room.questionsCount} ta savol</span>
                  <span style={pillStyle}>👥 {room.participants} o'quvchi</span>
                </div>
              </div>

              <button
                className="btn btn-primary"
                style={{
                  width: '100%',
                  padding: '0.65rem 1rem',
                  fontSize: '0.95rem'
                }}
                onClick={() => handleJoin(room.code)}
              >
                <span>🚀 Qo'shilish</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const pillStyle = {
  background: '#F8FAFC',
  padding: '0.25rem 0.65rem',
  borderRadius: '8px',
  border: '1px solid #E2E8F0',
  fontWeight: 600
};
