FROM node:20.13.0-alpine3.19 as build-stage

ARG API_URL

ENV API_URL=$API_URL

WORKDIR /app/

COPY package*.json .

RUN npm install

COPY . .

RUN ["npm","build"]


# creando imagen en base a otra imagen
FROM nginx:stable-alpine3.19-slim

COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]
