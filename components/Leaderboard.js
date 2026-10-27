'use client';

import { useState } from 'react';
import sound from '../lib/sound';
import { APP_DATA } from '../lib/data';

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState('all');
  const leaders = APP_DATA.leaderboard;

  return (
    <section id="leaderboard" style={{ padding: '3.5rem 0' }}>
      <div className="container">
        {/* Sarlavha */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
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
            marginBottom: '0.75rem'
          }}>
            <span>🏆</span> Chempionlar Shon-Sharafi
          </div>

          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            color: '#0F172A',
            marginBottom: '0.75rem'
          }}>
            Eng Zukko va Chaqqon Bolajonlar Reytingi 🌟
          </h2>

          <p style={{
            fontSize: '1.05rem',
            color: '#64748B',
            maxWidth: '620px',
            margin: '0 auto',
            fontWeight: 600
          }}>
            Barcha musobaqalar natijasi, eng ko'p yulduz to'plagan g'oliblar va faxriy unvon egalari!
          </p>
        </div>

        {/* Top 3 g'olib podiumi */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.5rem',
          maxWidth: '940px',
          margin: '0 auto 2.5rem auto',
          alignItems: 'end'
        }}>
          {/* 2-o'rin */}
          <div className="card" style={{
            textAlign: 'center',
            padding: '1.5rem',
            borderTop: '6px solid #94A3B8',
            background: 'linear-gradient(180deg, #FFFFFF, #F1F5F9)'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.25rem' }}>🥈</div>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{leaders[1].avatar}</div>
            <h3 style={{ fontSize: '1.25rem', color: '#0F172A', marginBottom: '0.25rem' }}>
              {leaders[1].name}
            </h3>
            <div style={{ fontSize: '0.82rem', color: '#64748B', marginBottom: '0.75rem' }}>
              {leaders[1].school}
            </div>
            <div style={{
              background: '#E2E8F0',
              padding: '0.45rem',
              borderRadius: '12px',
              fontWeight: 800,
              color: '#334155'
            }}>
              ⭐ {leaders[1].stars} yulduz • {leaders[1].score} ball
            </div>
          </div>

          {/* 1-o'rin (Balandroq va Oltin) */}
          <div className="card" style={{
            textAlign: 'center',
            padding: '2rem 1.5rem',
            borderTop: '8px solid #F59E0B',
            background: 'linear-gradient(180deg, #FFFBEB, #FEF3C7)',
            transform: 'scale(1.05)',
            boxShadow: '0 20px 35px rgba(245, 158, 11, 0.2)'
          }}>
            <div style={{ fontSize: '3.2rem', marginBottom: '0.25rem' }}>👑 🥇</div>
            <div style={{ fontSize: '3.8rem', marginBottom: '0.5rem' }}>{leaders[0].avatar}</div>
            <h3 style={{ fontSize: '1.45rem', color: '#78350F', marginBottom: '0.25rem' }}>
              {leaders[0].name}
            </h3>
            <div style={{ fontSize: '0.85rem', color: '#92400E', fontWeight: 600, marginBottom: '0.85rem' }}>
              {leaders[0].school}
            </div>
            <div style={{
              background: '#FDE68A',
              padding: '0.6rem',
              borderRadius: '14px',
              fontWeight: 900,
              fontSize: '1.1rem',
              color: '#78350F'
            }}>
              ⭐ {leaders[0].stars} yulduz • {leaders[0].score} ball
            </div>
          </div>

          {/* 3-o'rin */}
          <div className="card" style={{
            textAlign: 'center',
            padding: '1.5rem',
            borderTop: '6px solid #D97706',
            background: 'linear-gradient(180deg, #FFFFFF, #FEF3C7)'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.25rem' }}>🥉</div>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{leaders[2].avatar}</div>
            <h3 style={{ fontSize: '1.25rem', color: '#0F172A', marginBottom: '0.25rem' }}>
              {leaders[2].name}
            </h3>
            <div style={{ fontSize: '0.82rem', color: '#64748B', marginBottom: '0.75rem' }}>
              {leaders[2].school}
            </div>
            <div style={{
              background: '#FDE68A',
              padding: '0.45rem',
              borderRadius: '12px',
              fontWeight: 800,
              color: '#78350F'
            }}>
              ⭐ {leaders[2].stars} yulduz • {leaders[2].score} ball
            </div>
          </div>
        </div>

        {/* To'liq jadval */}
        <div style={{
          maxWidth: '940px',
          margin: '0 auto',
          background: '#FFFFFF',
          borderRadius: '24px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
          border: '2px solid #E2E8F0',
          overflow: 'hidden'
        }}>
          <div className="leader-row" style={{
            background: '#F8FAFC',
            borderBottom: '2px solid #E2E8F0',
            fontWeight: 800,
            color: '#475569',
            fontSize: '0.88rem'
          }}>
            <div>O'rin</div>
            <div>Ishtirokchi</div>
            <div style={{ textAlign: 'center' }}>Yulduzlar</div>
            <div style={{ textAlign: 'right' }}>Ball</div>
          </div>

          <div>
            {leaders.map((kid) => (
              <div
                key={kid.rank}
                className="leader-row"
                style={{
                  borderBottom: '1px solid #F1F5F9',
                  transition: 'background 0.15s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#F8FAFC'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#FFFFFF'}
              >
                <div style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.25rem',
                  fontWeight: 900,
                  color: kid.rank === 1 ? '#D97706' : kid.rank === 2 ? '#64748B' : kid.rank === 3 ? '#B45309' : '#94A3B8'
                }}>
                  #{kid.rank}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ fontSize: '1.8rem' }}>{kid.avatar}</div>
                  <div>
                    <div style={{ fontWeight: 800, color: '#0F172A', fontSize: '1.02rem' }}>
                      {kid.name}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#64748B' }}>
                      {kid.school}
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'center', fontWeight: 800, color: '#D97706' }}>
                  ⭐ {kid.stars}
                </div>

                <div style={{
                  textAlign: 'right',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 900,
                  color: '#FF5E36',
                  fontSize: '1.15rem'
                }}>
                  {kid.score}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
