FROM node:20.8-bookworm

RUN mkdir /app
WORKDIR /app
COPY package*.json /app
RUN npm ci --omit dev

COPY build /app/build

EXPOSE 8080

CMD [ "node", "build" ]
