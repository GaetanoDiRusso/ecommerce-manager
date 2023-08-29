FROM node:18

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --production

COPY ./dist /usr/src/app

EXPOSE 3000

CMD [ "npm", "run", "start-prod" ]