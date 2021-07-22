import React from "react";
import TodoUnit from "./TodoUnit";
import "../style/style.css";
import TodoAdd from "./TodoAdd";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

class TodoList extends React.Component {

    state = {
        todos: []
    };

    async componentDidMount() {
        await this.updateTodos();
    };

    updateTodos = async () => {
        const todosUrl = `http://localhost:1337/todos?userId=${this.props.userId}`;
        const requestResult = await fetch(todosUrl);
        const todos = await requestResult.json();
        this.setState({todos});
    };

    handleLoginClick = () => {
        const {handleLoginClick} = this.props;
        handleLoginClick(false);
    };

    toggleCompleted = async id => {
        const todos = [...this.state.todos];
        const todo = todos.filter(todo => todo.id === id)[0];
        todo.completed = !todo.completed;

        await fetch('http://localhost:1337/todos', {
            method: 'PUT',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(todo)
        });

        await this.updateTodos();
    };

    addTodo = async todo => {
        const id = await this.getLastId();
        const newTodo = {
            userId: this.props.userId,
            id: id,
            title: todo,
            completed: false
        };

        await fetch('http://localhost:1337/todos', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(newTodo)
        });

        await this.updateTodos();
    };

    confirmDeleting = id => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete this todo?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.deleteTodo(id)
                },
                {
                    label: 'No',
                    onClick: () => 1
                }
            ]
        });
    };

    deleteTodo = async id => {
        await fetch('http://localhost:1337/todos', {
            method: 'DELETE',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({id: id})
        });

        await this.updateTodos();
    };

    getLastId = async () => {
        const todosUrl = 'http://localhost:1337/todos';
        const requestResult = await fetch(todosUrl);
        const todos = await requestResult.json();
        return todos[todos.length - 1]['id'] + 1;
    }

    render() {
        const {todos} = this.state;
        const activeTodos = todos.filter(todo => !todo.completed);
        const completedTodos = todos.filter(todo => todo.completed);

        return (
            <div className="overflowScroll">
                <div className="header">
                    <button className="btn btn-primary btn-block btn-large logoutBtn" onClick={this.handleLoginClick}>Logout</button>
                    <h2>My To Do List</h2>
                    <TodoAdd addTodo={this.addTodo} />
                </div>
                <ul>
                    {[...activeTodos,...completedTodos].map(todo =>
                        <TodoUnit
                            todo = {todo}
                            key={todo.id}
                            toggleCompleted={() => this.toggleCompleted(todo.id)}
                            deleteTodo={() => this.confirmDeleting(todo.id)}
                        />)}
                </ul>
            </div>
        );
    }
}

export default TodoList;
