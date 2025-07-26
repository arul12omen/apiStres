FROM node:18

# Install Python dan alat build C/C++ yang dibutuhkan numpy / scikit-learn
RUN apt-get update && \
    apt-get install -y python3 python3-pip python3-dev build-essential gcc g++ make && \
    pip3 install --no-cache-dir numpy scikit-learn

# Set direktori kerja
WORKDIR /app

# Copy seluruh file project
COPY . .

# Install dependensi Node.js
RUN npm install

# Jalankan server
CMD ["node", "server.js"]
