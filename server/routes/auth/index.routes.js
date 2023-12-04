module.exports = { 
    configure(app) {
        app.use("/api/auth", require("./auth.routes"));
    }
}