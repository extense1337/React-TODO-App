const {Schema, model} = require("mongoose");

const schema = new Schema({
    userId: {type: Number, required: true},
    id: {type: Number, required: true, unique: true},
    title: {type: String, required: true},
    completed: {type: Boolean}
}, {collection: "todos", versionKey: false});

module.exports = model("Todo", schema);