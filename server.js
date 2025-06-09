const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000;

// Güvenlik ve performans middleware'leri
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "cdn.jsdelivr.net", "unpkg.com"],
            styleSrc: ["'self'", "'unsafe-inline'", "cdn.jsdelivr.net", "cdnjs.cloudflare.com", "unpkg.com"],
            imgSrc: ["'self'", "data:", "images.unsplash.com"],
            fontSrc: ["'self'", "cdnjs.cloudflare.com"],
            connectSrc: ["'self'"]
        }
    }
}));
app.use(compression());

// Statik dosyaları serve et
app.use(express.static(path.join(__dirname, 'public')));

// Ana route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Server'ı başlat
app.listen(PORT, () => {
    console.log(`Server ${PORT} portunda çalışıyor`);
}); 