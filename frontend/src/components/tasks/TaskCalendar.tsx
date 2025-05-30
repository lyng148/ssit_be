// filepath: c:\Users\Tuan Linh\Downloads\itss\real_sshit\frontend\src\components\tasks\TaskCalendar.tsx
import React, { useState } from 'react';
import { Calendar as CalendarIcon, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Task } from '@/types/task';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';

interface TaskCalendarProps {
  tasks: Task[];
  tasksLoading: boolean;
  tasksError: string | null;
  isGroupLeader: boolean;
  onAddTask: () => void;
  onTaskClick: (task: Task) => void;
}

const TaskCalendar: React.FC<TaskCalendarProps> = ({
  tasks,
  tasksLoading,
  tasksError,
  isGroupLeader,
  onAddTask,
  onTaskClick
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  // Prepare task data for calendar
  const tasksByDate = tasks.reduce((acc, task) => {
    if (!task.dueDate) return acc;
    
    const date = task.dueDate.split('T')[0];
    if (!acc[date]) acc[date] = [];
    acc[date].push(task);
    return acc;
  }, {} as Record<string, Task[]>);
  
  // Get tasks for selected date
  const getTasksForDate = (date: Date | undefined): Task[] => {
    if (!date || isNaN(date.getTime())) return [];
    
    const dateStr = format(date, 'yyyy-MM-dd');
    return tasksByDate[dateStr] || [];
  };
  
  // Generate calendar day content with task indicators
  const getDayContent = (day: Date) => {
    // Check if the date is valid before formatting
    if (!day || isNaN(day.getTime())) {
      return <span>-</span>;
    }
    
    const dateStr = format(day, 'yyyy-MM-dd');
    const tasksOnDate = tasksByDate[dateStr] || [];
    
    if (tasksOnDate.length > 0) {
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <span className="text-sm">{day.getDate()}</span>
          <div className="absolute bottom-1 flex gap-1 justify-center">
            {tasksOnDate.length > 0 && (
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            )}
            {tasksOnDate.length > 1 && (
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
            )}
            {tasksOnDate.length > 2 && (
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            )}
          </div>
        </div>
      );
    }
    
    return <span className="text-sm">{day.getDate()}</span>;
  };
  
  // Tasks for selected date
  const selectedDateTasks = getTasksForDate(selectedDate);
  
  const getPriorityColor = (task: Task) => {
    if (!task.originalTask) return "bg-gray-200";
    
    const priority = task.originalTask.priority;
    switch (priority) {
      case 'CRITICAL': return "bg-red-500";
      case 'HIGH': return "bg-orange-500";
      case 'MEDIUM': return "bg-amber-400";
      case 'LOW': return "bg-blue-300";
      default: return "bg-gray-200";
    }
  };
  
  if (tasksLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        <span className="ml-2 text-lg text-gray-600">Loading calendar...</span>
      </div>
    );
  }

  if (tasksError) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded mb-6">
        <p>{tasksError}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-5 border-b border-gray-100 flex justify-between items-center">
        <h3 className="text-xl font-semibold flex items-center text-gray-800">
          <CalendarIcon className="mr-2 h-5 w-5 text-blue-600" />
          Calendar View
        </h3>
        {isGroupLeader && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onAddTask} 
            className="flex items-center gap-2 hover:bg-blue-50 hover:text-blue-600 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Task
          </Button>
        )}
      </div>
      
      <div className="p-6 grid grid-cols-1 md:grid-cols-7 gap-6">
        <div className="col-span-1 md:col-span-5 lg:col-span-5">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-lg shadow-sm pointer-events-auto bg-white"
            components={{
              DayContent: (props) => {
                const day = props.date;
                return day ? getDayContent(day) : null;
              },
            }}
          />
        </div>
        
        <Card className="col-span-1 md:col-span-2 lg:col-span-2 shadow-sm border border-gray-100">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
              <h3 className="font-semibold text-lg text-gray-800">
                {selectedDate && !isNaN(selectedDate.getTime()) 
                  ? format(selectedDate, 'MMMM d, yyyy') 
                  : 'Select a date'}
              </h3>
              <Badge 
                variant="outline" 
                className={`${selectedDateTasks.length > 0 ? 'bg-blue-50 text-blue-600 border-blue-200' : ''}`}
              >
                {selectedDateTasks.length} {selectedDateTasks.length === 1 ? 'task' : 'tasks'}
              </Badge>
            </div>
            
            <div className="space-y-3 max-h-96 overflow-y-auto pr-1 custom-scrollbar">
              {selectedDateTasks.length > 0 ? (
                selectedDateTasks.map(task => (
                  <div 
                    key={task.id} 
                    className="p-3 border border-gray-200 rounded-md hover:bg-blue-50 hover:border-blue-200 transition-colors cursor-pointer shadow-sm"
                    onClick={() => onTaskClick(task)}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`w-3 h-3 rounded-full ${getPriorityColor(task)}`}></div>
                      <span className="font-medium text-gray-800">{task.title}</span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2 mt-1">{task.description}</p>
                    {task.assignee && (
                      <div className="text-xs flex items-center gap-1 text-gray-500 mt-2 pt-2 border-t border-gray-100">
                        <span className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center text-[10px]">
                          {task.assigneeName ? task.assigneeName.charAt(0).toUpperCase() : 'U'}
                        </span>
                        Assigned to: {task.assigneeName || task.assignee}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-lg">
                  <CalendarIcon className="h-10 w-10 mx-auto mb-2 opacity-30" />
                  <p>No tasks scheduled for this day</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TaskCalendar;
