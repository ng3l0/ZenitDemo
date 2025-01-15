import { useState } from 'react';
import { Plus, Calendar, CheckSquare, RefreshCw } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const FabMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Only show on tasks and calendar pages
  const showFab = ['/tasks', '/calendar'].includes(location.pathname);

  if (!showFab) return null;

  return (
    <div className="fixed right-6 bottom-20 sm:right-8 sm:bottom-24">
      {/* Menu Items */}
      {isOpen && (
        <div className="absolute bottom-14 right-0 flex flex-col items-end gap-2">
          <button
            onClick={() => {
              setIsOpen(false);
              // Add logic to open event form
            }}
            className="bg-purple-600 text-white rounded-full p-3 shadow-lg hover:bg-purple-700 transition-all"
          >
            <Calendar className="w-5 h-5" />
          </button>
          <button
            onClick={() => {
              setIsOpen(false);
              // Add logic to open habit form
            }}
            className="bg-purple-600 text-white rounded-full p-3 shadow-lg hover:bg-purple-700 transition-all"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
          <button
            onClick={() => {
              setIsOpen(false);
              // Add logic to open task form
            }}
            className="bg-purple-600 text-white rounded-full p-3 shadow-lg hover:bg-purple-700 transition-all"
          >
            <CheckSquare className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Main FAB Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-purple-600 text-white rounded-full p-4 shadow-lg hover:bg-purple-700 transition-all"
      >
        <Plus className={`w-6 h-6 transition-transform ${isOpen ? 'rotate-45' : 'rotate-0'}`} />
      </button>
    </div>
  );
};

export default FabMenu;
