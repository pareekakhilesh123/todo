import React, { useState } from 'react';
import './TodoApp.css';

function TodoApp() {
  const [inputValue, setInputValue] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (inputValue.trim() && tasks.length < 6) {
      const currentdate = new Date();
      setTasks([...tasks, { text: inputValue, completed: false, dateTime: currentdate }]);
      setInputValue('');
    }
  };

  const deleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
 };

  const toggleTaskCompletion = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter')
      addTask();
  };

  return (
    <div className="todo-app">
      <h1>To-Do List</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Add a new task"
          value={inputValue}
          id="txtSearch"
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ul className="task-list">
        {tasks.map((item, index) => (
          <li key={index} className="task">
            <span
              onClick={() => toggleTaskCompletion(index)}
              className={item.completed ? "strick" : ""}
            >
              {item.text}
            </span>
            <span>{item.dateTime.toLocaleString()}</span>
            <button onClick={() => deleteTask(index)} >Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
