import React from "react";
import { Card, CardBody, Badge } from "@heroui/react";
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis, Area, AreaChart } from "recharts";
import { Thermometer, Droplets, Wind, Activity, TrendingUp, TrendingDown } from "lucide-react";

const EnvironmentCard = ({ 
  type = "temperature",
  label = "Environmental Data", 
  value = 0,
  unit = "",
  status = "Normal",
  data = [],
  min = 0,
  max = 100, 
  avg = 50,
  lastUpdated = "Unknown",
  trend = "stable", // up, down, stable
  showChart = true,
  threshold = null,
  onViewDetails = null
}) => {
  const typeConfig = {
    temperature: {
      icon: Thermometer,
      color: "text-red-500",
      bgColor: "bg-gradient-to-br from-red-50 to-rose-100",
      chartColor: "#ef4444",
      borderColor: "border-red-200"
    },
    humidity: {
      icon: Droplets, 
      color: "text-blue-500",
      bgColor: "bg-gradient-to-br from-blue-50 to-cyan-100",
      chartColor: "#3b82f6",
      borderColor: "border-blue-200"
    },
    air: {
      icon: Wind,
      color: "text-green-500", 
      bgColor: "bg-gradient-to-br from-green-50 to-emerald-100",
      chartColor: "#10b981",
      borderColor: "border-green-200"
    },
    pressure: {
      icon: Activity,
      color: "text-purple-500",
      bgColor: "bg-gradient-to-br from-purple-50 to-violet-100", 
      chartColor: "#8b5cf6",
      borderColor: "border-purple-200"
    }
  };

  const statusColors = {
    "Optimal": "success",
    "Normal": "primary", 
    "Above Optimal": "warning",
    "High Moisture": "warning",
    "Critical": "danger",
    "Low": "default"
  };

  const trendIcons = {
    up: <TrendingUp className="w-4 h-4 text-green-500" />,
    down: <TrendingDown className="w-4 h-4 text-red-500" />,
    stable: <Activity className="w-4 h-4 text-blue-500" />
  };

  const config = typeConfig[type] || typeConfig.temperature;
  const Icon = config.icon;

  return (
    <Card className={`${config.bgColor} ${config.borderColor} border-2 shadow-lg hover:shadow-xl transition-all duration-300`}>
      <CardBody className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white rounded-xl shadow-sm">
              <Icon className={`w-6 h-6 ${config.color}`} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">{label}</h3>
              <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                <span>Last updated: {lastUpdated}</span>
                {trendIcons[trend]}
              </p>
            </div>
          </div>
          <Badge 
            color={statusColors[status] || "default"} 
            variant="shadow"
            size="md"
          >
            {status}
          </Badge>
        </div>

        {/* Current Value */}
        <div className="text-center p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-white/50">
          <div className="text-4xl font-black text-slate-900 mb-1">
            {value}
            <span className="text-xl font-medium text-slate-600 ml-1">{unit}</span>
          </div>
          {threshold && (
            <p className="text-sm text-slate-600">
              Threshold: {threshold}{unit}
            </p>
          )}
        </div>

        {/* Chart */}
        {showChart && data.length > 0 && (
          <div className="h-24">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id={`gradient-${type}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={config.chartColor} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={config.chartColor} stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" hide />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb", 
                    borderRadius: "12px",
                    fontSize: "12px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                  }}
                  formatter={(value) => [`${value}${unit}`, label]}
                />
                <Area
                  type="monotone"
                  dataKey="val"
                  stroke={config.chartColor}
                  strokeWidth={2.5}
                  fill={`url(#gradient-${type})`}
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Statistics */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/50">
          <div className="text-center">
            <p className="text-xs text-slate-500 mb-1">Min</p>
            <p className="font-semibold text-slate-800">{min}{unit}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-slate-500 mb-1">Average</p>
            <p className="font-semibold text-slate-800">{avg}{unit}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-slate-500 mb-1">Max</p>
            <p className="font-semibold text-slate-800">{max}{unit}</p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default EnvironmentCard;