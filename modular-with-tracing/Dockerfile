FROM node:alpine AS build

ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /app && cp -a /tmp/node_modules /app/

WORKDIR /app
ADD . /app

RUN npm run build

FROM node:alpine

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/env.yaml .
COPY --from=build /app/pm2.yml .
COPY --from=build /app/package.json .

EXPOSE 80

RUN npm i -g pm2
RUN npm install --production

CMD [ "pm2-runtime", "pm2.yml" ]
