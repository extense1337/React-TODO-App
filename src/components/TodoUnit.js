import React from "react";

const TodoUnit = ({todo, ...props}) => {

    return (
        <li  className={todo.completed ? 'checked': null}>
            <div onClick={props.toggleCompleted}>{todo.title}</div>
            <span className="close" onClick={props.deleteTodo}>×</span>
        </li>
    );
}

export default TodoUnit;