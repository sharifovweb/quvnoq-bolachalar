import './globals.css';

export const metadata = {
  title: "Quvnoq Bolachalar — Bolalar Uchun Sehrli Musobaqalar va O'yinlar",
  description: "Bolalar uchun qiziqarli viktorinalar, sehrli xotira o'yinlari, chaqqonlik musobaqalari, tezkor matematika va rasmiy bayramona faxriy diplomlar platformasi! 🌟",
  keywords: "quvnoq bolachalar, bolalar musobaqalari, viktorina, ertaklar, matematika o'yini, mozaika, aplikatsiya, diplom, sertifikat",
  authors: [{ name: "Odilova Mahsudaxon" }],
  creator: "Odilova Mahsudaxon",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#FF5E36",
};

export default function RootLayout({ children }) {
  return (
    <html lang="uz">
      <head>
        <link rel="icon" href="/images/logo.jpg" />
      </head>
      <body>{children}</body>
    </html>
  );
}
