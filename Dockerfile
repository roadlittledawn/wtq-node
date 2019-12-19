FROM node:8 as base
WORKDIR /app
EXPOSE 8000

FROM base as development
ENV NODE_ENV development
COPY /services/api/package.json /api
WORKDIR /app/api
RUN npm install
COPY /services/api ./app/api
WORKDIR /app/site
COPY /services/site/package.json /site
RUN npm install
COPY /services/site ./app/site
CMD ["npm", "start"]

FROM development as build
ENV NODE_ENV=production
RUN npm run build && npm run build:server

FROM base as production
ENV NODE_ENV=production
COPY /services/api/package.json /api
WORKDIR /app/api
RUN npm install
COPY /services/api ./app/api
WORKDIR /app/site
COPY /services/site/package.json /site
RUN npm install
COPY /services/site ./app/site
RUN npm install --production
COPY --from=build /app/dist ./dist
CMD ["npm", "run", "start:prod"]
