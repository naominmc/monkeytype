# KetikKilat - Game Tes Mengetik (Monkeytype ID) 🚀

Game penguji kecepatan dan kepresisian mengetik kalimat dan kata berbasis web, terinspirasi oleh Monkeytype dengan estetika modern, dukungan penuh Bahasa Indonesia & Inggris, serta fitur audio mechanical keyboard dan visualisasi grafik performa.

---

## ✨ Fitur Unggulan

1. **Uji Kecepatan & Presisi Tingkat Lanjut**:
   - Menghitung **WPM** (Kata per Menit) bersih, **Raw WPM**, **Akurasi (%)**, dan **Konsistensi (%)**.
   - Indikator karakter detail: Benar (*correct*), Salah (*incorrect*), Ekstra (*extra*), dan Terlewat (*missed*).
   - Animasi kursor (*caret*) yang responsif dan halus mengikuti setiap huruf yang diketik.

2. **Mode Latihan Fleksibel**:
   - **Mode Waktu (*Time*)**: 15 detik, 30 detik, 60 detik, atau 120 detik.
   - **Mode Jumlah Kata (*Words*)**: 10 kata, 25 kata, 50 kata, atau 100 kata.
   - **Mode Kalimat / Kutipan (*Quote*)**: Kutipan inspiratif & kalimat bijak dalam Bahasa Indonesia dan Bahasa Inggris beserta nama tokohnya.
   - **Mode Santai (*Zen*)**: Latihan mengetik bebas tanpa batas waktu.
   - **Pengubah Karakter**: Opsi menyertakan **Tanda Baca** (`@`) dan **Angka** (`#`).

3. **Dukungan Multi Bahasa**:
   - **Bahasa Indonesia**: Kosakata umum dan kalimat bermakna Indonesia.
   - **English**: Kosakata standar internasional.

4. **Efek Suara Mechanical Keyboard (Web Audio API)**:
   - Sintesis audio bawaan tanpa perlu unduhan file eksternal:
     - **Cherry MX Clicky (Biru)**: Renyah dan taktil.
     - **Holy Panda Thock (Linear)**: Suara 'thock' dalam dan mantap.
     - **Bubble Pop**: Suara ketukan lembut.
     - **Mute / Off**: Mengetik hening.
   - Pengatur volume audio interaktif.

5. **Tema Tampilan Premium**:
   - **Serika Dark** (Khas Monkeytype: Abu gelap & aksen kuning emas)
   - **Cyberpunk** (Neon cyan & magenta)
   - **Dracula** (Ungu lembut & pink pastel)
   - **Nord** (Biru kutub es & putih salju)
   - **Sunset** (Oranye lembayung & ungu hangat)
   - **Matrix** (Hitam legam & hijau terminal)

6. **Grafik Analisis & Riwayat Lengkap**:
   - Grafik interaktif berbasis HTML5 Canvas yang menampilkan kurva kecepatan detik-demi-detik, WPM kotor, dan penanda titik kesalahan (*error markers*).
   - Riwayat skor dan Rekor Pribadi (*Personal Best*) otomatis tersimpan di browser (`localStorage`).
   - Keyboard visual interaktif yang menyala saat tombol ditekan.

---

## ⌨️ Pintasan Keyboard (*Shortcuts*)

- `Tab` + `Enter`: Memulai ulang tes kapan saja dengan cepat.
- `Escape`: Mengembalikan fokus kursor ke teks yang sedang diketik.
- `Ctrl` + `Backspace`: Menghapus satu kata utuh saat ini.

---

## 🚀 Cara Menjalankan

Aplikasi dapat dijalankan secara instan dengan Node.js:

```bash
npm start
```

Kemudian buka browser Anda di:
👉 **[http://localhost:3000](http://localhost:3000)**