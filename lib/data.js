// ==========================================
// Quvnoq Bolachalar - Boy O'yin Ma'lumotlari
// Kategoriya, savollar, so'zlar, andozalar va qoidalar
// ==========================================

export const APP_DATA = {
  // Barcha yo'nalishlar
  categories: [
    {
      id: 'quiz',
      title: 'Zukko Bilimdon',
      badge: 'Savol-Javob',
      icon: '🦁',
      color: '#FF6B6B',
      gradient: 'linear-gradient(135deg, #FF6B6B, #FF8E53)',
      desc: 'Hayvonlar olami, sehrli ertaklar, sirli koinot va qiziqarli topishmoqlar bo\'yicha chaqqon viktorina!',
      players: '1,420+ o\'quvchi',
      stars: '⭐⭐⭐⭐⭐',
      features: ['5 ta sehrli mavzu', 'Ovozli effektlar', 'Jonli nishonlar']
    },
    {
      id: 'memory',
      title: 'Sehrli Kartochkalar',
      badge: 'Xotira & Diqqat',
      icon: '🃏',
      color: '#4ECDC4',
      gradient: 'linear-gradient(135deg, #4ECDC4, #556270)',
      desc: 'Juft rasmlarni topish orqali xotira va diqqatingizni charxlang. Qancha tez topsangiz, shuncha ko\'p yulduz!',
      players: '2,150+ o\'quvchi',
      stars: '⭐⭐⭐⭐⭐',
      features: ['3 xil qiyinlik', 'Chiroyli animatsiyalar', 'Vaqt rekordi']
    },
    {
      id: 'math',
      title: 'Raqamlar Sehrgari',
      badge: 'Tezkor Arifmetika',
      icon: '⚡',
      color: '#FFD93D',
      gradient: 'linear-gradient(135deg, #FFD93D, #FF9F1C)',
      desc: 'Quvnoq mevalar va qiziqarli raqamlar orqali tezkor hisoblash maratoni. 60 soniyada o\'z chaqqonligingizni namoyon eting!',
      players: '1,890+ o\'quvchi',
      stars: '⭐⭐⭐⭐⭐',
      features: ['Combo olovlari 🔥', 'Vizual mevalar 🍎', '60 soniya marafon']
    },
    {
      id: 'word',
      title: 'So\'z Yasovchi Zukko',
      badge: 'Lug\'at & Savodxonlik',
      icon: '🧩',
      color: '#6C5CE7',
      gradient: 'linear-gradient(135deg, #6C5CE7, #a367dc)',
      desc: 'Aralashib ketgan harflardan to\'g\'ri so\'zni yig\'ing! Qiziqarli rasmli maslahatlar sizga doim yordam beradi.',
      players: '980+ o\'quvchi',
      stars: '⭐⭐⭐⭐⭐',
      features: ['15+ qiziqarli so\'z', 'Yordamchi maslahat', 'Quvnoq harf pufaklari']
    },
    {
      id: 'shapes',
      title: 'Ranglar va Shakllar',
      badge: 'Tezkor Reaksiya',
      icon: '🎈',
      color: '#FF7675',
      gradient: 'linear-gradient(135deg, #FF7675, #D63031)',
      desc: 'Uchib o\'tayotgan sehrli sharlarning rangi va shaklini tezda payqang, to\'g\'ri tugmani chaqqonlik bilan bosing!',
      players: '1,640+ o\'quvchi',
      stars: '⭐⭐⭐⭐⭐',
      features: ['Uchuvchi sharlar', 'Refleks sinovi', 'Bonus yulduzlar']
    },
    {
      id: 'mosaic',
      title: 'Mohir Qo\'llar: Mozaika & Aplikatsiya',
      badge: 'Ijodiy Ustaxona',
      icon: '🎨',
      color: '#00B894',
      gradient: 'linear-gradient(135deg, #00B894, #00CEC9)',
      desc: 'Rangli qog\'ozlar, geometrik shakllar va mozaika bo\'lakchalaridan san\'at asarini tering va xavfsizlik sirlarini o\'rganing!',
      players: '3,200+ o\'quvchi',
      stars: '⭐⭐⭐⭐⭐',
      features: ['Interaktiv andozalar', 'Qaychi va yelim qoidalari', 'Oltin medal']
    }
  ],

  // Viktorina mavzulari va savollari
  quizTopics: [
    {
      id: 'animals',
      name: 'Hayvonot Olami Mo\'jizalari',
      icon: '🦁',
      desc: 'Qiziqarli jonivorlar, qushlar va suv osti dunyosi sirlari',
      questions: [
        {
          q: 'Dunyodagi eng katta quruqlik hayvoni qaysi?',
          options: ['Fil', 'Zirafa', 'Begemot', 'Sher'],
          correct: 0,
          fact: 'Ha, fil eng og\'ir va katta quruqlik jonivori hisoblanadi! 🐘'
        },
        {
          q: 'Qaysi qush umuman ucha olmaydi, lekin ajoyib suzadi va muzda yashaydi?',
          options: ['Lochin', 'Pingvin', 'Kaptar', 'Boyo\'g\'li'],
          correct: 1,
          fact: 'Pingvinlar qanotlarini suzgich sifatida ishlatadi! 🐧'
        },
        {
          q: 'O\'rmonlar shohi deb qaysi jonivor ataladi?',
          options: ['Bo\'ri', 'Ayiq', 'Sher (Arslon)', 'Yo\'lbars'],
          correct: 2,
          fact: 'Sher o\'zining mahobati va gajak yoli bilan o\'rmonlar shohidir! 🦁'
        },
        {
          q: 'Daraxt shoxlarida teskari osilib uxlashni yaxshi ko\'radigan uchar sutemizuvchi qaysi?',
          options: ['Ko\'rshapalak', 'Olmaxon', 'Qarg\'a', 'Maymun'],
          correct: 0,
          fact: 'Ko\'rshapalaklar kunduzi teskari osilib dam oladi! 🦇'
        },
        {
          q: 'Suv ostida yashovchi eng ulkan sutemizuvchi jonivor qaysi?',
          options: ['Akula', 'Moviy kit', 'Delfin', 'Meduza'],
          correct: 1,
          fact: 'Moviy kit uzunligi 30 metrgacha yetadigan bahaybat maxluqdir! 🐋'
        },
        {
          q: 'Eng baland bo\'yli, uzun bo\'yinli hayvon qaysi?',
          options: ['Tuya', 'Zirafa', 'Zebra', 'Kenguru'],
          correct: 1,
          fact: 'Zirafalar baland daraxtlarning eng yuqori barglarini yeya oladi! 🦒'
        },
        {
          q: 'Qornidagi maxsus xaltachasida bolasini ko\'tarib sakrab yuradigan jonivor qaysi?',
          options: ['Kenguru', 'Panda', 'Koala', 'Tulki'],
          correct: 0,
          fact: 'Kenguru sakrash orqali juda tez masofani bosib o\'tadi! 🦘'
        },
        {
          q: 'Rangini atrof-muhitga qarab bir zumda o\'zgartira oladigan kaltakesak qaysi?',
          options: ['Timsoh', 'Xameleon', 'Iguana', 'Toshbaqa'],
          correct: 1,
          fact: 'Xameleon o\'zini yirtqichlardan yashirish uchun tuslanadi! 🦎'
        },
        {
          q: 'Qaysi hasharot gul changlarini yig\'ib, shirin va foydali asal tayyorlaydi?',
          options: ['Chumoli', 'Asalari', 'Kapalak', 'Ninachi'],
          correct: 1,
          fact: 'Asalarilar tabiatning eng mehnatkash jonivorlaridir! 🐝'
        },
        {
          q: 'Xartumi orqali suv ichadigan va og\'ir yuklarni ko\'tara oladigan jonivor qaysi?',
          options: ['Fil', 'Karkidon', 'Tuyaqush', 'Ot'],
          correct: 0,
          fact: 'Filning xartumida 40 000 dan ortiq muskullar mavjud! 🐘'
        }
      ]
    },
    {
      id: 'space',
      name: 'Sehrli Koinot va Sayyoralar',
      icon: '🚀',
      desc: 'Yulduzlar, Oy, Quyosh va sirli osmon bag\'ri bo\'ylab parvoz',
      questions: [
        {
          q: 'Yerimiz qaysi yulduz atrofida aylanadi?',
          options: ['Quyosh', 'Qutb yulduzi', 'Oy', 'Sirius'],
          correct: 0,
          fact: 'Quyosh bizning sayyoramizga yorug\'lik va hayotiy issiqlik beradi! ☀️'
        },
        {
          q: 'Yerning tabiiy yo\'ldoshi nima deb ataladi?',
          options: ['Mars', 'Oy', 'Venera', 'Yupiter'],
          correct: 1,
          fact: 'Oy tunda bizga osmondan jilmayib turadi! 🌙'
        },
        {
          q: '«Qizil sayyora» deb qaysi sayyora nomlanadi?',
          options: ['Mars', 'Saturn', 'Merkuriy', 'Neptun'],
          correct: 0,
          fact: 'Mars sirti temir moddasiga boy bo\'lgani uchun qizg\'ish ko\'rinadi! 🔴'
        },
        {
          q: 'Qaysi bahaybat sayyora atrofida chiroyli yorqin halqalari (uzuklari) bor?',
          options: ['Saturn', 'Uran', 'Mars', 'Venera'],
          correct: 0,
          fact: 'Saturn halqalari muz va tosh bo\'lakchalaridan iborat! 🪐'
        },
        {
          q: 'Quyosh tizimidagi eng bahaybat, eng katta sayyora qaysi?',
          options: ['Yer', 'Yupiter', 'Pluton', 'Neptun'],
          correct: 1,
          fact: 'Yupiter ichiga 1300 ta Yer sayyorasi sig\'ib ketishi mumkin! 🪐'
        },
        {
          q: 'Koinotga uchadigan maxsus kiyim kiygan odam nima deyiladi?',
          options: ['Dengizchi', 'Fazogir (Kosmonavt)', 'Kapitan', 'Uchuvchi'],
          correct: 1,
          fact: 'Fazogirlar skafandr kiyib ochiq koinotga chiqadilar! 👨‍🚀'
        },
        {
          q: 'Koinotni va uzoq yulduzlarni yaqindan ko\'rsatadigan asbob nima?',
          options: ['Mikroskop', 'Teleskop', 'Kompas', 'Durbin'],
          correct: 1,
          fact: 'Teleskop orqali olimlar uzoq galaktikalarni o\'rganishadi! 🔭'
        },
        {
          q: 'Yer yuzida bir sutka (kun va tun) necha soatdan iborat?',
          options: ['12 soat', '24 soat', '48 soat', '30 soat'],
          correct: 1,
          fact: 'Yer o\'z o\'qi atrofida to\'liq 24 soatda aylanib chiqadi! 🌍'
        },
        {
          q: 'Oqshom osmonda uzoqdan nurlanib miltillaydigan gaz sharlari nima?',
          options: ['Samolyot', 'Yulduzlar', 'Bulutlar', 'Kometalar'],
          correct: 1,
          fact: 'Yulduzlar juda uzoqdagi o\'ta qaynoq nurlanuvchi osmon jismlaridir! ⭐'
        },
        {
          q: 'Fazoga birinchi bo\'lib uchgan inson kim bo\'lgan?',
          options: ['Nil Armstrong', 'Yuriy Gagarin', 'Isaak Nyuton', 'Mirzo Ulug\'bek'],
          correct: 1,
          fact: 'Yuriy Gagarin 1961-yilda «Vostok» kemasida fazoga ko\'tarilgan! 🚀'
        }
      ]
    },
    {
      id: 'fairytales',
      name: 'Ertaklar va Dono Qahramonlar',
      icon: '🧚',
      desc: 'Oltin tarvuz, Zumrad va Qimmat, Bo\'g\'irsoq va ertak sirlari',
      questions: [
        {
          q: 'O\'zbek xalq ertagida laylakning singan qanotini davolab boy bo\'lgan qahramon kim?',
          options: ['Saxiy dehqon', 'Ochko\'z boy', 'Podsho', 'Vazir'],
          correct: 0,
          fact: 'Saxiy dehqon mehnati va mehribonligi uchun mukofotlandi! 🍉'
        },
        {
          q: 'Ostonadan yumalab qochib ketgan, tulkiga aldanib qolgan ertak qahramoni kim?',
          options: ['Bo\'g\'irsoq', 'Sholg\'om', 'Zolushka', 'Buratino'],
          correct: 0,
          fact: 'Bo\'g\'irsoq quvnoq qo\'shiq aytib o\'rmon bo\'ylab yumalagan! 🍘'
        },
        {
          q: '«Zumrad va Qimmat» ertagida mehnatkash, muloyim va odobli qiz kim?',
          options: ['Qimmat', 'Zumrad', 'O\'gay ona', 'Sehrgar'],
          correct: 1,
          fact: 'Zumrad o\'zining odobi va mehnatsevarligi tufayli baxt topdi! 👗'
        },
        {
          q: 'Oyoq kiyimi billur tufli bo\'lgan mehribon qizaloq qaysi ertakda?',
          options: ['Qorqiz', 'Zolushka', 'Alisa', 'Dyuymovochka'],
          correct: 1,
          fact: 'Zolushka sehrli aravada shohona balga borgan! 👠'
        },
        {
          q: 'Eman daraxtidan yo\'nib yasalgan, burni uzun yog\'och bola qahramon kim?',
          options: ['Buratino (Pinokkio)', 'Karlson', 'Chippolino', 'Neznayka'],
          correct: 0,
          fact: 'Buratino oltin kalitni topish uchun ko\'p sinovlardan o\'tdi! 🗝️'
        },
        {
          q: 'Bobosi, buvisi, nevarasi va it-mushuklar birgalikda yerdan sug\'urib olgan sabzavot nima?',
          options: ['Sabzi', 'Sholg\'om', 'Kartoshka', 'Qovoq'],
          correct: 1,
          fact: 'Birgalikda, ahillikda har qanday qiyin ish oson bo\'ladi! 🥬'
        },
        {
          q: 'Sehrli chiroqni ishqalab, uning ichidan qudratli jinni chiqargan ertak qahramoni kim?',
          options: ['Sindbod', 'Alouddin', 'Ali Bobo', 'Sehrgar'],
          correct: 1,
          fact: 'Alouddin sehrli gilamchada ham uchgan! 🧞‍♂️'
        },
        {
          q: 'Yovuz bo\'riga aldanmasdan, o\'ziga toshdan mustahkam uy qurgan cho\'chqacha kim?',
          options: ['Naf-Naf', 'Nif-Nif', 'Nuf-Nuf', 'Xryusha'],
          correct: 0,
          fact: 'Mustahkam qurilgan tosh uy uni bo\'ridan saqlab qoldi! 🏠'
        },
        {
          q: 'Tomda yashaydigan, murabbo va pishiriqlarni xush ko\'ruvchi quvnoq qahramon kim?',
          options: ['Karlson', 'Vinni Pux', 'Shrek', 'Chip va Deyl'],
          correct: 0,
          fact: 'Karlsonning orqasida parraki (motorchasi) bor edi! 🚁'
        },
        {
          q: '«Oltin baliqcha» ertagida ochko\'z kampir eng oxirida nimaning oldida qolib ketadi?',
          options: ['Qasr oldida', 'Teshik tog\'ora oldida', 'Dengiz bo\'yida', 'Oltin taxtda'],
          correct: 1,
          fact: 'Ochko\'zlik hech qachon yaxshilikka olib kelmaydi! 🐟'
        }
      ]
    },
    {
      id: 'riddles',
      name: 'Topqir Mantiq & Zukko Topishmoqlar',
      icon: '💡',
      desc: 'Aql charxlovchi chigal jumboqlar, tezkor javoblar va zukkolik',
      questions: [
        {
          q: '«O\'zi bitta, ko\'zi mingtacha, bog\'lasang turadi, yechsang yuradi». Bu nima?',
          options: ['Supurgi', 'Qalam', 'Arra', 'Chanoq'],
          correct: 0,
          fact: 'Supurgi hovlini toza qilish uchun doimo yordamchimiz! 🧹'
        },
        {
          q: '«Qanoti bor ucholmas, quruqlikda yurolmas». Bu nima?',
          options: ['Baliq', 'Kapalak', 'Qurbaqa', 'Tovuq'],
          correct: 0,
          fact: 'Baliq suzgich qanotlari yordamida suvda chaqqon suzadi! 🐟'
        },
        {
          q: '«Qora tovuq qaqillaydi, qorni toshga taqillaydi». Bu nima?',
          options: ['Toshbaqa', 'Yong\'oq', 'Chumoli', 'Qarg\'a'],
          correct: 0,
          fact: 'Toshbaqa qattiq kosasi bilan o\'zini xavfdan asraydi! 🐢'
        },
        {
          q: 'Yomg\'ir yog\'ganda kim boshiga doim rang-barang qalpoq tutadi?',
          options: ['Soyabon', 'Daraxt', 'Uy', 'Avtomobil'],
          correct: 0,
          fact: 'Soyabon bizni yomg\'ir tomchilaridan asraydi! ☂️'
        },
        {
          q: 'Oqshom payti yonadi, tong otganda o\'chadi, xonamizni yoritadi. Bu nima?',
          options: ['Lampa (Chiroq)', 'Televizor', 'Kitob', 'Soat'],
          correct: 0,
          fact: 'Elektr lampochkasi xonamizni quyoshdek yorug\' qiladi! 💡'
        },
        {
          q: 'O\'zi bitta, tishlari ko\'p, lekin hech kimni tishlamaydi. Sochni chiroyli taraydi?',
          options: ['Taroq', 'Vilka', 'Arra', 'Moyqalam'],
          correct: 0,
          fact: 'Taroq sochlarimizni tartibga solishga yordam beradi! 🪮'
        },
        {
          q: '«Yozda kiyinadi, qishda yechinadi». Bu nima?',
          options: ['Daraxt', 'Odam', 'Ayiq', 'Uy'],
          correct: 0,
          fact: 'Daraxtlar bahorda barg yozadi, kuzda esa barglarini to\'kadi! 🌳'
        },
        {
          q: 'Til bilmaydi, so\'z aytmaydi, lekin dunyoni o\'rgatadi. Bu nima?',
          options: ['Kitob', 'Radio', 'Rasm', 'Kompyuter'],
          correct: 0,
          fact: 'Kitob — eng sodiq do\'st va ilm manbaidir! 📚'
        },
        {
          q: 'Bir uyda 12 ta aka-uka yashaydi, lekin hech qachon bir-birini quvib yetolmaydi?',
          options: ['Yil oylari', 'Hafta kunlari', 'Soat mili', 'Sinfdoshlar'],
          correct: 0,
          fact: 'Bir yilda 12 ta faslli oy bor: Yanvardan Dekabrgacha! 📅'
        },
        {
          q: 'Suvga tushsa erib ketadi, qo\'lga olsak ko\'pirtiradi va hidlari shirin?',
          options: ['Sovun', 'Qand', 'Muz', 'Shampun'],
          correct: 0,
          fact: 'Sovun bilan qo\'lni yuvish mikroblardan tozalaydi! 🧼'
        }
      ]
    },
    {
      id: 'nature',
      name: 'Tabiat, Meva & Sog\'lom Hayot',
      icon: '🍎',
      desc: 'Vitaminlar, shirin mevalar, fasllar va sog\'lom bo\'lish sirlari',
      questions: [
        {
          q: 'Qaysi mevada C vitamini ko\'p bo\'lib, shamollashdan asraydi?',
          options: ['Limon va Apelsin', 'Bodring', 'Tarvuz', 'Non'],
          correct: 0,
          fact: 'Limon va sitrus mevalar immunitetni kuchaytiradi! 🍋'
        },
        {
          q: 'Daraxtlar biz nafas olishimiz uchun qaysi foydali gazni ishlab chiqaradi?',
          options: ['Kislorod', 'Karbonat angidrid', 'Azot', 'Tutun'],
          correct: 0,
          fact: 'Yashil barglar quyosh nuri orqali toza kislorod hosil qiladi! 🌿'
        },
        {
          q: 'Qor yog\'ib, hamma yoq oppoq libos kiyadigan fasl qaysi?',
          options: ['Bahor', 'Qish', 'Yoz', 'Kuz'],
          correct: 1,
          fact: 'Qish faslida qorbobo yasash va chana uchish maroqli! ⛄'
        },
        {
          q: 'Har kuni ertalab va kechqurun tishlarni necha daqiqa yuvish tavsiya etiladi?',
          options: ['2-3 daqiqa', '10 soniya', '15 daqiqa', 'Hech yuvmaslik'],
          correct: 0,
          fact: 'Tishlarni toza yuvish ularni oq va baquvvat saqlaydi! 🪥'
        },
        {
          q: 'Quyosh chiqib, yomg\'ir maydalab yoqqanda osmonda qanday go\'zallik paydo bo\'ladi?',
          options: ['Kamalak', 'Yulduz', 'Tuman', 'Qor'],
          correct: 0,
          fact: 'Kamalak 7 xil sehrli rangdan iborat bo\'ladi! 🌈'
        },
        {
          q: 'Qaysi sabzavot ko\'rish qobiliyatini yaxshilaydi va A vitaminiga boy?',
          options: ['Sabzi', 'Piyoz', 'Kartoshka', 'Baqlajon'],
          correct: 0,
          fact: 'Sabzi ko\'zlar uchun nihoyatda foydalidir! 🥕'
        },
        {
          q: 'Sog\'lom va baquvvat bo\'lish uchun kuniga nima bilan shug\'ullanish kerak?',
          options: ['Ertalabki badantarbiya', 'Kun bo\'yi uxlash', 'Faqat shirinlik yeyish', 'Kam harakat qilish'],
          correct: 0,
          fact: 'Badantarbiya tanani chiniqtiradi va kayfiyatni ko\'taradi! 🏃'
        },
        {
          q: 'Dunyodagi eng shirin va suvli yozgi poliz ekini qaysi?',
          options: ['Tarvuz', 'Piyoz', 'Rediska', 'Karam'],
          correct: 0,
          fact: 'Yoz chillasida sovuqqina tarvuz yeyish rohat bag\'ishlaydi! 🍉'
        },
        {
          q: 'Daraxtlar kurtak yozib, qaldirg\'ochlar uchib keladigan fasl qaysi?',
          options: ['Bahor', 'Kuz', 'Qish', 'Yoz'],
          correct: 0,
          fact: 'Bahor — uyg\'onish va boychechaklar faslidir! 🌸'
        },
        {
          q: 'Suyaklar va tishlar mustahkam bo\'lishi uchun qaysi ichimlik juda foydali?',
          options: ['Gazli ichimlik', 'Tabiiy sut va qatiq', 'Rangli sharbat', 'Qahva'],
          correct: 1,
          fact: 'Sutdagi kalsiy suyaklarni mustahkam qiladi! 🥛'
        }
      ]
    }
  ],

  // Xotira kartochkalari uchun mavzular
  memoryThemes: {
    animals: {
      name: 'Quvnoq Hayvonlar 🦁',
      items: ['🦁', '🐼', '🦊', '🐰', '🐯', '🐨', '🐸', '🐵', '🦄', '🦒', '🐘', '🐧']
    },
    fruits: {
      name: 'Shirin Mevalar 🍓',
      items: ['🍓', '🍉', '🍌', '🍇', '🍍', '🍎', '🍒', '🥑', '🍑', '🥝', '🍊', '🍐']
    },
    space: {
      name: 'Koinot Sayohati 🚀',
      items: ['🚀', '🛸', '⭐', '🪐', '🌙', '☄️', '👨‍🚀', '🛰️', '🌞', '🌍', '👾', '✨']
    },
    toys: {
      name: 'Sehrli O\'yinchoqlar 🧸',
      items: ['🧸', '🚗', '🎨', '🧩', '🎈', '🪀', '🪁', '🎮', '🚂', '🥁', '🎺', '🤖']
    }
  },

  // So'z yasovchi o'yini uchun so'zlar ro'yxati
  wordPuzzles: [
    { word: 'ARSLON', icon: '🦁', hint: 'O\'rmonlar shohi bo\'lgan jasur hayvon' },
    { word: 'QUYOSH', icon: '☀️', hint: 'Kunduzi osmonda nur sochib turuvchi yulduz' },
    { word: 'KITOB', icon: '📚', hint: 'Bizga bilim va ertaklarni so\'zlab beruvchi do\'st' },
    { word: 'KAMALAK', icon: '🌈', hint: 'Yomg\'irdan keyin osmonda paydo bo\'ladigan 7 rangli nur' },
    { word: 'RAKETA', icon: '🚀', hint: 'Koinotga uchuvchi tezyurar fazo vositasi' },
    { word: 'DELFIN', icon: '🐬', hint: 'Dengizda yashovchi eng do\'stona va aqlli jonivor' },
    { word: 'KAPALAK', icon: '🦋', hint: 'Gullarga qo\'nib uchuvchi nafis qanotli hasharot' },
    { word: 'TARVUZ', icon: '🍉', hint: 'Yozda pishadigan, ichi qizil va suvli shirin poliz mevasi' },
    { word: 'SOYABON', icon: '☂️', hint: 'Yomg\'irdan va quyoshdan bizni asraydigan buyum' },
    { word: 'PINGVIN', icon: '🐧', hint: 'Muzliklarda yashovchi, qora-oq rangli ucha olmaydigan qush' },
    { word: 'SHOLG\'OM', icon: '🥬', hint: 'Ertakda hamma birgalikda yerdan sug\'urib olgan sabzavot' },
    { word: 'QALAM', icon: '✏️', hint: 'Daftarga rasm va chiroyli harflar yozadigan asbob' },
    { word: 'UCHQUR', icon: '🦅', hint: 'Baland osmonda uchar chaqqon lochin' },
    { word: 'OLMA', icon: '🍎', hint: 'Daraxtda pishuvchi qizil yoki shirin yashil meva' },
    { word: 'YULDUZ', icon: '⭐', hint: 'Tunda osmonda yaltirab miltillovchi osmon nuri' }
  ],

  // Mozaika andozalari
  mosaicTemplates: [
    {
      id: 'rocket',
      title: '🚀 Koinot Raketasi',
      desc: 'Yulduzlar sari uchuvchi uchqur raketani yig\'ing',
      gridWidth: 6,
      gridHeight: 6,
      palette: ['#FF4757', '#2ED573', '#1E90FF', '#FFA502', '#FFFFFF', '#2F3542'],
      slots: [
        { r: 0, c: 2, shape: 'triangle', color: '#FF4757', name: 'Raketa uchi' },
        { r: 0, c: 3, shape: 'triangle', color: '#FF4757', name: 'Raketa uchi' },
        { r: 1, c: 2, shape: 'square', color: '#FFFFFF', name: 'Fazo korpusi' },
        { r: 1, c: 3, shape: 'square', color: '#FFFFFF', name: 'Fazo korpusi' },
        { r: 2, c: 2, shape: 'circle', color: '#1E90FF', name: 'Sehrli darcha' },
        { r: 2, c: 3, shape: 'square', color: '#FFFFFF', name: 'Fazo korpusi' },
        { r: 3, c: 2, shape: 'square', color: '#FFFFFF', name: 'Fazo korpusi' },
        { r: 3, c: 3, shape: 'square', color: '#FFFFFF', name: 'Fazo korpusi' },
        { r: 4, c: 1, shape: 'triangle', color: '#FF4757', name: 'Chap qanot' },
        { r: 4, c: 2, shape: 'square', color: '#2F3542', name: 'Dvigatel' },
        { r: 4, c: 3, shape: 'square', color: '#2F3542', name: 'Dvigatel' },
        { r: 4, c: 4, shape: 'triangle', color: '#FF4757', name: 'O\'ng qanot' },
        { r: 5, c: 2, shape: 'triangle', color: '#FFA502', name: 'Olov alangasi' },
        { r: 5, c: 3, shape: 'triangle', color: '#FFA502', name: 'Olov alangasi' }
      ]
    },
    {
      id: 'butterfly',
      title: '🦋 Sehrli Kamalak Kapalak',
      desc: 'Gullar uzra chiroyli qanotlarini qoqayotgan nozik kapalak',
      gridWidth: 6,
      gridHeight: 6,
      palette: ['#9B59B6', '#E91E63', '#00CEC9', '#F1C40F', '#34495E'],
      slots: [
        { r: 1, c: 1, shape: 'circle', color: '#E91E63', name: 'Qanot yuqori' },
        { r: 1, c: 2, shape: 'triangle', color: '#9B59B6', name: 'Qanot asosi' },
        { r: 1, c: 3, shape: 'triangle', color: '#9B59B6', name: 'Qanot asosi' },
        { r: 1, c: 4, shape: 'circle', color: '#E91E63', name: 'Qanot yuqori' },
        { r: 2, c: 2, shape: 'square', color: '#34495E', name: 'Boshi' },
        { r: 2, c: 3, shape: 'square', color: '#34495E', name: 'Boshi' },
        { r: 3, c: 1, shape: 'circle', color: '#00CEC9', name: 'Qanot quyi' },
        { r: 3, c: 2, shape: 'square', color: '#34495E', name: 'Tanasi' },
        { r: 3, c: 3, shape: 'square', color: '#34495E', name: 'Tanasi' },
        { r: 3, c: 4, shape: 'circle', color: '#00CEC9', name: 'Qanot quyi' },
        { r: 4, c: 2, shape: 'triangle', color: '#F1C40F', name: 'Dumi' },
        { r: 4, c: 3, shape: 'triangle', color: '#F1C40F', name: 'Dumi' }
      ]
    },
    {
      id: 'house',
      title: '🏡 Quvnoq Uy va Quyosh',
      desc: 'Derazalari nurli, gullar o\'ralgan shinam uycha',
      gridWidth: 6,
      gridHeight: 6,
      palette: ['#E74C3C', '#F39C12', '#2ECC71', '#3498DB', '#95A5A6'],
      slots: [
        { r: 0, c: 5, shape: 'circle', color: '#F39C12', name: 'Quyosh' },
        { r: 1, c: 2, shape: 'triangle', color: '#E74C3C', name: 'Tom cho\'qqisi' },
        { r: 1, c: 3, shape: 'triangle', color: '#E74C3C', name: 'Tom cho\'qqisi' },
        { r: 2, c: 1, shape: 'triangle', color: '#E74C3C', name: 'Tom cheti' },
        { r: 2, c: 2, shape: 'square', color: '#E74C3C', name: 'Tom markazi' },
        { r: 2, c: 3, shape: 'square', color: '#E74C3C', name: 'Tom markazi' },
        { r: 2, c: 4, shape: 'triangle', color: '#E74C3C', name: 'Tom cheti' },
        { r: 3, c: 2, shape: 'circle', color: '#3498DB', name: 'Deraza' },
        { r: 3, c: 3, shape: 'square', color: '#F39C12', name: 'Devor' },
        { r: 4, c: 2, shape: 'square', color: '#F39C12', name: 'Devor' },
        { r: 4, c: 3, shape: 'square', color: '#95A5A6', name: 'Eshik' },
        { r: 5, c: 1, shape: 'square', color: '#2ECC71', name: 'Maysa' },
        { r: 5, c: 2, shape: 'square', color: '#2ECC71', name: 'Maysa' },
        { r: 5, c: 3, shape: 'square', color: '#2ECC71', name: 'Maysa' },
        { r: 5, c: 4, shape: 'square', color: '#2ECC71', name: 'Maysa' }
      ]
    }
  ],

  // Boshlang'ich xonalar (Ustoz kodlari)
  defaultRooms: [
    {
      code: '7492',
      title: '3-«A» Sinf Bellashuvi: Zukko Bolajonlar',
      category: 'quiz',
      categoryName: 'Zukko Viktorina',
      teacher: 'Odilova Mahsudaxon',
      questionsCount: 10,
      active: true,
      participants: 28,
      createdAt: '2026-10-27'
    },
    {
      code: '2026',
      title: 'Yosh Matematiklar Chempionati ⚡',
      category: 'math',
      categoryName: 'Raqamlar Sehrgari',
      teacher: 'Nodirbek Ustoz',
      questionsCount: 15,
      active: true,
      participants: 34,
      createdAt: '2026-10-27'
    },
    {
      code: '5555',
      title: 'Koinot Sirlari Xotira Turniri 🃏',
      category: 'memory',
      categoryName: 'Sehrli Kartochkalar',
      teacher: 'Shahnoza Ustoz',
      questionsCount: 12,
      active: true,
      participants: 19,
      createdAt: '2026-10-26'
    },
    {
      code: '8844',
      title: 'Mohir Hunarmandlar Mozaika Festivali 🎨',
      category: 'mosaic',
      categoryName: 'Mohir Qo\'llar',
      teacher: 'Dilshod Muallim',
      questionsCount: 8,
      active: true,
      participants: 22,
      createdAt: '2026-10-25'
    }
  ],

  // Chempionlar reytingi (Leaderboard)
  leaderboard: [
    { rank: 1, name: 'Madinabonu Alimova', avatar: '🦁', score: 2850, stars: 95, medal: '🥇 Oltin', school: 'Toshkent sh., 144-maktab' },
    { rank: 2, name: 'Temurbek Yo\'ldoshev', avatar: '🚀', score: 2720, stars: 90, medal: '🥈 Kumush', school: 'Samarqand sh., 21-maktab' },
    { rank: 3, name: 'Zilola Ergasheva', avatar: '🌸', score: 2610, stars: 87, medal: '🥉 Bronza', school: 'Farg\'ona sh., 7-maktab' },
    { rank: 4, name: 'Javohirbek Qodirov', avatar: '⚡', score: 2480, stars: 82, medal: '🎖️ Bilimdon', school: 'Buxoro sh., 32-maktab' },
    { rank: 5, name: 'Shahzoda Karimova', avatar: '🎨', score: 2390, stars: 79, medal: '🌟 Yulduz', school: 'Andijon sh., 15-maktab' },
    { rank: 6, name: 'Bobur Mirzayev', avatar: '🐻', score: 2250, stars: 75, medal: '⭐ Chaqqon', school: 'Namangan sh., 19-maktab' },
    { rank: 7, name: 'Sevinch Rahimova', avatar: '🦋', score: 2180, stars: 72, medal: '✨ Dono', school: 'Xorazm, 4-maktab' }
  ],

  // Diplom mavzulari va sabablari
  diplomaThemes: [
    { id: 'gold', name: '🌟 Oltin Shon-Sharaf', bg: '#FFFDF0', border: '#D4AF37', accent: '#B8860B' },
    { id: 'space', name: '🚀 Sirli Koinot', bg: '#F0F4FF', border: '#4A69BD', accent: '#1E3799' },
    { id: 'nature', name: '🌿 Yashil Bahor', bg: '#F0FFF4', border: '#38A169', accent: '#22543D' },
    { id: 'rainbow', name: '🌈 Sehrli Kamalak', bg: '#FFF5F5', border: '#E53E3E', accent: '#9B2C2C' }
  ],

  diplomaReasons: [
    '«Quvnoq Bolachalar» intellektual olimpiadasidagi mutlaq g\'olibligi va yuksak zukkoligi uchun.',
    '«Zukko Bilimdon» viktorinasida barcha savollarga a\'lo darajada javob bergani uchun.',
    '«Raqamlar Sehrgari» tezkor hisoblash marafonida aql-idroki va chaqqonligi uchun.',
    '«Sehrli Kartochkalar» bellashuvida kuchli xotira va ziyrakligi uchun.',
    '«Mohir Qo\'llar: Mozaika & Aplikatsiya» festivalidagi nozik didi va san\'at asari uchun.'
  ]
};

export default APP_DATA;
