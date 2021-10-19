FROM node:16

WORKDIR /usr/src/app

RUN wget http://download.redis.io/redis-stable.tar.gz && \
    tar xvzf redis-stable.tar.gz && \
    cd redis-stable && \
    make && \
    mv src/redis-server /usr/bin/ && \
    cd .. && \
    rm -r redis-stable && \
    npm install -g concurrently   

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4444

CMD concurrently "/usr/bin/redis-server --bind '0.0.0.0'" "sleep 5s; node /usr/src/app/src/server.ts" 