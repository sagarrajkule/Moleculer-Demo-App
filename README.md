

# Moleculer-Demo-App
This is a [Moleculer]-based microservices project. Generated with the [Moleculer CLI]
This example demonstrates a basic setup for your Moleculer service along with CI/CD configuration using Jenkins.

## Usage
Start the project with `npm run dev` command. 
After starting, open the http://localhost:3000/ URL in your browser. 
On the welcome page you can test the generated services via API Gateway and check the nodes & services.

In the Browser or REST client, try the following URLs:
- http://localhost:3000/api/universities - Call the `university.list` action.
- http://localhost:3000/api/universities?state=New%20South%20Wales - Call the `university.list` action with the `state` parameter.


## Services
- **api**: API Gateway services
- **university**: University service with `list` action.


## NPM scripts

- `npm run dev`: Start development mode (load all services locally with hot-reload & REPL)
- `npm run start`: Start production mode (set `SERVICES` env variable to load certain services)
- `npm run cli`: Start a CLI and connect to production. Don't forget to set production namespace with `--ns` argument in script
- `npm run lint`: Run ESLint
- `npm run ci`: Run continuous test mode with watching
- `npm test`: Run tests & generate coverage report
- `npm run dc:up`: Start the stack with Docker Compose
- `npm run dc:down`: Stop the stack with Docker Compose
