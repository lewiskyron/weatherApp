const express = require('express');
const https = require('https');
const path = require('path');
const cors = require('cors');
const axios = require('axios');
// const static = express.static(__dirname + "/public/index.html");

const app = express()
const port = 3000
// Middleware to serve static files from the public folder
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(__dirname));
app.use(express.static(__dirname + "/Public", {
  // Set the content type header for CSS files to "text/css"
  setHeaders: (res, path, stat) => {
    if (path.endsWith(".css")) {
      res.setHeader("Content-Type", "text/css");
    }
  }
}));
app.use(cors()); // Add this line to enable CORS for all routes

// GET /weather/:city
    
app.listen(3000, () => console.log(`Server is running on http://localhost:${port}`));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/Public/index.html");
});

app.get('/api/:city', async (req, res) => {
  const city = req.params.city;
  const API_KEY = '53dfc7eb674f6a9a878b9ea4bef5b91c';

  try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

      const response = await axios.get(url);
    
      const data = response.data;
      console.log(data)
      res.json(data);
      console.log(data)
    } catch (error) {
      console.error('Error fetching weather data:', error);
      res.status(500).json({ error: 'An error occurred while fetching weather data from the server.' });
    }
});