FROM node:14.15.4-alpine

WORKDIR /usr/app

COPY . .

RUN npm i

RUN sed -i 's%`http://localhost:3000`%`https://crypto-trader-3l3f7n6gyq-nn.a.run.app`%' /usr/app/services/*

RUN npm run build

CMD [ "npm", "start" ]

