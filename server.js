const express = require('express');
const request = require('request');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Spotify API credentials from environment variables
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

// Proxy endpoint for Spotify token
app.post('/api/spotify/token', (req, res) => {
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + Buffer.from(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
  };

  request.post(authOptions, (error, response, body) => {
    if (error) {
      return res.status(500).json({ error: 'Failed to get token' });
    }
    res.json(body);
  });
});

// Proxy endpoint for Spotify search
app.get('/api/spotify/search', (req, res) => {
  const { q, type } = req.query;
  if (!q || !type) {
    return res.status(400).json({ error: 'Missing query parameters' });
  }

  const options = {
    url: `https://api.spotify.com/v1/search?q=${encodeURIComponent(q)}&type=${type}&limit=20`,
    headers: {
      'Authorization': `Bearer ${req.headers.authorization?.split(' ')[1]}`
    },
    json: true
  };

  request.get(options, (error, response, body) => {
    if (error) {
      return res.status(500).json({ error: 'Search failed' });
    }
    res.json(body);
  });
});

// Proxy endpoint for YouTube search
app.get('/api/youtube/search', (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ error: 'Missing query parameter' });
  }

  const options = {
    url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${encodeURIComponent(q)}&type=video&key=${YOUTUBE_API_KEY}`,
    json: true
  };

  request.get(options, (error, response, body) => {
    if (error) {
      return res.status(500).json({ error: 'YouTube search failed' });
    }
    res.json(body);
  });
});

app.listen(port, () => {
  console.log(`Proxy server running on port ${port}`);
});