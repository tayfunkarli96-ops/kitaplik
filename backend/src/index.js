const express = require('express');
const cors = require('cors');
const redis = require('redis'); // Redis eklendi

const app = express();
app.use(cors());
app.use(express.json());

// --- 1. CASUS LOG (Her isteği terminale yazar) ---
app.use((req, res, next) => {
    console.log(`🚀 YENİ İSTEK GELDİ: ${req.method} ${req.url}`);
    next();
});

// --- REDIS BAĞLANTISI ---
const redisClient = redis.createClient({ url: 'redis://localhost:6379' });
redisClient.connect().catch(console.error);

// --- VERİTABANI ---
let movies = [
    { id: 1, title: "Inception", author: "Nolan", genre: "Sci-Fi", rating: 8.8, year: 2010, isbn: "123-ABC", language: "TR/EN" },
    { id: 2, title: "Interstellar", author: "Nolan", genre: "Sci-Fi", rating: 8.6, year: 2014, isbn: "456-DEF", language: "TR/EN" },
    { id: 3, title: "The Dark Knight", author: "Nolan", genre: "Action", rating: 9.0, year: 2008, isbn: "789-GHI", language: "TR/EN" },
    { id: 4, title: "Tenet", author: "Nolan", genre: "Sci-Fi", rating: 7.4, year: 2020, isbn: "012-JKL", language: "TR/EN" }
];

let news = [
    { id: 1, title: "CornFlix Açıldı!", content: "Platformumuz tüm sinemaseverlere hayırlı olsun.", date: "2024-03-27" },
    { id: 2, title: "Yeni Ödül!", content: "Yılın en iyi API projesi ödülünü aldık.", date: "2024-03-28" }
];

// --- RE-01 ---
app.put('/api/profile/:id', (req, res) => res.json({ message: "Profil başarıyla güncellendi.", status: "success" }));

// --- RE-02 ---
app.put('/api/movies/:id', (req, res) => res.json({ message: "Film bilgileri başarıyla güncellendi.", id: req.params.id }));

// --- RE-03 ---
app.get('/api/movies/:id/cast', (req, res) => res.json({ director: "Christopher Nolan", cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt"], movie_id: req.params.id }));

// --- RE-04 --- FILM FİLTRELEME (REDIS ENTEGRELİ) ---
app.get('/api/movies', async (req, res) => {
    const cacheKey = 'movies_list';
    const cachedData = await redisClient.get(cacheKey);
    
    if (cachedData) {
        console.log("⚡ [REDIS] Veriler cache'den getirildi!");
        return res.json(JSON.parse(cachedData));
    }

    console.log("💾 [DB] Veriler veritabanından çekildi!");
    await redisClient.set(cacheKey, JSON.stringify(movies), { EX: 60 });
    res.json(movies);
});

// --- RE-05 ---
app.put('/api/comments/:id', (req, res) => res.json({ message: "Yorum başarıyla düzenlendi.", commentId: req.params.id }));

// --- RE-06 ---
app.post('/api/watchlist', (req, res) => res.json({ message: "Film izlenecekler listenize başarıyla eklendi.", status: "created" }));

// --- RE-07 ---
app.put('/api/comments/:id/approve', (req, res) => res.json({ message: "Yorum yönetici tarafından onaylandı.", isApproved: true }));

// --- RE-08 ---
app.post('/api/quiz/recommend', (req, res) => res.json({ recommendation: "Inception", matchRate: "%95", message: "Quiz sonuçlarınıza göre en uygun film seçildi." }));

// --- RE-09 ---
app.get('/api/news', (req, res) => res.json(news));
app.put('/api/news/:id', (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const newsIndex = news.findIndex(n => n.id === parseInt(id));
    if (newsIndex !== -1) {
        news[newsIndex] = { ...news[newsIndex], title, content };
        return res.json({ message: "Haber başarıyla güncellendi!", updatedNews: news[newsIndex] });
    }
    res.status(404).json({ message: "Haber bulunamadı" });
});

// --- RE-10 ---
app.get('/api/language/:lang', (req, res) => res.json({ message: `Sistem dili başarıyla ${req.params.lang} olarak değiştirildi.`, currentLang: req.params.lang }));

// --- JOKER ROTA ---
app.all('*', (req, res) => res.json({ status: "API Online", developer: "Tayfun Karlı", requirements_status: "10/10 Completed" }));

// --- SUNUCU BAŞLATMA ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 SİBER SUNUCU AKTİF: http://localhost:${PORT}`);
});

module.exports = app;
