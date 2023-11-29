FROM node:latest

WORKDIR /

COPY package*.json ./

RUN npm install --only-production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]