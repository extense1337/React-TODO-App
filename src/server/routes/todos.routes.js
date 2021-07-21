const {Router} = require("express")
const router = Router();
const Todo = require("../models/Todo");

// Simple /todos to get all todos +
// Parameterized /todos to get todos by userId
router.get('/', async (request, response) => {
    try {
        if(Object.keys(request.query).length === 0) {
            const todos = await Todo.find();
            return response.end(JSON.stringify(todos, null, '  '));
        }

        const {userId} = request.query;
        const userTodos = await Todo.find({userId: userId});

        response.end(JSON.stringify(userTodos, null, '  '));

    } catch (e) {
        response.status(500).json({message: 'Todo adding is failed'});
    }
});

// Post /todos to add todo
router.post('/', async (request, response) => {
    try {
        const {userId, id, title, completed} = request.body;

        const possibleTodo = await Todo.findOne({id: id});

        if (possibleTodo) {
            return response.status(400).json({message: "Todo id is already exists"})
        }

        const newTodo = new Todo({
            userId: userId,
            id: id,
            title: title,
            completed: completed
        });

        await newTodo.save();

        response.status(201).json({message: "Todo added"});

    } catch (e) {
        response.status(500).json({message: 'Todo adding is failed'});
    }
});

// Post /users to add users from array || Created to initialize data
router.post('/todosArrayInit', async (request, response) => {
    try {
        const todos = request.body;

        for (const todo of todos) {
            const {userId, id, title, completed} = todo;

            const possibleTodo = await Todo.findOne({id: id});

            if (possibleTodo) {
                return response.status(400).json({message: "Todo id is already exists"})
            }

            const newTodo = new Todo({
                userId: userId,
                id: id,
                title: title,
                completed: completed
            });

            await newTodo.save();
        }
        response.status(201).json({message: "Todos added to database"});

    } catch (e) {
        response.status(500).json({message: 'User adding is failed'});
    }
});

module.exports = router;