const { Schema, model, Types } = require("mongoose");

const schema = Schema({
    model: { type: String, required: true},
    count: { type: Number, default: 0 },
    field: { type: String, required: true},
    }, {
        timestamps: true,
    });

module.exports = model("CounterSchema", schema);