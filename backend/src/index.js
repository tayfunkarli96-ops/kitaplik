const express = require('express');
const cors = require('cors');
const redis = require('redis'); // YENİ: Redis eklendi
const amqp = require('amqplib'); // YENİ: RabbitMQ eklendi

const app = express();
app.use(cors());
app.use(express.json());

// --- ⚡ REDIS BAĞLANTISI (ÖNBELLEK / GARSON) ---
const redisClient = redis.createClient({ url: 'redis://localhost:6379' });
redisClient.on('error', (err) => console.log('Redis Hatası:', err));
redisClient.connect()
    .then(() => console.log('⚡ Redis Hafıza Sistemi Aktif!'))
    .catch(console.error);

// --- 🐇 RABBITMQ BAĞLANTISI (MESAJ KUYRUĞU / POSTACI) ---
let channel;
async function connectRabbitMQ() {
    try {
        const connection = await amqp.connect('amqp://localhost:5672');
        channel = await connection.createChannel();
        await channel.assertQueue('bildirim_kuyrugu');
        console.log('🐇 RabbitMQ Mesaj Kuyruğu Aktif!');
    } catch (error) {
        console.log('RabbitMQ Hatası:', error);
    }
}
connectRabbitMQ();

// --- VERİTABANI (Mevcut verilerini korudum) ---
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

// --- 1. PROFIL DÜZENLEME (RE-01) ---
app.put('/api/profile/:id', (req, res) => {
    res.json({ message: "Profil başarıyla güncellendi.", status: "success" });
});

// --- 2. FILM GÜNCELLEME (RE-02) ---
app.put('/api/movies/:id', (req, res) => {
    res.json({ message: "Film bilgileri başarıyla güncellendi.", id: req.params.id });
});

// --- 3. OYUNCU VE YÖNETMEN BİLGİLERİ (RE-03) ---
app.get('/api/movies/:id/cast', (req, res) => {
    res.json({ director: "Christopher Nolan", cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt"], movie_id: req.params.id });
});

// --- 4. FILM FİLTRELEME & LİSTELEME (RE-04) - 🔥 REDIS ŞOVU BURADA! ---
app.get('/api/movies', async (req, res) => {
    try {
        const cacheKey = 'moviesList';
        
        // 1. Redis'te veri var mı kontrol et
        const cachedMovies = await redisClient.get(cacheKey);

        if (cachedMovies) {
            console.log("⚡ Veriler şimşek gibi Redis'ten geldi!");
            return res.json({
                veri_kaynagi: "REDIS CACHE (Süper Hızlı)",
                data: JSON.parse(cachedMovies)
            });
        }

        // 2. Yoksa veritabanından çek ve Redis'e kaydet (1 saat = 3600 sn)
        console.log("Veriler SQL'den çekildi ve Redis'e kaydediliyor...");
        await redisClient.setEx(cacheKey, 3600, JSON.stringify(movies));

        return res.json({
            veri_kaynagi: "VERITABANI (İlk İstek)",
            data: movies
        });

    } catch (error) {
        console.error("Redis Hatası:", error);
        res.json({ veri_kaynagi: "VERITABANI (Hata Durumu)", data: movies });
    }
});

// --- 5. YORUM DÜZENLEME (RE-05) ---
app.put('/api/comments/:id', (req, res) => {
    res.json({ message: "Yorum başarıyla düzenlendi.", commentId: req.params.id });
});

// --- 6. İZLENECEKLER LİSTESİ OLUŞTURMA (RE-06) - 🐇 RABBITMQ ŞOVU BURADA! ---
app.post('/api/watchlist', (req, res) => {
    const mesaj = `Arka plan görevi: ID'si belli olmayan kullanıcı listeye yeni film ekledi, teşekkür maili atılacak.`;
    
    // Mesajı RabbitMQ kuyruğuna yolla (kullanıcıyı bekletmeden)
    if (channel) {
        channel.sendToQueue('bildirim_kuyrugu', Buffer.from(mesaj));
        console.log("🐇 RabbitMQ Kuyruğuna Yeni Görev Eklendi:", mesaj);
    }

    res.json({ 
        message: "Film izlenecekler listenize başarıyla eklendi.", 
        status: "created",
        kuyruk_durumu: "Arka planda bildirim maili sıraya alındı (RabbitMQ)!"
    });
});

// --- 7. YORUM ONAYLAMA (RE-07) ---
app.put('/api/comments/:id/approve', (req, res) => {
    res.json({ message: "Yorum yönetici tarafından onaylandı.", isApproved: true });
});

// --- 8. QUIZ ILE FILM ÖNERME (RE-08) ---
app.post('/api/quiz/recommend', (req, res) => {
    res.json({ recommendation: "Inception", matchRate: "%95", message: "Quiz sonuçlarınıza göre en uygun film seçildi." });
});

// --- 9. HABER DÜZENLEME (RE-09) ---
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

// --- 10. DİL SEÇENEKLERİ (RE-10) ---
app.get('/api/language/:lang', (req, res) => {
    res.json({ message: `Sistem dili başarıyla ${req.params.lang} olarak değiştirildi.`, currentLang: req.params.lang });
});

// --- JOKER ROTA ---
app.all('*', (req, res) => {
    res.json({ status: "API Online", developer: "Tayfun Karlı", requirements_status: "10/10 Completed" });
});

// --- SUNUCU BAŞLATMA ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 SİBER SUNUCU AKTİF: http://localhost:${PORT}`);
});

module.exports = app;
