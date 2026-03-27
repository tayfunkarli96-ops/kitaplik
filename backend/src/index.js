const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// --- SAHTE VERİTABANIMIZ ---
let users = []; // RE-01 için kullanıcılar
let movies = [
    { 
        id: 1, 
        title: "Inception", 
        author: "Christopher Nolan", // RE-10 için Yazar/Yönetmen
        isbn: "9780141", // RE-08 için ISBN/Barkod
        year: 2010, 
        genre: "Sci-Fi", 
        rating: 8.8, // RE-06 Puan
        comments: ["Harika bir film/kitap!"] // RE-07 Yorumlar
    },
    { 
        id: 2, 
        title: "The Matrix", 
        author: "Wachowski Brothers", 
        isbn: "9780142", 
        year: 1999, 
        genre: "Sci-Fi", 
        rating: 8.7,
        comments: []
    }
];

// RE-01: Kullanıcı Kayıt ve Giriş (Auth)
app.post('/api/register', (req, res) => {
    users.push({ username: req.body.username, password: req.body.password });
    res.status(201).json({ message: "Kayıt başarılı" });
});
app.post('/api/login', (req, res) => {
    res.json({ message: "Giriş başarılı", token: "tayfun-gizli-token" });
});

// RE-03, RE-08, RE-09, RE-10: Listeleme ve FİLTRELEME
app.get('/api/movies', (req, res) => {
    let result = movies;

    // RE-09: İSME GÖRE ARAMA
    if (req.query.title) {
        result = result.filter(m => m.title.toLowerCase().includes(req.query.title.toLowerCase()));
    }
    // RE-10: YAZARA/YÖNETMENE GÖRE ARAMA
    if (req.query.author) {
        result = result.filter(m => m.author.toLowerCase().includes(req.query.author.toLowerCase()));
    }
    // RE-08: ISBN NUMARASINA GÖRE ARAMA
    if (req.query.isbn) {
        result = result.filter(m => m.isbn === req.query.isbn);
    }

    res.json(result);
});

// RE-05: Detay Sayfası (Tek bir id'ye göre getirme)
app.get('/api/movies/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if (!movie) return res.status(404).json({ message: 'Bulunamadı' });
    res.json(movie);
});

// RE-02: Yeni Kayıt Ekleme
app.post('/api/movies', (req, res) => {
    const newMovie = {
        id: movies.length > 0 ? movies[movies.length - 1].id + 1 : 1,
        title: req.body.title,
        author: req.body.author,
        isbn: req.body.isbn,
        year: req.body.year,
        genre: req.body.genre,
        rating: req.body.rating || 0,
        comments: []
    };
    movies.push(newMovie);
    res.status(201).json(newMovie);
});

// RE-07: Yorum Yapma Metodu
app.post('/api/movies/:id/comments', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if (!movie) return res.status(404).json({ message: 'Bulunamadı' });

    movie.comments.push(req.body.comment);
    res.status(201).json({ message: "Yorum eklendi", comments: movie.comments });
});

// Vercel için uygulamayı dışa aktar
module.exports = app;
