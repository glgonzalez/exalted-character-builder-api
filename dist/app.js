"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const session = require("express-session");
const routes = require("./routes");
class App {
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }
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
        }));
    }
    routes() {
        let router = express.Router();
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
