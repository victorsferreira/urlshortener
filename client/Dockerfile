FROM node:9 as react-builder
WORKDIR /app
RUN rm -rf /app/*
COPY package.json /app
RUN npm install
COPY . /app
ENV REACT_APP_SERVER_URL=http://104.131.66.95:8090
ENV REACT_APP_PUBLIC_URL=http://104.131.66.95:3000
RUN npm run build

FROM httpd:2.4
COPY --from=react-builder ./app/build/ /usr/local/apache2/htdocs/