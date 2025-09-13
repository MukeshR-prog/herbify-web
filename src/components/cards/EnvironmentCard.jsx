"use client";
import { Card, CardBody } from "@heroui/react";
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { motion } from "framer-motion";
import { Thermometer, Droplet, Wind } from "lucide-react";

const icons = {
  temperature: <Thermometer className="w-5 h-5 text-red-500" />,
  humidity: <Droplet className="w-5 h-5 text-blue-500" />,
  air: <Wind className="w-5 h-5 text-green-500" />,
};

const EnvironmentCard = ({ type, label, value, unit, status, statusColor, data, min, max, avg, lastUpdated }) => {
  return (
    <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.2 }}>
      <Card className="shadow-md border border-gray-100 rounded-2xl">
        <CardBody className="space-y-4">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              {icons[type]}
              <h4 className="text-sm font-semibold text-gray-700">{label}</h4>
            </div>
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${statusColor}`}
            >
              {status}
            </span>
          </div>

          {/* Value */}
          <div>
            <h3 className="text-3xl font-bold text-gray-900">
              {value}
              <span className="text-lg font-medium text-gray-500 ml-1">{unit}</span>
            </h3>
            <p className="text-xs text-gray-400">Last updated: {lastUpdated}</p>
          </div>

          {/* Mini chart */}
          <div className="h-20">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <XAxis dataKey="time" hide />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="val"
                  stroke="url(#colorUv)"
                  strokeWidth={2.5}
                  dot={false}
                />
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.9} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Stats row */}
          <div className="flex justify-between text-xs text-gray-600 border-t pt-2">
            <span>Min: <span className="font-medium">{min}{unit}</span></span>
            <span>Max: <span className="font-medium">{max}{unit}</span></span>
            <span>Avg: <span className="font-medium">{avg}{unit}</span></span>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default EnvironmentCard;
