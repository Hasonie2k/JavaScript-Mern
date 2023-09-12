import React from "react";

const Display = ({ todoList, handleCompleted, deleteButton }) => {
return (
    <>
    {todoList.map((todo, index) => (
        <div key={todo.id}>
        <p className={todo.isComplete ? "completed" : ""}>{todo.content}</p>
        <input
            type="checkbox"
            onChange={() => handleCompleted(todo)}
        />
        <button onClick={() => deleteButton(todo.id)}>Delete</button>
        </div>
    ))}
    </>
);
};

export default Display;
