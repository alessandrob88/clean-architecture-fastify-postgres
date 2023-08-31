FROM node:18

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY src ./src
COPY migrations ./migrations
COPY .postgratorrc.json ./

EXPOSE 8080

RUN npm i -g nodemon ts-node postgrator postgrator-cli

CMD [ "npx", "nodemon", "src/index.ts" ]