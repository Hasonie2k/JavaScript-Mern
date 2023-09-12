const Display = (props) => {

    const { todoList, handleCompleted, deleteButton } = props;

    return (
    <>

        {
        todoList.map((todo, index) => (
        <div key={todo.id}>
            <p className={todo.isComplete? "completed" : ""}>{todo.content}</p>
            <input type="checkbox" onChange={() => handleCompleted(todo)} />
            <button onClick={() => deleteButton(todo.id)}>Delete</button>
        </div>
        ))
        }

    </>
    );
};

export default Display;