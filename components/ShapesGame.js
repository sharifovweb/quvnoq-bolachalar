'use client';

import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import sound from '../lib/sound';
import StorageManager from '../lib/storage';

// 6 xil geometrik shakl
const SHAPE_TYPES = [
  { id: 'triangle', name: 'Uchburchak' },
  { id: 'circle', name: 'Doira' },
  { id: 'square', name: 'Kvadrat' },
  { id: 'star', name: 'Yulduz' },
  { id: 'heart', name: 'Yurakcha' },
  { id: 'diamond', name: 'Romb' }
];

// 6 xil yorqin, toza rang
const COLOR_TYPES = [
  { id: 'green', name: 'Yashil', hex: '#10B981', light: '#D1FAE5' },
  { id: 'red', name: 'Qizil', hex: '#EF4444', light: '#FEE2E2' },
  { id: 'blue', name: 'Moviy', hex: '#3B82F6', light: '#DBEAFE' },
  { id: 'yellow', name: 'Sariq', hex: '#F59E0B', light: '#FEF3C7' },
  { id: 'purple', name: 'Binafsha', hex: '#8B5CF6', light: '#EDE9FE' },
  { id: 'orange', name: 'Zarg\'aldoq', hex: '#F97316', light: '#FFEDD5' }
];

// Aniq rangli SVG Shakl Komponenti (Emoji emas, haqiqiy vektor!)
function ShapeIcon({ shape, color, size = 48 }) {
  if (shape === 'triangle') {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" style={{ filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.15))' }}>
        <polygon points="50,10 92,86 8,86" fill={color} stroke="#FFFFFF" strokeWidth="4" strokeLinejoin="round" />
      </svg>
    );
  }

  if (shape === 'circle') {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" style={{ filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.15))' }}>
        <circle cx="50" cy="50" r="42" fill={color} stroke="#FFFFFF" strokeWidth="4" />
      </svg>
    );
  }

  if (shape === 'square') {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" style={{ filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.15))' }}>
        <rect x="12" y="12" width="76" height="76" rx="16" fill={color} stroke="#FFFFFF" strokeWidth="4" />
      </svg>
    );
  }

  if (shape === 'star') {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" style={{ filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.15))' }}>
        <polygon
          points="50,8 63,36 94,38 70,58 77,88 50,72 23,88 30,58 6,38 37,36"
          fill={color}
          stroke="#FFFFFF"
          strokeWidth="4"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (shape === 'heart') {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" style={{ filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.15))' }}>
        <path
          d="M50,86 C25,65 10,48 10,32 C10,18 21,8 35,8 C43,8 47,13 50,18 C53,13 57,8 65,8 C79,8 90,18 90,32 C90,48 75,65 50,86 Z"
          fill={color}
          stroke="#FFFFFF"
          strokeWidth="4"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (shape === 'diamond') {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" style={{ filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.15))' }}>
        <polygon points="50,8 92,50 50,92 8,50" fill={color} stroke="#FFFFFF" strokeWidth="4" strokeLinejoin="round" />
      </svg>
    );
  }

  return null;
}

export default function ShapesGame({ onClose, onOpenDiplomaWithData }) {
  const [target, setTarget] = useState(null);
  const [cards, setCards] = useState([]);
  const [remainingTargets, setRemainingTargets] = useState(0);
  const [totalTargetsInRound, setTotalTargetsInRound] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [wrongUid, setWrongUid] = useState(null);

  // Yangi tur generatsiya qilish
  const nextRound = () => {
    // 1. Tasodifiy maqsad tanlash (shakl + rang)
    const randomShape = SHAPE_TYPES[Math.floor(Math.random() * SHAPE_TYPES.length)];
    const randomColor = COLOR_TYPES[Math.floor(Math.random() * COLOR_TYPES.length)];

    const chosenTarget = {
      shapeId: randomShape.id,
      shapeName: randomShape.name,
      colorId: randomColor.id,
      colorName: randomColor.name,
      hex: randomColor.hex,
      fullName: `${randomColor.name} ${randomShape.name}`
    };

    setTarget(chosenTarget);

    // 2. Maydonda 9 ta katak (3x3 grid)
    // Maqsad shakli aniq 2 marta qatnashadi
    const targetCount = 2;
    setRemainingTargets(targetCount);
    setTotalTargetsInRound(targetCount);

    const roundCards = [];

    // Maqsad kartochkalarini qo'shish
    for (let i = 0; i < targetCount; i++) {
      roundCards.push({
        uid: `target-${i}-${Date.now()}-${Math.random()}`,
        shape: chosenTarget.shapeId,
        color: chosenTarget.hex,
        shapeName: chosenTarget.shapeName,
        colorName: chosenTarget.colorName,
        isTarget: true,
        cleared: false
      });
    }

    // Qolgan 7 ta bo'sh o'rinni mutlaqo xilma-xil va bir-birini takrorlamaydigan shakllar bilan to'ldirish
    const distractorsPool = [];
    SHAPE_TYPES.forEach((st) => {
      COLOR_TYPES.forEach((ct) => {
        // Maqsad bilan bir xil bo'lmasin
        if (st.id === chosenTarget.shapeId && ct.id === chosenTarget.colorId) return;
        distractorsPool.push({
          shape: st.id,
          shapeName: st.name,
          color: ct.hex,
          colorName: ct.name
        });
      });
    });

    // Aralashtirib eng yaxshi 7 tasini tanlash
    distractorsPool.sort(() => Math.random() - 0.5);
    const chosenDistractors = distractorsPool.slice(0, 7);

    chosenDistractors.forEach((d, idx) => {
      roundCards.push({
        uid: `distractor-${idx}-${Date.now()}-${Math.random()}`,
        shape: d.shape,
        color: d.color,
        shapeName: d.shapeName,
        colorName: d.colorName,
        isTarget: false,
        cleared: false
      });
    });

    // Butun 9 ta kartani yaxshilab aralashtirish
    setCards(roundCards.sort(() => Math.random() - 0.5));
  };

  const startGame = () => {
    sound.click();
    setScore(0);
    setStreak(0);
    setTimeLeft(45);
    setIsPlaying(true);
    setIsGameOver(false);
    nextRound();
  };

  useEffect(() => {
    startGame();
  }, []);

  // Taymer
  useEffect(() => {
    if (!isPlaying || isGameOver) return;
    if (timeLeft <= 0) {
      handleGameOver();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isPlaying, isGameOver]);

  // Shakl bosilganda
  const handleCardClick = (card) => {
    if (!isPlaying || isGameOver || card.cleared) return;

    if (card.isTarget) {
      sound.pop();
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > 2) sound.combo(newStreak);

      const points = 20 * newStreak;
      setScore((prev) => prev + points);

      // Kartani tozalangan deb belgilash
      const updatedCards = cards.map((c) => (c.uid === card.uid ? { ...c, cleared: true } : c));
      setCards(updatedCards);

      const newRemaining = remainingTargets - 1;
      setRemainingTargets(newRemaining);

      // Barcha maqsadlar topildimi?
      if (newRemaining <= 0) {
        sound.correct();
        setTimeout(() => {
          nextRound();
        }, 350);
      }
    } else {
      // Noto'g'ri shakl bosildi
      sound.wrong();
      setStreak(0);
      setWrongUid(card.uid);
      setTimeout(() => setWrongUid(null), 600);
    }
  };

  const handleGameOver = () => {
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

    const starsEarned = Math.max(1, Math.min(5, Math.ceil(score / 120)));
    StorageManager.addReward(score, starsEarned, '🎈 Chaqqon Refleks Ustasi');
    StorageManager.saveResult('shapes', score, starsEarned);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '640px', padding: '1.75rem' }}>
        <button className="modal-close" onClick={onClose} title="Yopish">✕</button>

        {/* Sarlavha */}
        <div style={{ textAlign: 'center', marginBottom: '1.25rem', padding: '0 2rem' }}>
          <h2 style={{ fontSize: 'clamp(1.25rem, 4vw, 1.65rem)', color: '#0F172A', marginBottom: '0.25rem' }}>
            🎈 Ranglar va Shakllar
          </h2>
          <p style={{ color: '#64748B', fontWeight: 600, fontSize: '0.85rem' }}>
            Ko'rsatilgan rang va shaklni diqqat bilan topib bosing!
          </p>
        </div>

        {/* Holat paneli */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          background: '#FFF5F5',
          padding: '0.75rem',
          borderRadius: '16px',
          border: '1.5px solid #FED7D7',
          marginBottom: '1.25rem',
          fontWeight: 700
        }}>
          <div>⏱️ Vaqt: <strong style={{ color: timeLeft <= 10 ? '#E53E3E' : '#2D3748' }}>{timeLeft}s</strong></div>
          <div>🏆 Ball: <strong style={{ color: '#E53E3E' }}>{score}</strong></div>
          <div>🔥 Combo: <strong style={{ color: '#DD6B20' }}>{streak}x</strong></div>
        </div>

        {isGameOver ? (
          /* Natija oynasi */
          <div style={{
            textAlign: 'center',
            background: '#F0FDF4',
            border: '2px solid #86EFAC',
            borderRadius: '20px',
            padding: '1.5rem',
            animation: 'popIn 0.3s ease-out'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.35rem' }}>🎈🎉</div>
            <h3 style={{ fontSize: '1.6rem', color: '#166534', marginBottom: '0.3rem' }}>
              Qoyilmaqom Chaqqonlik!
            </h3>
            <p style={{ color: '#15803D', fontSize: '0.95rem', marginBottom: '1.25rem', fontWeight: 600 }}>
              Siz juda chaqqonlik bilan {score} ball to'pladingiz!
            </p>

            <div style={{ display: 'flex', gap: '0.85rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={startGame}>
                🔄 Yana O'ynash
              </button>
              <button
                className="btn btn-accent"
                onClick={() => {
                  onClose();
                  if (onOpenDiplomaWithData) {
                    onOpenDiplomaWithData({
                      reason: `«Ranglar va Shakllar» chaqqonlik bellashuvida ${score} ball bilan mutlaq tezkorlik ko'rsatgani uchun.`
                    });
                  }
                }}
              >
                📜 Diplom Olish
              </button>
            </div>
          </div>
        ) : target ? (
          <div>
            {/* Maqsad vazifasi (Haqiqiy vektor SVG va to'g'ri rang bilan!) */}
            <div style={{
              background: 'linear-gradient(135deg, #FFF7ED, #FFEDD5)',
              borderRadius: '22px',
              padding: '1.25rem',
              textAlign: 'center',
              border: '2.5px solid #FDBA74',
              marginBottom: '1.5rem',
              boxShadow: '0 8px 20px rgba(253, 186, 116, 0.25)'
            }}>
              <div style={{
                fontSize: '0.9rem',
                fontWeight: 800,
                color: '#9A3412',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: '0.4rem'
              }}>
                Hozir bosing:
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                flexWrap: 'wrap'
              }}>
                <div style={{
                  background: '#FFFFFF',
                  padding: '0.5rem',
                  borderRadius: '16px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <ShapeIcon shape={target.shapeId} color={target.hex} size={48} />
                </div>

                <div style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.5rem, 5vw, 2.1rem)',
                  fontWeight: 900,
                  color: '#7C2D12'
                }}>
                  {target.fullName}
                </div>

                <span style={{
                  background: '#FED7AA',
                  color: '#9A3412',
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  padding: '0.35rem 0.75rem',
                  borderRadius: '12px'
                }}>
                  Topish kerak: {remainingTargets} ta
                </span>
              </div>
            </div>

            {/* Aralashgan xilma-xil 9 ta katak (3x3 Grid) */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0.85rem',
              marginBottom: '1rem'
            }}>
              {cards.map((card) => {
                const isWrong = wrongUid === card.uid;
                const isCleared = card.cleared;

                return (
                  <button
                    key={card.uid}
                    onClick={() => handleCardClick(card)}
                    disabled={isCleared}
                    style={{
                      height: '92px',
                      borderRadius: '20px',
                      border: isWrong
                        ? '3.5px solid #EF4444'
                        : isCleared
                        ? '3px solid #86EFAC'
                        : '2.5px solid #E2E8F0',
                      background: isCleared
                        ? '#DCFCE7'
                        : isWrong
                        ? '#FEE2E2'
                        : '#FFFFFF',
                      boxShadow: isCleared
                        ? 'none'
                        : '0 6px 16px rgba(0,0,0,0.06)',
                      cursor: isCleared ? 'default' : 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.25rem',
                      transition: 'all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      transform: isWrong ? 'scale(0.94)' : 'scale(1)',
                      opacity: isCleared ? 0.35 : 1
                    }}
                    onMouseEnter={(e) => {
                      if (!isCleared) e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
                    }}
                    onMouseLeave={(e) => {
                      if (!isCleared) e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    }}
                  >
                    {isCleared ? (
                      <span style={{ fontSize: '2rem', color: '#16A34A', fontWeight: 900 }}>✓</span>
                    ) : (
                      <>
                        <ShapeIcon shape={card.shape} color={card.color} size={44} />
                        <span style={{
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          color: '#64748B'
                        }}>
                          {card.colorName} {card.shapeName}
                        </span>
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
