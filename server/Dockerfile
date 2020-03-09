FROM node:12

WORKDIR /usr/src/phonebookApp

COPY ./package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "start"]