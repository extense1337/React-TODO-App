const {Router} = require("express")
const router = Router();
const Todo = require("../models/Todo");

// GET: Simple /todos to get all todos +
// GET: Parameterized /todos to get todos by userId
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
        response.status(500).json({message: 'Todo adding is failed!'});
    }
});

// POST: /todos to add todо
router.post('/', async (request, response) => {
    try {
        const {userId, id, title, completed} = request.body;

        if (!id) return response.status(400).json({message: "Wrong id!"});

        const possibleTodo = await Todo.findOne({id: id});

        if (possibleTodo) {
            return response.status(400).json({message: "Todo id is already exists!"});
        }

        const newTodo = new Todo({
            userId: userId,
            id: id,
            title: title,
            completed: completed
        });

        await newTodo.save();

        response.status(201).json({message: 'Todo added'});

    } catch (e) {
        response.status(500).json({message: 'Todo adding is failed!'});
    }
});

// DELETE: /todos to delete todо from database
router.delete('/', async (request, response) => {
    try {
        const {id} = request.body;

        await Todo.findOneAndDelete({id: id}, function (err, doc) {
            if (err) return response.send(500).json({error: err});
            return response.status(201).json({message: 'Todo successfully deleted.'});
        });
    } catch (e) {
        response.status(500).json({message: 'Todo deleting is failed!'});
    }
});

// PUT: /todos to update todо
router.put('/', async (request, response) => {
    try {
        const {userId, id, title, completed} = request.body;

        if (!title) return response.status(500).json({message: 'Todos new title is empty or undefined!'});

        await Todo.replaceOne({ id }, {
            userId: userId,
            id: id,
            title: title,
            completed: completed
        });

        response.status(200).json({message: 'Todo successfully updated.'});

    } catch (e) {
        response.status(500).json({message: 'Todo updating is failed!'});
    }
});

// POST: /users to add users from array || Created to initialize data
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