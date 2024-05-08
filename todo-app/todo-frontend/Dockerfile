FROM node:20 AS base
WORKDIR /usr/src/app

FROM base AS test
COPY . .
RUN npm ci
RUN npm run test

FROM base AS build
COPY --from=test /usr/src/app .

ENV VITE_BACKEND_URL=http://localhost:8081/api/
RUN npm run build

RUN npm install -g serve

CMD ["serve", "dist", "-p", "5172"]
