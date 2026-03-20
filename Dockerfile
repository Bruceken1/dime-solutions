FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN rm -rf dist && npx vite build

RUN ls -la dist/assets/

EXPOSE 3000

CMD ["node", "server.js"]
