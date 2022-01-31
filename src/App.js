// import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";

function App() {
  const [activity, setactivity] = useState("");
  const [edit, setedit] = useState("");
  const [todos, setTodos] = useState([]);

  function generateID() {
    return Date.now();
  }

  function saveTodoHandler(e) {
    e.preventDefault();

    if (edit.id) {
      const updatedTodo = {
        id: edit.id,
        activity,
      };

      const editTodoIndex = todos.findIndex((todo) => {
        return todo.id === edit.id;
      });

      const updatedTodos = [...todos];
      updatedTodos[editTodoIndex] = updatedTodo;

      setactivity("");

      return setTodos(updatedTodos);
    }

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
  function editTodoHandler(todo) {
    setactivity(todo.activity);
    setedit(todo);
  }
  return (
    <>
      <h1>Simple Todo List</h1>
      <form onSubmit={saveTodoHandler}>
        <input
          type="text"
          placeholder="input todo"
          value={activity}
          onChange={(e) => {
            setactivity(e.target.value);
          }}
        />
        <button type="submit">{edit.id ? "simpan" : "tambah"}</button>
      </form>
      <ul>
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              {todo.activity}
              <button onClick={editTodoHandler.bind(this, todo)}>Edit</button>
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
