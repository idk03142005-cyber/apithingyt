const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to allow CORS for all origins
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Proxy route for IMDb API
app.get('/proxy/imdb', async (req, res) => {
  const url = decodeURIComponent(req.query.url);
  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from IMDb' });
  }
});

// Proxy route for TMDB API (for movies)
app.get('/proxy/tmdb/movie', async (req, res) => {
  const imdbId = req.query.imdbId;
  const tmdbApiKey = 'YOUR_TMDB_API_KEY'; // Replace with your actual TMDB API key
  const tmdbUrl = `https://api.themoviedb.org/3/find/${imdbId}?api_key=${tmdbApiKey}&language=en-US&external_source=imdb_id`;
  try {
    const response = await axios.get(tmdbUrl);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching TMDB movie data' });
  }
});

// Proxy route for TMDB API (for TV series)
app.get('/proxy/tmdb/tv', async (req, res) => {
  const imdbId = req.query.imdbId;
  const tmdbApiKey = 'YOUR_TMDB_API_KEY'; // Replace with your actual TMDB API key
  const tmdbUrl = `https://api.themoviedb.org/3/find/${imdbId}?api_key=${tmdbApiKey}&language=en-US&external_source=imdb_id`;
  try {
    const response = await axios.get(tmdbUrl);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching TMDB TV data' });
  }
});

app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
});
