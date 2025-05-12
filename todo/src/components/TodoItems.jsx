import React from 'react';
import { MdOutlineRadioButtonUnchecked, MdOutlineCheckCircleOutline, MdDeleteOutline } from "react-icons/md"; // Using Material Design Icons for consistency

const TodoItems = ({ todo, onToggleComplete, onDeleteTodo }) => {
  return (
    <li
      className={`flex items-center p-3.5 rounded-lg transition-all duration-300 ease-in-out group
                  ${todo.isCompleted
                    ? 'bg-green-50 text-gray-500'
                    : 'bg-slate-100 hover:bg-slate-200'
                  }`}
    >
      <button
        onClick={() => onToggleComplete(todo.id)}
        className="mr-3 text-xl"
        aria-label={todo.isCompleted ? "Mark as incomplete" : "Mark as complete"}
      >
        {todo.isCompleted
          ? <MdOutlineCheckCircleOutline className="text-green-500" />
          : <MdOutlineRadioButtonUnchecked className="text-gray-400 group-hover:text-blue-500" />
        }
      </button>

      <div
        className={`flex-grow cursor-pointer text-gray-800 ${todo.isCompleted ? 'line-through' : ''}`}
        onClick={() => onToggleComplete(todo.id)} // Allow clicking text to toggle
      >
        {todo.text}
      </div>

      <button
        onClick={() => onDeleteTodo(todo.id)}
        className="text-gray-400 hover:text-red-500 ml-3 text-xl p-1 rounded-full hover:bg-gray-200 opacity-50 group-hover:opacity-100 transition-opacity"
        aria-label="Delete todo"
      >
        <MdDeleteOutline />
      </button>
    </li>
  );
};

export default TodoItems;