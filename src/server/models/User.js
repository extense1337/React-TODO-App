const {Schema, model} = require("mongoose");

const schema = new Schema({
    id: {type: Number, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
}, {collection: "users", versionKey: false});

module.exports = model("User", schema);