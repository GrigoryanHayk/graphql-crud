FROM node:8.15.0

RUN mkdir -p /src/app/crud-project-server
WORKDIR /src/app/crud-project-server

COPY package.json /src/app/crud-project-server
COPY package-lock.json /src/app/crud-project-server

RUN npm install
COPY . /src/app/crud-project-server

CMD ["npm", "run", "dev"]