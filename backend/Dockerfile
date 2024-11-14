FROM node:18

WORKDIR /app

COPY *.json ./

RUN npm install

COPY ./dist ./dist
COPY ./images ./images
COPY ./.env ./

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]