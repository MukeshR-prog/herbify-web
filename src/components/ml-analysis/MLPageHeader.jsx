import React from "react";
import { Card, CardBody, Badge } from "@heroui/react";
import { Bot, Activity, TrendingUp } from "lucide-react";

const MLPageHeader = ({ 
  isModelActive = true, 
  title = "Quality Tracking & ML Predictions",
  subtitle = "AI-powered quality analysis and spoilage predictions",
  stats = null 
}) => {
  return (
    <div className="space-y-6">
      {/* Main Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">{title}</h1>
          <p className="text-lg text-slate-600">{subtitle}</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge 
            color={isModelActive ? "success" : "default"}
            variant="dot"
            size="lg"
            className="px-4 py-2"
          >
            <Bot className="w-4 h-4 mr-2" />
            AI Model {isModelActive ? "Active" : "Inactive"}
          </Badge>
        </div>
      </div>

      {/* Quick Stats Overview */}
      {stats && (
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 shadow-sm">
          <CardBody className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Activity className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">{stats.activeBatches}</p>
                  <p className="text-sm text-slate-600">Active Batches Monitored</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-100 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">{stats.predictionAccuracy}%</p>
                  <p className="text-sm text-slate-600">Prediction Accuracy</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="p-3 bg-amber-100 rounded-xl">
                  <Bot className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">{stats.alertsToday}</p>
                  <p className="text-sm text-slate-600">Alerts Generated Today</p>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default MLPageHeader;