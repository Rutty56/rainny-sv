const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.get('/weather-today', async (req, res) => {
  try {
    const response = await fetch('https://data.tmd.go.th/api/WeatherToday/V2/?uid=api&ukey=api12345');
    const data = await response.json();
    res.set('Access-Control-Allow-Origin', '*');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'ไม่สามารถดึงข้อมูลจาก TMD ได้' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
