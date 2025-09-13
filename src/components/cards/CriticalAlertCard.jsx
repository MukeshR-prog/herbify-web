"use client";
import { Card, CardBody } from "@heroui/react";
import { motion } from "framer-motion";
import { FaExclamationTriangle } from "react-icons/fa";
import { AlertTriangle, Thermometer, Droplets, Activity } from "lucide-react";

const CriticalAlertCard = ({ batchId, herb, time, confidence, temp, humidity, location }) => {
  return (
    <motion.div whileHover={{ scale: 1.02 }}>
      <Card className="bg-gradient-to-br from-red-50 to-red-100 border border-red-300 shadow-lg rounded-2xl">
        <CardBody className="space-y-4">
          {/* Header */}
          <div className="flex items-center gap-2 text-red-700 font-bold text-lg">
            <FaExclamationTriangle className="h-5 w-5" />
            Critical Quality Alert
          </div>

          {/* Details */}
          <p className="text-sm text-gray-700">
            <span className="font-semibold">{batchId} ({herb})</span> is at risk of spoilage within
            <span className="text-red-700 font-medium"> {time}</span>.
          </p>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <span className="flex items-center gap-1"><Thermometer size={14}/> Temp: <b>{temp}°C</b></span>
            <span className="flex items-center gap-1"><Droplets size={14}/> Humidity: <b>{humidity}%</b></span>
            <span className="flex items-center gap-1"><Activity size={14}/> Confidence: <b>{confidence}%</b></span>
            <span className="flex items-center gap-1"><AlertTriangle size={14}/> Location: <b>{location}</b></span>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-3">
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700">
              🚚 Dispatch Urgently
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
              🗑️ Mark for Disposal
            </button>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default CriticalAlertCard;
