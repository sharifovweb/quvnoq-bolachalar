'use client';

import sound from '../lib/sound';
import { APP_DATA } from '../lib/data';

export default function CategoryCards({ onSelectGame }) {
  const handleCardClick = (gameId) => {
    sound.click();
    onSelectGame(gameId);
  };

  return (
    <section id="games" style={{ padding: '3.5rem 0' }}>
      <div className="container">
        {/* Bo'lim Sarlavhasi */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: '#E0F2FE',
            color: '#0284C7',
            padding: '0.35rem 0.95rem',
            borderRadius: 'var(--radius-full)',
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            fontSize: '0.9rem',
            marginBottom: '0.75rem'
          }}>
            <span>✨</span> O'zingizga yoqqan yo'nalishni tanlang
          </div>

          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
            color: '#0F172A',
            marginBottom: '0.75rem'
          }}>
            Sehrli Musobaqalar va O'yinlar Saltanati 🎮
          </h2>

          <p style={{
            fontSize: '1.05rem',
            color: '#64748B',
            maxWidth: '650px',
            margin: '0 auto',
            fontWeight: 600
          }}>
            Har bir o'yinda o'z iqtidoringizni namoyon eting, ball to'plang va faxriy yorliqqa ega bo'ling!
          </p>
        </div>

        {/* Kartochkalar to'plami */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.75rem'
        }}>
          {APP_DATA.categories.map((cat) => (
            <div
              key={cat.id}
              className="card"
              onClick={() => handleCardClick(cat.id)}
              style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderTop: `6px solid ${cat.color}`
              }}
            >
              <div>
                {/* Tepasi: Nishon va Ikona */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1rem'
                }}>
                  <div style={{
                    fontSize: '2.8rem',
                    width: '64px',
                    height: '64px',
                    borderRadius: '20px',
                    background: cat.gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                  }}>
                    {cat.icon}
                  </div>

                  <span className="badge" style={{
                    background: '#F1F5F9',
                    color: '#334155',
                    fontSize: '0.82rem'
                  }}>
                    {cat.badge}
                  </span>
                </div>

                {/* Sarlavha va Tavsif */}
                <h3 style={{
                  fontSize: '1.45rem',
                  color: '#0F172A',
                  marginBottom: '0.5rem',
                  lineHeight: 1.25
                }}>
                  {cat.title}
                </h3>

                <p style={{
                  fontSize: '0.95rem',
                  color: '#64748B',
                  marginBottom: '1.25rem',
                  lineHeight: 1.55
                }}>
                  {cat.desc}
                </p>

                {/* Xususiyatlar */}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.45rem',
                  marginBottom: '1.5rem'
                }}>
                  {cat.features.map((feat, idx) => (
                    <span key={idx} style={{
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      background: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '8px',
                      color: '#475569'
                    }}>
                      ✓ {feat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Pastki qism: Statistika va Tugma */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '1rem',
                borderTop: '1px solid #F1F5F9'
              }}>
                <div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#94A3B8' }}>
                    {cat.players}
                  </div>
                  <div style={{ fontSize: '0.85rem' }}>{cat.stars}</div>
                </div>

                <button
                  className="btn"
                  style={{
                    background: cat.gradient,
                    color: '#FFFFFF',
                    padding: '0.6rem 1.3rem',
                    fontSize: '0.95rem'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(cat.id);
                  }}
                >
                  <span>O'ynash</span> 🚀
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
