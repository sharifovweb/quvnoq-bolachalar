'use client';

import Image from 'next/image';

export default function Footer({ onOpenTeacher, onOpenDiploma }) {
  return (
    <footer style={{
      background: '#FFFFFF',
      borderTop: '3px solid #FFE4D6',
      padding: '3.5rem 0 2rem 0',
      position: 'relative'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '2.5rem',
          marginBottom: '2.5rem'
        }}>
          {/* 1-ustun: Brend */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{
                position: 'relative',
                width: '46px',
                height: '46px',
                borderRadius: '14px',
                overflow: 'hidden',
                border: '2px solid #FFD166'
              }}>
                <Image
                  src="/images/logo.jpg"
                  alt="Quvnoq Bolachalar Logo"
                  width={46}
                  height={46}
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.35rem',
                fontWeight: 800,
                background: 'linear-gradient(135deg, #FF5E36, #FF9F1C)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Quvnoq Bolachalar
              </div>
            </div>

            <p style={{ color: '#64748B', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1rem' }}>
              O'zbekistondagi barcha yosh bilimdonlar uchun yaratilgan sehrli musobaqalar, quvnoq viktorinalar va faxriy diplomlar ta'limiy platformasi.
            </p>

            <div style={{
              background: 'linear-gradient(135deg, #FFF7ED, #FEF3C7)',
              border: '2px solid #FDE68A',
              borderRadius: '16px',
              padding: '0.85rem 1.15rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginTop: '1rem'
            }}>
              <span style={{ fontSize: '1.8rem' }}>👩‍🏫</span>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#B45309', fontWeight: 800, textTransform: 'uppercase' }}>
                  Loyiha Muallifi va Tashabbuskori
                </div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 800, color: '#92400E' }}>
                  Odilova Mahsudaxon
                </div>
              </div>
            </div>
          </div>

          {/* 2-ustun: Yo'nalishlar */}
          <div>
            <h4 style={{ fontSize: '1.05rem', color: '#0F172A', marginBottom: '1rem' }}>
              🎮 O'yin Yo'nalishlari
            </h4>
            <ul style={{ listStyle: 'none', display: 'grid', gap: '0.5rem', fontSize: '0.92rem', color: '#475569' }}>
              <li><a href="#games" style={footerLinkStyle}>🦁 Zukko Bilimdon Viktorinasi</a></li>
              <li><a href="#games" style={footerLinkStyle}>🃏 Sehrli Kartochkalar (Xotira)</a></li>
              <li><a href="#games" style={footerLinkStyle}>⚡ Raqamlar Sehrgari (Matematika)</a></li>
              <li><a href="#games" style={footerLinkStyle}>🧩 So'z Yasovchi Zukko</a></li>
              <li><a href="#games" style={footerLinkStyle}>🎈 Ranglar va Shakllar</a></li>
              <li><a href="#craft" style={footerLinkStyle}>🎨 Mohir Qo'llar: Mozaika</a></li>
            </ul>
          </div>

          {/* 3-ustun: Foydali bo'limlar */}
          <div>
            <h4 style={{ fontSize: '1.05rem', color: '#0F172A', marginBottom: '1rem' }}>
              🌟 Tezkor Xizmatlar
            </h4>
            <ul style={{ listStyle: 'none', display: 'grid', gap: '0.5rem', fontSize: '0.92rem', color: '#475569' }}>
              <li><a href="#rooms" style={footerLinkStyle}>🔑 Xona Kodu orqali Kirish</a></li>
              <li>
                <button onClick={onOpenDiploma} style={{ ...footerLinkStyle, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                  📜 Faxriy Diplom Yaratish
                </button>
              </li>
              <li><a href="#leaderboard" style={footerLinkStyle}>🏆 Chempionlar Reytingi</a></li>
              <li>
                <button onClick={onOpenTeacher} style={{ ...footerLinkStyle, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                  👩‍🏫 Ustoz va Ota-onalar Portali
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Pastki qism */}
        <div style={{
          borderTop: '1px solid #F1F5F9',
          paddingTop: '1.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          fontSize: '0.88rem',
          color: '#64748B'
        }}>
          <div>
            © 2026 <strong>Quvnoq Bolachalar</strong>. Barcha huquqlar himoyalangan.
          </div>
          <div style={{ fontWeight: 700, color: '#FF5E36' }}>
            Loyiha muallifi: <strong>Odilova Mahsudaxon</strong> ❤️
          </div>
        </div>
      </div>
    </footer>
  );
}

const footerLinkStyle = {
  textDecoration: 'none',
  color: '#475569',
  fontWeight: 600,
  transition: 'color 0.2s',
  display: 'inline-block'
};
