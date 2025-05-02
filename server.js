const express = require('express');
const fetch = require('node-fetch');
const app = express();

let cache = null;
let lastFetch = 0;
const cacheDuration = 5 * 60 * 1000;

app.get('/weather-today', async (req, res) => {
  const now = Date.now();

  if (cache && (now - lastFetch < cacheDuration)) {
    console.log('📦 ส่งข้อมูลจาก cache');
    return res.json(cache);
  }

  try {
    console.log('🌐 ดึงข้อมูลใหม่จาก TMD');
    const response = await fetch('https://data.tmd.go.th/api/WeatherToday/V2/?uid=api&ukey=api12345');
    const data = await response.json();

    cache = data;
    lastFetch = now;

    res.json(data);
  } catch (error) {
    console.error('เกิดข้อผิดพลาด:', error);
    res.status(500).json({ error: 'ไม่สามารถดึงข้อมูลจาก TMD ได้' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
