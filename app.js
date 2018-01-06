'use strict';
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const accessLogger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const app = express();

/**
 * Express setup
 * You should consider the config setup order.
 * Wrong setup order may produce unexpected result.
 */
// region basic setup
// Set running environment
app.set("env", "dev");

// Use web security
app.use(helmet());

// Use logger for access log
app.use(accessLogger('dev'));

// Use bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Use cookieParser
app.use(cookieParser());

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// Use public static folder
app.use(express.static(path.join(__dirname, 'public')));

// CORS config, or use cors middleware module
// app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', 'https://localhost');
//     res.header('Access-Control-Allow-Methods', 'GET');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// });
// endregion

/**
 * Custom route setup
 */
const api = require("./routes/api.js");
app.use("/api", api);

const swaggerJSDoc = require('swagger-jsdoc');
const unAuthorizedSwaggerDef = {
    info: {
        title: 'Unauthorized',
        version: '1.0.0',
        description: 'Please authorize with api key.'
    },
    host: 'localhost:8099',
    basePath: '/',
    securityDefinitions: {
        "api_key": {
            "type": "apiKey",
            "name": "api_key",
            "in": "header"
        }
    }
};

const authorizedSwaggerDef = {
    info: {
        title: 'Node Swagger API',
        version: '1.0.0',
        description: 'Demonstrating how to describe a RESTful API with Swagger'
    },
    host: 'localhost:8099',
    basePath: '/',
    securityDefinitions: {
        "api_key": {
            "type": "apiKey",
            "name": "api_key",
            "in": "header"
        }
    }
};

// options for the swagger docs
const swaggerDocOptions = {
    swaggerDefinition: authorizedSwaggerDef,
    apis: ['./routes/api.js']
};

// generate swagger doc
const unAuthorizedSpec = JSON.stringify(swaggerJSDoc({swaggerDefinition: unAuthorizedSwaggerDef, apis: []}));
const authorizedSpec = JSON.stringify(swaggerJSDoc(swaggerDocOptions));
app.get('/swagger.json', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    if (req.headers.api_key && req.headers.api_key === "123456") {
        res.send(authorizedSpec);
    } else {
        res.send(unAuthorizedSpec);
    }
});

function checkApiKey(req, res, next) {
    if (req.headers.api_key && req.headers.api_key === "123456") {
        next(); // allow the next route to run
    } else {
        error404(req, res, next);
    }
}

/**
 * Error handler
 */
// region error handler setup
// catch 404 and forward to error handler
function error404(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
}
app.use(error404);

if (app.get('env') === 'dev') {
    // development error handler
    // will print stacktrace
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
} else if (app.get('env') === 'prod') {
    // production error handler
    // no stacktraces leaked to user
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
}
// endregion

module.exports = app;