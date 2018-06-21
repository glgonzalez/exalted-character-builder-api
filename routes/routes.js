var appRouter = function (app) {
    app.get("/", function(req, res) {
        res.status(200).send("Welcome to our restful API");
    });

    app.get("/user", function (req, res) {
        res.json([{
            id: 1,
            username: "samsepi0l"
        }, {
            id: 2,
            username: "D0loresH4ze"
        }]);
    });
}
  
module.exports = appRouter;