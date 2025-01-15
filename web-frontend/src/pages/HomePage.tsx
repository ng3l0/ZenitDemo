import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Legend, CartesianGrid } from 'recharts';
import { Home, Calendar, CheckSquare, User, Pencil, BookOpen, Coffee, Plus, Activity, Droplet, MoveHorizontal, List, RefreshCw } from 'lucide-react';
import FabMenu from '../components/FabMenu';

const WellnessDashboard = () => {
  const stressData = [
    { time: '6AM', actual: 20, predicted: 20 },
    { time: '9AM', actual: 30, predicted: 25 },
    { time: '12PM', actual: 40, predicted: 35 },
    { time: '3PM', actual: 35, predicted: 40 },
    { time: '6PM', actual: 30, predicted: 35 }
  ];

  const suggestions = [
    { text: "Take a 5-minute breathing break", icon: <Activity className="w-5 h-5 text-purple-800" /> },
    { text: "Drink some water", icon: <Droplet className="w-5 h-5 text-purple-800" /> },
    { text: "Stretch your legs", icon: <MoveHorizontal className="w-5 h-5 text-purple-800" /> },
    { text: "Review your priorities for the day", icon: <List className="w-5 h-5 text-purple-800" /> }
  ];

  const handleAddSuggestion = (suggestion) => {
    console.log('Added suggestion:', suggestion);
    // Add logic to handle adding the suggestion
  };

  return (
    <div className="max-w-md mx-auto bg-white p-4">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-black">Hi Megan,</h1>
        <p className="text-gray-600">welcome back</p>
      </div>

      {/* Stress Level Section */}
      <div className="flex gap-4 mb-6">
        <div className="flex-grow flex flex-col gap-2">
          <div className="bg-purple-200 rounded-xl p-3">
            <p className="text-sm text-black">Good job! Your stress level is as the one predicted</p>
          </div>
          <div className="bg-purple-100 rounded-xl p-3">
            <p className="text-sm text-black">Fancy something else? Check our suggested activities</p>
          </div>
        </div>
        <div className="bg-purple-800 text-white rounded-xl p-4 w-24 flex flex-col items-center justify-center gap-1">
          <span className="text-4xl font-semibold">65</span>
          <span className="text-xs text-center">Stress<br/>level</span>
        </div>
      </div>

      {/* Stress Level Graph */}
      <div className="mb-2 -mx-4">
        <h3 className="text-lg font-bold mb-2 px-4 text-black">Stress Level Comparison</h3>
        <div className="h-56">
          <LineChart 
            width={380} 
            height={200}
            data={stressData} 
            margin={{ top: 5, right: 20, bottom: 20, left: 20 }}
          >
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <XAxis 
              dataKey="time" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#666' }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#666' }}
              domain={[0, 100]}
              ticks={[0, 20, 40, 60, 80, 100]}
            />
            <Legend 
              verticalAlign="bottom"
              height={36}
              content={({ payload }) => (
                <div className="flex justify-center gap-6 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-0.5 bg-purple-400"></div>
                    <span>Current stress</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-0.5 bg-purple-200"></div>
                    <span>Predicted stress</span>
                  </div>
                </div>
              )}
            />
            <Line 
              type="monotone" 
              dataKey="actual" 
              stroke="#9F7AEA"
              strokeWidth={2}
              dot={false}
            />
            <Line 
              type="monotone" 
              dataKey="predicted" 
              stroke="#E9D5FF" 
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </div>
      </div>

      {/* Schedule */}
      <div>
        <h3 className="text-base font-extrabold mb-2 text-black">Your day at a glance</h3>
        <div className="space-y-2">
          <div className="bg-purple-200 rounded-xl p-3 relative">
            <div className="flex justify-between items-start">
              <div className="flex gap-3 items-center">
                <BookOpen className="w-5 h-5 text-purple-800" />
                <div>
                  <p className="text-sm font-medium text-black">Study Machine Learning</p>
                  <p className="text-xs text-gray-600">08:00-08:45 (45min)</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <Pencil className="w-4 h-4 text-purple-600 mb-2" />
                <div className="flex gap-1">
                  <span className="text-sm text-green-600">+3</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-purple-100 rounded-xl p-3 relative scale-[0.97] origin-top">
            <div className="flex justify-between items-start">
              <div className="flex gap-3 items-center">
                <Coffee className="w-5 h-5 text-purple-800" />
                <div>
                  <p className="text-sm font-medium text-black">Break</p>
                  <p className="text-xs text-gray-600">08:45-09:00 (15min)</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <Pencil className="w-4 h-4 text-purple-500 mb-2" />
                <div className="flex gap-1">
                  <span className="text-sm text-red-600">-1</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Suggestions */}
        <div className="mt-6">
          <h3 className="text-base font-extrabold mb-2 text-black">Suggestions for You</h3>
          <div className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="bg-purple-100 rounded-xl p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {suggestion.icon}
                  <p className="text-sm text-black">{suggestion.text}</p>
                </div>
                <button 
                  onClick={() => handleAddSuggestion(suggestion.text)}
                  className="p-1 text-purple-800 hover:bg-purple-200 rounded-full"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAB Menu */}
      <FabMenu />

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="max-w-md mx-auto flex justify-around py-2">
          <button className="flex flex-col items-center text-purple-800">
            <Home className="w-6 h-6" />
            <span className="text-xs text-black">Home</span>
          </button>
          <button className="flex flex-col items-center text-purple-800">
            <Calendar className="w-6 h-6" />
            <span className="text-xs text-black">Calendar</span>
          </button>
          <button className="flex flex-col items-center text-purple-800">
            <CheckSquare className="w-6 h-6" />
            <span className="text-xs text-black">Tasks</span>
          </button>
          <button className="flex flex-col items-center text-purple-800">
            <User className="w-6 h-6" />
            <span className="text-xs text-black">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WellnessDashboard;
