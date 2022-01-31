// import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";

function App() {
  const [activity, setactivity] = useState("");
  const [edit, setedit] = useState({});
  const [todos, setTodos] = useState([]);
  const [massage, setmassage] = useState("");

  function generateID() {
    return Date.now();
  }

  function saveTodoHandler(e) {
    e.preventDefault();

    if (!activity) {
      return setmassage("Tolong Isi Todo");
    }
    setmassage("");

    if (edit.id) {
      const updatedTodo = {
        ...edit,
        activity,
      };

      const editTodoIndex = todos.findIndex((todo) => {
        return todo.id === edit.id;
      });

      const updatedTodos = [...todos];
      updatedTodos[editTodoIndex] = updatedTodo;

      setTodos(updatedTodos);

      return cancelEdit();
    }

    setTodos([
      ...todos,
      {
        id: generateID(),
        activity,
        done: false,
      },
    ]);
    setactivity("");
  }

  function removeTodoHandler(todoId) {
    const filterTodo = todos.filter((todo) => {
      return todo.id !== todoId;
    });
    setTodos(filterTodo);
    cancelEdit();
  }
  function editTodoHandler(todo) {
    setactivity(todo.activity);
    setedit(todo);
  }
  function cancelEdit() {
    setedit({});
    setactivity("");
  }
  function doneTodoHandler(todo) {
    const updatedTodo = {
      ...todo,
      done: todo.done ? false : true,
    };
    const editTodoIndex = todos.findIndex((currentTodo) => {
      return currentTodo.id === todo.id;
    });

    const updatedTodos = [...todos];
    updatedTodos[editTodoIndex] = updatedTodo;

    setTodos(updatedTodos);
  }
  return (
    <>
      <h1>Simple Todo List</h1>
      {massage && <span style={{ color: "red" }}>{massage}</span>}
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
        {edit.id && <button onClick={cancelEdit}>Batal</button>}
      </form>
      {todos.length > 0 ? (
        <ul>
          {todos.map((todo) => {
            return (
              <li key={todo.id}>
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={doneTodoHandler.bind(this, todo)}
                />
                {todo.activity}({todo.done ? "Selesai" : "Belum Selesai"})
                <button onClick={editTodoHandler.bind(this, todo)}>Edit</button>
                <button onClick={removeTodoHandler.bind(this, todo.id)}>
                  Hapus
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <i>Tidak ada Todo</i>
      )}
    </>
  );
}

export default App;
