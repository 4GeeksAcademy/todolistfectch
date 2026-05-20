import React, { useState } from "react";

function Home() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  function handleKeyDown(e) {
    if (e.key === "Enter" && task.trim() !== "") {
      setTodos([...todos, task]);
      setTask("");
    }
  }

  function handleDelete(index) {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  }

  return (
    <div className="container">
      <h1>Todos</h1>
      <input
        type="text"
        placeholder="¿Qué necesitas hacer?"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <ul>
        {todos.length === 0 && <li className="empty">free time</li>}
        {todos.map(function(todo, index) {
          return (
            <li key={index} className="todo-item">
              <span>{todo}</span>
              <button onClick={() => handleDelete(index)} className="delete-btn">x</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Home