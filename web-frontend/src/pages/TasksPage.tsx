import React, { useState } from 'react';
import { Plus, Edit, RefreshCw } from 'lucide-react';
import HabitForm from '../components/HabitForm';
import { useNavigate, useLocation } from 'react-router-dom';
import Navigation from '../components/Navigation';

const CustomIcon = ({ type }) => {
  switch (type) {
    case 'running':
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    case 'meditation':
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      );
    case 'reading':
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      );
    case 'yoga':
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      );
    default:
      return null;
  }
};

const TasksPage = () => {
  const [habits, setHabits] = useState([
    {
      id: 1,
      name: 'Running',
      frequency: '3/week',
      duration: '60 min',
      icon: 'running',
      score: '+3',
      bgColor: 'bg-purple-300'
    },
    {
      id: 2,
      name: 'Meditation',
      frequency: '7/week',
      duration: '15 min',
      icon: 'meditation',
      score: '-1',
      bgColor: 'bg-purple-200'
    },
    {
      id: 3,
      name: 'Reading',
      frequency: '5/week',
      duration: '30 min',
      icon: 'reading',
      score: '+2',
      bgColor: 'bg-purple-100'
    },
    {
      id: 4,
      name: 'Yoga',
      frequency: '4/week',
      duration: '45 min',
      icon: 'yoga',
      score: '+4',
      bgColor: 'bg-purple-200'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Get current path and set active state
  const currentPath = location.pathname;
  const isTasksPage = currentPath === '/tasks';
  const isInboxPage = currentPath === '/inbox';

  const handleNavigation = (path) => {
    navigate(path);
    // Force immediate re-render
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handleAddHabit = (newHabit) => {
    setHabits([
      ...habits,
      {
        id: habits.length + 1,
        name: newHabit.habitName,
        frequency: newHabit.frequency,
        duration: `${newHabit.duration} min`,
        icon: newHabit.icon || 'running',
        score: '+0',
        bgColor: 'bg-purple-200'
      }
    ]);
    setShowForm(false);
  };

  const handleEditHabit = (habit) => {
    setSelectedHabit(habit);
    setShowForm(true);
  };

  const handleDeleteHabit = (id) => {
    setHabits(habits.filter(habit => habit.id !== id));
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen pb-16">
      {/* Header */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-1">
          <h1 className="text-2xl font-bold">Habits</h1>
          <div className="flex gap-2">
            <button 
              onClick={() => handleNavigation('/tasks')}
              className={`p-2 rounded-full hover:bg-purple-100 transition-colors ${
                isTasksPage ? 'text-purple-600' : 'text-gray-500'
              }`}
            >
              <RefreshCw className="w-6 h-6" />
            </button>
            <button 
              onClick={() => handleNavigation('/inbox')}
              className={`p-2 rounded-full hover:bg-purple-100 transition-colors ${
                isInboxPage ? 'text-purple-600' : 'text-gray-500'
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
        <p className="text-sm text-gray-600">Your habits are your recurrent tasks.</p>
      </div>

      {/* Habits List */}
      <div className="px-4 space-y-3">
        {habits.map(habit => (
          <div key={habit.id} className={`${habit.bgColor} rounded-xl p-4 flex justify-between items-center relative`}>
            <div className="flex items-center gap-3">
              <CustomIcon type={habit.icon} />
              <div>
                <p className="font-medium">{habit.name}</p>
                <p className="text-xs text-gray-700">{habit.frequency}, {habit.duration}</p>
              </div>
            </div>
            
            <button 
              onClick={() => handleEditHabit(habit)}
              className="absolute top-3 right-3 p-1 text-black hover:bg-purple-200 rounded-full"
            >
              <Edit className="w-5 h-5" />
            </button>
            
            <span className={`absolute bottom-3 right-3 text-sm ${habit.score.includes('+') ? 'text-green-600' : 'text-red-600'}`}>
              {habit.score}
            </span>
          </div>
        ))}
      </div>

      {/* Habit Form */}
      {showForm && (
        <HabitForm 
          onClose={() => {
            setShowForm(false);
            setSelectedHabit(null);
          }}
          onSubmit={(habit) => {
            if (selectedHabit) {
              setHabits(habits.map(h => 
                h.id === selectedHabit.id ? { ...h, ...habit } : h
              ));
            } else {
              handleAddHabit(habit);
            }
          }}
          initialValues={selectedHabit}
        />
      )}

      {/* Add Button */}
      <button 
        onClick={() => {
          setSelectedHabit(null);
          setShowForm(true);
        }}
        className="fixed right-6 bottom-20 bg-purple-500 text-white rounded-full p-3 shadow-lg hover:bg-purple-600 transition-colors"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Navigation */}
      <Navigation />
    </div>
  );
};

export default TasksPage;
