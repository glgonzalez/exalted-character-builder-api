"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const session = require("express-session");
const routes = require("./routes");
// Creates and configures an ExpressJS web server.
class App {
    //Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }
    // Configure Express middleware.
    middleware() {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.set('trust proxy', 1);
        this.express.use(session({
            secret: 'exaltedapisecret',
            resave: false,
            saveUninitialized: false,
            cookie: {
                expires: true,
                secure: 'auto'
            }
        })); // session secret
    }
    // Configure API endpoints.
    routes() {
        /* This is just to get up and running, and to make sure what we've got is
         * working so far. This function will change when we start to add more
         * API endpoints */
        let router = express.Router();
        // placeholder route handler
        router.get('/', (req, res, next) => {
            res.json({
                message: 'Welcome to the Exalted API'
            });
        });
        this.express.use('/', router);
        this.express.use('/api/v1/abilities', routes.AbilitiesRouter);
        this.express.use('/api/v1/attributes', routes.AttributeRouter);
        this.express.use('/api/v1/charms', routes.CharmsRouter);
        this.express.use('/api/v1/equipment', routes.EquipmentRouter);
        this.express.use('/api/v1/flaws', routes.FlawsRouter);
        this.express.use('/api/v1/intimacies', routes.IntimacyRouter);
        this.express.use('/api/v1/merits', routes.MeritRouter);
        this.express.use('/api/v1/users', routes.UserRouter);
    }
}
exports.default = new App().express;
