import React from "react";
import { Card, CardBody, Progress, Button } from "@heroui/react";
import { TrendingUp, TrendingDown, Activity, Zap, BarChart3, Target } from "lucide-react";

const MLMetricsCard = ({ 
  title = "ML Metric",
  value = "0",
  subtitle = "No change",
  percentage = 0,
  trend = "stable", // up, down, stable
  color = "primary", // success, danger, warning, primary
  showProgress = true,
  icon = null,
  onViewDetails = null,
  additionalData = null
}) => {
  const colorConfig = {
    success: {
      bgColor: "bg-gradient-to-br from-emerald-50 to-green-100",
      borderColor: "border-emerald-300",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      progressColor: "success"
    },
    danger: {
      bgColor: "bg-gradient-to-br from-red-50 to-rose-100",
      borderColor: "border-red-300", 
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      progressColor: "danger"
    },
    warning: {
      bgColor: "bg-gradient-to-br from-amber-50 to-orange-100",
      borderColor: "border-amber-300",
      iconBg: "bg-amber-100", 
      iconColor: "text-amber-600",
      progressColor: "warning"
    },
    primary: {
      bgColor: "bg-gradient-to-br from-blue-50 to-indigo-100",
      borderColor: "border-blue-300",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600", 
      progressColor: "primary"
    }
  };

  const trendConfig = {
    up: {
      icon: TrendingUp,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100"
    },
    down: {
      icon: TrendingDown,
      color: "text-red-600",
      bgColor: "bg-red-100" 
    },
    stable: {
      icon: Activity,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    }
  };

  const config = colorConfig[color];
  const trendInfo = trendConfig[trend];
  const TrendIcon = trendInfo.icon;
  
  const defaultIcons = {
    success: Target,
    danger: Zap,
    warning: BarChart3,
    primary: Activity
  };
  
  const IconComponent = icon || defaultIcons[color];

  return (
    <Card className={`${config.bgColor} ${config.borderColor} border-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
      <CardBody className="p-6 space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-3 ${config.iconBg} rounded-xl shadow-sm`}>
              <IconComponent className={`w-6 h-6 ${config.iconColor}`} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">{title}</h3>
              <p className="text-sm text-slate-600 mt-1">{subtitle}</p>
            </div>
          </div>
          
          {/* Trend Indicator */}
          <div className={`p-2 ${trendInfo.bgColor} rounded-lg`}>
            <TrendIcon className={`w-4 h-4 ${trendInfo.color}`} />
          </div>
        </div>

        {/* Main Value */}
        <div className="text-center p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-white/50">
          <div className="text-4xl font-black text-slate-900 mb-2">
            {value}
          </div>
          {additionalData && (
            <div className="grid grid-cols-2 gap-4 text-sm">
              {Object.entries(additionalData).map(([key, val]) => (
                <div key={key} className="text-center">
                  <p className="text-slate-500 capitalize text-xs">{key}</p>
                  <p className="font-semibold text-slate-800">{val}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Progress Bar */}
        {showProgress && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-600">Performance</span>
              <span className="text-sm font-bold text-slate-800">{percentage}%</span>
            </div>
            <Progress 
              value={percentage} 
              color={config.progressColor}
              size="lg"
              className="max-w-full"
            />
          </div>
        )}

        {/* Action Button */}
        {onViewDetails && (
          <Button 
            variant="flat" 
            color={color}
            className="w-full"
            onPress={onViewDetails}
          >
            View Details
          </Button>
        )}
      </CardBody>
    </Card>
  );
};

export default MLMetricsCard;