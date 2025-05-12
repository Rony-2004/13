import React from 'react';
import {
  MdOutlineRadioButtonUnchecked,
  MdOutlineCheckCircleOutline,
  MdDeleteOutline
} from "react-icons/md";
import { FiEdit3, FiCheck } from "react-icons/fi";

const TodoItems = ({
  todo,
  isEditing,
  editingValue,
  onToggleComplete,
  onDeleteTodo,
  onStartEdit,
  onEditChange,
  onSaveEdit
}) => {
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

      {isEditing ? (
        <input
          type="text"
          value={editingValue}
          onChange={onEditChange}
          onKeyDown={(e) => e.key === 'Enter' && onSaveEdit(todo.id)}
          className="flex-grow border rounded px-2 py-1 text-gray-700 bg-white"
          autoFocus
        />
      ) : (
        <div
          className={`flex-grow cursor-pointer text-gray-800 ${todo.isCompleted ? 'line-through' : ''}`}
          onClick={() => onToggleComplete(todo.id)}
        >
          {todo.text}
        </div>
      )}

      {isEditing ? (
        <button
          onClick={() => onSaveEdit(todo.id)}
          className="text-green-500 hover:text-green-600 ml-3 text-xl p-1 rounded-full hover:bg-green-100"
          aria-label="Save edit"
        >
          <FiCheck />
        </button>
      ) : (
        <button
          onClick={() => onStartEdit(todo.id, todo.text)}
          className="text-gray-400 hover:text-blue-500 ml-3 text-xl p-1 rounded-full hover:bg-blue-100"
          aria-label="Edit todo"
        >
          <FiEdit3 />
        </button>
      )}

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
