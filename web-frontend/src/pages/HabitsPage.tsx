import { useState } from 'react';
    import { Plus } from 'lucide-react';
    import HabitForm from '../components/HabitForm';

    const HabitsPage = () => {
      const [showForm, setShowForm] = useState(false);

      const handleSubmit = (habit) => {
        console.log('New Habit:', habit);
        // Add logic to save the habit
      };

      return (
        <>
          {/* Habits List */}
          <div className="px-4 sm:px-6 space-y-3">
            {/* Existing habits list */}
          </div>

          {/* Add Button */}
          <button
            onClick={() => setShowForm(true)}
            className="fixed right-6 bottom-20 bg-purple-600 text-white rounded-full p-3 shadow-lg hover:bg-purple-700 transition-colors sm:right-8 sm:bottom-24"
          >
            <Plus className="w-6 h-6" />
          </button>

          {/* Habit Form Modal */}
          {showForm && (
            <HabitForm
              onClose={() => setShowForm(false)}
              onSubmit={handleSubmit}
            />
          )}
        </>
      );
    };

    export default HabitsPage;
