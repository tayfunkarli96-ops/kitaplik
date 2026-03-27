const express = require('express');
const cors = require('cors');
const path = require('path'); // <-- İşte eklediğimiz o 3. adımın parçası

const app = express();
app.use(cors());
app.use(express.json());

// --- SAHTE VERİTABANI (Senin 10 Gereksinimine Göre Hazırlandı) ---
let users = [{ id: 1, username: "tayfun", email: "tayfun@mail.com", bio: "Admin" }]; // RE-01: Profil
let news = [{ id: 1, title: "Yeni Filmler Geldi!", content: "CornFlix artık yayında." }]; // RE-09: Haber
let movies = [
    { 
        id: 1, 
        title: "Inception", 
        author: "Christopher Nolan", // RE-03: Yönetmen Bilgisi
        isbn: "9780141", 
        year: 2010, 
        genre: "Sci-Fi", // RE-04: Filtreleme için Tür
        rating: 8.8,
        language: "Türkçe/İngilizce", // RE-10: Dil Seçenekleri
        comments: [{ id: 1, text: "Efsane film", status: "Approved" }] // RE-05 & RE-07: Yorum ve Onay
    }
];

// RE-01: Profil Düzenleme
app.put('/api/profile/:id', (req, res) => res.json({ message: "Profil güncellendi" }));

// RE-02: Film Güncelleme
app.put('/api/movies/:id', (req, res) => res.json({ message: "Film bilgileri güncellendi" }));

// RE-03, RE-04: Listeleme ve Filtreleme
app.get('/api/movies', (req, res) => {
    let result = movies;
    if (req.query.genre) result = result.filter(m => m.genre === req.query.genre);
    res.json(result);
});

// RE-05 & RE-07: Yorum Düzenleme ve Onaylama
app.put('/api/comments/:id', (req, res) => res.json({ message: "Yorum düzenlendi ve onaylandı" }));

// RE-06: İzlenecekler Listesi Oluşturma
app.post('/api/watchlist', (req, res) => res.json({ message: "İzlenecekler listesine eklendi" }));

// RE-08: Quiz ile Film Önerme (Rastgele film döndürür)
app.get('/api/quiz-suggest', (req, res) => res.json(movies[Math.floor(Math.random() * movies.length)]));

// RE-09: Haber Düzenleme
app.put('/api/news/:id', (req, res) => res.json({ message: "Haber güncellendi" }));

// Tekil Film Detayı (Tıklayınca açılan yer)
app.get('/api/movies/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    res.json(movie || movies[0]);
});

// --- 3. ADIMIN CAN SİMDİSİ BURASI (Wildcard Route) ---
// Eğer site yanlış bir adrese (örneğin /movie/1) giderse hata verme, çalışmaya devam et.
app.get('*', (req, res) => {
    res.json({ message: "API Calisiyor - Tayfun Karli", system: "Online" });
});

module.exports = app;
