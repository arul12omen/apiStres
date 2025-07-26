# Gunakan image Node.js resmi
FROM node:18

# Install Python 3 dan pip
RUN apt-get update && apt-get install -y python3 python3-pip

# Set direktori kerja dalam container
WORKDIR /app

# Salin file ke dalam container
COPY . .

# Install dependency Node.js
RUN npm install

# Pastikan script Python bisa dijalankan (opsional: install library Python jika dibutuhkan)
# RUN pip3 install -r requirements.txt

# Jalankan aplikasi
CMD ["node", "server.js"]
