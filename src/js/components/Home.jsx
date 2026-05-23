
import React, { useState, useEffect } from "react";

const USERNAME = "Enrique";

function Home() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  function loadTasks() {
    fetch(`https://playground.4geeks.com/todo/users/${USERNAME}`)
      .then(resp => {
        if (resp.status === 404) {
          return fetch(`https://playground.4geeks.com/todo/users/${USERNAME}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" }
          }).then(() => fetch(`https://playground.4geeks.com/todo/users/${USERNAME}`));
        }
        return resp;
      })
      .then(resp => resp.json())
      .then(data => setTodos(data.todos))
      .catch(error => console.log(error));
  }

  useEffect(() => {
    loadTasks();
  }, []);

  function handleKeyDown(e) {
    if (e.key === "Enter" && task.trim() !== "") {
      fetch(`https://playground.4geeks.com/todo/todos/${USERNAME}`, {
        method: "POST",
        body: JSON.stringify({ label: task, is_done: false }),
        headers: { "Content-Type": "application/json" }
      })
        .then(resp => resp.json())
        .then(() => {
          loadTasks();
          setTask("");
        })
        .catch(error => console.log(error));
    }
  }

  function handleDelete(id) {
    fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
      method: "DELETE"
    })
      .then(() => loadTasks())
      .catch(error => console.log(error));
  }

  function clearAll() {
    fetch(`https://playground.4geeks.com/todo/users/${USERNAME}`, {
      method: "DELETE"
    })
      .then(() => loadTasks())
      .catch(error => console.log(error));
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
        {todos.map(function(todo) {
          return (
            <li key={todo.id} className="todo-item">
              <span>{todo.label}</span>
              <button onClick={() => handleDelete(todo.id)} className="delete-btn">x</button>
            </li>
          );
        })}
      </ul>
      <button onClick={clearAll}>Limpiar todo</button>
    </div>
  );
}

export default Home;
