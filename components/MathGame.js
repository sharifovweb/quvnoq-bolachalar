'use client';

import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import sound from '../lib/sound';
import StorageManager from '../lib/storage';

const FRUITS = ['🍎', '🍌', '🍓', '🍊', '🍇', '🍉', '🍐', '🍒'];

export default function MathGame({ onClose, onOpenDiplomaWithData }) {
  const [level, setLevel] = useState(1); // 1, 2, 3
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [question, setQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [bonusText, setBonusText] = useState('');

  // Yangi savol generatsiya qilish
  const generateQuestion = (currentLevel = level) => {
    let num1, num2, op, ans;
    const fruit = FRUITS[Math.floor(Math.random() * FRUITS.length)];

    if (currentLevel === 1) {
      // 1-10 oralig'ida qo'shish va ayirish
      num1 = Math.floor(Math.random() * 8) + 1;
      num2 = Math.floor(Math.random() * 8) + 1;
      if (Math.random() > 0.5) {
        op = '+';
        ans = num1 + num2;
      } else {
        op = '-';
        if (num1 < num2) [num1, num2] = [num2, num1];
        ans = num1 - num2;
      }
    } else if (currentLevel === 2) {
      // 1-30 oralig'ida
      num1 = Math.floor(Math.random() * 20) + 5;
      num2 = Math.floor(Math.random() * 15) + 3;
      if (Math.random() > 0.4) {
        op = '+';
        ans = num1 + num2;
      } else {
        op = '-';
        if (num1 < num2) [num1, num2] = [num2, num1];
        ans = num1 - num2;
      }
    } else {
      // Ko'paytirish (2 dan 9 gacha)
      num1 = Math.floor(Math.random() * 8) + 2;
      num2 = Math.floor(Math.random() * 7) + 2;
      op = '×';
      ans = num1 * num2;
    }

    // 4 ta variant (1 tasi to'g'ri)
    const opts = new Set([ans]);
    while (opts.size < 4) {
      const delta = (Math.floor(Math.random() * 5) + 1) * (Math.random() > 0.5 ? 1 : -1);
      const wrong = Math.max(0, ans + delta);
      opts.add(wrong);
    }

    setQuestion({ num1, num2, op, ans, fruit });
    setOptions(Array.from(opts).sort(() => Math.random() - 0.5));
  };

  const startGame = (lvl = level) => {
    sound.click();
    setLevel(lvl);
    setTimeLeft(60);
    setScore(0);
    setStreak(0);
    setIsPlaying(true);
    setIsGameOver(false);
    generateQuestion(lvl);
  };

  useEffect(() => {
    startGame(level);
  }, [level]);

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

  const handleAnswer = (val) => {
    if (!isPlaying || isGameOver || !question) return;

    if (val === question.ans) {
      sound.correct();
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > 1) sound.combo(newStreak);

      const points = 10 * newStreak;
      setScore((prev) => prev + points);
      setTimeLeft((prev) => Math.min(60, prev + 2)); // +2 soniya bonus

      setBonusText('+2 soniya! 🔥');
      setTimeout(() => setBonusText(''), 1000);

      generateQuestion();
    } else {
      sound.wrong();
      setStreak(0);
      setBonusText('Noto\'g\'ri! ❌');
      setTimeout(() => setBonusText(''), 800);
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

    const starsEarned = Math.max(1, Math.min(5, Math.ceil(score / 80)));
    StorageManager.addReward(score, starsEarned, '⚡ Raqamlar Sehrgari');
    StorageManager.saveResult('math', score, starsEarned);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '620px', padding: '1.75rem' }}>
        <button className="modal-close" onClick={onClose} title="Yopish">✕</button>

        {/* Sarlavha */}
        <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <h2 style={{ fontSize: '1.65rem', color: '#0F172A', marginBottom: '0.25rem' }}>
            ⚡ Raqamlar Sehrgari (60 Soniyalik Marafon)
          </h2>
          <p style={{ color: '#64748B', fontWeight: 600, fontSize: '0.9rem' }}>
            Har bir to'g'ri javob uchun ball va qo'shimcha +2 soniya vaqt oling!
          </p>
        </div>

        {/* Daraja tanlash */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.5rem',
          marginBottom: '1.25rem'
        }}>
          {[1, 2, 3].map((lvl) => (
            <button
              key={lvl}
              onClick={() => startGame(lvl)}
              style={{
                padding: '0.35rem 0.9rem',
                borderRadius: '10px',
                border: '1.5px solid',
                borderColor: level === lvl ? '#FF9F1C' : '#E2E8F0',
                background: level === lvl ? '#FFF7ED' : '#FFFFFF',
                color: level === lvl ? '#C2410C' : '#64748B',
                fontWeight: 800,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              {lvl === 1 ? '🍏 1-Daraja (Oson)' : lvl === 2 ? '🍊 2-Daraja (Zukko)' : '🍉 3-Daraja (Karra)'}
            </button>
          ))}
        </div>

        {/* Holat paneli: Taymer, Ball, Combo */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          background: '#FFFBEB',
          padding: '0.75rem',
          borderRadius: '16px',
          border: '2px solid #FDE68A',
          marginBottom: '1.25rem'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.78rem', color: '#92400E', fontWeight: 700 }}>⏱️ Qolgan Vaqt</div>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: 900,
              color: timeLeft <= 10 ? '#DC2626' : '#B45309',
              lineHeight: 1.1
            }}>
              {timeLeft}s
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.78rem', color: '#92400E', fontWeight: 700 }}>🏆 To'plangan Ball</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#D97706', lineHeight: 1.1 }}>
              {score}
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.78rem', color: '#92400E', fontWeight: 700 }}>🔥 Combo</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#EA580C', lineHeight: 1.1 }}>
              {streak}x
            </div>
          </div>
        </div>

        {bonusText && (
          <div style={{
            textAlign: 'center',
            color: bonusText.includes('❌') ? '#DC2626' : '#16A34A',
            fontWeight: 800,
            fontSize: '1.05rem',
            marginBottom: '0.5rem',
            animation: 'popIn 0.2s ease-out'
          }}>
            {bonusText}
          </div>
        )}

        {/* O'yin maydoni */}
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
            <div style={{ fontSize: '3rem', marginBottom: '0.35rem' }}>⚡🎉</div>
            <h3 style={{ fontSize: '1.6rem', color: '#166534', marginBottom: '0.3rem' }}>
              Hisob-Kitob Maratoni Tugadi!
            </h3>
            <p style={{ color: '#15803D', fontSize: '0.95rem', marginBottom: '1.25rem', fontWeight: 600 }}>
              Siz 60 soniyada {score} ball to'pladingiz! Chaqqonlikka gap yo'q!
            </p>

            <div style={{ display: 'flex', gap: '0.85rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                className="btn btn-primary"
                onClick={() => startGame(level)}
              >
                🔄 Yana Qatnashish
              </button>
              <button
                className="btn btn-accent"
                onClick={() => {
                  onClose();
                  if (onOpenDiplomaWithData) {
                    onOpenDiplomaWithData({
                      reason: `«Raqamlar Sehrgari» tezkor hisob marafonida ${score} ball to'plab ko'rsatgan yuksak chaqqonligi uchun.`
                    });
                  }
                }}
              >
                📜 Diplom Olish
              </button>
            </div>
          </div>
        ) : question ? (
          /* Savol va Mevali ko'rgazma */
          <div>
            <div style={{
              background: 'linear-gradient(135deg, #FEF3C7, #FDE68A)',
              borderRadius: '20px',
              padding: '1.5rem',
              textAlign: 'center',
              marginBottom: '1.25rem',
              border: '2px solid #FCD34D'
            }}>
              {/* Mevali vizual yordam (1-daraja uchun) */}
              {level === 1 && (
                <div style={{
                  fontSize: '1.35rem',
                  letterSpacing: '3px',
                  marginBottom: '0.65rem'
                }}>
                  {question.fruit.repeat(question.num1)} {question.op} {question.fruit.repeat(question.num2)}
                </div>
              )}

              {/* Raqamli ifoda */}
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '2.5rem',
                fontWeight: 900,
                color: '#78350F'
              }}>
                {question.num1} {question.op} {question.num2} = ?
              </div>
            </div>

            {/* Javob variantlari */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '0.85rem',
              marginBottom: '1rem'
            }}>
              {options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(opt)}
                  className="btn btn-white"
                  style={{
                    padding: '1rem',
                    fontSize: '1.5rem',
                    fontWeight: 900,
                    borderRadius: '16px',
                    borderColor: '#E2E8F0',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.04)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = '#FF9F1C'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = '#E2E8F0'}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
