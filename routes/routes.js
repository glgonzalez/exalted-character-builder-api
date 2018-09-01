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

    app.get("/login", function(req, res) {
        db.query('SELECT * FROM users WHERE username="' + req.username + '" AND password = crypt("' + req.password + '", password)', (err, response) => {
            if (response) {
                res.json(response.rows);
            } else {
                console.error(err);
            }
        });
    });

    app.get("/sign-up", function(req, res) {
        const values = [req.email, req.first_name, req.last_name, req.username, req.password];
        db.query(`insert into users 
            (
                email, 
                first_name, 
                last_name, 
                username, 
                password
            ) 
            values(
                $1, 
                $2, 
                $3, 
                $4, 
                crypt($5, gen_salt('bf', 8))
            )`, values, (err, response) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(200);
                }
            });
    });


}
  
module.exports = appRouter;