import React, { useState } from 'react';
import { MdChecklist } from "react-icons/md";
import TodoItems from './TodoItems';

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingValue, setEditingValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim() === '') {
      alert("Please enter a todo!");
      return;
    }

    const newTodo = {
      id: Date.now(),
      text: inputValue,
      isCompleted: false,
    };
    setTodos(prevTodos => [...prevTodos, newTodo]);
    setInputValue('');
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      addTodo();
    }
  };

  const toggleComplete = (id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const startEditing = (id, currentText) => {
    setEditingId(id);
    setEditingValue(currentText);
  };

  const handleEditChange = (e) => {
    setEditingValue(e.target.value);
  };

  const saveEdit = (id) => {
    if (editingValue.trim() === '') return;
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, text: editingValue } : todo
      )
    );
    setEditingId(null);
    setEditingValue('');
  };

  return (
    <div className='bg-white place-self-center w-11/12 max-w-md p-6 md:p-7 rounded-xl flex flex-col min-h-[550px] shadow-xl'>
      <div className='flex items-center mt-5 md:mt-7 gap-2'>
        <MdChecklist className='w-8 h-8 md:w-9 md:h-9 text-blue-500' />
        <h1 className='text-2xl md:text-3xl font-semibold text-gray-700'>To-Do List</h1>
      </div>

      <div className='flex items-center my-6 md:my-7 bg-gray-100 rounded-full'>
        <input
          type="text"
          placeholder='Add a new todo...'
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className='bg-transparent border-0 outline-none flex-grow text-base md:text-lg placeholder:text-gray-400 px-5 py-3'
        />
        <button
          onClick={addTodo}
          className='rounded-full bg-yellow-500 text-white w-auto px-6 md:px-8 h-11 md:h-12 cursor-pointer text-base md:text-lg font-medium hover:bg-yellow-600 transition-colors mr-1'
        >
          Add
        </button>
      </div>

      <div className='mt-4 flex-grow overflow-y-auto pr-2'>
        {todos.length === 0 && (
          <p className="text-center text-gray-500 py-10 text-lg">
            Add a task to get started.
          </p>
        )}
        <ul className="space-y-3">
          {todos.map(todo => (
            <TodoItems
              key={todo.id}
              todo={todo}
              isEditing={editingId === todo.id}
              editingValue={editingValue}
              onToggleComplete={toggleComplete}
              onDeleteTodo={deleteTodo}
              onStartEdit={startEditing}
              onEditChange={handleEditChange}
              onSaveEdit={saveEdit}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
