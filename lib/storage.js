'use client';

// ==========================================
// Quvnoq Bolachalar - LocalStorage menejeri
// SSR xavfsiz holatda profil, xonalar va natijalar
// ==========================================

import { APP_DATA } from './data';

const KEYS = {
  USER: 'qb_user_profile',
  ROOMS: 'qb_active_rooms',
  RESULTS: 'qb_game_results',
  DIPLOMAS: 'qb_saved_diplomas',
  TEACHER: 'qb_teacher_data'
};

export const StorageManager = {
  getUser() {
    if (typeof window === 'undefined') {
      return {
        name: 'Azizbek',
        avatar: '🦁',
        level: 1,
        totalScore: 450,
        stars: 18,
        badges: ['🌟 Birinchi Qadam', '🦁 Jasur Bilimdon']
      };
    }
    const raw = localStorage.getItem(KEYS.USER);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (e) {
        console.error(e);
      }
    }
    const defaultUser = {
      name: 'Azizbek',
      avatar: '🦁',
      level: 1,
      totalScore: 450,
      stars: 18,
      badges: ['🌟 Birinchi Qadam', '🦁 Jasur Bilimdon'],
      joinedRooms: []
    };
    this.saveUser(defaultUser);
    return defaultUser;
  },

  saveUser(user) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(KEYS.USER, JSON.stringify(user));
    window.dispatchEvent(new Event('qb_user_updated'));
  },

  addReward(points = 50, stars = 1, badgeTitle = null) {
    const user = this.getUser();
    user.totalScore = (user.totalScore || 0) + points;
    user.stars = (user.stars || 0) + stars;
    user.level = Math.floor(user.totalScore / 500) + 1;

    if (badgeTitle && (!user.badges || !user.badges.includes(badgeTitle))) {
      user.badges = user.badges || [];
      user.badges.push(badgeTitle);
    }

    this.saveUser(user);
    return user;
  },

  getRooms() {
    if (typeof window === 'undefined') return APP_DATA.defaultRooms;
    const raw = localStorage.getItem(KEYS.ROOMS);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (e) {
        console.error(e);
      }
    }
    this.saveRooms(APP_DATA.defaultRooms);
    return APP_DATA.defaultRooms;
  },

  saveRooms(rooms) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(KEYS.ROOMS, JSON.stringify(rooms));
    window.dispatchEvent(new Event('qb_rooms_updated'));
  },

  addRoom(room) {
    const rooms = this.getRooms();
    rooms.unshift(room);
    this.saveRooms(rooms);
    return rooms;
  },

  findRoom(code) {
    const rooms = this.getRooms();
    return rooms.find(r => r.code.toString().trim() === code.toString().trim());
  },

  saveResult(gameId, score, stars, roomCode = null) {
    if (typeof window === 'undefined') return null;
    const results = this.getResults();
    const entry = {
      id: Date.now(),
      gameId,
      score,
      stars,
      roomCode,
      date: new Date().toLocaleDateString('uz-UZ'),
      timestamp: Date.now()
    };
    results.unshift(entry);
    if (results.length > 50) results.pop();
    localStorage.setItem(KEYS.RESULTS, JSON.stringify(results));
    return entry;
  },

  getResults() {
    if (typeof window === 'undefined') return [];
    const raw = localStorage.getItem(KEYS.RESULTS);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  },

  saveDiploma(diploma) {
    if (typeof window === 'undefined') return [];
    const diplomas = this.getDiplomas();
    diplomas.unshift(diploma);
    localStorage.setItem(KEYS.DIPLOMAS, JSON.stringify(diplomas));
    return diplomas;
  },

  getDiplomas() {
    if (typeof window === 'undefined') return [];
    const raw = localStorage.getItem(KEYS.DIPLOMAS);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  }
};

export default StorageManager;
