const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const port = 1337;
const mongoUri = "mongodb+srv://extense:zYF-kv8-rc6-6K2@cluster0.clouc.mongodb.net/mernTodoApp_mongoDb?retryWrites=true&w=majority";

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use("/users", require("./routes/users.routes"));
app.use("/todos", require("./routes/todos.routes"));

async function start() {
    try {
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        app.listen(port, () => console.log(`Node js server started on port ${port}!`));

    } catch (e) {
        console.log("Server error", e.message);
        process.exit();
    }
}

start()
