FROM node:13

LABEL maintainer="Aldo Okware & Esther Namusisi"

WORKDIR /usr/src/app

ADD yarn.lock package*.json ./

RUN yarn

COPY . .

RUN yarn migrations && yarn build  && yarn start
