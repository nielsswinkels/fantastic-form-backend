# Backend

This is a backend to be able to generate a pdf from a webpage using puppeteer.

## How to use

1. Install with `npm install`
2. Run with `npm start` (or `node server.js`)

This will run it as a server listening for requests at localhost:3000

## Docker

Instead of running it locally you can use it in the form of a docker image.

Build the Docker image:
`docker build -t fantastic-form-backend .`

See your images:
`sudo docker images`

Save the docker image:
`sudo docker save -o fantastic-form-backend.tar fantastic-form-backend:latest`

Run the Docker container:
`docker run -p 3000:3000 -d fantastic-form-backend`

