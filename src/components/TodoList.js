import React from "react";
import TodoUnit from "./TodoUnit";
import "../style/style.css";
import TodoAdd from "./TodoAdd";

class TodoList extends React.Component {

    state = {
        todos: []
    };

    async componentDidMount() {
        const todosUrl = `http://localhost:1337/todos?userId=${this.props.userId}`;
        const requestResult = await fetch(todosUrl);
        const todos = await requestResult.json();
        this.setState({todos});
    }

    handleLoginClick = () => {
        const {handleLoginClick} = this.props;
        handleLoginClick(false);
    };

    toggleCompleted = id => {
        const todos = [...this.state.todos];
        const todo = todos.filter(todo => todo.id === id)[0];
        const index = todos.map(function(e) { return e.id; }).indexOf(id);
        todo.completed = !todo.completed;
        todos[index] = todo;
        this.setState({todos});
    };

    addTodo = todo => {
        const todos = [...this.state.todos];

        todos.push({
            id: todos.length !==0 ? todos[todos.length-1].id + 1 : 0,
            title: todo,
            completed: false
        });

        this.setState({todos});
    };

    deleteTodo = id => {
        this.setState({
            todos: this.state.todos.filter(todo => todo.id !== id)
        })
    };

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
                            deleteTodo={() => this.deleteTodo(todo.id)}
                        />)}
                </ul>
            </div>
        );
    }
}

export default TodoList;
