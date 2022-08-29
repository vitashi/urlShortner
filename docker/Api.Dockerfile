FROM node:16-slim


WORKDIR /usr/src/app

RUN npm install -g npm@latest
COPY package*.json ./

COPY . .
RUN npm install typescript
RUN npm run build
RUN npm uninstall typescript

EXPOSE 8080

CMD ["node", "dist/src/index.js"]
