const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Güvenlik ve Veri İşleme (Middleware)
app.use(cors());
app.use(express.json());

// --- GÖREV 3 & 4: REST API ENDPOINT'İ ---
// Hocanın videoda göreceği ana kontrol noktası
app.get('/api/status', (req, res) => {
  res.status(200).json({
    status: 'SUCCESS',
    message: 'Cornflix Core OS Backend Sistemleri Çevrimiçi.',
    timestamp: new Date().toISOString(),
    architect: 'Tayfun Karlı'
  });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Geçersiz API Rotası.' });
});

app.listen(PORT, () => {
  console.log(`[CORE_SYSTEM] Backend sunucusu ${PORT} portunda başlatıldı.`);
  console.log(`[TELEMETRY] REST API aktif: http://localhost:${PORT}/api/status`);
});
