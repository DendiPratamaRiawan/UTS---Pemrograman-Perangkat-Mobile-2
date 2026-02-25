# Belajar Expo – Pemrograman Perangkat Mobile 2

Repo ini berisi **project praktikum** untuk mata kuliah **Pemrograman Perangkat Mobile 2**, pakai **Expo** dan **React Native**. Di sini kamu bisa jalankan app, lihat contoh kode, dan ikuti panduan praktikum—khususnya materi **Functional Component**—dengan narasi yang santai dan gampang diikuti.

---

## Isi Repo Ini Apa Saja?

Singkatnya: **satu app Expo** yang sudah dikasih **tab tambahan bernama "Praktikum"**. Di tab itu kamu bisa lihat contoh-contoh **Functional Component** (tanpa props, dengan props, dan dengan state). Teori dan langkah belajarnya ada di folder **`doc/`** dalam bentuk panduan tertulis, jadi kamu bisa baca sambil coba-coba di kode.

Kalau kamu baru pertama kali pakai Expo/React Native, repo ini cocok buat starting point: struktur project rapi, ada contoh yang bisa di-run langsung, dan ada penjelasan per file biar enggak bingung "ini file buat apa sih".

---

## Yang Perlu Terpasang di Komputer Kamu

- **Node.js** (versi LTS cukup). Kalau belum: [nodejs.org](https://nodejs.org)
- **npm** (biasanya ikut Node.js)
- Buat jalanin di HP: **Expo Go** ([Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent) / [App Store](https://apps.apple.com/app/expo-go/id982107779))
- Opsional: **Android Studio** atau **Xcode** (macOS) kalau mau pakai emulator

---

## Cara Jalanin Project

### 1. Clone repo ini

```bash
git clone https://github.com/edisuherlan/Belajar-EXPO-Pemrograman-Perangkat-Mobile-2.git
cd Belajar-EXPO-Pemrograman-Perangkat-Mobile-2
```

### 2. Install dependency

```bash
npm install
```

Tunggu sampai selesai (bisa agak lama pertama kali).

### 3. Jalankan app

```bash
npm start
```

Nanti muncul QR code dan menu di terminal. Kamu bisa:

- **Android:** tekan `a` di terminal, atau scan QR pakai Expo Go (Android)
- **iOS:** tekan `i` di terminal (butuh Mac), atau scan QR pakai Expo Go (iPhone)
- **Web:** tekan `w` di terminal — app terbuka di browser

Kalau pakai **Expo Go** di HP, pastikan HP dan laptop satu jaringan WiFi, lalu scan QR code yang muncul.

---

## Struktur Project (Yang Penting Saja)

Agar enggak bingung "file mana buat apa", ini ringkasannya:

```
Belajar-EXPO-Pemrograman-Perangkat-Mobile-2/
├── app/                    # Halaman-halaman app (Expo Router)
│   ├── _layout.tsx         # Layout utama (theme, stack)
│   └── (tabs)/             # Tab bawah: Home, Explore, Praktikum
│       ├── _layout.tsx     # Definisi tab (ikon, judul)
│       ├── index.tsx       # Tab "Home"
│       ├── explore.tsx     # Tab "Explore"
│       └── praktikum.tsx   # Tab "Praktikum" — nampilin contoh Functional Component
│
├── components/
│   └── praktikum/          # Komponen contoh untuk praktikum
│       ├── HelloFunctional.tsx   # Contoh paling sederhana (tanpa props)
│       ├── CardWithProps.tsx     # Contoh component dengan props
│       └── Counter.tsx           # Contoh component dengan useState
│
├── doc/                    # Panduan & materi
│   ├── PRAKTIKUM_02_Functional_Component.md   # Panduan lengkap Functional Component
│   └── Slide_Pertemuan_2_Pemrograman_Mobile_II.pptx   # Slide materi (jika ada)
│
├── package.json            # Daftar dependency & script (npm start, dll.)
└── README.md               # File ini
```

- **Ubah tampilan/perilaku contoh** → edit file di **`components/praktikum/`**
- **Ubah isi atau urutan contoh di halaman** → edit **`app/(tabs)/praktikum.tsx`**
- **Baca teori & latihan** → buka **`doc/PRAKTIKUM_02_Functional_Component.md`**

---

## Praktikum 2: Functional Component

Materi yang disiapkan di repo ini fokus ke **Functional Component**: apa itu, cara pakai **props**, dan cara pakai **state** dengan **useState**. Di app, semuanya keliatan di **tab "Praktikum"**:

1. **HelloFunctional** — functional component paling sederhana (tanpa props)
2. **CardWithProps** — component yang terima data dari luar (title, subtitle)
3. **Counter** — component yang punya data berubah (angka naik/turun pakai useState)

Panduan lengkap (teori, contoh kode, penjelasan per file, dan latihan) ada di:

**`doc/PRAKTIKUM_02_Functional_Component.md`**

Baca itu sambil jalanin app dan coba ubah-ubah kode biar konsepnya nempel.

---

## Script yang Bisa Dipakai

| Perintah | Fungsi |
|----------|--------|
| `npm start` | Jalankan Expo (pilih Android / iOS / Web dari menu) |
| `npm run android` | Langsung buka di Android (emulator atau device) |
| `npm run ios` | Langsung buka di iOS simulator (hanya macOS) |
| `npm run web` | Jalankan versi web di browser |
| `npm run lint` | Cek kode pakai ESLint |

---

## Tech Stack (Secara Singkat)

- **Expo SDK ~54** — framework buat bikin app React Native tanpa setup native manual
- **Expo Router ~6** — navigasi based file (folder `app/` = route)
- **React 19** & **React Native 0.81** — UI
- **TypeScript** — typings biar kode lebih aman dan enak dibaca

---

## Kalau Mau Nambah Materi atau Push Perubahan

Setelah clone dan ubah sesuatu:

```bash
git add .
git commit -m "Jelaskan perubahan kamu"
git push origin main
```

Kalau repo ini dipakai bareng (misalnya satu kelas), biasakan pull dulu sebelum mulai kerja: `git pull origin main`.

---

## Ringkasan

- Repo ini = **project Expo** + **praktikum Functional Component** + **panduan di `doc/`**.
- Jalanin: **clone → npm install → npm start** → pilih platform atau scan QR.
- Belajar: buka **tab Praktikum** di app dan baca **`doc/PRAKTIKUM_02_Functional_Component.md`**.

Semoga bantu belajarnya. Kalau ada yang kurang jelas, coba run app-nya dulu, baru baca panduan sambil lihat kode—sering itu yang bikin "oh, ternyata gitu"-nya muncul.
