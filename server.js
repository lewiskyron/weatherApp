const express = require('express');
const https = require('https');
const path = require('path');
const cors = require('cors');

const app = express()
const port = 5500
// Middleware to serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors()); // Add this line to enable CORS for all routes

// GET /weather/:city
app.get('/api/:city', async (req, res) => {
    const {city} = req.params.city;
    const API_KEY = '53dfc7eb674f6a9a878b9ea4bef5b91c';
    console.log(city)

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'An error occurred while fetching weather data.' });
      }
    });
    
app.listen(3000, () => console.log(`Server is running on http://localhost:${port}`));
