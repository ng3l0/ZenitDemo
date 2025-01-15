import React from 'react';
import { Home, Calendar, ListTodo, User, Heart, Moon, Brain, Activity, Droplet, BookOpen, Battery } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const HealthReport = () => {
  const stressData = [
    { day: 'Mon', value: 55 },
    { day: 'Tue', value: 58 },
    { day: 'Wed', value: 52 },
    { day: 'Thu', value: 56 },
    { day: 'Fri', value: 50 },
    { day: 'Sat', value: 48 },
    { day: 'Sun', value: 45 }
  ];

  const activityData = [
    {
      name: 'Study',
      icon: <BookOpen className="w-5 h-5 text-purple-600" />,
      duration: '180 minutes',
      impact: '80% stress',
      progress: 80,
      color: 'bg-purple-600'
    },
    {
      name: 'Exercise',
      icon: <Activity className="w-5 h-5 text-green-600" />,
      duration: '45 minutes',
      impact: '60% recovery',
      progress: 60,
      color: 'bg-green-600'
    },
    {
      name: 'Hydration',
      icon: <Droplet className="w-5 h-5 text-blue-600" />,
      duration: '2.5 liters',
      impact: '90% hydration',
      progress: 90,
      color: 'bg-blue-600'
    },
    {
      name: 'Meditation',
      icon: <Brain className="w-5 h-5 text-purple-600" />,
      duration: '20 minutes',
      impact: '70% calm',
      progress: 70,
      color: 'bg-purple-600'
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Stress Overview */}
      <div className="px-4 space-y-6 mt-4">
        <div className="bg-purple-100 rounded-2xl p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-700 font-medium">Stress | Weekly Overview</span>
            <span className="text-sm text-gray-500">‹ Dec 23-29 ›</span>
          </div>
          <div className="h-24">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stressData}>
                <XAxis 
                  dataKey="day" 
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
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#7C3AED"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-purple-100 p-4 rounded-2xl">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Avg Stress</span>
              <Brain size={16} className="text-gray-600" />
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold text-gray-900">65%</div>
              <div className="text-xs text-gray-500">vs last week</div>
            </div>
          </div>

          <div className="bg-green-100 p-4 rounded-2xl">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Recovery</span>
              <Battery size={16} className="text-gray-600" />
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold text-gray-900">2.5h</div>
              <div className="text-xs text-gray-500">daily average</div>
            </div>
          </div>

          <div className="bg-blue-100 p-4 rounded-2xl">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sleep</span>
              <Moon size={16} className="text-gray-600" />
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold text-gray-900">7.2h</div>
              <div className="text-xs text-gray-500">daily average</div>
            </div>
          </div>

          <div className="bg-red-100 p-4 rounded-2xl">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Heart rate</span>
              <Heart size={16} className="text-gray-600" />
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold text-gray-900">68</div>
              <div className="text-xs text-gray-500">avg bpm</div>
            </div>
          </div>
        </div>

        {/* Activity Impact Section */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Daily Activities</h2>
          <div className="space-y-4">
            {activityData.map((activity, index) => (
              <div key={index} className="bg-white p-4 rounded-2xl border">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-3">
                    {activity.icon}
                    <div>
                      <div className="text-gray-900 font-medium">{activity.name}</div>
                      <div className="text-sm text-gray-500">{activity.duration}</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">{activity.impact}</div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`${activity.color} h-2 rounded-full`}
                    style={{ width: `${activity.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Summary */}
        <div className="p-4 bg-purple-50 rounded-2xl mt-6">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Weekly Summary</h3>
          <p className="text-gray-600">
            This week's most stressful activity was studying, with a total duration of 180 minutes 
            and an average stress score level of 83. Remember to take regular breaks and practice 
            mindfulness techniques to manage stress effectively.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HealthReport;
