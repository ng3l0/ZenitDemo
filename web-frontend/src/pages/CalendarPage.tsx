import React, { useState } from 'react';
import { Book, Coffee, Brain, Timer, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import FabMenu from '../components/FabMenu';

const CalendarView = () => {
  const [viewType, setViewType] = useState('day');
  const timeSlots = Array.from({ length: 12 }, (_, i) => {
    const hour = 8 + i;
    return {
      time: `${hour.toString().padStart(2, '0')}:00`,
      stressLevel: hour < 11 ? 'low' : 
                   hour < 14 ? 'medium' : 
                   hour < 16 ? 'high' : 'low'
    };
  });

  const getStressColor = (level) => {
    switch(level) {
      case 'low': return 'bg-green-200';
      case 'medium': return 'bg-yellow-200';
      case 'high': return 'bg-red-200';
      default: return 'bg-gray-200';
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen flex flex-col">
      {/* Header with Navigation */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
            <h1 className="text-xl font-bold ml-2">December 29</h1>
          </div>
          <div className="flex gap-2">
            <Button 
              variant={viewType === 'day' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setViewType('day')}
            >
              Day
            </Button>
            <Button 
              variant={viewType === 'week' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewType('week')}
            >
              Week
            </Button>
            <Button 
              variant={viewType === 'month' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewType('month')}
            >
              Month
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-purple-600" />
            <span className="text-sm">Peak Focus: 9AM-11AM</span>
          </div>
          <div className="flex items-center gap-2">
            <Timer className="w-4 h-4 text-purple-600" />
            <span className="text-sm">Peak Energy: 3PM-5PM</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex">
          {/* Vertical Stress Timeline */}
          <div className="w-3 mx-2">
            {timeSlots.map((slot, index) => (
              <div
                key={index}
                className={`h-20 ${getStressColor(slot.stressLevel)}`}
                style={{
                  borderTopLeftRadius: index === 0 ? '0.25rem' : '0',
                  borderTopRightRadius: index === 0 ? '0.25rem' : '0',
                  borderBottomLeftRadius: index === timeSlots.length - 1 ? '0.25rem' : '0',
                  borderBottomRightRadius: index === timeSlots.length - 1 ? '0.25rem' : '0'
                }}
              />
            ))}
          </div>

          {/* Time Slots and Tasks */}
          <div className="flex-1">
            {timeSlots.map((slot) => (
              <div key={slot.time} className="relative">
                <div className="absolute left-0 -translate-y-1/2 text-xs text-gray-500 w-12 text-right pr-2">
                  {slot.time}
                </div>
                
                <div className="ml-12 h-20 border-b border-gray-100 relative">
                  {slot.time === "08:00" && (
                    <div className="absolute inset-x-2 top-4 bg-purple-100 rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <Book className="w-4 h-4 text-purple-600" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">Study machine learning</p>
                          <p className="text-xs text-gray-600">45 min</p>
                        </div>
                        <span className="text-green-600 text-sm">+3</span>
                      </div>
                    </div>
                  )}
                  {slot.time === "09:00" && (
                    <div className="absolute inset-x-2 top-2 bg-purple-100 rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <Coffee className="w-4 h-4 text-purple-600" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">Break</p>
                          <p className="text-xs text-gray-600">15 min</p>
                        </div>
                        <span className="text-red-600 text-sm">-1</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAB Menu */}
      <FabMenu />
    </div>
  );
};

export default CalendarView;
