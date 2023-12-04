const UsersModel = require("../../models/Users");
const config = require("config");
const bcrypt = require("bcryptjs");
const handler = require("../../utils/responseHendler");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const UserRolesModel = require("../../models/UserRoles");
const ObjectId = require("mongoose").Types.ObjectId;

exports.signup = async(req, res) => {
    try{
        const {login, email, password, telegram, gender } = req.body;
        const active = false;
        const userRoleId = false;
        const checkUser = await UsersModel.findOne({ email });
        const checkLogin = await UsersModel.findOne({ login });
        const token = config.get("TOKEN_BOT");
        
        if (!login && !password && !email){
            return res.status(500).json("notDataAutorization");
        }

        if (!!password){
            if(password.trim().length < 8){
                return handler.errorMessage(res, "shortPassword");
            }
        }else{
            //return res.status(500).json("enterPassword");
            return handler.errorMessage(res, "enterPassword");
        }

        if (email.trim().length <= 0){
            return handler.errorMessage(res, "enterEmail");
        }

        if (login.trim().length <= 0){
            return handler.errorMessage(res, "loginNotCorrect");
        }

        if(!validator.isEmail(email)) {
            return handler.errorMessage(res, "emailNotCorrect");
        }

        if(!validator.isEmail(email)) {
            return handler.errorMessage(res, "emailNotCorrect");
        }

        if(checkLogin) {
            return handler.errorMessage(res, "enterAnotherLogin");
        }

        if(checkUser){
            return handler.errorMessage(res, "registrationError");
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        let defaultRole = await UserRolesModel.findOne({ name: "Client" });

        const user = new UsersModel({
            email,
            login,
            password: hashedPassword,
            telegram,
            gender,
            userRoleId: userRoleId ? userRoleId : defaultRole._id,
            userStatus: {
                name: "NOT_SUCCESS",
                description: "Not success",
            },
            active
        })
        await user.save()
        return handler.positiveResponse(res,{message: "successRegistration"},req);
    }
    catch(e){
      console.log("error", e);
      return handler.negativeResponse(res, { message: "Error!" });
    }
};

exports.login = async(req, res) => {
    try{
        const {login, password} = req.body;

        if(login.length <= 0 || password.length <= 0){
            return handler.errorMessage(res, "Short login!");
        }

        const user = await UsersModel.findOne({ login })
        .populate({path:"userRoleId", select:"name"})
        .select("userStatus active login password userRoleId");
        console.log("🚀 user:", user)

        if(!user){
            return handler.errorMessage(res, "notFound");
        }

        if (!user.active) {
            return handler.errorMessage(res, 'notSuccess');
        }

        const isMatchPassword = await bcrypt.compare(password, user.password);
        if(!isMatchPassword){
            return handler.errorMessage(res, "passwordWrong");
        }

        const token = jwt.sign({userId: user._id, role: user.userRoleId.name, teamIds: user.teamIds}, config.get("JWR_TOKEN"))
        const permissions = await UserRolesModel.findById(user.userRoleId).select(
            "permissions"
        );

        req.session.user = {
            id: user._id,
            login: user.login,
            permissions: permissions.permissions,
            teamIds: user.teamIds  
        }

        return handler.positiveResponse(res, { token, permissions, userInfo: { login: user.login} }, req);
    }   
    catch(e){
        console.log("error", e);
        return handler.negativeResponse(res, "Error!");

    }
};

exports.checkSession = (req, res) => {
    return handler.positiveResponse(res, req.session);
};