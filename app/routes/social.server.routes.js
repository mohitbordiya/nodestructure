var config = require('../../configs/configs');
var globalMethods = require('../../configs/globals');

module.exports = (app, express)=>{
    var router = express.Router();
    var social = require('../controllers/social.server.controller');

    router.post('/fb', social.fb);
    router.post('/googleSignup', social.googleSignup);

    app.use(config.baseApiUrl, router);
}