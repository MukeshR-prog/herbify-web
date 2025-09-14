import { Progress } from "@heroui/react";

const MetricDisplay = ({ 
  icon: Icon, 
  label, 
  value, 
  subValue, 
  color = "emerald", 
  size = "default",
  trend = null,
  percentage = null
}) => {
  const sizeClasses = size === "large" ? "p-8" : "p-6";
  const iconSize = size === "large" ? "w-10 h-10" : "w-7 h-7";
  const valueSize = size === "large" ? "text-4xl" : "text-2xl";

  const colorVariants = {
    indigo: {
      bg: "from-indigo-50 to-indigo-100",
      iconBg: "bg-indigo-100",
      iconText: "text-indigo-600"
    },
    emerald: {
      bg: "from-emerald-50 to-green-100",
      iconBg: "bg-emerald-100",
      iconText: "text-emerald-600"
    },
    blue: {
      bg: "from-blue-50 to-cyan-100",
      iconBg: "bg-blue-100",
      iconText: "text-blue-600"
    },
    purple: {
      bg: "from-purple-50 to-violet-100",
      iconBg: "bg-purple-100",
      iconText: "text-purple-600"
    },
    amber: {
      bg: "from-amber-50 to-yellow-100",
      iconBg: "bg-amber-100",
      iconText: "text-amber-600"
    },
    rose: {
      bg: "from-rose-50 to-pink-100",
      iconBg: "bg-rose-100",
      iconText: "text-rose-600"
    }
  };

  const { bg, iconBg, iconText } = colorVariants[color] || colorVariants.emerald;

  return (
    <div
      className={`${sizeClasses} bg-gradient-to-br ${bg} rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group`}
    >
      {/* Decorative background icon */}
      <div className="absolute top-0 right-0 w-24 h-24 opacity-10 transform rotate-12 translate-x-6 -translate-y-6">
        <Icon className="w-full h-full text-gray-300" />
      </div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 ${iconBg} rounded-xl shadow-sm group-hover:shadow-md transition-shadow`}>
            <Icon className={`${iconSize} ${iconText}`} />
          </div>
          <div className="text-right">
            <div className={`${valueSize} font-bold text-gray-900 leading-none mb-1`}>
              {value}
            </div>
            {subValue && <div className="text-sm font-medium text-gray-500">{subValue}</div>}
            {trend && (
              <div className={`text-xs flex items-center gap-1 mt-1 ${trend > 0 ? "text-emerald-600" : "text-rose-500"}`}>
                {trend > 0 ? "↗" : "↘"} {Math.abs(trend)}%
              </div>
            )}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-700 mb-2">{label}</p>
          {percentage && (
            <div className="space-y-2">
              <Progress 
                value={percentage} 
                color={color === "emerald" ? "success" : color === "amber" ? "warning" : "primary"}
                size="sm"
                className="max-w-full"
              />
              <div className="text-xs text-gray-500 text-right">{percentage}% completion</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MetricDisplay;
