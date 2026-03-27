const express = require('express');
const cors = require('cors');

const app = express();

// CORS ayarları (Frontend'in bu API'ye erişebilmesi için)
app.use(cors());
// Gelen JSON verilerini okuyabilmek için
app.use(express.json());

// --- SAHTE VERİTABANIMIZ (Hafızada tutulan filmler) ---
let movies = [
    { id: 1, title: "Inception", year: 2010, genre: "Sci-Fi", rating: 8.8 },
    { id: 2, title: "Interstellar", year: 2014, genre: "Sci-Fi", rating: 8.6 },
    { id: 3, title: "The Dark Knight", year: 2008, genre: "Action", rating: 9.0 }
];

// 1. GET: Tüm filmleri getir (Listeleme)
app.get('/api/movies', (req, res) => {
    res.json(movies);
});

// 2. GET: Tek bir film detayını getir
app.get('/api/movies/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if (!movie) return res.status(404).json({ message: 'Film bulunamadı' });
    res.json(movie);
});

// 3. POST: Yeni film ekle (Hocanın istediği ekleme metodu)
app.post('/api/movies', (req, res) => {
    const newMovie = {
        id: movies.length > 0 ? movies[movies.length - 1].id + 1 : 1,
        title: req.body.title,
        year: req.body.year,
        genre: req.body.genre,
        rating: req.body.rating
    };
    movies.push(newMovie);
    res.status(201).json(newMovie);
});

// 4. PUT: Film bilgilerini güncelle
app.put('/api/movies/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if (!movie) return res.status(404).json({ message: 'Film bulunamadı' });

    movie.title = req.body.title || movie.title;
    movie.year = req.body.year || movie.year;
    movie.genre = req.body.genre || movie.genre;
    movie.rating = req.body.rating || movie.rating;

    res.json(movie);
});

// 5. DELETE: Film sil
app.delete('/api/movies/:id', (req, res) => {
    movies = movies.filter(m => m.id !== parseInt(req.params.id));
    res.json({ message: "Film başarıyla silindi" });
});

// Vercel için uygulamayı dışa aktar
module.exports = app;

// Local'de test etmek için (Vercel'de bu kısım bypass edilir)
const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`🚀 Tayfun Karlı REST API çalışıyor: http://localhost:${PORT}`);
    });
}
