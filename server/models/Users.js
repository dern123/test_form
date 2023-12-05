const { Schema, model, Types } = require("mongoose");


const schema = new Schema({
    fullName:       {type: String},
    email:          {type: String, required: true, unique: true },
    login:          {type: String, default: ''},
    password:       {type: String, required: true },
    userStatus:     {
        name:         {type: String},
        description:  {type: String},
        createdAt:    {type:Date, default: new Date()},
        updatedAt:    {type:Date, default: new Date()},
    },
    active:         {type: Boolean},
    country:        {type: String},
    gender:         {type: String},
    telegram:       {type: String},
    imgServerPath:  {type: String, trim: true, default: ""},
    acceptEmail:    {type: Boolean, required: true, default: false},
    id:             {type: Number}
}, { timestamps: true });

module.exports = model("Users", schema);
