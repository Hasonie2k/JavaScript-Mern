import { useState } from "react";
import "./App.css";
import Form from "./components/Form";
import Display from "./components/Display";

function App() {

const [todoList, setTodoList] = useState([]);

const updateTodoList = (newTodo)=>{
    setTodoList((prevTodo)=>(
    [...prevTodo, newTodo]
    ))
}

  //Function to handle style change when the checkbox is clicked
const handleCompleted = (todoFromBelow) => {

    let updateTodos = todoList.map((todo) => {
    if (todo === todoFromBelow) {
        //Creating a new object to hold the updated values instead of modifying the existing object:
        let newTodo = { ...todo}
        newTodo.isComplete = !todo.isComplete;
        //Alternatively, we can update the copies preoperty in one line:
          // let newTodo = { ...todo, isComplete: !todo.isComplete }
        return newTodo;
    }
    else {
        return todo;
    }
    })
    setTodoList(updateTodos);
}

  //Delete functionality
const deleteButton = (idFromBelow) => {

    const filteredTodos = todoList.filter((todo) => {
    return todo.id !== idFromBelow;
    });

    setTodoList(filteredTodos);

};

return (
    <div className="App">
    <Form
        updateTodoList={updateTodoList}
    />
    <Display todoList={todoList} handleCompleted={handleCompleted} deleteButton={deleteButton}/>
    </div>
);
}

export default App;