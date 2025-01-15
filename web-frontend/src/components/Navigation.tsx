import { Home, Calendar, CheckSquare, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t">
      <div className="max-w-md mx-auto flex justify-around py-2 sm:py-3">
        <NavLink to="/" className={({ isActive }) => 
          `flex flex-col items-center ${isActive ? 'text-purple-600' : 'text-gray-500'}`
        }>
          <Home className="w-6 h-6 sm:w-7 sm:h-7" />
          <span className="text-xs sm:text-sm">Home</span>
        </NavLink>
        <NavLink to="/calendar" className={({ isActive }) => 
          `flex flex-col items-center ${isActive ? 'text-purple-600' : 'text-gray-500'}`
        }>
          <Calendar className="w-6 h-6 sm:w-7 sm:h-7" />
          <span className="text-xs sm:text-sm">Calendar</span>
        </NavLink>
        <NavLink to="/tasks" className={({ isActive }) => 
          `flex flex-col items-center ${isActive ? 'text-purple-600' : 'text-gray-500'}`
        }>
          <CheckSquare className="w-6 h-6 sm:w-7 sm:h-7" />
          <span className="text-xs sm:text-sm">Tasks</span>
        </NavLink>
        <NavLink to="/health-report" className={({ isActive }) => 
          `flex flex-col items-center ${isActive ? 'text-purple-600' : 'text-gray-500'}`
        }>
          <User className="w-6 h-6 sm:w-7 sm:h-7" />
          <span className="text-xs sm:text-sm">Health Report</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navigation;
