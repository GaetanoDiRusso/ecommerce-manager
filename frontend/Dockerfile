FROM node:18

WORKDIR /usr/src/app

COPY ./build /usr/src/app

ENV PORT=3001
EXPOSE 3001

RUN npm install -g serve

# Serve the app
CMD ["serve", "-s", "."]