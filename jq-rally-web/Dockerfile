# FROM node:14.17.0-alpine
FROM node:16.3-alpine
ENV LANG=C.UTF-8 TZ=Asia/Tokyo
# ./jq-rally-web:/app のvolumes指定をしている その下にjq-rally
WORKDIR /app
COPY ./jq-rally/package*.json ./jq-rally/
RUN apk update && \
    apk upgrade && \
    apk add --no-cache --update make gcc g++ python3 && \
    # yarn installの記載場所を移動
    yarn install
# RUN npm install
COPY ./ .
ENV HOST 0.0.0.0
EXPOSE 3000