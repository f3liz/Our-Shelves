#!/bin/bash

# Our-Shelves VM Script

# exits if there is an error with a command
set -e

echo "Starting VM setup for Our-Shelves..."

# 1. System update and upgrade
echo "Updating and Upgrading packages..."

sudo apt-get update -y
yes | sudo DEBIAN_FRONTEND=noninteractive apt-get -yqq upgrade

# 2. Install dependencies
echo "Installing dependencies..."

sudo apt-get install -y git mysql-server curl ufw
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo bash -
sudo apt-get install -y nodejs
sudo npm install -g pm2
sudo apt-get install -y openssl

# 3. Clone Repository
echo "Cloning Our-Shelves repository..."

if [ ! -d "Our-Shelves" ]; then
  git clone https://github.com/f3liz/Our-Shelves.git
else
  echo "Repository already exists. Pulling latest changes..."
  cd Our-Shelves && git pull && cd ..
fi

# 4. MySQL setup
echo "Setting up MySQL..."

sudo systemctl enable --now mysql

CREDFILE="/root/ourshelves_mysql_credentials"
DB_NAME="ourshelves"
DEV_USER="devuser"
DEPLOY_USER="deployuser"

# random password generation
DEVUSER_PASS=$(openssl rand -base64 12)
DEPLOYUSER_PASS=$(openssl rand -base64 12)

sudo tee "${CREDFILE}" > /dev/null <<EOF
DB_NAME=${DB_NAME}
DEV_USER=${DEV_USER}
DEV_PASS=${DEVUSER_PASS}
DEPLOY_USER=${DEPLOY_USER}
DEPLOY_PASS=${DEPLOYUSER_PASS}
EOF

chmod 600 "${CREDFILE}"
chown root:root "${CREDFILE}"

echo "Created credentials file at ${CREDFILE} (mode 600)."
 
# 5. Create database and users

sudo mysql -u root <<SQL
CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;
CREATE USER IF NOT EXISTS '${DEV_USER}'@'%' IDENTIFIED BY '${DEVUSER_PASS}';
GRANT ALL PRIVILEGES ON \`${DB_NAME}\`.* TO '${DEV_USER}'@'%';
CREATE USER IF NOT EXISTS '${DEPLOY_USER}'@'%' IDENTIFIED BY '${DEPLOYUSER_PASS}';
GRANT ALL PRIVILEGES ON \`${DB_NAME}\`.* TO '${DEPLOY_USER}'@'%';
FLUSH PRIVILEGES;
SQL

echo "MySQL database and users created"

# 6. MySQL config for remote access
echo "Configuring MySQL access"

sudo sed -i "s/^bind-address.*/bind-address = 0.0.0.0/" /etc/mysql/mysql.conf.d/mysqld.cnf
sudo systemctl restart mysql
sudo ufw allow 3306/tcp
sudo ufw allow 22/tcp
sudo ufw allow 3000/tcp
sudo ufw allow 3001/tcp
sudo ufw --force enable
sudo ufw reload

# 7. Front end and back end dependencies
echo "Installing front end and back end dependencies"

cd Our-Shelves/server
npm install

cd ../client
npm install
npm run build

# 8. Run app with pm2
echo "Using pm2 to start application"

cd ../server
pm2 delete all || true
pm2 start index.js --name backend

cd ../client
pm2 start "npm run start" --name frontend

pm2 save
pm2 list

echo "Set up complete, MySQL credentials stored in ${CREDFILE}"