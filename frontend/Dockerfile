FROM node:23-slim

ENV TZ=Europe/Paris

WORKDIR /frontend

COPY package*.json ./
RUN npm install

COPY . .

