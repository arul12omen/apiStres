# Gunakan base image Node.js
FROM node:18

# Install Python 3 dan pip + library yang dibutuhkan langsung
RUN apt-get update && \
    apt-get install -y python3 python3-pip && \
    pip3 install --no-cache-dir numpy scikit-learn

# Set working directory
WORKDIR /app

# Salin semua file project ke dalam container
COPY . .

# Install dependency Node.js
RUN npm install

# Jalankan server
CMD ["node", "server.js"]
