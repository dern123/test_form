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
    userRoleId:     {type: Types.ObjectId, ref: "user_roles"},
    country:        {type: String},
    gender:         {type: String},
    telegram:       {type: String},
    teamIds:         [{
        teamId:           {type: Types.ObjectId, ref: "Teams"},
        accepted:         {type: Boolean, default: false},
        createdAt:        {type: Date, default: new Date()},
    }],
    imgServerPath:  {type: String, trim: true, default: ""},
    acceptEmail:    {type: Boolean, required: true, default: false},
    trackerUrl:     {type: String, default: null}
}, { timestamps: true });

schema.plugin(autoIncrement.plugin, { model: 'Users', field: 'id' });

module.exports = model("Users", schema);
