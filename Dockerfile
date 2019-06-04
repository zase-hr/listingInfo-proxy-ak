FROM node:7
WORKDIR /app
COPY package.json /app
COPY . /app
RUN npm install
CMD node server/app.js
EXPOSE 3030