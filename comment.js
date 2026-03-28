const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

// --- VERİTABANI (RE-09 Haberler Dahil) ---
let movies = [
    { id: 1, title: "Inception", author: "Nolan", genre: "Sci-Fi", rating: 8.8, year: 2010, isbn: "123-ABC", language: "TR/EN" }
];

let news = [
    { id: 1, title: "CornFlix Açıldı!", content: "Platformumuz tüm sinemaseverlere hayırlı olsun.", date: "2024-03-27" },
    { id: 2, title: "Yeni Ödül!", content: "Yılın en iyi API projesi ödülünü aldık.", date: "2024-03-28" }
];

// --- HABER ROUTE'LARI (RE-09: Haber Düzenleme) ---
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

// --- FİLM ROUTE'LARI ---
app.get('/api/movies', (req, res) => res.json(movies));
app.get('/api/movies/:id', (req, res) => res.json(movies.find(m => m.id === parseInt(req.params.id)) || movies[0]));

// --- DİĞER GEREKSİNİMLER (PROFIL, YORUM VB.) ---
app.put('/api/profile/:id', (req, res) => res.json({ message: "Profil güncellendi" }));
app.post('/api/comments', (req, res) => res.json({ message: "Yorum eklendi" }));

app.get('*', (req, res) => res.json({ status: "API Online", news_count: news.length }));

module.exports = app;
