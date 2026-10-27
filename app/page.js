'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import CategoryCards from '../components/CategoryCards';
import TeacherRooms from '../components/TeacherRooms';
import Leaderboard from '../components/Leaderboard';
import Footer from '../components/Footer';

// O'yin Modallari
import QuizGame from '../components/QuizGame';
import MemoryGame from '../components/MemoryGame';
import MathGame from '../components/MathGame';
import WordGame from '../components/WordGame';
import ShapesGame from '../components/ShapesGame';
import MosaicGame from '../components/MosaicGame';

// Qo'shimcha Modallar
import DiplomaStudio from '../components/DiplomaStudio';
import TeacherPortal from '../components/TeacherPortal';
import ProfileModal from '../components/ProfileModal';

import StorageManager from '../lib/storage';
import sound from '../lib/sound';

export default function Home() {
  const [activeGame, setActiveGame] = useState(null); // 'quiz', 'memory', 'math', 'word', 'shapes', 'mosaic'
  const [showTeacher, setShowTeacher] = useState(false);
  const [showDiploma, setShowDiploma] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [diplomaData, setDiplomaData] = useState(null);
  const [roomData, setRoomData] = useState(null);
  const [notification, setNotification] = useState(null);

  const showToast = (msg, isError = false) => {
    setNotification({ msg, isError });
    setTimeout(() => setNotification(null), 3500);
  };

  // O'yinni tanlash
  const handleSelectGame = (gameId) => {
    setRoomData(null);
    setActiveGame(gameId);
  };

  // Xona kodi orqali kirish
  const handleJoinRoom = (code) => {
    const room = StorageManager.findRoom(code);
    if (room) {
      sound.correct();
      setRoomData(room);
      setActiveGame(room.category);
      showToast(`«${room.title}» musobaqasiga muvaffaqiyatli ulandingiz! 🚀`);
    } else {
      sound.wrong();
      showToast(`Kechirasiz, "${code}" kodi bo'yicha faol xona topilmadi. Qaytadan tekshirib ko'ring! ❌`, true);
    }
  };

  // O'yinda g'alaba qozonib diplom olishga o'tish
  const handleOpenDiplomaWithData = (data) => {
    setDiplomaData(data);
    setShowDiploma(true);
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Bildirishnoma (Toast) */}
      {notification && (
        <div style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 9999,
          background: notification.isError ? '#FEE2E2' : '#DCFCE7',
          color: notification.isError ? '#B91C1C' : '#15803D',
          border: `2px solid ${notification.isError ? '#EF4444' : '#22C55E'}`,
          borderRadius: '16px',
          padding: '0.85rem 1.75rem',
          fontWeight: 800,
          boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
          animation: 'popIn 0.3s ease-out'
        }}>
          {notification.msg}
        </div>
      )}

      {/* Yuqori Navigatsiya */}
      <Navbar
        onOpenProfile={() => { sound.click(); setShowProfile(true); }}
        onOpenTeacher={() => { sound.click(); setShowTeacher(true); }}
        onOpenRoomJoin={() => {
          const el = document.getElementById('rooms');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Bosh Asosiy Vitrina */}
      <Hero
        onJoinRoom={handleJoinRoom}
        onOpenDiploma={() => {
          sound.click();
          setDiplomaData(null);
          setShowDiploma(true);
        }}
      />

      {/* Faol Xonalar va Ustoz Kodlari */}
      <TeacherRooms
        onJoinRoom={handleJoinRoom}
        onOpenTeacher={() => { sound.click(); setShowTeacher(true); }}
      />

      {/* 6 ta O'yin Yo'nalishlari */}
      <CategoryCards onSelectGame={handleSelectGame} />

      {/* Chempionlar Reytingi */}
      <Leaderboard />

      {/* Pastki Qism (Footer) */}
      <Footer
        onOpenTeacher={() => { sound.click(); setShowTeacher(true); }}
        onOpenDiploma={() => {
          sound.click();
          setDiplomaData(null);
          setShowDiploma(true);
        }}
      />

      {/* O'yin Modallari */}
      {activeGame === 'quiz' && (
        <QuizGame
          onClose={() => setActiveGame(null)}
          roomData={roomData}
          onOpenDiplomaWithData={handleOpenDiplomaWithData}
        />
      )}

      {activeGame === 'memory' && (
        <MemoryGame
          onClose={() => setActiveGame(null)}
          onOpenDiplomaWithData={handleOpenDiplomaWithData}
        />
      )}

      {activeGame === 'math' && (
        <MathGame
          onClose={() => setActiveGame(null)}
          onOpenDiplomaWithData={handleOpenDiplomaWithData}
        />
      )}

      {activeGame === 'word' && (
        <WordGame
          onClose={() => setActiveGame(null)}
          onOpenDiplomaWithData={handleOpenDiplomaWithData}
        />
      )}

      {activeGame === 'shapes' && (
        <ShapesGame
          onClose={() => setActiveGame(null)}
          onOpenDiplomaWithData={handleOpenDiplomaWithData}
        />
      )}

      {activeGame === 'mosaic' && (
        <MosaicGame
          onClose={() => setActiveGame(null)}
          onOpenDiplomaWithData={handleOpenDiplomaWithData}
        />
      )}

      {/* Diplom Studiyasi Modali */}
      {showDiploma && (
        <DiplomaStudio
          initialData={diplomaData}
          onClose={() => setShowDiploma(false)}
        />
      )}

      {/* Ustoz Kabineti Modali */}
      {showTeacher && (
        <TeacherPortal
          onClose={() => setShowTeacher(false)}
          onOpenDiplomaWithData={handleOpenDiplomaWithData}
        />
      )}

      {/* Foydalanuvchi Profili Modali */}
      {showProfile && (
        <ProfileModal
          onClose={() => setShowProfile(false)}
        />
      )}
    </main>
  );
}
