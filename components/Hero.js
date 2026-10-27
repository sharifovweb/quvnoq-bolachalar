'use client';

import { useState } from 'react';
import Image from 'next/image';
import sound from '../lib/sound';

export default function Hero({ onJoinRoom, onOpenDiploma }) {
  const [roomCode, setRoomCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!roomCode.trim()) return;
    sound.click();
    onJoinRoom(roomCode.trim());
  };

  return (
    <section style={{
      position: 'relative',
      padding: '3rem 0 4rem 0',
      overflow: 'hidden'
    }}>
      {/* Orqa fondagi bezaklar */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-5%',
        width: '450px',
        height: '450px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255, 189, 0, 0.25) 0%, rgba(255, 94, 54, 0.05) 70%, transparent 100%)',
        filter: 'blur(50px)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem',
          alignItems: 'center'
        }}>
          {/* Chap tomon: Matn va Kod kiritish */}
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              background: 'linear-gradient(135deg, #FFE8DC, #FEF3C7)',
              color: '#FF5E36',
              padding: '0.45rem 1.15rem',
              borderRadius: 'var(--radius-full)',
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: '0.95rem',
              marginBottom: '1.25rem',
              boxShadow: '0 4px 14px rgba(255, 94, 54, 0.18)',
              border: '1.5px solid #FFD166'
            }}>
              <span>👩‍🏫</span>
              <span>Loyiha muallifi: <strong>Odilova Mahsudaxon</strong></span>
              <span>✨</span>
            </div>

            <h1 style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
              lineHeight: 1.15,
              marginBottom: '1.25rem',
              color: '#0F172A'
            }}>
              Quvnoq O'yinlar, <br />
              <span style={{
                background: 'linear-gradient(135deg, #FF5E36 0%, #FF9F1C 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Zukko Bellashuvlar
              </span> <br />
              va Faxriy Diplomlar! 🏆
            </h1>

            <p style={{
              fontSize: '1.15rem',
              color: '#475569',
              marginBottom: '2rem',
              maxWidth: '540px',
              fontWeight: 600
            }}>
              Qiziqarli viktorinalar, sehrli kartochkalar, tezkor matematika va mozaika ustaxonasida bilimingizni sinang. Har bir g'alabangiz uchun yaltiroq yulduzlar to'plang! ✨
            </p>

            {/* Xona kodi orqali qo'shilish shakli */}
            <div style={{
              background: '#FFFFFF',
              padding: '1.25rem',
              borderRadius: '24px',
              boxShadow: '0 12px 30px rgba(0, 0, 0, 0.08)',
              border: '3px solid #FFE4D6',
              marginBottom: '1.75rem',
              maxWidth: '520px'
            }}>
              <div style={{
                fontSize: '0.95rem',
                fontWeight: 700,
                color: '#1E293B',
                marginBottom: '0.65rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}>
                <span>🔑</span> Ustozingiz bergan xona kodini kiriting:
              </div>

              <form onSubmit={handleSubmit} style={{
                display: 'flex',
                gap: '0.65rem',
                flexWrap: 'wrap'
              }}>
                <input
                  type="text"
                  placeholder="Masalan: 7492 yoki 2026"
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value)}
                  maxLength={6}
                  style={{
                    flex: '1 1 180px',
                    padding: '0.85rem 1.25rem',
                    borderRadius: '16px',
                    border: '2px solid #E2E8F0',
                    fontSize: '1.15rem',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    letterSpacing: '1px',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    background: '#F8FAFC',
                    textAlign: 'center'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#FF5E36'}
                  onBlur={(e) => e.target.style.borderColor = '#E2E8F0'}
                />

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    flex: '1 1 140px',
                    padding: '0.85rem 1.4rem',
                    fontSize: '1.05rem'
                  }}
                >
                  <span>🚀</span> Bellashuvga Kirish
                </button>
              </form>
            </div>

            {/* Tezkor havolalar */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap'
            }}>
              <a href="#games" className="btn btn-accent">
                <span>🎮</span> O'yinlarni Tanlash
              </a>
              <button onClick={onOpenDiploma} className="btn btn-white">
                <span>📜</span> Diplom Yaratish
              </button>
            </div>
          </div>

          {/* O'ng tomon: Rasm va Animatsiyali vitrina */}
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'relative',
              borderRadius: '28px',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -10px rgba(255, 94, 54, 0.25)',
              border: '5px solid #FFFFFF'
            }}>
              <Image
                src="/images/hero_banner.jpg"
                alt="Quvnoq Bolachalar Bayramona Musobaqa"
                width={700}
                height={400}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  transform: 'scale(1.02)'
                }}
                priority
              />

              {/* Rasm ustidagi suzuvchi nishonlar */}
              <div style={{
                position: 'absolute',
                top: '1rem',
                left: '1rem',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(8px)',
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-full)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: '0.9rem',
                color: '#0F172A'
              }}>
                <span>🌟</span> Chempionlar Safi
              </div>

              <div style={{
                position: 'absolute',
                bottom: '1rem',
                right: '1rem',
                background: 'linear-gradient(135deg, #FF5E36, #FF9F1C)',
                color: '#FFFFFF',
                padding: '0.5rem 1.1rem',
                borderRadius: 'var(--radius-full)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 8px 20px rgba(255, 94, 54, 0.4)',
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: '0.92rem'
              }}>
                <span>🥇</span> Faxriy Diplom Oling!
              </div>
            </div>

            {/* Statistik kartochkalar */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0.75rem',
              marginTop: '1.25rem'
            }}>
              <div style={statBoxStyle}>
                <div style={statIconStyle}>🎮</div>
                <div style={statNumStyle}>6 xil</div>
                <div style={statLabelStyle}>Sehrli Yo'nalish</div>
              </div>
              <div style={statBoxStyle}>
                <div style={statIconStyle}>👧👦</div>
                <div style={statNumStyle}>12,000+</div>
                <div style={statLabelStyle}>Faol Bolajonlar</div>
              </div>
              <div style={statBoxStyle}>
                <div style={statIconStyle}>📜</div>
                <div style={statNumStyle}>4,500+</div>
                <div style={statLabelStyle}>Berilgan Diplomlar</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const statBoxStyle = {
  background: '#FFFFFF',
  padding: '0.85rem 0.5rem',
  borderRadius: '18px',
  textAlign: 'center',
  border: '2px solid #F1F5F9',
  boxShadow: '0 4px 12px rgba(0,0,0,0.04)'
};

const statIconStyle = {
  fontSize: '1.4rem',
  marginBottom: '0.15rem'
};

const statNumStyle = {
  fontFamily: 'var(--font-heading)',
  fontWeight: 800,
  fontSize: '1.15rem',
  color: '#0F172A',
  lineHeight: 1.1
};

const statLabelStyle = {
  fontSize: '0.72rem',
  fontWeight: 700,
  color: '#64748B'
};
