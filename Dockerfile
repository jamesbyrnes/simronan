FROM node:dubnium-alpine

COPY ./package.json /app/package.json
WORKDIR /app
RUN npm install -g forever && npm install

COPY . /app

CMD ["forever", "bot.js"]
