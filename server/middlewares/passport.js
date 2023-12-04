const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const JWT_SECRET = require("config").get("JWR_TOKEN")
const UserModel = require("../models/Users")

var options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET
}

module.exports = passport => {
    passport.use(
        new JwtStrategy(options, async(payload,done) => {
            try{
                const user = await UserModel.findById(payload.userId).select("userRoleId, login")

                if(user){
                    done(null, payload) // null = errors, payload = router
                }else{
                    done(null, false)
                }
            }catch(e){
                console.log(e)
            }
        })
    )
}
