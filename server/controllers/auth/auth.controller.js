const UsersModel = require("../../models/Users");
const config = require("config");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const handler = require("../../utils/responseHendler");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const CounterSchemaModel = require("../../models/CounterSchema");
const ObjectId = require("mongoose").Types.ObjectId;

async function mailer(email){
    try{
    const userEmail = email;

    // Налаштування Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'mail@gmail.com',
        pass: 'pass',
      },
    });

    // Відправлення електронного листа
    const mailOptions = {
      from: 'mail@gmail.com',
      to: userEmail,
      subject: 'Ви успішно зареєстровані',
      text: 'Вітаємо! Ви успішно зареєстровані у нашому додатку.',
    };

    await transporter.sendMail(mailOptions);

  } catch (error) {
    console.error('Помилка реєстрації:', error);
  }
}
exports.signup = async(req, res) => {
    try{
        const {login, email, name, password, telegram, gender } = req.body;

        const active = false;
        const userRoleId = false;
        const checkUser = await UsersModel.findOne({ email });
        const checkLogin = await UsersModel.findOne({ login });
        const userAll = (await UsersModel.find()).length-1;
        console.log("🚀 ~ file: auth.controller.js:20 ~ exports.signup=async ~ userAll:", userAll)
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
        
        const user = new UsersModel({
            email,
            login,
            fullName: name,
            password: hashedPassword,
            telegram,
            gender,
            userStatus: {
                name: "NOT_SUCCESS",
                description: "Not success",
            },
            active,
            id: userAll
        })
        mailer(email);
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
        .select("userStatus active login password ");

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

        const token = jwt.sign({userId: user._id}, config.get("JWR_TOKEN"))


        req.session.user = {
            id: user._id,
            login: user.login,
        }

        return handler.positiveResponse(res, { token, userInfo: { login: user.login} }, req);
    }   
    catch(e){
        console.log("error", e);
        return handler.negativeResponse(res, "Error!");

    }
};

exports.checkSession = (req, res) => {
    return handler.positiveResponse(res, req.session);
};