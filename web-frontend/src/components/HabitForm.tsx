import { useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HabitForm = ({ onClose, onSubmit, initialValues }) => {
  const [habitName, setHabitName] = useState(initialValues?.name || "");
  const [frequency, setFrequency] = useState(initialValues?.frequency || 1); // Number of times per week
  const [duration, setDuration] = useState(initialValues?.duration || 30); // Duration in minutes
  const [importance, setImportance] = useState(initialValues?.importance || 3); // Importance (1-10)
  const [stressLevel, setStressLevel] = useState(initialValues?.stressLevel || 50); // Stress level (1-100)
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // React Router navigation

  const validate = () => {
    const newErrors = {};
    if (!habitName.trim()) newErrors.habitName = "Habit name is required";
    if (frequency < 1) newErrors.frequency = "Frequency must be at least 1 time per week";
    if (duration < 1) newErrors.duration = "Duration must be at least 1 minute";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (type) => {
    if (validate()) {
      const habit = {
        habitName,
        frequency,
        duration,
        importance,
        stressLevel,
      };

      if (type === "reschedule") {
        // Navigate to calendar page with habit details
        navigate("/calendar", { state: { habit } });
      } else {
        onSubmit(habit, type); // Pass the habit object and the action type
      }

      onClose(); // Close the form
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {initialValues ? "Edit Habit" : "Create New Habit"}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit("create");
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium mb-1">Habit Name</label>
            <input
              type="text"
              value={habitName}
              onChange={(e) => setHabitName(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
            {errors.habitName && (
              <p className="text-red-500 text-sm mt-1">{errors.habitName}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Frequency (times per week)</label>
            <input
              type="number"
              value={frequency}
              onChange={(e) => setFrequency(Number(e.target.value))}
              className="w-full p-2 border rounded-lg"
              min="1"
            />
            {errors.frequency && (
              <p className="text-red-500 text-sm mt-1">{errors.frequency}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Duration (minutes)</label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full p-2 border rounded-lg"
              min="1"
            />
            {errors.duration && (
              <p className="text-red-500 text-sm mt-1">{errors.duration}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Importance (1-10)</label>
            <input
              type="number"
              value={importance}
              onChange={(e) => setImportance(Number(e.target.value))}
              className="w-full p-2 border rounded-lg"
              min="1"
              max="10"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Expected Stress During Activity</label>
            <input
              type="range"
              min="1"
              max="100"
              value={stressLevel}
              onChange={(e) => setStressLevel(Number(e.target.value))}
              className="w-full"
            />
            <p className="text-sm text-gray-600">Stress Level: {stressLevel}</p>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => handleSubmit("create")}
              className="px-4 py-2 text-sm font-medium text-white bg-purple-300 rounded-md hover:bg-purple-400"
            >
              Create Habit
            </button>
            <button
              type="button"
              onClick={() => handleSubmit("reschedule")}
              className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700"
            >
              Create Habit and Reschedule Your Week
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HabitForm;
