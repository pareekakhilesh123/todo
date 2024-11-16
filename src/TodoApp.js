import React, { useState } from 'react';
import './TodoApp.css';

function TodoApp() {
  const [inputValue, setInputValue] = useState('');
  const [tasks, setTasks] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [sortorder, setSortOrder] = useState('asc');

  const addTask = () => {
    if (inputValue.trim() && tasks.length < 6) {
      const currentdate = new Date();
      const updatedTasks = [
        ...tasks,
        { text: inputValue, completed: false, dateTime: currentdate },
      ];
      const sortedTasks = updatedTasks.sort((a, b) => (a.text > b.text ? 1 : -1));
      setTasks(sortedTasks);
      setInputValue('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') addTask();
  };

  const incompleteTasks = tasks.filter((task) => !task.completed);
  const completeTasks = tasks.filter((task) => task.completed);

  const taskSort = () => {
    const sortedIncompleteTasks = incompleteTasks.sort((a, b) => (a.text > b.text ? 1 : -1));
    const sortedCompleteTasks = completeTasks.sort((a, b) => (a.text > b.text ? 1 : -1));
    setTasks([...sortedIncompleteTasks, ...sortedCompleteTasks]);
    setSortOrder('asc');
  };

  const ztaskSort = () => {
    const sortedIncompleteTasks = incompleteTasks.sort((a, b) => (a.text < b.text ? 1 : -1));
    const sortedCompleteTasks = completeTasks.sort((a, b) => (a.text < b.text ? 1 : -1));
    setTasks([...sortedIncompleteTasks, ...sortedCompleteTasks]);
    setSortOrder('dsc');
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

  // Filter tasks based on search input
  const filteredTasks = tasks.filter((task) =>
    task.text.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="todo-app">
      <h1>To-Do List</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Add a new task"
          value={inputValue}
          id="txtAdd"
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={tasks.length >= 6}
        />
        <button onClick={addTask} disabled={tasks.length >= 6}>
          Add
        </button>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search tasks"
          value={searchText}
          id="txtSearch"
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <div className="sorting">
        {tasks.length >= 6 && (
          <span className="errormessage">You Can Only Add Six Tasks</span>
        )}
        <br />
        <button onClick={taskSort} className="sorting" disabled={sortorder === 'asc'}>
          A-Z Sort
        </button>
        <button onClick={ztaskSort} className="sorting" disabled={sortorder === 'dsc'}>
          Z-A Sort
        </button>
        <button onClick={sortorder === 'asc' ? ztaskSort : taskSort}>
          {sortorder === 'asc' ? '↓' : '↑'}
        </button>
      </div>

      <ul className="task-list">
        {filteredTasks.map((item, index) => {
          // Find the actual index of the task in the `tasks` array
          const actualIndex = tasks.findIndex((task) => task === item);

          return (
            <li key={actualIndex} className="task">
              <span
                onClick={() => toggleTaskCompletion(actualIndex)}
                className={item.completed ? 'strick' : ''}
                title={item.text}
              >
                {item.text}
              </span>
              <span
                title={item.dateTime}
                className={item.completed ? 'strick' : ''}
                onClick={() => toggleTaskCompletion(actualIndex)}
              >
                {item.dateTime.toLocaleString()}
              </span>
              <button onClick={() => deleteTask(actualIndex)}>Delete</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default TodoApp;
