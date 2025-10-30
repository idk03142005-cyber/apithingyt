const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all domains
app.use(cors());

// Your TMDB API Key (replace with your own key)
const TMDB_API_KEY = 'b6b677eb7d4ec17f700e3d4dfc31d005';  // You need to replace this with your actual TMDB API key

// Endpoint to fetch data from IMDb (via the proxy)
app.get('/proxy/imdb', async (req, res) => {
    const url = decodeURIComponent(req.query.url); // URL passed as a query parameter
    try {
        const response = await axios.get(url);
        res.json(response.data);  // Forward the IMDb data
    } catch (error) {
        console.error('Error fetching from IMDb:', error);
        res.status(500).json({ error: 'Error fetching IMDb data' });
    }
});

// Endpoint to fetch movie data from TMDB using IMDb ID
app.get('/proxy/tmdb/movie', async (req, res) => {
    const imdbId = req.query.imdbId;
    const tmdbUrl = `https://api.themoviedb.org/3/find/${imdbId}?api_key=${TMDB_API_KEY}&language=en-US&external_source=imdb_id`;
    try {
        const response = await axios.get(tmdbUrl);
        res.json(response.data);  // Forward the TMDB movie data
    } catch (error) {
        console.error('Error fetching from TMDB:', error);
        res.status(500).json({ error: 'Error fetching TMDB movie data' });
    }
});

// Endpoint to fetch TV series data from TMDB using IMDb ID
app.get('/proxy/tmdb/tv', async (req, res) => {
    const imdbId = req.query.imdbId;
    const tmdbUrl = `https://api.themoviedb.org/3/find/${imdbId}?api_key=${TMDB_API_KEY}&language=en-US&external_source=imdb_id`;
    try {
        const response = await axios.get(tmdbUrl);
        res.json(response.data);  // Forward the TMDB TV data
    } catch (error) {
        console.error('Error fetching from TMDB:', error);
        res.status(500).json({ error: 'Error fetching TMDB TV data' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Proxy server running at http://localhost:${port}`);
});
