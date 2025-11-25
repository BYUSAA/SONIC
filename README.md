Sonic - Music Discovery Platform 🎵
A modern, interactive music discovery platform that allows users to search for tracks, artists, albums, and playlists using the Spotify API, with integrated YouTube playback functionality.

https://via.placeholder.com/800x400/1a1a1a/ffffff?text=Sonic+Music+Discovery

🌟 Features
Multi-Source Search: Search across Spotify's extensive music library

Dual Playback: Listen to 30-second Spotify previews or full songs via YouTube

Interactive Player: Custom audio player with play, pause, next, previous, and volume controls

Smart Filtering: Filter results by tracks, artists, albums, or playlists

Sorting Options: Sort results by name, popularity, or release date

Detailed Views: Comprehensive modal views with track/artist information

Playlist Discovery: Find playlists containing songs by specific artists or albums

Responsive Design: Works seamlessly on desktop and mobile devices

🚀 Live Demo
Web01: http://web01.yourdomain.com

Web02: http://web02.yourdomain.com

Load Balancer: http://lb01.yourdomain.com

🛠 Technologies Used
Frontend
HTML5 - Semantic markup structure

CSS3 - Modern styling with gradients, flexbox, and grid

JavaScript ES6+ - Interactive functionality and API integration

YouTube IFrame API - Video playback integration

Backend
Node.js - Runtime environment

Express.js - Web server framework

Axios - HTTP client for API requests

APIs
Spotify Web API - Music data and metadata

YouTube Data API v3 - Video search and playback

Infrastructure
Nginx - Web server and load balancer

Ubuntu Server - Deployment environment

📋 Prerequisites
Node.js (v14 or higher)

npm or yarn

Spotify Developer Account

YouTube Data API v3 Access

🏃‍♂️ Running Locally
1. Clone the Repository
bash

Copy

Download
git clone https://github.com/yourusername/sonic-music-discovery.git
cd sonic-music-discovery
2. Install Dependencies
bash

Copy

Download
npm install
3. Set Up Environment Variables
Create a .env file in the root directory:

env

Copy

Download
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
YOUTUBE_API_KEY=your_youtube_api_key
PORT=3000
4. Get API Credentials
Spotify API
Visit Spotify Developer Dashboard

Create a new app

Copy Client ID and Client Secret to your .env file

YouTube Data API
Go to Google Cloud Console

Enable YouTube Data API v3

Create credentials (API Key)

Add to your .env file

5. Start the Development Server
bash

Copy

Download
# Start backend server
npm start

# The application will be available at http://localhost:3000
🚀 Deployment
Deploying to Web01 and Web02
Prerequisites
Ubuntu 20.04+ servers

Node.js installed

Nginx installed

Steps
Clone and Setup on Both Servers

bash

Copy

Download
# On both Web01 and Web02
git clone https://github.com/yourusername/sonic-music-discovery.git
cd sonic-music-discovery
npm install
Configure Environment

bash

Copy

Download
# Create .env file on both servers
nano .env
# Add your environment variables
Set Up Nginx on Web Servers

bash

Copy

Download
sudo nano /etc/nginx/sites-available/default
Add this configuration:

nginx

Copy

Download
server {
    listen 80;
    server_name web01.yourdomain.com; # or web02.yourdomain.com
    
    location / {
        root /path/to/sonic-music-discovery;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
    
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
Restart Nginx

bash

Copy

Download
sudo systemctl restart nginx
sudo systemctl enable nginx
Start Application

bash

Copy

Download
# Use PM2 for process management
npm install -g pm2
pm2 start server.js --name "sonic-music"
pm2 startup
pm2 save
⚖️ Load Balancer Configuration (LB01)
Setting Up Nginx Load Balancer
Install Nginx on LB01

bash

Copy

Download
sudo apt update
sudo apt install nginx
Configure Load Balancer

bash

Copy

Download
sudo nano /etc/nginx/sites-available/default
Add this configuration:

nginx

Copy

Download
upstream sonic_backend {
    server web01_ip:80;
    server web02_ip:80;
}

server {
    listen 80;
    server_name lb01.yourdomain.com;

    location / {
        proxy_pass http://sonic_backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    location /api {
        proxy_pass http://sonic_backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
Restart Nginx

bash

Copy

Download
sudo systemctl restart nginx
sudo systemctl enable nginx
Load Balancer Commands Used
bash

Copy

Download
sudo apt install nginx
sudo nano /etc/nginx/sites-available/default
# Add upstream configuration as shown above
sudo systemctl restart nginx
📚 API Documentation
Spotify Web API
Official Documentation: Spotify Web API Docs

Authentication: OAuth 2.0 Client Credentials Flow

Rate Limits: Varies by endpoint, generally generous for development

YouTube Data API v3
Official Documentation: YouTube Data API Docs

Authentication: API Key

Rate Limits: 10,000 units per day

🎯 Project Structure
text

Copy

Download
sonic-music-discovery/
├── server.js              # Backend Express server
├── package.json           # Dependencies and scripts
├── .env                   # Environment variables (ignored in git)
├── .gitignore            # Git ignore rules
├── index.html            # Main frontend file
└── README.md             # Project documentation
🛡️ Security Features
API Key Protection: Backend proxy prevents frontend exposure

CORS Configuration: Proper cross-origin resource sharing

Input Validation: Sanitized user inputs

Error Handling: Comprehensive error management without exposing sensitive data

🎨 UI/UX Features
Dark Theme: Easy on the eyes during extended use

Responsive Grid: Adapts to different screen sizes

Smooth Animations: CSS transitions and transforms

Interactive Elements: Hover effects and click animations

Loading States: Visual feedback during API calls

🔧 Challenges & Solutions
Challenge 1: API Key Security
Problem: Initially had API keys exposed in frontend JavaScript
Solution: Implemented backend proxy server to handle all API requests

Challenge 2: Audio Autoplay Restrictions
Problem: Modern browsers block autoplay without user interaction
Solution: Added audio permission banner and user-initiated playback

Challenge 3: Cross-Platform Compatibility
Problem: Different browser behaviors for audio/video playback
Solution: Implemented multiple fallback options and feature detection

Challenge 4: Rate Limiting
Problem: API quota exhaustion during development
Solution: Implemented proper error handling and request caching

Challenge 5: Load Balancer Session Persistence
Problem: User sessions not maintained across different backend servers
Solution: Implemented stateless API design and client-side state management

🐛 Known Issues
YouTube API Quotas: Limited daily requests for video search

Preview Availability: Not all tracks have Spotify previews

Mobile Performance: Some animations may be heavy on older devices

🔮 Future Enhancements
User authentication and personal playlists

Advanced search filters (genre, year, BPM)

Social features (sharing, collaborative playlists)

Offline caching for recently played tracks

Podcast and audiobook integration

Lyrics display synchronized with playback

🤝 Contributing
Fork the repository

Create a feature branch (git checkout -b feature/amazing-feature)

Commit your changes (git commit -m 'Add some amazing feature')

Push to the branch (git push origin feature/amazing-feature)

Open a Pull Request

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

🙏 Acknowledgments
Spotify for their comprehensive music API

YouTube/Google for video playback capabilities

Nginx for robust load balancing and serving

Node.js community for excellent packages and support

📞 Support
For support, email m.byusa@alustudent.com  or create an issue in the GitHub repository.