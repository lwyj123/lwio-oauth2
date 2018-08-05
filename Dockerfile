### BASE
FROM node:8 AS base
LABEL maintainer "lwyj123 <liang.pearce@gmail.com>"

RUN npm install pm2 -g


# Set the working directory
RUN mkdir -p /home/service
WORKDIR /home/service
# Copy project specification and dependencies lock files
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 29305


ENV NODE_ENV production

CMD ["pm2-runtime", "src/app.js"]