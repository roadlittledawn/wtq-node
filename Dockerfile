# Use a lighter version of Node as a parent image
FROM mhart/alpine-node:8.11.4

# Set the working directory to /api
WORKDIR /api

# copy package.json into the container at /api
COPY services/api/package*.json /api/

# install dependencies
RUN npm install

# Copy the current directory contents into the container at /api
COPY . /api/

WORKDIR /site
COPY services/sitepackage*.json /site
RUN npm install
COPY . /site/

# Make port 3000 available to the world outside this container
EXPOSE 8000

# Run the app when the container launches
CMD ["npm", "start"]
