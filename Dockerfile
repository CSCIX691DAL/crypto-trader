FROM node:14.15.4-alpine

WORKDIR /usr/app

COPY . .

RUN npm i

RUN npm run build

CMD [ "npm", "start" ]

