# Gunakan image Node.js resmi
FROM node:18

# Install Python dan pip
RUN apt-get update && apt-get install -y python3 python3-pip

# Set working directory
WORKDIR /app

# Salin file aplikasi
COPY . .

# Install dependency Python
COPY requirements.txt .
RUN pip3 install --no-cache-dir -r requirements.txt

# Install dependency Node.js
RUN npm install

# Jalankan server
CMD ["node", "server.js"]
