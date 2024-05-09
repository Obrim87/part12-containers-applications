FROM node:20

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci

RUN npm run build

RUN npm install -g serve

CMD ["serve", "dist", "-p", "5173"]