FROM node:8.15.0

RUN mkdir -p /src/app/crud-project-client
WORKDIR /src/app/crud-project-client

COPY package.json /src/app/crud-project-client
COPY package-lock.json /src/app/crud-project-client

RUN npm install
COPY . /src/app/crud-project-client

CMD ["npm", "start"]