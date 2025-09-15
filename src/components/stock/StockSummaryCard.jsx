import React from "react";
import { Card, CardBody } from "@heroui/react";
import { Package, TrendingUp, AlertTriangle, Calendar } from "lucide-react";

const StockSummaryCard = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon = Package,
  color = "blue", 
  trend = null,
  onClick = null 
}) => {
  const colorConfig = {
    blue: {
      bgColor: "bg-gradient-to-br from-blue-50 to-indigo-100",
      borderColor: "border-blue-200",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      textColor: "text-blue-800"
    },
    green: {
      bgColor: "bg-gradient-to-br from-green-50 to-emerald-100", 
      borderColor: "border-green-200",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      textColor: "text-green-800"
    },
    amber: {
      bgColor: "bg-gradient-to-br from-amber-50 to-yellow-100",
      borderColor: "border-amber-200", 
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      textColor: "text-amber-800"
    },
    red: {
      bgColor: "bg-gradient-to-br from-red-50 to-rose-100",
      borderColor: "border-red-200",
      iconBg: "bg-red-100", 
      iconColor: "text-red-600",
      textColor: "text-red-800"
    },
    purple: {
      bgColor: "bg-gradient-to-br from-purple-50 to-violet-100",
      borderColor: "border-purple-200",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600", 
      textColor: "text-purple-800"
    }
  };

  const config = colorConfig[color];

  return (
    <Card 
      className={`${config.bgColor} ${config.borderColor} border-2 shadow-lg hover:shadow-xl transition-all duration-300 ${
        onClick ? 'cursor-pointer hover:-translate-y-1' : ''
      }`}
      isPressable={!!onClick}
      onPress={onClick}
    >
      <CardBody className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-3 ${config.iconBg} rounded-xl shadow-sm`}>
                <Icon className={`w-6 h-6 ${config.iconColor}`} />
              </div>
              <div>
                <h3 className="text-sm font-medium text-slate-600 uppercase tracking-wide">
                  {title}
                </h3>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-3xl font-bold text-slate-900">
                {value}
              </div>
              {subtitle && (
                <p className="text-sm text-slate-600 font-medium">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {trend && (
            <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
              trend > 0 
                ? 'bg-emerald-100 text-emerald-700' 
                : trend < 0 
                  ? 'bg-red-100 text-red-700'
                  : 'bg-slate-100 text-slate-700'
            }`}>
              {trend > 0 ? '↗' : trend < 0 ? '↘' : '→'}
              {Math.abs(trend)}%
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default StockSummaryCard;