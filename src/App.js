// import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";

function App() {
  const [activity, setactivity] = useState("");
  const [todos, setTodos] = useState([]);

  function generateID() {
    return Date.now();
  }

  function addTodoHandler(e) {
    e.preventDefault();

    setTodos([
      ...todos,
      {
        id: generateID(),
        activity,
      },
    ]);
    setactivity("");
  }

  function removeTodoHandler(todoId) {
    const filterTodo = todos.filter((todo) => {
      return todo.id !== todoId;
    });
    setTodos(filterTodo);
  }
  return (
    <>
      <h1>Simple Todo List</h1>
      <form onSubmit={addTodoHandler}>
        <input
          type="text"
          placeholder="input todo"
          value={activity}
          onChange={(e) => {
            setactivity(e.target.value);
          }}
        />
        <button type="submit">Tambah</button>
      </form>
      <ul>
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              {todo.activity}
              <button onClick={removeTodoHandler.bind(this, todo.id)}>
                Hapus
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default App;
