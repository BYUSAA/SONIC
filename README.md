# SONIC
 MUSIC DISCOVERY PLATFORM
# Sonic - Music Discovery Platform

## Deployment to Web01 and Web02

### Prerequisites
- Node.js installed on both servers
- Nginx installed on both servers

### Steps:
1. Clone the repository to both servers
2. Install dependencies: `npm install`
3. Create .env file with API keys
4. Start the server: `node server.js`
5. Configure nginx to serve the frontend and proxy API requests

### Load Balancer Configuration (LB01):
```bash
sudo apt install nginx
sudo nano /etc/nginx/sites-available/default

# Add upstream configuration:
upstream myapp {
    server Web01_IP:3000;
    server Web02_IP:3000;
}

server {
    location /api/ {
        proxy_pass http://myapp;
    }
    location / {
        root /path/to/static/files;
        try_files $uri $uri/ /index.html;
    }
}

sudo systemctl restart nginx
