var pgp = require('pg-promise');
const cn = 'postgresql://gilli@localhost:5432/exaltedcb';
var db = pgp(cn);
var appRouter = function (app) {
    app.get("/", function(req, res) {
        res.status(200).send("Welcome to our restful API");
    });

    app.get("/user", function (req, res) {
        db.any('select* from users').then(function(data) {
            res.json(data);
        }).catch(function(err) {
            console.log('ERROR:', err);
        });
    });
}
  
module.exports = appRouter;