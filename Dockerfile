FROM node:18-alpine

RUN apk add --update --no-cache openssl1.1-compat

WORKDIR /app

COPY tsconfig.json ./

COPY  tsconfig.prod.json ./

COPY package.json ./

COPY  package-lock.json ./

COPY ./dist/src ./dist/src


RUN npm i

EXPOSE ${PORT}

CMD npm start
