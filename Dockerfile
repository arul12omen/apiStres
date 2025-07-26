FROM node:18

# Install Python & pip dulu
RUN apt-get update && \
    apt-get install -y python3 python3-pip

# Install dependency Python (dipisah agar pip3 dikenali)
RUN pip3 install --no-cache-dir numpy scikit-learn

WORKDIR /app
COPY . .
RUN npm install

CMD ["node", "server.js"]
