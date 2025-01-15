import React, { useState } from 'react';
import { Plus, Check, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';

const TaskInbox = () => {
  const [tasks, setTasks] = useState([
    { 
      id: 1,
      title: 'Grocery shopping', 
      dueDate: '17 Dec 2024', 
      priority: 1,
      completed: false
    },
    { 
      id: 2,
      title: 'Study french grammar', 
      dueDate: 'none', 
      priority: 3,
      completed: false
    },
    {
      id: 3,
      title: 'Prepare project presentation',
      dueDate: '20 Dec 2024',
      priority: 2,
      completed: false
    },
    {
      id: 4,
      title: 'Book flight tickets',
      dueDate: '25 Dec 2024',
      priority: 1,
      completed: false
    }
  ]);

  const [activeIcon, setActiveIcon] = useState('refresh'); // 'refresh' or 'menu'
  const navigate = useNavigate();

  const handleTaskComplete = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: true } : task
    ));
    setTimeout(() => {
      setTasks(tasks.filter(task => task.id !== taskId));
    }, 200);
  };

  const handleIconClick = (iconType) => {
    setActiveIcon(iconType);
    if (iconType === 'refresh') {
      navigate('/tasks');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen pb-16">
      {/* Header */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-semibold">Inbox</h1>
          <div className="flex gap-2">
            <button 
              onClick={() => handleIconClick('refresh')}
              className={`p-2 rounded-full hover:bg-purple-100 ${
                activeIcon === 'refresh' ? 'text-purple-600' : 'text-black'
              }`}
            >
              <RefreshCw className="w-6 h-6" />
            </button>
            <button 
              onClick={() => handleIconClick('menu')}
              className={`p-2 rounded-full hover:bg-purple-100 ${
                activeIcon === 'menu' ? 'text-purple-600' : 'text-black'
              }`}
            >
              <svg 
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-600">Your inbox contains your one-time tasks.</p>
      </div>

      {/* Task List */}
      <div className="px-4 space-y-2">
        {tasks.map((task) => (
          <div 
            key={task.id} 
            className={`bg-purple-50 p-4 rounded-lg flex items-center justify-between transition-opacity ${
              task.completed ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <button 
                onClick={() => handleTaskComplete(task.id)}
                className={`h-5 w-5 rounded-full border-2 ${
                  task.completed ? 'border-purple-600 bg-purple-600' : 'border-purple-300'
                } flex items-center justify-center hover:bg-purple-200 transition-colors`}
              >
                {task.completed && <Check className="w-3 h-3 text-white" />}
              </button>
              <div>
                <p className="font-medium">{task.title}</p>
                <p className="text-sm text-gray-600">Due date: {task.dueDate}</p>
              </div>
            </div>
            <span className={`text-sm ${
              task.priority === 1 ? 'text-green-600' :
              task.priority === 2 ? 'text-yellow-600' :
              'text-red-600'
            }`}>
              +{task.priority}
            </span>
          </div>
        ))}
      </div>

      {/* Add Button */}
      <button className="fixed right-6 bottom-20 bg-purple-500 p-3 rounded-full shadow-lg hover:bg-purple-600 transition-colors">
        <Plus className="text-white w-6 h-6" />
      </button>

      {/* Navigation */}
      <Navigation />
    </div>
  );
};

export default TaskInbox;
