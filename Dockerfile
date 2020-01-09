FROM node:8 as development
ENV NODE_ENV development
COPY . /app
WORKDIR /app
RUN chmod +x /app/scripts/install.sh
EXPOSE 8000
CMD ["yarn", "start"]

FROM development as build
ENV NODE_ENV=production
RUN npm run build && npm run build:server

FROM base as production
ENV NODE_ENV=production
COPY . /app
RUN chmod +x /app/scripts/install.sh

RUN npm install --production
COPY --from=build /app/dist ./dist
CMD ["yarn", "start", "start:prod"]

# FROM node:8 as base
# WORKDIR /app
