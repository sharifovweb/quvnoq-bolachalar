'use client';

import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import sound from '../lib/sound';
import { APP_DATA } from '../lib/data';
import StorageManager from '../lib/storage';

export default function MemoryGame({ onClose, onOpenDiplomaWithData }) {
  const [theme, setTheme] = useState('animals');
  const [difficulty, setDifficulty] = useState(8); // 8, 12, 16 cards
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  // Kartochkalarni aralashtirish va boshlash
  const startNewGame = (cardsCount = difficulty, themeKey = theme) => {
    sound.click();
    const items = APP_DATA.memoryThemes[themeKey].items;
    const pairsCount = cardsCount / 2;
    const selectedItems = items.slice(0, pairsCount);

    // Juftliklarni hosil qilish va aralashtirish
    const deck = [...selectedItems, ...selectedItems]
      .map((item, idx) => ({ id: idx, value: item }))
      .sort(() => Math.random() - 0.5);

    setCards(deck);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setTimer(0);
    setIsPlaying(true);
    setIsGameOver(false);
  };

  useEffect(() => {
    startNewGame(difficulty, theme);
  }, [difficulty, theme]);

  // Vaqt sanagichi
  useEffect(() => {
    if (!isPlaying || isGameOver) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, isGameOver]);

  const handleCardClick = (index) => {
    if (!isPlaying || isGameOver) return;
    if (flipped.length === 2) return;
    if (flipped.includes(index) || matched.includes(index)) return;

    sound.flip();
    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((prev) => prev + 1);
      const [first, second] = newFlipped;
      if (cards[first].value === cards[second].value) {
        // Juftlik topildi!
        setTimeout(() => {
          sound.correct();
          const newMatched = [...matched, first, second];
          setMatched(newMatched);
          setFlipped([]);

          // Barcha juftliklar topildimi?
          if (newMatched.length === cards.length) {
            handleVictory();
          }
        }, 400);
      } else {
        // Noto'g'ri juftlik
        setTimeout(() => {
          setFlipped([]);
        }, 900);
      }
    }
  };

  const handleVictory = () => {
    setIsGameOver(true);
    setIsPlaying(false);
    sound.victory();

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.warn(e);
    }

    const calculatedScore = Math.max(100, 1000 - (moves * 30) - (timer * 5));
    const starsEarned = moves <= cards.length ? 5 : moves <= cards.length * 1.5 ? 4 : 3;

    StorageManager.addReward(calculatedScore, starsEarned, '🃏 Sehrli Xotira Ustasi');
    StorageManager.saveResult('memory', calculatedScore, starsEarned);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '640px', padding: '1.75rem' }}>
        <button className="modal-close" onClick={onClose} title="Yopish">✕</button>

        {/* Sarlavha */}
        <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <h2 style={{ fontSize: '1.65rem', color: '#0F172A', marginBottom: '0.25rem' }}>
            🃏 Sehrli Kartochkalar (Xotira O'yini)
          </h2>
          <p style={{ color: '#64748B', fontWeight: 600, fontSize: '0.9rem' }}>
            Juft rasmlarni topish orqali xotirangizni charxlang!
          </p>
        </div>

        {/* Mavzu va Qiyinlik tanlash */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.75rem',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: '#F8FAFC',
          padding: '0.75rem 1rem',
          borderRadius: '16px',
          marginBottom: '1.25rem',
          border: '1px solid #E2E8F0'
        }}>
          {/* Mavzu */}
          <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569' }}>Mavzu:</span>
            {Object.keys(APP_DATA.memoryThemes).map((key) => (
              <button
                key={key}
                onClick={() => setTheme(key)}
                style={{
                  padding: '0.3rem 0.65rem',
                  borderRadius: '10px',
                  border: '1.5px solid',
                  borderColor: theme === key ? '#4ECDC4' : '#E2E8F0',
                  background: theme === key ? '#E6FFFA' : '#FFFFFF',
                  color: theme === key ? '#0F766E' : '#475569',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  cursor: 'pointer'
                }}
              >
                {APP_DATA.memoryThemes[key].name}
              </button>
            ))}
          </div>

          {/* Qiyinlik */}
          <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569' }}>Daraja:</span>
            {[8, 12, 16].map((count) => (
              <button
                key={count}
                onClick={() => setDifficulty(count)}
                style={{
                  padding: '0.3rem 0.6rem',
                  borderRadius: '8px',
                  border: '1.5px solid',
                  borderColor: difficulty === count ? '#FF5E36' : '#E2E8F0',
                  background: difficulty === count ? '#FFF3EE' : '#FFFFFF',
                  color: difficulty === count ? '#C2410C' : '#64748B',
                  fontWeight: 800,
                  fontSize: '0.8rem',
                  cursor: 'pointer'
                }}
              >
                {count === 8 ? 'Oson (8)' : count === 12 ? "O'rta (12)" : 'Qiyin (16)'}
              </button>
            ))}
          </div>
        </div>

        {/* Holat paneli: Harakatlar, Vaqt, Juftliklar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          background: '#FFFBEB',
          padding: '0.65rem',
          borderRadius: '12px',
          border: '1.5px solid #FCD34D',
          marginBottom: '1.25rem',
          fontWeight: 700,
          fontSize: '0.95rem'
        }}>
          <div>👣 Harakatlar: <strong style={{ color: '#B45309' }}>{moves}</strong></div>
          <div>⏱️ Vaqt: <strong style={{ color: '#B45309' }}>{timer}s</strong></div>
          <div>🎯 Juftliklar: <strong style={{ color: '#B45309' }}>{matched.length / 2} / {cards.length / 2}</strong></div>
        </div>

        {/* Kartochkalar maydoni */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '0.5rem',
          marginBottom: '1.25rem'
        }}>
          {cards.map((card, idx) => {
            const isFlipped = flipped.includes(idx) || matched.includes(idx);
            const isMatched = matched.includes(idx);

            return (
              <div
                key={card.id}
                onClick={() => handleCardClick(idx)}
                style={{
                  aspectRatio: '1/1',
                  borderRadius: '14px',
                  perspective: '1000px',
                  cursor: isMatched ? 'default' : 'pointer'
                }}
              >
                <div style={{
                  width: '100%',
                  height: '100%',
                  position: 'relative',
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                }}>
                  {/* Old tomoni (yashirin) */}
                  <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backfaceVisibility: 'hidden',
                    borderRadius: '14px',
                    background: 'linear-gradient(135deg, #6C5CE7 0%, #a367dc 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    fontSize: 'clamp(1.2rem, 4vw, 1.8rem)',
                    boxShadow: '0 4px 10px rgba(108, 92, 231, 0.25)',
                    border: '2.5px solid #FFFFFF'
                  }}>
                    ✨
                  </div>

                  {/* Orqa tomoni (ochilgan rasm) */}
                  <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    borderRadius: '14px',
                    background: isMatched ? '#DCFCE7' : '#FFFFFF',
                    border: `2.5px solid ${isMatched ? '#22C55E' : '#4ECDC4'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'clamp(1.5rem, 6vw, 2.4rem)',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.06)'
                  }}>
                    {card.value}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* G'alaba qutisi */}
        {isGameOver ? (
          <div style={{
            textAlign: 'center',
            background: '#F0FDF4',
            border: '2px solid #86EFAC',
            borderRadius: '20px',
            padding: '1.25rem',
            animation: 'popIn 0.3s ease-out'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.35rem' }}>🎉</div>
            <h3 style={{ fontSize: '1.4rem', color: '#166534', marginBottom: '0.25rem' }}>
              Xotirangiz nihoyatda kuchli!
            </h3>
            <p style={{ color: '#15803D', fontSize: '0.9rem', marginBottom: '1rem', fontWeight: 600 }}>
              Barcha juftliklarni {moves} ta harakatda, {timer} soniyada topdingiz!
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                className="btn btn-secondary"
                onClick={() => startNewGame(difficulty, theme)}
              >
                🔄 Yana O'ynash
              </button>
              <button
                className="btn btn-accent"
                onClick={() => {
                  onClose();
                  if (onOpenDiplomaWithData) {
                    onOpenDiplomaWithData({
                      reason: `«Sehrli Kartochkalar» xotira o'yinida barcha juftliklarni ${moves} ta urinishda topgani va yuksak zehni uchun.`
                    });
                  }
                }}
              >
                📜 Diplom Olish
              </button>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <button
              className="btn btn-white"
              onClick={() => startNewGame(difficulty, theme)}
              style={{ fontSize: '0.9rem', padding: '0.5rem 1.25rem' }}
            >
              🔄 Qaytadan Boshlash
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
