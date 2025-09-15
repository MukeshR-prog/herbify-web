import React from "react";
import { Card, CardBody, Badge, Progress, Button } from "@heroui/react";
import { Package, Eye, AlertTriangle, CheckCircle, Clock, Flame } from "lucide-react";

const BatchStatusCard = ({ 
  batchId = "N/A",
  herb = "Unknown",
  quantity = "0kg", 
  status = "unknown",
  message = "No status available",
  progress = 0,
  lastUpdated = "Unknown",
  priority = "normal", // high, normal, low
  onViewDetails = null,
  additionalInfo = null
}) => {
  const statusConfig = {
    critical: {
      icon: Flame,
      color: "danger", 
      bgColor: "bg-gradient-to-br from-red-100 to-rose-100",
      iconColor: "text-red-600",
      borderColor: "border-red-300"
    },
    warning: {
      icon: AlertTriangle,
      color: "warning",
      bgColor: "bg-gradient-to-br from-amber-100 to-yellow-100", 
      iconColor: "text-amber-600",
      borderColor: "border-amber-300"
    },
    good: {
      icon: CheckCircle,
      color: "success",
      bgColor: "bg-gradient-to-br from-green-100 to-emerald-100",
      iconColor: "text-green-600", 
      borderColor: "border-green-300"
    },
    fresh: {
      icon: Package,
      color: "primary",
      bgColor: "bg-gradient-to-br from-blue-100 to-indigo-100",
      iconColor: "text-blue-600",
      borderColor: "border-blue-300"
    },
    unknown: {
      icon: Package,
      color: "default",
      bgColor: "bg-gradient-to-br from-slate-100 to-gray-100",
      iconColor: "text-slate-600",
      borderColor: "border-slate-300"
    }
  };

  const config = statusConfig[status] || statusConfig.unknown;
  const StatusIcon = config.icon;

  const priorityDot = {
    high: "bg-red-500",
    normal: "bg-blue-500", 
    low: "bg-green-500"
  };

  return (
    <Card className={`
      ${config.bgColor} ${config.borderColor} border-2 shadow-lg hover:shadow-xl 
      transition-all duration-300 hover:-translate-y-1
    `}>
      <CardBody className="p-6 space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white rounded-xl shadow-sm">
              <StatusIcon className={`w-6 h-6 ${config.iconColor}`} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Batch {batchId}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <div className={`w-2 h-2 rounded-full ${priorityDot[priority]}`} />
                <span className="text-sm text-slate-600 capitalize">{priority} Priority</span>
              </div>
            </div>
          </div>
          <Badge color={config.color} variant="shadow" size="md">
            {status.toUpperCase()}
          </Badge>
        </div>

        {/* Product Info */}
        <div className="space-y-3">
          <div className="p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-white/50">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-slate-800">{herb}</h4>
              <span className="text-sm font-medium text-slate-600">{quantity}</span>
            </div>
            <p className="text-sm text-slate-700 font-medium">{message}</p>
          </div>
          
          {additionalInfo && (
            <div className="p-3 bg-white/50 rounded-lg">
              <p className="text-xs text-slate-600">{additionalInfo}</p>
            </div>
          )}
        </div>

        {/* Progress Indicator */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-slate-600">
              {status === 'critical' ? 'Risk Level' : 
               status === 'warning' ? 'Caution Level' : 
               status === 'fresh' ? 'Freshness' : 'Quality Score'}
            </span>
            <span className="text-sm font-bold text-slate-800">{progress}%</span>
          </div>
          <Progress 
            value={progress} 
            color={config.color}
            size="lg"
            className="max-w-full"
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/50">
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <Clock className="w-3 h-3" />
            <span>Updated: {lastUpdated}</span>
          </div>
          
          <Button 
            size="sm" 
            color="primary" 
            variant="flat"
            startContent={<Eye className="w-4 h-4" />}
            onPress={onViewDetails}
          >
            View Details
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default BatchStatusCard;