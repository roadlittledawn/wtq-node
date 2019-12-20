FROM node:8 as development
WORKDIR /app
ENV NODE_ENV development
COPY scripts ./scripts
COPY services/api/package.json ./api
COPY services/site/package.json ./site
RUN scripts/install.sh
COPY services/api ./app/api
COPY services/site ./app/site
EXPOSE 8000
CMD ["yarn", "start"]

FROM development as build
ENV NODE_ENV=production
RUN npm run build && npm run build:server

FROM base as production
ENV NODE_ENV=production
COPY scripts ./scripts
COPY services/api/package.json ./api
COPY services/site/package.json ./site
RUN scripts/install.sh
COPY services/api ./app/api
COPY services/site ./app/site
RUN npm install --production
COPY --from=build /app/dist ./dist
CMD ["npm", "run", "start:prod"]

# FROM node:8 as base
# WORKDIR /app
