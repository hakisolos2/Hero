FROM node:18.16.0-bullseye-slim

RUN apt-get update && \
  apt-get install -y \
  ffmpeg \
  imagemagick \
  webp \
  git && \
  apt-get upgrade -y && \
  rm -rf /var/lib/apt/lists/*

RUN git clone https://github.com/anonphoenix007/HOTARO-MD /HOTARO-MD
WORKDIR /HOTARO-MD
RUN npm install
CMD ["node", "index.js"]
