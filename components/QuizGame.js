'use client';

import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import sound from '../lib/sound';
import { APP_DATA } from '../lib/data';
import StorageManager from '../lib/storage';

export default function QuizGame({ onClose, roomData = null, onOpenDiplomaWithData }) {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [streak, setStreak] = useState(0);
  const [timer, setTimer] = useState(15);

  const topics = APP_DATA.quizTopics;

  // Mavzu tanlanganda o'yinni boshlash
  const startQuiz = (topic) => {
    sound.click();
    setSelectedTopic(topic);
    setCurrentIdx(0);
    setScore(0);
    setLives(3);
    setStreak(0);
    setSelectedOpt(null);
    setAnswered(false);
    setIsGameOver(false);
    setTimer(15);
  };

  // Har bir savol uchun vaqt sanagichi
  useEffect(() => {
    if (!selectedTopic || isGameOver || answered) return;

    if (timer <= 0) {
      handleTimeOut();
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, selectedTopic, isGameOver, answered]);

  const handleTimeOut = () => {
    sound.wrong();
    setAnswered(true);
    const newLives = lives - 1;
    setLives(newLives);
    setStreak(0);

    if (newLives <= 0) {
      finishGame(score, false);
    }
  };

  const handleSelectOption = (idx) => {
    if (answered || isGameOver) return;
    setSelectedOpt(idx);
    setAnswered(true);

    const q = selectedTopic.questions[currentIdx];
    const isCorrect = idx === q.correct;

    if (isCorrect) {
      sound.correct();
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > 1) sound.combo(newStreak);
      const points = 100 + (newStreak * 20);
      setScore((prev) => prev + points);
    } else {
      sound.wrong();
      setStreak(0);
      const newLives = lives - 1;
      setLives(newLives);

      if (newLives <= 0) {
        setTimeout(() => finishGame(score, false), 1500);
        return;
      }
    }
  };

  const handleNext = () => {
    sound.click();
    if (currentIdx + 1 < selectedTopic.questions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOpt(null);
      setAnswered(false);
      setTimer(15);
    } else {
      finishGame(score, true);
    }
  };

  const finishGame = (finalScore, isVictory) => {
    setIsGameOver(true);
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

    const starsEarned = Math.max(1, Math.min(5, Math.ceil(finalScore / 200)));
    StorageManager.addReward(finalScore, starsEarned, '🦁 Zukko Bilimdon');
    StorageManager.saveResult('quiz', finalScore, starsEarned, roomData?.code);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '680px', padding: '2rem' }}>
        <button className="modal-close" onClick={onClose} title="Yopish">✕</button>

        {!selectedTopic ? (
          /* 1-bosqich: Mavzu tanlash */
          <div>
            <div style={{ textAlign: 'center', marginBottom: '1.75rem', padding: '0 2rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🦁</div>
              <h2 style={{ fontSize: 'clamp(1.35rem, 5vw, 1.8rem)', color: '#0F172A', marginBottom: '0.4rem' }}>
                Zukko Bilimdon Viktorinasi
              </h2>
              <p style={{ color: '#64748B', fontWeight: 600 }}>
                Qaysi mavzuda o'z bilimingizni sinab ko'rmoqchisiz?
              </p>
            </div>

            <div style={{ display: 'grid', gap: '0.85rem' }}>
              {topics.map((t) => (
                <div
                  key={t.id}
                  onClick={() => startQuiz(t)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1.1rem 1.25rem',
                    borderRadius: '16px',
                    border: '2px solid #E2E8F0',
                    background: '#FFFFFF',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.03)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#FF5E36';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#E2E8F0';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{
                    fontSize: '2rem',
                    width: '52px',
                    height: '52px',
                    borderRadius: '14px',
                    background: '#FFF3EE',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {t.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1.15rem', color: '#0F172A', marginBottom: '0.2rem' }}>
                      {t.name}
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: '#64748B' }}>
                      {t.desc}
                    </p>
                  </div>
                  <div style={{ fontSize: '1.3rem', color: '#FF5E36' }}>➔</div>
                </div>
              ))}
            </div>
          </div>
        ) : isGameOver ? (
          /* O'yin tugadi / Natija */
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div style={{ fontSize: '4.5rem', marginBottom: '0.5rem' }}>🎉</div>
            <h2 style={{ fontSize: '2rem', color: '#0F172A', marginBottom: '0.5rem' }}>
              Musobaqa Yakunlandi!
            </h2>
            <p style={{ color: '#64748B', fontWeight: 600, marginBottom: '1.5rem' }}>
              Siz juda ajoyib ishtirok etdingiz va aql-idrokingizni ko'rsatdingiz!
            </p>

            <div style={{
              background: '#FFFBEB',
              border: '2px solid #FCD34D',
              borderRadius: '20px',
              padding: '1.5rem',
              maxWidth: '380px',
              margin: '0 auto 2rem auto',
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ fontSize: '0.85rem', color: '#92400E', fontWeight: 700 }}>To'plangan Ball</div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#B45309' }}>{score}</div>
              </div>
              <div style={{ width: '2px', height: '40px', background: '#FDE68A' }} />
              <div>
                <div style={{ fontSize: '0.85rem', color: '#92400E', fontWeight: 700 }}>Yulduzlar</div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#D97706' }}>
                  {'⭐'.repeat(Math.max(1, Math.min(5, Math.ceil(score / 200))))}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.85rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                className="btn btn-primary"
                onClick={() => startQuiz(selectedTopic)}
              >
                <span>🔄 Yana O'ynash</span>
              </button>
              <button
                className="btn btn-accent"
                onClick={() => {
                  onClose();
                  if (onOpenDiplomaWithData) {
                    onOpenDiplomaWithData({
                      reason: `«Zukko Bilimdon» (${selectedTopic.name}) viktorinasidagi g'olibligi va ${score} ball to'plagani uchun.`
                    });
                  }
                }}
              >
                <span>📜 Diplom Olish</span>
              </button>
              <button
                className="btn btn-white"
                onClick={() => setSelectedTopic(null)}
              >
                Boshqa Mavzu
              </button>
            </div>
          </div>
        ) : (
          /* O'yin jarayoni: Savol va Variantlar */
          <div>
            {/* Yuqori panel: Savol raqami, jonlar, taymer va ball */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.25rem',
              background: '#F8FAFC',
              padding: '0.75rem 1.25rem',
              borderRadius: '16px',
              border: '1px solid #E2E8F0'
            }}>
              <div style={{ fontWeight: 800, color: '#475569', fontSize: '0.95rem' }}>
                Savol: {currentIdx + 1} / {selectedTopic.questions.length}
              </div>

              {/* Jonlar */}
              <div style={{ fontSize: '1.2rem', letterSpacing: '2px' }}>
                {'❤️'.repeat(lives)}{'🖤'.repeat(Math.max(0, 3 - lives))}
              </div>

              {/* Taymer */}
              <div style={{
                fontWeight: 800,
                fontSize: '1rem',
                color: timer <= 5 ? '#EF4444' : '#0F172A',
                background: timer <= 5 ? '#FEE2E2' : '#F1F5F9',
                padding: '0.2rem 0.65rem',
                borderRadius: '8px'
              }}>
                ⏳ {timer}s
              </div>

              {/* Ball */}
              <div style={{ fontWeight: 800, color: '#FF5E36', fontSize: '1.1rem' }}>
                🏆 {score}
              </div>
            </div>

            {/* Streak nishoni */}
            {streak > 1 && (
              <div style={{
                textAlign: 'center',
                marginBottom: '0.75rem',
                color: '#EA580C',
                fontWeight: 800,
                fontSize: '0.95rem',
                animation: 'pulseGlow 1s infinite'
              }}>
                🔥 {streak}x Ketma-ket to'g'ri javob! Combo bonusi!
              </div>
            )}

            {/* Savol matni */}
            <div style={{
              background: 'linear-gradient(135deg, #FFF7ED, #FFEDD5)',
              border: '2px solid #FED7AA',
              borderRadius: '20px',
              padding: '1.5rem',
              marginBottom: '1.5rem',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '1.35rem',
                fontWeight: 800,
                color: '#7C2D12',
                lineHeight: 1.4
              }}>
                {selectedTopic.questions[currentIdx].q}
              </div>
            </div>

            {/* Variantlar */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem', marginBottom: '1.25rem' }}>
              {selectedTopic.questions[currentIdx].options.map((opt, idx) => {
                const isCorrect = idx === selectedTopic.questions[currentIdx].correct;
                const isChosen = selectedOpt === idx;

                let bg = '#FFFFFF';
                let borderColor = '#E2E8F0';
                let textColor = '#0F172A';

                if (answered) {
                  if (isCorrect) {
                    bg = '#DCFCE7';
                    borderColor = '#22C55E';
                    textColor = '#15803D';
                  } else if (isChosen) {
                    bg = '#FEE2E2';
                    borderColor = '#EF4444';
                    textColor = '#B91C1C';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={answered}
                    onClick={() => handleSelectOption(idx)}
                    style={{
                      padding: '1rem 1.15rem',
                      borderRadius: '14px',
                      border: `2px solid ${borderColor}`,
                      background: bg,
                      color: textColor,
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.05rem',
                      fontWeight: 700,
                      cursor: answered ? 'default' : 'pointer',
                      transition: 'all 0.2s',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.65rem'
                    }}
                  >
                    <span style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: answered && isCorrect ? '#22C55E' : '#F1F5F9',
                      color: answered && isCorrect ? '#FFFFFF' : '#64748B',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.85rem'
                    }}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Qiziqarli ma'lumot (Fact) & Keyingi tugmasi */}
            {answered && (
              <div style={{
                background: '#F0FDF4',
                border: '1.5px solid #BBF7D0',
                padding: '1rem',
                borderRadius: '14px',
                marginBottom: '1.25rem',
                fontSize: '0.92rem',
                color: '#166534',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.75rem'
              }}>
                <div>💡 {selectedTopic.questions[currentIdx].fact}</div>
                <button
                  className="btn btn-primary"
                  onClick={handleNext}
                  style={{ padding: '0.55rem 1.25rem', fontSize: '0.95rem' }}
                >
                  Keyingi Savol ➔
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
