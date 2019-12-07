FROM node:8.16.0-alpine

RUN apk update && apk add git tree
RUN npm install -g forever
RUN mkdir /app

COPY . /app/simronan

RUN cd /app/simronan && npm install

WORKDIR /app/simronan

CMD ["forever", "bot.js"]
