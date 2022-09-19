FROM alpine:3.14

WORKDIR /app

COPY . .

RUN apk update

RUN apk add npm

RUN npm install

RUN npx prisma generate

EXPOSE 3002

CMD ["node", "app"]
