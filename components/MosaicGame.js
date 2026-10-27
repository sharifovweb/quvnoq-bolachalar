'use client';

import { useState } from 'react';
import confetti from 'canvas-confetti';
import sound from '../lib/sound';
import { APP_DATA } from '../lib/data';
import StorageManager from '../lib/storage';

export default function MosaicGame({ onClose, onOpenDiplomaWithData }) {
  const templates = APP_DATA.mosaicTemplates;
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [placedSlots, setPlacedSlots] = useState({}); // key: `${r}-${c}`, value: color
  const [selectedPieceColor, setSelectedPieceColor] = useState(templates[0].palette[0]);
  const [activeTab, setActiveTab] = useState('canvas'); // 'canvas', 'rules', 'quiz'
  const [isCompleted, setIsCompleted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState(false);

  // Andozani almashtirish
  const handleSelectTemplate = (tpl) => {
    sound.click();
    setSelectedTemplate(tpl);
    setPlacedSlots({});
    setSelectedPieceColor(tpl.palette[0]);
    setIsCompleted(false);
  };

  // Rang / Bo'lakcha tanlash
  const handlePickColor = (color) => {
    sound.pop();
    setSelectedPieceColor(color);
  };

  // Katakka bo'lakchani joylashtirish
  const handleSlotClick = (r, c, targetSlot) => {
    sound.click();
    const key = `${r}-${c}`;
    const newPlaced = { ...placedSlots, [key]: selectedPieceColor };
    setPlacedSlots(newPlaced);

    // Barcha mozaika bo'lakchalari to'g'ri joylashtirildimi?
    checkCompletion(newPlaced);
  };

  const checkCompletion = (currentPlaced) => {
    let allFilled = true;
    for (const slot of selectedTemplate.slots) {
      const key = `${slot.r}-${slot.c}`;
      if (!currentPlaced[key]) {
        allFilled = false;
        break;
      }
    }

    if (allFilled && !isCompleted) {
      setIsCompleted(true);
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

      StorageManager.addReward(300, 5, '🎨 Mohir Mozaikachi Medali');
      StorageManager.saveResult('mosaic', 300, 5);
    }
  };

  // Mini test javobi
  const handleQuizAnswer = (isCorrect) => {
    if (quizAnswered) return;
    setQuizAnswered(true);
    if (isCorrect) {
      sound.correct();
      setQuizScore(100);
      StorageManager.addReward(100, 2, '✂️ Xavfsizlik Bilimdoni');
    } else {
      sound.wrong();
      setQuizScore(0);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content modal-content-wide" style={{ padding: '1.75rem' }}>
        <button className="modal-close" onClick={onClose} title="Yopish">✕</button>

        {/* Sarlavha va Tablar */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          marginBottom: '1.25rem',
          borderBottom: '2px solid #F1F5F9',
          paddingBottom: '0.85rem'
        }}>
          <div>
            <h2 style={{ fontSize: '1.6rem', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>🎨</span> Mohir Qo'llar: Mozaika & Aplikatsiya
            </h2>
            <p style={{ color: '#64748B', fontWeight: 600, fontSize: '0.88rem' }}>
              Rangli qog'ozlar va geometrik shakllardan ajoyib san'at asarini yarating!
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => { sound.click(); setActiveTab('canvas'); }}
              style={{
                ...tabBtnStyle,
                background: activeTab === 'canvas' ? '#00B894' : '#F8FAFC',
                color: activeTab === 'canvas' ? '#FFFFFF' : '#475569',
                borderColor: activeTab === 'canvas' ? '#00B894' : '#E2E8F0'
              }}
            >
              🧩 Mozaika Yig'ish
            </button>
            <button
              onClick={() => { sound.click(); setActiveTab('rules'); }}
              style={{
                ...tabBtnStyle,
                background: activeTab === 'rules' ? '#00B894' : '#F8FAFC',
                color: activeTab === 'rules' ? '#FFFFFF' : '#475569',
                borderColor: activeTab === 'rules' ? '#00B894' : '#E2E8F0'
              }}
            >
              ✂️ Xavfsizlik Qoidalari
            </button>
            <button
              onClick={() => { sound.click(); setActiveTab('quiz'); }}
              style={{
                ...tabBtnStyle,
                background: activeTab === 'quiz' ? '#00B894' : '#F8FAFC',
                color: activeTab === 'quiz' ? '#FFFFFF' : '#475569',
                borderColor: activeTab === 'quiz' ? '#00B894' : '#E2E8F0'
              }}
            >
              🎯 Hunar Testi
            </button>
          </div>
        </div>

        {activeTab === 'canvas' && (
          <div>
            {/* Andoza tanlash */}
            <div style={{
              display: 'flex',
              gap: '0.65rem',
              marginBottom: '1.25rem',
              flexWrap: 'wrap'
            }}>
              {templates.map((tpl) => (
                <button
                  key={tpl.id}
                  onClick={() => handleSelectTemplate(tpl)}
                  style={{
                    padding: '0.45rem 1rem',
                    borderRadius: '12px',
                    border: '2px solid',
                    borderColor: selectedTemplate.id === tpl.id ? '#00B894' : '#E2E8F0',
                    background: selectedTemplate.id === tpl.id ? '#E6FFFA' : '#FFFFFF',
                    color: selectedTemplate.id === tpl.id ? '#00624A' : '#475569',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 800,
                    fontSize: '0.92rem',
                    cursor: 'pointer'
                  }}
                >
                  {tpl.title}
                </button>
              ))}
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
              alignItems: 'start'
            }}>
              {/* Mozaika doskasi */}
              <div style={{
                background: '#F8FAFC',
                borderRadius: '24px',
                padding: '1.25rem',
                border: '3px solid #E2E8F0',
                boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.05)'
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${selectedTemplate.gridWidth}, 1fr)`,
                  gap: '6px',
                  aspectRatio: '1/1',
                  maxWidth: '380px',
                  margin: '0 auto'
                }}>
                  {Array.from({ length: selectedTemplate.gridHeight }).map((_, r) =>
                    Array.from({ length: selectedTemplate.gridWidth }).map((__, c) => {
                      const slot = selectedTemplate.slots.find((s) => s.r === r && s.c === c);
                      const key = `${r}-${c}`;
                      const placedColor = placedSlots[key];

                      return (
                        <div
                          key={key}
                          onClick={() => slot && handleSlotClick(r, c, slot)}
                          style={{
                            aspectRatio: '1/1',
                            borderRadius: slot?.shape === 'circle' ? '50%' : '8px',
                            border: slot ? '2px dashed #94A3B8' : '1px solid #E2E8F0',
                            background: placedColor || (slot ? '#FFFFFF' : '#F1F5F9'),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: slot ? 'pointer' : 'default',
                            transition: 'all 0.2s',
                            boxShadow: placedColor ? '0 2px 6px rgba(0,0,0,0.1)' : 'none'
                          }}
                        >
                          {slot && !placedColor && (
                            <span style={{ fontSize: '0.65rem', color: '#CBD5E1' }}>➕</span>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Ranglar palitrasi va Boshqaruv */}
              <div>
                <div style={{
                  background: '#FFFFFF',
                  borderRadius: '20px',
                  padding: '1.25rem',
                  border: '2px solid #E2E8F0',
                  marginBottom: '1.25rem'
                }}>
                  <h4 style={{ fontSize: '1rem', color: '#0F172A', marginBottom: '0.5rem' }}>
                    🎨 Rangli Qog'oz Bo'lakchalari:
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '0.85rem' }}>
                    Bo'lakcha rangini tanlang, so'ng doskadagi belgilangan joyga bosing:
                  </p>

                  <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
                    {selectedTemplate.palette.map((color, idx) => (
                      <button
                        key={idx}
                        onClick={() => handlePickColor(color)}
                        style={{
                          width: '46px',
                          height: '46px',
                          borderRadius: '12px',
                          background: color,
                          border: selectedPieceColor === color ? '4px solid #00B894' : '2px solid #FFFFFF',
                          boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                          cursor: 'pointer',
                          transform: selectedPieceColor === color ? 'scale(1.15)' : 'scale(1)',
                          transition: 'transform 0.15s'
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* G'alaba va tugmalar */}
                {isCompleted ? (
                  <div style={{
                    background: '#F0FDF4',
                    border: '2px solid #86EFAC',
                    borderRadius: '20px',
                    padding: '1.25rem',
                    textAlign: 'center',
                    animation: 'popIn 0.3s ease-out'
                  }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '0.35rem' }}>🏆🎨</div>
                    <h4 style={{ fontSize: '1.3rem', color: '#166534', marginBottom: '0.25rem' }}>
                      Qoyilmaqom Mozaika Asari Tayyor!
                    </h4>
                    <p style={{ color: '#15803D', fontSize: '0.88rem', marginBottom: '1rem' }}>
                      Siz chinakam mohir hunarmand va ustasiz! Mehnat ta'limi medali berildi.
                    </p>
                    <button
                      className="btn btn-accent"
                      onClick={() => {
                        onClose();
                        if (onOpenDiplomaWithData) {
                          onOpenDiplomaWithData({
                            reason: `«Mohir Qo'llar: Mozaika & Aplikatsiya» festivalida «${selectedTemplate.title}» asarini nozik did bilan yaratgani uchun.`
                          });
                        }
                      }}
                    >
                      📜 Faxriy Diplom Olish
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button
                      className="btn btn-white"
                      onClick={() => setPlacedSlots({})}
                      style={{ flex: 1, fontSize: '0.9rem' }}
                    >
                      🔄 Tozalash
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Xavfsizlik Qoidalari Tabi */}
        {activeTab === 'rules' && (
          <div style={{
            background: '#F8FAFC',
            borderRadius: '20px',
            padding: '1.5rem',
            border: '2px solid #E2E8F0'
          }}>
            <h3 style={{ fontSize: '1.3rem', color: '#0F172A', marginBottom: '0.75rem' }}>
              📚 Mozaika va Aplikatsiya: Xavfsizlik va Mehnat Qoidalari
            </h3>
            <p style={{ color: '#475569', fontSize: '0.95rem', marginBottom: '1.25rem', lineHeight: 1.6 }}>
              O'zbekiston umumta'lim maktablarining mehnat ta'limi va texnologiya darslari dasturi asosida tayyorlangan qoidalar:
            </p>

            <div style={{ display: 'grid', gap: '0.85rem' }}>
              <div style={ruleBoxStyle}>
                <div style={{ fontSize: '1.8rem' }}>✂️</div>
                <div>
                  <h4 style={{ fontSize: '1rem', color: '#0F172A', marginBottom: '0.2rem' }}>Qaychi Bilan Ishlash</h4>
                  <p style={{ fontSize: '0.88rem', color: '#64748B' }}>
                    Qaychini ochiq holda qoldirmang. O'rtoqqa berishda halqasini oldinga qilib, ehtiyotkorlik bilan uzating!
                  </p>
                </div>
              </div>

              <div style={ruleBoxStyle}>
                <div style={{ fontSize: '1.8rem' }}>🧴</div>
                <div>
                  <h4 style={{ fontSize: '1rem', color: '#0F172A', marginBottom: '0.2rem' }}>Yelimlash Sirlari</h4>
                  <p style={{ fontSize: '0.88rem', color: '#64748B' }}>
                    Yelimni faqat mo'yqalam yoki qalamcha bilan me'yorida surting. Ortiqcha yelimni quruq salfetka bilan artib oling.
                  </p>
                </div>
              </div>

              <div style={ruleBoxStyle}>
                <div style={{ fontSize: '1.8rem' }}>🧹</div>
                <div>
                  <h4 style={{ fontSize: '1rem', color: '#0F172A', marginBottom: '0.2rem' }}>Ish Stolining Tozaligi</h4>
                  <p style={{ fontSize: '0.88rem', color: '#64748B' }}>
                    Ish tugagach barcha qog'oz qiyqimlarini savatga tashlang, asboblarni qutisiga joylab, qo'llaringizni toza yuving!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Hunar Testi Tabi */}
        {activeTab === 'quiz' && (
          <div style={{
            background: '#F8FAFC',
            borderRadius: '20px',
            padding: '1.5rem',
            border: '2px solid #E2E8F0',
            textAlign: 'center'
          }}>
            <h3 style={{ fontSize: '1.25rem', color: '#0F172A', marginBottom: '0.5rem' }}>
              🎯 Xavfsizlik Qoidalari Bo'yicha Tezkor Savol
            </h3>
            <p style={{ color: '#64748B', fontSize: '0.95rem', marginBottom: '1.25rem' }}>
              Qaychini sinfdoshingiz yoki o'rtog'ingizga qanday uzatishingiz kerak?
            </p>

            <div style={{ display: 'grid', gap: '0.75rem', maxWidth: '440px', margin: '0 auto 1.25rem auto' }}>
              <button
                className="btn btn-white"
                onClick={() => handleQuizAnswer(false)}
                disabled={quizAnswered}
                style={{ textAlign: 'left', padding: '0.85rem' }}
              >
                A) Uchini oldinga qaratib uzatish kerak
              </button>
              <button
                className="btn btn-white"
                onClick={() => handleQuizAnswer(true)}
                disabled={quizAnswered}
                style={{
                  textAlign: 'left',
                  padding: '0.85rem',
                  borderColor: quizAnswered ? '#22C55E' : '#E2E8F0',
                  background: quizAnswered ? '#DCFCE7' : '#FFFFFF'
                }}
              >
                B) Halqasini oldinga qaratib, tutqichidan uzatish kerak ✓
              </button>
              <button
                className="btn btn-white"
                onClick={() => handleQuizAnswer(false)}
                disabled={quizAnswered}
                style={{ textAlign: 'left', padding: '0.85rem' }}
              >
                C) Otib berish kerak
              </button>
            </div>

            {quizAnswered && (
              <div style={{
                color: '#15803D',
                fontWeight: 700,
                fontSize: '1rem',
                animation: 'popIn 0.2s'
              }}>
                🎉 Barakalla! Halqasini oldinga qilib berish eng to'g'ri va xavfsiz usul! +100 ball qo'shildi.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const tabBtnStyle = {
  padding: '0.45rem 0.95rem',
  borderRadius: '10px',
  border: '1.5px solid',
  fontFamily: 'var(--font-heading)',
  fontWeight: 700,
  fontSize: '0.85rem',
  cursor: 'pointer',
  transition: 'all 0.2s'
};

const ruleBoxStyle = {
  display: 'flex',
  gap: '1rem',
  alignItems: 'center',
  background: '#FFFFFF',
  padding: '1rem 1.25rem',
  borderRadius: '14px',
  border: '1.5px solid #E2E8F0'
};
