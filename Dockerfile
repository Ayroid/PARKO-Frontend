FROM node:lts
WORKDIR /app
COPY package*.json ./
RUN npm install -g npm@10.2.1
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5173
CMD ["npm", "run", "dev"]