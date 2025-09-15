import React from "react";
import { Card, CardBody, Badge, Button, Progress } from "@heroui/react";
import { AlertTriangle, Thermometer, Droplets, Clock, Truck, Trash2, Eye } from "lucide-react";

const CriticalAlertCard = ({ 
  batchId = "N/A",
  herb = "Unknown Herb", 
  timeRemaining = "Unknown",
  confidence = 0,
  temperature = null,
  humidity = null,
  location = null,
  onDispatch = null,
  onDispose = null,
  onViewDetails = null,
  severity = "high" // high, medium, low
}) => {
  const severityConfig = {
    high: {
      bgColor: "bg-gradient-to-br from-red-50 to-rose-100",
      borderColor: "border-red-300",
      iconColor: "text-red-600",
      badgeColor: "danger",
      progressColor: "danger"
    },
    medium: {
      bgColor: "bg-gradient-to-br from-amber-50 to-orange-100", 
      borderColor: "border-amber-300",
      iconColor: "text-amber-600",
      badgeColor: "warning",
      progressColor: "warning"
    },
    low: {
      bgColor: "bg-gradient-to-br from-blue-50 to-indigo-100",
      borderColor: "border-blue-300", 
      iconColor: "text-blue-600",
      badgeColor: "primary",
      progressColor: "primary"
    }
  };

  const config = severityConfig[severity];

  return (
    <Card className={`${config.bgColor} ${config.borderColor} border-2 shadow-lg hover:shadow-xl transition-all duration-300`}>
      <CardBody className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white rounded-xl shadow-sm">
              <AlertTriangle className={`w-6 h-6 ${config.iconColor}`} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Critical Quality Alert</h3>
              <p className="text-sm text-slate-600 mt-1">Immediate attention required</p>
            </div>
          </div>
          <Badge color={config.badgeColor} variant="shadow">
            {severity.toUpperCase()}
          </Badge>
        </div>

        {/* Batch Information */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-lg text-slate-800">
              Batch {batchId}
            </h4>
            <span className="text-sm font-medium text-slate-600">{herb}</span>
          </div>
          
          <div className="p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-white/50">
            <p className="text-slate-700 font-medium">
              ⚠️ Spoilage risk detected within <span className="text-red-600 font-bold">{timeRemaining}</span>
            </p>
          </div>
        </div>

        {/* Environmental Metrics */}
        <div className="grid grid-cols-2 gap-4">
          {temperature && (
            <div className="flex items-center gap-2 p-3 bg-white/60 rounded-lg">
              <Thermometer className="w-4 h-4 text-red-500" />
              <div>
                <p className="text-xs text-slate-500">Temperature</p>
                <p className="font-semibold text-slate-800">{temperature}°C</p>
              </div>
            </div>
          )}
          
          {humidity && (
            <div className="flex items-center gap-2 p-3 bg-white/60 rounded-lg">
              <Droplets className="w-4 h-4 text-blue-500" />
              <div>
                <p className="text-xs text-slate-500">Humidity</p>
                <p className="font-semibold text-slate-800">{humidity}%</p>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 p-3 bg-white/60 rounded-lg">
            <Clock className="w-4 h-4 text-purple-500" />
            <div>
              <p className="text-xs text-slate-500">AI Confidence</p>
              <p className="font-semibold text-slate-800">{confidence}%</p>
            </div>
          </div>

          {location && (
            <div className="flex items-center gap-2 p-3 bg-white/60 rounded-lg">
              <div className="w-4 h-4 bg-green-500 rounded-full" />
              <div>
                <p className="text-xs text-slate-500">Location</p>
                <p className="font-semibold text-slate-800">{location}</p>
              </div>
            </div>
          )}
        </div>

        {/* Confidence Progress */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-slate-600">Prediction Confidence</span>
            <span className="text-sm font-bold text-slate-800">{confidence}%</span>
          </div>
          <Progress 
            value={confidence} 
            color={config.progressColor}
            size="lg"
            className="max-w-full"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/50">
          <Button 
            color="danger" 
            variant="shadow"
            className="flex-1"
            startContent={<Truck className="w-4 h-4" />}
            onPress={onDispatch}
          >
            Urgent Dispatch
          </Button>
          
          <Button 
            color="default" 
            variant="bordered"
            className="flex-1"
            startContent={<Eye className="w-4 h-4" />}
            onPress={onViewDetails}
          >
            View Details
          </Button>
          
          <Button 
            color="danger" 
            variant="flat"
            startContent={<Trash2 className="w-4 h-4" />}
            onPress={onDispose}
            className="sm:w-auto"
          >
            Mark for Disposal
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default CriticalAlertCard;