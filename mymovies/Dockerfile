FROM node:latest

WORKDIR /

COPY package*.json ./

RUN npm install --only-production

COPY . .


CMD ["npm", "start"]