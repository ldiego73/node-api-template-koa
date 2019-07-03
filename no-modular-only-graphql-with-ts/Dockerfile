FROM node:alpine

ENV API_PORT 80

RUN npm i -g pm2

ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /app && cp -a /tmp/node_modules /app/

WORKDIR /app
ADD . /app

EXPOSE 80

RUN npm run build

CMD [ "pm2-runtime", "pm2.yml" ]
