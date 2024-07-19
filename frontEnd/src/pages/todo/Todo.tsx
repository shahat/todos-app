import React, { useState, useEffect, FormEvent } from "react";

interface Todo {
  _id: string;
  task: string;
  status: string;
}

const Todo = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    // Fetch todos from the API when the component mounts
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    // Replace with your API call
    const response = await fetch("/api/todos", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data: Todo[] = await response.json();
    setTodos(data);
  };

  const addTodo = async (e: FormEvent) => {
    e.preventDefault();
    // Replace with your API call
    const response = await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ task }),
    });
    const newTodo: Todo = await response.json();
    setTodos([...todos, newTodo]);
    setTask("");
  };

  const updateStatus = async (id: string, status: string) => {
    // Replace with your API call
    const response = await fetch(`/api/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ status }),
    });
    const updatedTodo: Todo = await response.json();
    setTodos(todos.map(todo => (todo._id === id ? updatedTodo : todo)));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <h1 className="mb-4 text-xl font-bold">To-Do List</h1>
        <form onSubmit={addTodo} className="mb-4">
          <input
            type="text"
            className="w-full px-3 py-2 border rounded"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="New task"
            required
          />
          <button type="submit" className="w-full py-2 mt-2 text-white bg-blue-500 rounded">Add Task</button>
        </form>
        <ul>
          {todos.map(todo => (
            <li key={todo._id} className="mb-2">
              <div className="flex justify-between">
                <span>{todo.task}</span>
                <select
                  value={todo.status}
                  onChange={(e) => updateStatus(todo._id, e.target.value)}
                  className="px-2 py-1 border rounded"
                >
                  <option value="todo">To Do</option>
                  <option value="doing">Doing</option>
                  <option value="finished">Finished</option>
                </select>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
