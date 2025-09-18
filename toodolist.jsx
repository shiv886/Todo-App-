import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./todo.css"; // Import CSS file

export default function Todolist() {

  let getInitialTodos = () => {
    let savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  };

  let [todos, settodos] = useState(getInitialTodos);
  let [newTOdo, setnewTodo] = useState("");

 
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  let addnewTask = () => {
    if (newTOdo.trim() === "") return; // prevent empty task
    settodos([...todos, { id: uuidv4(), task: newTOdo, isDone: false }]);
    setnewTodo("");
  };

  let Updatenewtodo = (event) => {
    setnewTodo(event.target.value);
  };

  let deletetask = (id) => {
    let updatedtodos = todos.filter((todo) => todo.id !== id);
    settodos(updatedtodos);
  };

  let markasdoneAll = () => {
    settodos(
      todos.map((todo) => ({
        ...todo,
        isDone: true,
      }))
    );
  };

  let markasdone = (id) => {
    settodos(
      todos.map((todo) =>
        todo.id===id ? { ...todo, isDone: true } : todo
      )
    );
  };

  return (
    <div className="todo-container">
      <h2>To-Do App</h2>
      <input
        className="todo-input"
        placeholder="Add a task"
        value={newTOdo}
        onChange={Updatenewtodo}
      />
      <button className="add-btn" onClick={addnewTask}>
        Add
      </button>

      <h4>Task to do</h4>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span style={todo.isDone ? {textDecoration: "line-through"} : {}}>
              {todo.task}
            </span>
            <div>
              <button onClick={()=>deletetask(todo.id)}>Delete</button>
              &nbsp;&nbsp;
               <button onClick={()=>markasdone(todo.id)}>Mark as done</button>
            </div>
          </li>
        ))}
      </ul>
      {todos.length > 0 && (
        <button className="mark-all-btn" onClick={markasdoneAll}>
          Mark all as done
        </button>
      )}
    </div>
  );
}



