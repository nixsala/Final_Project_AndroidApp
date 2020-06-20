const { verifySignUp } = require("../middlewares");
const VerifyToken =require('../middlewares/VerifyToken');
const controller = require("../controllers/location.controller");
const verify =require('../middlewares/VerifyUser');

module.exports = function(app) {
    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
        next();
    });

    app.post("/api/location",

        controller.create);
    app.get("/api/location",
        controller.findOne);
    // app.post("/api/auth/resolve",
    //     VerifyToken,
    //     // verify.user,
    //     controller.resolve);
    // app.post(
    //     "/api/auth/signup",
    //
    //     // verifySignUp.checkDuplicateUsernameOrEmail,
    //     // verifySignUp.checkRolesExisted
    //
    //     controller.signup
    // );
    //
    // app.get(
    //     "/api/users",
    //     // verifySignUp.checkDuplicateUsernameOrEmail,
    //     // verifySignUp.checkRolesExisted
    //     controller.findAll
    // );
    // app.get(
    //     "/api/users/:id",
    //     // verifySignUp.checkDuplicateUsernameOrEmail,
    //     // verifySignUp.checkRolesExisted
    //     controller.findOne
    // );

};
