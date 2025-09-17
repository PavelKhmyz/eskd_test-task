FROM node:23.5-slim

WORKDIR /app

COPY package*.json tsconfig.json ./
RUN npm install --production

COPY . .

RUN npm run build

CMD sh -c "npm run migrate up && node dist/index.js"
