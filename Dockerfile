FROM node:8 as development
ENV NODE_ENV development
ADD . /app
WORKDIR /app
RUN yarn install
# RUN cd 
# RUN chmod +x scripts/install.sh
EXPOSE 8000
CMD ["yarn", "start"]

FROM development as build
ENV NODE_ENV=production
RUN npm run build && npm run build:server

FROM build as production
ENV NODE_ENV=production
ADD . /app
WORKDIR /app
RUN yarn install
# RUN chmod +x scripts/install.sh

RUN yarn install --production
COPY --from=build /app/dist ./dist
CMD ["yarn", "start", "start:prod"]

# FROM node:8 as base
# WORKDIR /app
