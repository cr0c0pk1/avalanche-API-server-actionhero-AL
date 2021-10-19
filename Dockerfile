FROM node:16

WORKDIR /usr/src/app

RUN apt-get install -y redis-server && \
    sleep 5s && \
    redis-server --daemonize yes

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4444

CMD [ "node", "src/server.ts" ]