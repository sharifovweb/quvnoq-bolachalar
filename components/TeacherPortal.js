'use client';

import { useState } from 'react';
import sound from '../lib/sound';
import { APP_DATA } from '../lib/data';
import StorageManager from '../lib/storage';

export default function TeacherPortal({ onClose, onOpenDiplomaWithData }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('quiz');
  const [code, setCode] = useState(Math.floor(1000 + Math.random() * 9000).toString());
  const [teacher, setTeacher] = useState('Odilova Mahsudaxon');
  const [questionsCount, setQuestionsCount] = useState(10);
  const [createdRoom, setCreatedRoom] = useState(null);

  const handleGenerateCode = () => {
    sound.click();
    setCode(Math.floor(1000 + Math.random() * 9000).toString());
  };

  const handleCreateRoom = (e) => {
    e.preventDefault();
    if (!title.trim() || !code.trim()) return;

    sound.correct();
    const catObj = APP_DATA.categories.find((c) => c.id === category);

    const newRoom = {
      code: code.trim(),
      title: title.trim(),
      category,
      categoryName: catObj ? catObj.title : 'Musobaqa',
      teacher: teacher.trim(),
      questionsCount: parseInt(questionsCount) || 10,
      active: true,
      participants: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };

    StorageManager.addRoom(newRoom);
    setCreatedRoom(newRoom);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '640px', padding: '1.75rem' }}>
        <button className="modal-close" onClick={onClose} title="Yopish">✕</button>

        {/* Sarlavha */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.25rem' }}>👩‍🏫</div>
          <h2 style={{ fontSize: '1.75rem', color: '#0F172A', marginBottom: '0.25rem' }}>
            Ustoz va Murabbiy Kabineti
          </h2>
          <p style={{ color: '#64748B', fontWeight: 600, fontSize: '0.92rem' }}>
            Sinfingiz uchun yangi bellashuv yarating va doskaga yozish uchun maxsus kod oling!
          </p>
        </div>

        {createdRoom ? (
          /* Muvaffaqiyatli yaratilgan xona kartochkasi */
          <div style={{
            background: 'linear-gradient(135deg, #FFF7ED, #FFEDD5)',
            border: '3px solid #FDBA74',
            borderRadius: '24px',
            padding: '2rem 1.5rem',
            textAlign: 'center',
            animation: 'popIn 0.3s ease-out'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎉✨</div>
            <h3 style={{ fontSize: '1.4rem', color: '#9A3412', marginBottom: '0.5rem' }}>
              Musobaqa Xonasi Muvaffaqiyatli Yaratildi!
            </h3>
            <p style={{ color: '#C2410C', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
              Ushbu 4 xonali kodni doskaga yozing yoki o'quvchilarga ayting. Ular bosh sahifaga shu kodni kiritib ulanishadi:
            </p>

            {/* Katta Doska Kodi */}
            <div style={{
              display: 'inline-block',
              background: '#FFFFFF',
              border: '3px dashed #FF5E36',
              borderRadius: '20px',
              padding: '1rem 2.5rem',
              marginBottom: '1.5rem',
              boxShadow: '0 8px 20px rgba(255, 94, 54, 0.15)'
            }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#64748B', marginBottom: '0.2rem' }}>
                XONA KODI:
              </div>
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '3.2rem',
                fontWeight: 900,
                letterSpacing: '6px',
                color: '#FF5E36'
              }}>
                {createdRoom.code}
              </div>
            </div>

            <div style={{
              fontSize: '0.9rem',
              color: '#7C2D12',
              fontWeight: 700,
              marginBottom: '1.5rem'
            }}>
              📌 {createdRoom.title} ({createdRoom.categoryName})
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <button
                className="btn btn-primary"
                onClick={() => setCreatedRoom(null)}
              >
                Yana Yangi Xona Yaratish
              </button>
              <button
                className="btn btn-white"
                onClick={onClose}
              >
                Tushundim
              </button>
            </div>
          </div>
        ) : (
          /* Yaratish formasi */
          <form onSubmit={handleCreateRoom}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={labelStyle}>Musobaqa yoki Sinf Nomi:</label>
              <input
                type="text"
                placeholder="Masalan: 3-«A» Sinf Zukkolar Bellashuvi"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                style={inputStyle}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.85rem', marginBottom: '1rem' }}>
              <div>
                <label style={labelStyle}>O'yin Yo'nalishi:</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={inputStyle}
                >
                  {APP_DATA.categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.icon} {c.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={labelStyle}>Savollar Soni:</label>
                <select
                  value={questionsCount}
                  onChange={(e) => setQuestionsCount(e.target.value)}
                  style={inputStyle}
                >
                  <option value={5}>5 ta savol</option>
                  <option value={10}>10 ta savol</option>
                  <option value={15}>15 ta savol</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.85rem', marginBottom: '1.25rem' }}>
              <div>
                <label style={labelStyle}>Ustoz / Muallim Ismi:</label>
                <input
                  type="text"
                  value={teacher}
                  onChange={(e) => setTeacher(e.target.value)}
                  required
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>4 Xonali Kirish Kodi:</label>
                <div style={{ display: 'flex', gap: '0.35rem' }}>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    maxLength={6}
                    required
                    style={{ ...inputStyle, textAlign: 'center', fontWeight: 800, letterSpacing: '1px' }}
                  />
                  <button
                    type="button"
                    onClick={handleGenerateCode}
                    style={{
                      padding: '0.45rem 0.75rem',
                      borderRadius: '10px',
                      border: '1.5px solid #CBD5E1',
                      background: '#F1F5F9',
                      cursor: 'pointer',
                      fontSize: '0.85rem'
                    }}
                    title="Tasodifiy kod olish"
                  >
                    🎲
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.85rem', fontSize: '1.05rem' }}
            >
              <span>🚀 Musobaqani E'lon Qilish va Kod Berish</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

const labelStyle = {
  display: 'block',
  fontSize: '0.85rem',
  fontWeight: 700,
  color: '#334155',
  marginBottom: '0.35rem'
};

const inputStyle = {
  width: '100%',
  padding: '0.65rem 0.85rem',
  borderRadius: '12px',
  border: '1.5px solid #CBD5E1',
  fontSize: '0.95rem',
  fontFamily: 'inherit',
  background: '#FFFFFF',
  outline: 'none'
};
