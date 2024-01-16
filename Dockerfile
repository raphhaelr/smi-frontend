FROM node:18.17.0

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY . /app

RUN npm install
RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]
