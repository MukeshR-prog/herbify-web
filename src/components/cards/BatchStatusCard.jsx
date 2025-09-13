"use client";
import { Card, CardBody } from "@heroui/react";
import { motion } from "framer-motion";
import { Leaf, AlertTriangle, CheckCircle, Flame, Clock } from "lucide-react";

const icons = {
  warning: <AlertTriangle className="text-orange-500" />,
  good: <CheckCircle className="text-green-500" />,
  critical: <Flame className="text-red-500" />,
  fresh: <Leaf className="text-blue-500" />,
};

const statusColors = {
  warning: "bg-orange-100 text-orange-700",
  good: "bg-green-100 text-green-700",
  critical: "bg-red-100 text-red-700",
  fresh: "bg-blue-100 text-blue-700",
};

const BatchStatusCard = ({ batchId, herb, quantity, status, message, progress, lastUpdated }) => {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Card className="shadow-xl border-0 bg-gradient-to-r from-white to-gray-50 rounded-2xl">
        <CardBody className="space-y-3">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold text-gray-800">Batch {batchId}</h4>
            <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${statusColors[status]}`}>
              {icons[status]} {status.toUpperCase()}
            </span>
          </div>
          <p className="text-sm text-gray-600">{herb} - {quantity} kg</p>
          <p className="text-sm text-gray-700 italic">{message}</p>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className={`h-2 rounded-full transition-all duration-500 ease-in-out ${
                status === "critical" ? "bg-red-500" : status === "warning" ? "bg-orange-500" : "bg-green-500"
              }`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Footer info */}
          <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
            <span className="flex items-center gap-1"><Clock size={14}/> Last update: {lastUpdated}</span>
            <button className="px-2 py-1 bg-blue-50 text-blue-600 rounded-md text-xs hover:bg-blue-100">
              View Details
            </button>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default BatchStatusCard;
