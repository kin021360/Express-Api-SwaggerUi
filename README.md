# Express-Api-SwaggerUi

Node express api server with swagger ui - simple project template

Write your api in original Express project structure with Swagger ui.

## Quick Start

Install the dependencies:

```bash
npm install
```

Start the server:

```bash
npm start
```

Access the server:

```
Swagger ui -> http://localhost:8099/swagger/ui/
Swagger spec -> http://localhost:8099/swagger/swagger.json
Sample api (JSON, require api key) -> http://localhost:8099/api/status
Sample api (HTML, without api key) -> http://localhost:8099/api/statusNoKey
Sample api key authorization of api_key: 123456
```

## What's used

- [Express](https://github.com/expressjs/express) - Express sever version 4
- [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc) - Write your api code and swagger doc at the same time in .js files.
- [Swagger UI](https://github.com/swagger-api/swagger-ui) - Swagger UI version 2.1.5 (customized)

## Example using swagger-jsdoc

Please checkout the docs from [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc/blob/master/docs/GETTING-STARTED.md) first.

In `/routes/api.js`

```javascript
/**
 * @swagger
 * tags:
 *   name: Status
 *   description: System Status
 */

/**
 * @swagger
 * /api/status:
 *   get:
 *     tags:
 *      - Status
 *     description: System Status
 *     responses:
 *       200:
 *         description: System Status
 */
router.get("/status", checkApiKey, function (req, res) {
    // code implementation
});
```

## Node.js Load Balancing

### PM2

[PM2](https://github.com/Unitech/pm2) - Process manager for Node.js applications.

Recommended to use pm2 if possible. pm2 can monitor and restart the process if the process was dead.

### cluster

Please see commented section "Using cluster" in `/bin/www`

## Docker Compose (With integrated nginx on same image)

Build docker image:
```bash
docker-compose build
```

Start a container:
```bash
docker-compose up
# start in detached mode
docker-compose up -d
```

Stop the container:
```bash
docker-compose stop
```

## Docker Compose (Separated nodejs and nginx containers)

Build docker image:
```bash
docker-compose -f docker-compose_separated.yml build
```

Start a container:
```bash
docker-compose -f docker-compose_separated.yml up
# start in detached mode
docker-compose -f docker-compose_separated.yml up -d
```

Stop the container:
```bash
docker-compose -f docker-compose_separated.yml stop
```