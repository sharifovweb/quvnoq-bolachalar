'use client';

import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import sound from '../lib/sound';
import { APP_DATA } from '../lib/data';
import StorageManager from '../lib/storage';

export default function WordGame({ onClose, onOpenDiplomaWithData }) {
  const puzzles = APP_DATA.wordPuzzles;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [scrambled, setScrambled] = useState([]);
  const [currentWord, setCurrentWord] = useState([]);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [isWordComplete, setIsWordComplete] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  // So'zni sozlash va harflarni aralashtirish
  const loadPuzzle = (idx) => {
    const puzzle = puzzles[idx];
    const letters = puzzle.word.split('').map((char, i) => ({
      id: `${i}-${char}`,
      char
    }));
    // Aralashtirish
    const shuffled = [...letters].sort(() => Math.random() - 0.5);
    setScrambled(shuffled);
    setCurrentWord([]);
    setShowHint(false);
    setIsWordComplete(false);
  };

  useEffect(() => {
    loadPuzzle(currentIdx);
  }, [currentIdx]);

  // Harfni bosib so'zga qo'shish
  const handleSelectLetter = (item) => {
    sound.pop();
    const newWord = [...currentWord, item];
    const newScrambled = scrambled.filter((l) => l.id !== item.id);
    setCurrentWord(newWord);
    setScrambled(newScrambled);

    // Barcha harflar terildimi?
    if (newScrambled.length === 0) {
      checkWord(newWord);
    }
  };

  // Harfni so'zdan qaytarib olish
  const handleRemoveLetter = (item) => {
    sound.click();
    const newWord = currentWord.filter((l) => l.id !== item.id);
    const newScrambled = [...scrambled, item];
    setCurrentWord(newWord);
    setScrambled(newScrambled);
    setIsWordComplete(false);
  };

  // So'zni tekshirish
  const checkWord = (wordArr) => {
    const built = wordArr.map((w) => w.char).join('');
    const target = puzzles[currentIdx].word;

    if (built === target) {
      sound.correct();
      setIsWordComplete(true);
      const points = 100 + (target.length * 10);
      setScore((prev) => prev + points);

      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (e) {
        console.warn(e);
      }

      setTimeout(() => {
        if (currentIdx + 1 < puzzles.length) {
          setCurrentIdx((prev) => prev + 1);
        } else {
          finishGame(score + points);
        }
      }, 1400);
    } else {
      sound.wrong();
    }
  };

  const handleClear = () => {
    sound.click();
    loadPuzzle(currentIdx);
  };

  const finishGame = (finalScore) => {
    setIsGameOver(true);
    sound.victory();

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.warn(e);
    }

    const starsEarned = 5;
    StorageManager.addReward(finalScore, starsEarned, '🧩 So\'z Yasovchi Zukko');
    StorageManager.saveResult('word', finalScore, starsEarned);
  };

  const puzzle = puzzles[currentIdx];

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '640px', padding: '1.75rem' }}>
        <button className="modal-close" onClick={onClose} title="Yopish">✕</button>

        {/* Sarlavha */}
        <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <h2 style={{ fontSize: '1.65rem', color: '#0F172A', marginBottom: '0.25rem' }}>
            🧩 So'z Yasovchi Zukko
          </h2>
          <p style={{ color: '#64748B', fontWeight: 600, fontSize: '0.9rem' }}>
            Aralashib ketgan harflarni to'g'ri tartibda terib, so'zni hosil qiling!
          </p>
        </div>

        {/* Yuqori panel */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: '#F8FAFC',
          padding: '0.65rem 1.15rem',
          borderRadius: '14px',
          border: '1px solid #E2E8F0',
          marginBottom: '1.25rem',
          fontWeight: 700,
          fontSize: '0.92rem'
        }}>
          <div>So'z: {currentIdx + 1} / {puzzles.length}</div>
          <div style={{ color: '#6C5CE7', fontSize: '1.1rem' }}>🏆 {score} ball</div>
        </div>

        {isGameOver ? (
          /* O'yin tugadi */
          <div style={{
            textAlign: 'center',
            background: '#F0FDF4',
            border: '2px solid #86EFAC',
            borderRadius: '20px',
            padding: '1.5rem',
            animation: 'popIn 0.3s ease-out'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.35rem' }}>🎉🏆</div>
            <h3 style={{ fontSize: '1.6rem', color: '#166534', marginBottom: '0.3rem' }}>
              Barcha So'zlar Topildi!
            </h3>
            <p style={{ color: '#15803D', fontSize: '0.95rem', marginBottom: '1.25rem', fontWeight: 600 }}>
              Lug'at boyligingiz va zukkoligingiz tahsinga sazovor! Jami ball: {score}
            </p>

            <div style={{ display: 'flex', gap: '0.85rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setCurrentIdx(0);
                  setScore(0);
                  setIsGameOver(false);
                }}
              >
                🔄 Boshidan O'ynash
              </button>
              <button
                className="btn btn-accent"
                onClick={() => {
                  onClose();
                  if (onOpenDiplomaWithData) {
                    onOpenDiplomaWithData({
                      reason: `«So'z Yasovchi Zukko» intellektual bellashuvida barcha so'zlarni xatosiz tergani va boy lug'ati uchun.`
                    });
                  }
                }}
              >
                📜 Diplom Olish
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Rasm va Maslahat vitrinasi */}
            <div style={{
              background: 'linear-gradient(135deg, #F3E8FF, #E9D5FF)',
              borderRadius: '20px',
              padding: '1.5rem',
              textAlign: 'center',
              border: '2px solid #D8B4FE',
              marginBottom: '1.25rem'
            }}>
              <div style={{ fontSize: '4.5rem', lineHeight: 1, marginBottom: '0.5rem' }}>
                {puzzle.icon}
              </div>

              {showHint ? (
                <div style={{
                  color: '#6B21A8',
                  fontWeight: 700,
                  fontSize: '1rem',
                  animation: 'fadeIn 0.2s'
                }}>
                  💡 Maslahat: {puzzle.hint}
                </div>
              ) : (
                <button
                  onClick={() => setShowHint(true)}
                  style={{
                    background: '#FFFFFF',
                    border: '1.5px solid #C084FC',
                    color: '#7E22CE',
                    padding: '0.3rem 0.85rem',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  💡 Maslahatni ko'rish
                </button>
              )}
            </div>

            {/* Terilgan so'z katakchalari */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.4rem',
              minHeight: '56px',
              marginBottom: '1.25rem',
              flexWrap: 'wrap'
            }}>
              {Array.from({ length: puzzle.word.length }).map((_, idx) => {
                const letter = currentWord[idx];
                return (
                  <div
                    key={idx}
                    onClick={() => letter && handleRemoveLetter(letter)}
                    style={{
                      width: 'clamp(38px, 11vw, 52px)',
                      height: 'clamp(46px, 13vw, 58px)',
                      borderRadius: '12px',
                      border: '2px dashed',
                      borderColor: isWordComplete ? '#22C55E' : letter ? '#6C5CE7' : '#CBD5E1',
                      background: isWordComplete ? '#DCFCE7' : letter ? '#FFFFFF' : '#F8FAFC',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 'clamp(1.3rem, 5vw, 1.8rem)',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 900,
                      color: isWordComplete ? '#15803D' : '#6C5CE7',
                      cursor: letter ? 'pointer' : 'default',
                      boxShadow: letter ? '0 4px 10px rgba(108, 92, 231, 0.15)' : 'none',
                      transition: 'all 0.2s'
                    }}
                  >
                    {letter ? letter.char : ''}
                  </div>
                );
              })}
            </div>

            {/* Aralashgan harf pufakchalari */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.5rem',
              flexWrap: 'wrap',
              marginBottom: '1.25rem'
            }}>
              {scrambled.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelectLetter(item)}
                  style={{
                    width: 'clamp(44px, 12vw, 56px)',
                    height: 'clamp(44px, 12vw, 56px)',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #6C5CE7, #8B5CF6)',
                    color: '#FFFFFF',
                    border: '2.5px solid #FFFFFF',
                    fontSize: 'clamp(1.2rem, 5vw, 1.6rem)',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 900,
                    cursor: 'pointer',
                    boxShadow: '0 6px 14px rgba(108, 92, 231, 0.3)',
                    transition: 'transform 0.15s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  {item.char}
                </button>
              ))}
            </div>

            {/* Boshqaruv tugmalari */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.85rem' }}>
              <button
                className="btn btn-white"
                onClick={handleClear}
                style={{ fontSize: '0.9rem', padding: '0.5rem 1.25rem' }}
              >
                🔄 Tozalash
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
