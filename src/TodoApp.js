import React, { useState } from 'react';
import './TodoApp.css';

function TodoApp() {
  const [inputValue, setInputValue] = useState('');
  const [tasks, setTasks] = useState([]);
  const [sortorder, setSortOrder] = useState('asc');

  const addTask = () => {
    if (inputValue.trim() && tasks.length < 6) {
      const currentdate = new Date();

      const upDate = [...tasks, { text: inputValue, completed: false, dateTime: currentdate }];
      const sortedTasks = upDate.sort((a, b) => (a.text > b.text ? 1 : -1));
      setTasks(sortedTasks);
      setInputValue('');


    }
  };
  const handleKeyPress = (event) => {
    if (event.key === 'Enter')
      addTask();
  };
  // sort task
  
  const incompleteTasks = tasks.filter(task => !task.completed);
  const completeTasks = tasks.filter(task => task.completed);

  const taskSort = () => {
    const sortedIncompleteTasks = incompleteTasks.sort((a, b) => a.text > b.text ? 1 : -1);
    const sortedCompleteTasks = completeTasks.sort((a, b) => a.text > b.text ? 1 : -1);
    setTasks([...sortedIncompleteTasks, ...sortedCompleteTasks]);
    setSortOrder('asc');
  };

  const ztaskSort = () => {
    const sortedIncompleteTasks = incompleteTasks.sort((a, b) => a.text < b.text ? 1 : -1);
    const sortedCompleteTasks = completeTasks.sort((a, b) => a.text < b.text ? 1 : -1);
    setTasks([...sortedIncompleteTasks, ...sortedCompleteTasks]);
    setSortOrder('dsc');
  };
  // sort task complete

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
          disabled={tasks.length >= 6}
        />

        <button onClick={addTask}
          disabled={tasks.length >= 6} >Add</button>
      </div>

      <div className='sorting'>
        {tasks.length >= 6 &&
          <span className='errormessage'>
            You Can Only Six Task Add
          </span>
        }<br />
        <button onClick={taskSort} className='sorting' disabled={sortorder === 'asc'}>A-Z Sort</button>
        <button onClick={ztaskSort} className='sorting' disabled={sortorder === 'dsc'}>Z-A Sort</button> 
       
        <button onClick={sortorder === 'asc' ? ztaskSort : taskSort}>
        {sortorder === 'asc' ?   '↓' : '↑' }
      </button>
      </div>

      <ul className="task-list">
        {tasks.map((item, index) => (
          <li key={index} className="task">
            <span
              onClick={() => toggleTaskCompletion(index)}
              className={item.completed ? "strick" : ""}
              title={item.text}
            >
              {item.text}

            </span>
            <span
              title={item.dateTime}
              className={item.completed ? "strick" : ""}
              onClick={() => toggleTaskCompletion(index)}
            >{item.dateTime.toLocaleString()}</span>
            <button onClick={() => deleteTask(index)} >Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
