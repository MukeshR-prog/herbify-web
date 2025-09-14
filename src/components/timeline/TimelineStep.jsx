import { Badge } from "@heroui/react";
import { CheckCircle } from "lucide-react";

const TimelineStep = ({ item, index, isLast }) => {
  const Icon = item.icon;
  
  const statusColors = {
    completed: {
      main: 'bg-gradient-to-br from-emerald-500 to-green-600',
      border: 'border-emerald-300',
      shadow: 'shadow-emerald-500/30',
      line: 'bg-gradient-to-b from-emerald-300 to-emerald-200',
      textColor: 'text-white',
      badgeColor: 'success'
    },
    active: {
      main: 'bg-gradient-to-br from-blue-500 to-indigo-600',
      border: 'border-blue-300', 
      shadow: 'shadow-blue-500/30',
      line: 'bg-gradient-to-b from-blue-200 to-slate-200',
      textColor: 'text-white',
      badgeColor: 'primary'
    },
    pending: {
      main: 'bg-gradient-to-br from-slate-300 to-gray-400',
      border: 'border-slate-300',
      shadow: 'shadow-slate-400/20',
      line: 'bg-gradient-to-b from-slate-200 to-slate-100',
      textColor: 'text-slate-600',
      badgeColor: 'default'
    }
  };

  const currentStatus = statusColors[item.status] || statusColors.pending;

  return (
    <div className="flex gap-6 group relative">
      {/* Timeline connector */}
      <div className="flex flex-col items-center relative z-10">
        {/* Main circle */}
        <div className={`
          relative p-4 rounded-full border-4 transition-all duration-500 hover:scale-110
          ${currentStatus.main} ${currentStatus.border} shadow-xl ${currentStatus.shadow}
          ${item.status === 'active' ? 'animate-pulse' : ''}
        `}>
          <Icon className={`w-6 h-6 ${currentStatus.textColor} relative z-10`} />
          
          {/* Completion checkmark overlay for completed items */}
          {item.status === 'completed' && (
            <div className="absolute -top-1 -right-1 bg-white rounded-full p-1 border-2 border-emerald-500">
              <CheckCircle className="w-3 h-3 text-emerald-600" />
            </div>
          )}
        </div>
        
        {/* Connecting line */}
        {!isLast && (
          <div className={`
            w-2 h-20 mt-4 rounded-full transition-all duration-500
            ${currentStatus.line}
          `}></div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-12 -mt-1">
        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-slate-200 group-hover:transform group-hover:translate-x-2">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-3">
            <div className="flex-1">
              <h4 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-slate-900">
                {item.event}
              </h4>
              <p className="text-slate-600 leading-relaxed text-sm">
                {item.description}
              </p>
            </div>
            <div className="flex flex-col gap-2 items-end">
              <Badge 
                color={currentStatus.badgeColor}
                variant="shadow"
                size="md"
                className="font-semibold"
              >
                {new Date(item.date).toLocaleDateString('en-IN', { 
                  month: 'short', 
                  day: 'numeric',
                  year: 'numeric'
                })}
              </Badge>
              {item.status === 'active' && (
                <Badge color="warning" variant="flat" size="sm">
                  In Progress
                </Badge>
              )}
            </div>
          </div>
          
          {/* Progress indicator */}
          <div className="flex items-center gap-2 text-xs text-slate-500 mt-4 pt-3 border-t border-slate-100">
            <div className={`w-2 h-2 rounded-full ${
              item.status === 'completed' ? 'bg-emerald-500' : 
              item.status === 'active' ? 'bg-blue-500 animate-pulse' : 'bg-slate-300'
            }`}></div>
            <span className="font-medium">
              Step {index + 1} of cultivation process
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineStep;