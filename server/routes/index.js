module.exports = (app) => { 
    require('./user/user.routes')(app);
    return app;
}