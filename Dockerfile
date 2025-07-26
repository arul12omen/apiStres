FROM node:18

# Install Python, pip, venv, dan libGL (jika pakai OpenCV)
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-venv \
    python3-dev \
    build-essential \
    libgl1 \
    gcc \
    g++

# Buat virtual environment Python
RUN python3 -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Set working directory
WORKDIR /app

# Copy semua file project
COPY . .

# Install dependency Node.js
RUN npm install

# Install dependency Python di virtual environment
RUN pip install --no-cache-dir numpy scikit-learn pandas

# Jalankan server Node.js
CMD ["node", "server.js"]
