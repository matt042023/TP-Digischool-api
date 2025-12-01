FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ARG PORT=3000
EXPOSE ${PORT}

CMD ["sh", "-c", "npm run seed && npm start"]