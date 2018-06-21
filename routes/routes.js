const pg = require('pg');
const db = new pg.Pool({
    user: 'gilli',
    host: 'localhost',
    database: 'exaltedcb',
    port: '5432'
});

var appRouter = function (app) {
    app.get("/", function(req, res) {
        res.status(200).send("Welcome to our restful API");
    });

    app.get("/user", function (req, res) {
        db.query('select* from users', (err, response) => {
            if (response) {
                res.json(response.rows);
            } else {
                console.log("ERROR: ", err);
            }
        });
    });
}
  
module.exports = appRouter;