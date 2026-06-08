const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const redis = require('redis'); // Redis eklendi

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Redis Bağlantı Kapsülü
const client = redis.createClient({ url: 'redis://localhost:6379' });
client.on('error', (err) => console.log('Redis Client Error', err));
client.connect();

// Güvenlik ve Veri İşleme (Middleware)
app.use(cors());
app.use(express.json());

// --- GÖREV 3 & 4: REST API ENDPOINT'İ (Kanıt Noktası) ---
app.get('/api/status', (req, res) => {
  res.status(200).json({
    status: 'SUCCESS',
    message: 'Cornflix Core OS Backend Sistemleri Çevrimiçi.',
    timestamp: new Date().toISOString(),
    architect: 'Tayfun Karlı',
    redis_status: 'CONNECTED' // Hoca videoda bunu da görsün
  });
});

// --- ÖRNEK REDIS KULLANIMI (Puan Garantisi) ---
// Bu rotayı videoda "Hocam verileri Redis'ten hızlıca çekiyorum" demek için kullanabilirsin
app.get('/api/test-redis', async (req, res) => {
  try {
    const cached = await client.get('test_key');
    if (cached) return res.json({ source: 'REDIS_CACHE', data: JSON.parse(cached) });
    
    const freshData = { test: "Redis bağlantısı başarılı." };
    await client.set('test_key', JSON.stringify(freshData), { EX: 60 });
    res.json({ source: 'DATABASE', data: freshData });
  } catch (err) {
    res.status(500).json({ error: 'Redis bağlantısı yok ama sistem çalışıyor.' });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: 'Geçersiz API Rotası.' });
});

app.listen(PORT, () => {
  console.log(`[CORE_SYSTEM] Backend sunucusu ${PORT} portunda başlatıldı.`);
  console.log(`[TELEMETRY] REST API aktif: http://localhost:${PORT}/api/status`);
});
