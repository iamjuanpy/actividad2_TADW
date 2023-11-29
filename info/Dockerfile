FROM node:14

WORKDIR /info

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm start"]