import React, { useState } from "react";

const Form = ({ updateTodoList }) => {
const [content, setContent] = useState("");

const submitHandler = (e) => {
    e.preventDefault();
    
    updateTodoList({
    content: content,
    isComplete: false,
      id: Math.floor(Math.random() * 100000000).toString(),
    });
    
    setContent("");
};

return (
    <div className="form">
    <form onSubmit={submitHandler}>
        <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        type="text"
        />
        <br />
        <button>Add</button>
    </form>
    </div>
);
};

export default Form;
