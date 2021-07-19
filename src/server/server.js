const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/users', function(request, response) {
    if(!request.body) return response.sendStatus(400);
    const users = require('./data/users.json');

    if(Object.keys(request.query).length === 0) {
        const fileName = path.resolve(__dirname, "./data/users.json");
        response.sendFile(fileName, {});
        return;
    }

    const {username, password} = request.query;
    const user = users.filter(user => user.username === username && user.password === password);

    if(!users) {
        response.status(500).send('username didnt found');
    }

    response.end(JSON.stringify(user, null, '  '));
});

app.get('/todos', function(request, response) {
    if(!request.body) return response.sendStatus(400);
    const todos = require('./data/todos.json');

    if(Object.keys(request.query).length === 0) {
        const fileName = path.resolve(__dirname, "./data/todos.json");
        response.sendFile(fileName, {});
        return;
    }

    const {userId} = request.query;
    const userTodos = todos.filter(todo => todo.userId == userId);

    response.end(JSON.stringify(userTodos, null, '  '));
});

const port = 1337;
app.listen(port, () => console.log(`Node js server started on port ${port}!`));