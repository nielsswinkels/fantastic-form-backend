# Use an official Node.js runtime as the base image
FROM node:16.20.0

# Set the working directory in the container to /app
WORKDIR /app

# Install necessary dependencies for Puppeteer
RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
       libnss3 libatk-bridge2.0-0 libgtk-3-0 libgbm-dev \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Copy package.json and package-lock.json into the directory /app in the container
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Install Puppeteer and add a non-privileged user
RUN npm install puppeteer \
    && groupadd -r pptruser && useradd -r -g pptruser -G audio,video pptruser \
    && mkdir -p /home/pptruser/Downloads \
    && chown -R pptruser:pptruser /home/pptruser \
    && chown -R pptruser:pptruser /app

# Bundle the app source inside the Docker image 
# (i.e., copy everything from the current directory into /app in the container)
COPY . .

# Run everything after as non-privileged user
USER pptruser

# Make port 3000 available to the world outside the container
EXPOSE 3000

# Run the app when the container launches
CMD ["node", "server.js"]