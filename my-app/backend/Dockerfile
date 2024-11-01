FROM node:14

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

RUN mkdir -p /app/uploads

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
