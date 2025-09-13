"use client";
import { Card, CardBody } from "@heroui/react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";

const MetricCard = ({ title, value, subtitle, percentage, color, trend = "up" }) => {
  return (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
      <Card className="shadow-lg border-0 bg-gradient-to-r from-indigo-50 to-purple-50 h-full flex flex-col">
        <CardBody className="flex flex-col justify-between">
          {/* Top Section */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16">
              <CircularProgressbar
                value={percentage}
                text={`${percentage}%`}
                styles={buildStyles({
                  textSize: "12px",
                  pathColor: trend === "up" ? "#16a34a" : "#dc2626",
                  textColor: "#333",
                  trailColor: "#e5e7eb",
                })}
              />
            </div>
            <div>
              <h4 className="text-gray-700 font-semibold">{title}</h4>
              <p className={`text-2xl font-bold ${color}`}>{value}</p>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                {trend === "up" ? (
                  <TrendingUp size={14} className="text-green-500" />
                ) : (
                  <TrendingDown size={14} className="text-red-500" />
                )}
                {subtitle}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-3"></div>

          {/* Bottom Stats */}
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
            <div className="flex flex-col">
              <span className="font-medium">Avg Processing</span>
              <span className="text-gray-800">6.2 hrs</span>
            </div>
            <div className="flex flex-col">
              <span className="font-medium">Last Updated</span>
              <span className="text-gray-800">2h ago</span>
            </div>
            <div className="flex flex-col">
              <span className="font-medium">Anomalies</span>
              <span className="text-red-600 font-semibold">3 detected</span>
            </div>
            <div className="flex flex-col">
              <span className="font-medium">Confidence</span>
              <span className="text-green-600 font-semibold">95%</span>
            </div>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default MetricCard;
