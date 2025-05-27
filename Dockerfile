
FROM node:20

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

# VOLUME ["/app/logs"]

EXPOSE 3001

CMD ["npm", "run", "dev"]