FROM node:23.11.1-alpine3.21

WORKDIR /usr/src/app

COPY package.json /usr/src/app

COPY . /usr/src/app

RUN npm install -g @angular/cli

RUN npm install

CMD ["ng", "serve", "--host", "0.0.0.0"]