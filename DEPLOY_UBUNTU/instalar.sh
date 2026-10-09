#!/bin/bash
echo "============================================="
echo "  INSTALADOR QUALIBRA SERVER (UBUNTU T130)   "
echo "============================================="

echo "[1/4] Atualizando servidor e instalando Node.js, Nginx e Avahi..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt update
sudo apt install -y nodejs nginx avahi-daemon

echo "[2/4] Instalando PM2 e subindo o Backend..."
sudo npm install -g pm2
cd /var/www/qualibra/Backend
npm install
pm2 start server.js --name "qualibra-api"
pm2 save
pm2 startup | grep "sudo env" | bash

echo "[3/4] Configurando o Nginx e Proxy Reverso..."
cat << 'EOF' > /etc/nginx/sites-available/qualibra
server {
    listen 80;
    server_name portalqualibra.local;
    root /var/www/qualibra/Frontend/dist;
    index index.html;
    location / { try_files $uri $uri/ /index.html; }
    location /api/ {
        proxy_pass http://localhost:3001/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

sudo ln -sf /etc/nginx/sites-available/qualibra /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo systemctl restart nginx

echo "[4/4] Configurando Nome de Rede (mDNS)..."
sudo hostnamectl set-hostname portalqualibra
sudo systemctl restart avahi-daemon

echo "============================================="
echo " ✅ DEPLOY CONCLUÍDO COM SUCESSO!"
echo " 🌐 Acesse de qualquer PC da rede:"
echo "    http://portalqualibra.local"
echo "============================================="