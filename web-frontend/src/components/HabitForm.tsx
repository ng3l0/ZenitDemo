import { useState, useEffect } from 'react';
import { X, Plus, Clock, AlertCircle, Edit } from 'lucide-react';

const HabitForm = ({ onClose, onSubmit, initialValues }) => {
  const [habitName, setHabitName] = useState(initialValues?.name || '');
  const [frequency, setFrequency] = useState(initialValues?.frequency || 'daily');
  const [importance, setImportance] = useState(initialValues?.importance || 3);
  const [timeOfDay, setTimeOfDay] = useState(initialValues?.timeOfDay || '');
  const [duration, setDuration] = useState(initialValues?.duration || 30);
  const [alertsEnabled, setAlertsEnabled] = useState(initialValues?.alertsEnabled || false);
  const [alertTime, setAlertTime] = useState(initialValues?.alertTime || '');
  const [subtasks, setSubtasks] = useState(initialValues?.subtasks || []);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialValues) {
      setHabitName(initialValues.name);
      setFrequency(initialValues.frequency);
      setImportance(initialValues.importance);
      setTimeOfDay(initialValues.timeOfDay);
      setDuration(initialValues.duration);
      setAlertsEnabled(initialValues.alertsEnabled);
      setAlertTime(initialValues.alertTime);
      setSubtasks(initialValues.subtasks || []);
    }
  }, [initialValues]);

  const validate = () => {
    const newErrors = {};
    if (!habitName.trim()) newErrors.habitName = 'Habit name is required';
    if (!timeOfDay) newErrors.timeOfDay = 'Time of day is required';
    if (duration < 1) newErrors.duration = 'Duration must be at least 1 minute';
    if (alertsEnabled && !alertTime) newErrors.alertTime = 'Alert time is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        habitName,
        frequency,
        importance,
        timeOfDay,
        duration,
        alertsEnabled,
        alertTime: alertsEnabled ? alertTime : null,
        subtasks,
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{initialValues ? 'Edit Habit' : 'Create New Habit'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Form fields remain the same as before */}
          {/* ... */}
          
          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700"
            >
              {initialValues ? 'Save Changes' : 'Create Habit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HabitForm;
