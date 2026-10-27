'use client';

import { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import sound from '../lib/sound';
import { APP_DATA } from '../lib/data';
import StorageManager from '../lib/storage';

export default function DiplomaStudio({ onClose, initialData = null }) {
  const [studentName, setStudentName] = useState('Azizbek Aliyev');
  const [reason, setReason] = useState(
    initialData?.reason || APP_DATA.diplomaReasons[0]
  );
  const [teacherName, setTeacherName] = useState('Odilova Mahsudaxon');
  const [schoolName, setSchoolName] = useState('144-sonli umumta\'lim maktabi');
  const [themeId, setThemeId] = useState('gold');
  const [medal, setMedal] = useState('🥇');
  const [date, setDate] = useState('27-Oktyabr, 2026');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const diplomaRef = useRef(null);

  useEffect(() => {
    const user = StorageManager.getUser();
    if (user?.name) {
      setStudentName(user.name);
    }
  }, []);

  const handlePrint = () => {
    sound.click();
    window.print();
  };

  const handleSave = () => {
    sound.correct();
    const diploma = {
      id: Date.now(),
      studentName,
      reason,
      teacherName,
      schoolName,
      themeId,
      medal,
      date
    };
    StorageManager.saveDiploma(diploma);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);

    try {
      confetti({ particleCount: 60, spread: 60 });
    } catch (e) {
      console.warn(e);
    }
  };

  // Canvas orqali PNG rasm sifatida yuklab olish
  const handleDownloadImage = () => {
    sound.click();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 1000;
    canvas.height = 700;

    // Orqa fon
    const gradient = ctx.createLinearGradient(0, 0, 1000, 700);
    if (themeId === 'gold') {
      gradient.addColorStop(0, '#FFFDF0');
      gradient.addColorStop(1, '#FEF9C3');
    } else if (themeId === 'space') {
      gradient.addColorStop(0, '#EFF6FF');
      gradient.addColorStop(1, '#DBEAFE');
    } else if (themeId === 'nature') {
      gradient.addColorStop(0, '#F0FDF4');
      gradient.addColorStop(1, '#DCFCE7');
    } else {
      gradient.addColorStop(0, '#FFF1F2');
      gradient.addColorStop(1, '#FFE4E6');
    }

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1000, 700);

    // Oltin ramka
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 14;
    ctx.strokeRect(20, 20, 960, 660);

    ctx.strokeStyle = '#B8860B';
    ctx.lineWidth = 3;
    ctx.strokeRect(32, 32, 936, 636);

    // Sarlavha
    ctx.textAlign = 'center';
    ctx.fillStyle = '#92400E';
    ctx.font = 'bold 22px Nunito, sans-serif';
    ctx.fillText('«QUVNOQ BOLACHALAR» SEHRLI MUSOBAQALAR PLATFORMASI', 500, 85);

    ctx.fillStyle = '#B45309';
    ctx.font = 'bold 50px Fredoka, Outfit, sans-serif';
    ctx.fillText('FAXRIY DIPLOM', 500, 155);

    ctx.fillStyle = '#64748B';
    ctx.font = 'italic 20px Nunito, sans-serif';
    ctx.fillText('Ushbu tantanali faxriy diplom munosib tarzda beriladi:', 500, 210);

    // O'quvchi ismi
    ctx.fillStyle = '#0F172A';
    ctx.font = 'bold 44px Fredoka, Outfit, sans-serif';
    ctx.fillText(studentName, 500, 280);

    // Chiziq
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(250, 305);
    ctx.lineTo(750, 305);
    ctx.stroke();

    // Sabab matni
    ctx.fillStyle = '#334155';
    ctx.font = '600 22px Nunito, sans-serif';
    const words = reason.split(' ');
    let line = '';
    let y = 360;
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > 700 && n > 0) {
        ctx.fillText(line, 500, y);
        line = words[n] + ' ';
        y += 34;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 500, y);

    // Medal
    ctx.font = '64px sans-serif';
    ctx.fillText(medal, 500, 520);

    // Pastki imzolar va sana
    ctx.textAlign = 'left';
    ctx.fillStyle = '#475569';
    ctx.font = 'bold 18px Nunito, sans-serif';
    ctx.fillText(`Loyiha muallifi: ${teacherName}`, 80, 610);
    ctx.fillText(`Maktab: ${schoolName}`, 80, 638);

    ctx.textAlign = 'right';
    ctx.fillText(`Sana: ${date}`, 920, 610);
    ctx.fillText('Muhr: Quvnoq Bolachalar ★★★', 920, 638);

    // Faylni yuklash
    const link = document.createElement('a');
    link.download = `Faxriy_Diplom_${studentName.replace(/\s+/g, '_')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const currentTheme = APP_DATA.diplomaThemes.find((t) => t.id === themeId) || APP_DATA.diplomaThemes[0];

  return (
    <div className="modal-overlay" id="diploma-print-area">
      <div className="modal-content modal-content-wide" style={{ padding: '1.75rem' }}>
        <button className="modal-close no-print" onClick={onClose} title="Yopish">✕</button>

        {/* Sarlavha */}
        <div className="no-print" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.75rem', color: '#0F172A', marginBottom: '0.25rem' }}>
            📜 Rasmiy Faxriy Diplom va Sertifikat
          </h2>
          <p style={{ color: '#64748B', fontWeight: 600, fontSize: '0.92rem' }}>
            Ismingiz, yutuq sababi va bezak uslubini tanlab, diplomni chop eting yoki yuklab oling!
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.75rem',
          alignItems: 'start'
        }}>
          {/* Chap tomon: Sozlamalar (Faqat ekranda ko'rinadi, chop etilganda yashiriladi) */}
          <div className="no-print" style={{
            background: '#F8FAFC',
            padding: '1.25rem',
            borderRadius: '20px',
            border: '2px solid #E2E8F0'
          }}>
            <h3 style={{ fontSize: '1.15rem', color: '#0F172A', marginBottom: '1rem' }}>
              ⚙️ Diplom Ma'lumotlarini Sozlash:
            </h3>

            {/* O'quvchi ismi */}
            <div style={{ marginBottom: '0.85rem' }}>
              <label style={labelStyle}>O'quvchi Ismi va Familiyasi:</label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                style={inputStyle}
                placeholder="Ismingizni yozing"
              />
            </div>

            {/* Yutuq sababi */}
            <div style={{ marginBottom: '0.85rem' }}>
              <label style={labelStyle}>Taqdirlash Sababi:</label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                style={inputStyle}
              >
                {APP_DATA.diplomaReasons.map((r, i) => (
                  <option key={i} value={r}>{r}</option>
                ))}
              </select>
            </div>

            {/* Uslub mavzusi */}
            <div style={{ marginBottom: '0.85rem' }}>
              <label style={labelStyle}>Diplom Uslubi:</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                {APP_DATA.diplomaThemes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setThemeId(t.id)}
                    style={{
                      padding: '0.5rem',
                      borderRadius: '10px',
                      border: '2px solid',
                      borderColor: themeId === t.id ? t.accent : '#E2E8F0',
                      background: t.bg,
                      color: t.accent,
                      fontWeight: 700,
                      fontSize: '0.82rem',
                      cursor: 'pointer'
                    }}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Faxriy Nishon */}
            <div style={{ marginBottom: '0.85rem' }}>
              <label style={labelStyle}>Faxriy Nishon (Medal):</label>
              <div style={{ display: 'flex', gap: '0.65rem' }}>
                {['🥇', '🥈', '🥉', '🎖️', '👑', '🌟'].map((m) => (
                  <button
                    key={m}
                    onClick={() => setMedal(m)}
                    style={{
                      fontSize: '1.6rem',
                      padding: '0.35rem 0.65rem',
                      borderRadius: '12px',
                      border: '2px solid',
                      borderColor: medal === m ? '#FF5E36' : '#E2E8F0',
                      background: medal === m ? '#FFF3EE' : '#FFFFFF',
                      cursor: 'pointer'
                    }}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Ustoz va Maktab */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.65rem', marginBottom: '1.25rem' }}>
              <div>
                <label style={labelStyle}>Ustoz:</label>
                <input
                  type="text"
                  value={teacherName}
                  onChange={(e) => setTeacherName(e.target.value)}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Maktab / Sinf:</label>
                <input
                  type="text"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Amallar tugmalari */}
            <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
              <button
                className="btn btn-primary"
                onClick={handlePrint}
                style={{ flex: '1 1 120px', padding: '0.75rem', fontSize: '0.95rem' }}
              >
                🖨️ Chop Etish
              </button>
              <button
                className="btn btn-secondary"
                onClick={handleDownloadImage}
                style={{ flex: '1 1 120px', padding: '0.75rem', fontSize: '0.95rem' }}
              >
                📥 Rasm (PNG)
              </button>
              <button
                className="btn btn-accent"
                onClick={handleSave}
                style={{ flex: '1 1 100px', padding: '0.75rem', fontSize: '0.95rem' }}
              >
                💾 Saqlash
              </button>
            </div>

            {savedSuccess && (
              <div style={{
                marginTop: '0.75rem',
                color: '#15803D',
                fontWeight: 700,
                fontSize: '0.88rem',
                textAlign: 'center'
              }}>
                ✓ Diplom muvaffaqiyatli saqlandi!
              </div>
            )}
          </div>

          {/* O'ng tomon: Jonli Diplom Ko'rinishi (Printable Diploma Card) */}
          <div
            ref={diplomaRef}
            className="diploma-card"
            style={{
              background: currentTheme.bg,
              border: `10px double ${currentTheme.border}`,
              borderRadius: '24px',
              padding: '2.2rem 1.75rem',
              textAlign: 'center',
              boxShadow: '0 15px 35px rgba(0,0,0,0.08)',
              position: 'relative'
            }}
          >
            {/* Tepasi: Logotip va shior */}
            <div style={{
              fontSize: '0.82rem',
              fontWeight: 800,
              letterSpacing: '2px',
              color: currentTheme.accent,
              textTransform: 'uppercase',
              marginBottom: '0.35rem'
            }}>
              «Quvnoq Bolachalar» Ta'limiy Musobaqalar Maydonchasi
            </div>

            <div style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '2.5rem',
              fontWeight: 900,
              color: currentTheme.accent,
              lineHeight: 1.1,
              marginBottom: '0.75rem',
              textShadow: '0 2px 4px rgba(0,0,0,0.06)'
            }}>
              FAXRIY DIPLOM
            </div>

            <div style={{
              fontStyle: 'italic',
              color: '#64748B',
              fontSize: '0.95rem',
              marginBottom: '1rem'
            }}>
              Ushbu faxriy diplom tantanali ravishda taqdim etiladi:
            </div>

            {/* O'quvchi ismi */}
            <div style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '2rem',
              fontWeight: 900,
              color: '#0F172A',
              borderBottom: `2.5px solid ${currentTheme.border}`,
              display: 'inline-block',
              padding: '0 1.5rem 0.35rem 1.5rem',
              marginBottom: '1.25rem'
            }}>
              {studentName || 'O\'quvchi Ismi'}
            </div>

            {/* Sabab */}
            <p style={{
              color: '#334155',
              fontSize: '1.05rem',
              lineHeight: 1.6,
              maxWidth: '480px',
              margin: '0 auto 1.5rem auto',
              fontWeight: 600
            }}>
              {reason}
            </p>

            {/* Oltin Medal / Nishon */}
            <div style={{
              fontSize: '3.6rem',
              marginBottom: '1.25rem',
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.12))'
            }}>
              {medal}
            </div>

            {/* Pastki imzolar va sana */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              borderTop: `1.5px dashed ${currentTheme.border}`,
              paddingTop: '1rem',
              fontSize: '0.85rem',
              color: '#475569',
              fontWeight: 700
            }}>
              <div style={{ textAlign: 'left' }}>
                <div>Loyiha muallifi va Ustoz: <strong>{teacherName}</strong></div>
                <div style={{ fontSize: '0.78rem', color: '#64748B' }}>{schoolName}</div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div>Sana: <strong>{date}</strong></div>
                <div style={{ fontSize: '0.78rem', color: currentTheme.accent }}>★ Rasmiy Muhr ★</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const labelStyle = {
  display: 'block',
  fontSize: '0.82rem',
  fontWeight: 700,
  color: '#475569',
  marginBottom: '0.35rem'
};

const inputStyle = {
  width: '100%',
  padding: '0.55rem 0.85rem',
  borderRadius: '10px',
  border: '1.5px solid #CBD5E1',
  fontSize: '0.92rem',
  fontFamily: 'inherit',
  background: '#FFFFFF',
  outline: 'none'
};
