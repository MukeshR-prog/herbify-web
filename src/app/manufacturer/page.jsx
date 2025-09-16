"use client";

import React, { useState, useEffect } from "react";
import { RoleGuard } from "@/components/RoleGuard";
import { ROLES } from "@/utils/roles";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Package,
  Clock,
  Repeat,
  FlaskConical,
  Sprout,
  Box,
  Truck,
  Leaf,
} from "lucide-react";
import { inventoryData } from "@/utils/inventoryData";
import { useProcessingBatches } from "@/store/useProcessingBatches";

// Mock data to simulate the state of the system
const mockDashboardData = {
  existingStockCount: 247,
  pendingRequests: 12,
  weeklyTransactions: { completed: 73, pending: 16 },
  spoilageAlerts: 3,
};

const COLORS = ["#00C49F", "#FFBB28", "#0088FE", "#FF8042"];

const QualityBar = ({ quality }) => {
  let bgColor;
  if (quality < 50) {
    bgColor = "bg-red-500";
  } else if (quality < 75) {
    bgColor = "bg-yellow-500";
  } else {
    bgColor = "bg-green-500";
  }

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className={`h-2.5 rounded-full ${bgColor}`}
        style={{ width: `${quality}%` }}
      ></div>
    </div>
  );
};

const ExpiryTag = ({ days }) => {
  let colorClass = "text-gray-600";
  let text = `${days} days left`;
  if (days <= 0) {
    colorClass = "text-red-500 font-semibold";
    text = "0 days left";
  } else if (days <= 7) {
    colorClass = "text-orange-500 font-semibold";
  }

  return <div className={colorClass}>{text}</div>;
};

export default function AnalyticsDashboard() {
  const [loading, setLoading] = useState(true);
  const { processingBatches } = useProcessingBatches();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  // Calculate dynamic stock chart data - herb types distribution
  const stockChartData = React.useMemo(() => {
    const herbTypeCounts = {};
    
    // Count each herb type
    inventoryData.forEach(item => {
      const herbType = item.herbType;
      herbTypeCounts[herbType] = (herbTypeCounts[herbType] || 0) + 1;
    });
    
    // Convert to chart data format
    return Object.entries(herbTypeCounts).map(([name, value]) => ({
      name,
      value
    }));
  }, []);

  // Calculate stock status data for bar chart
  const stockStatusData = React.useMemo(() => {
    const existingCount = inventoryData.length;
    const processingCount = processingBatches.length;
    const dispatchedCount = Math.max(0, 247 - existingCount - processingCount);

    return [
      { name: "Existing", value: existingCount },
      { name: "Processing", value: processingCount },
      { name: "Dispatched", value: dispatchedCount },
    ];
  }, [processingBatches]);

  if (loading) {
    return (
      <RoleGuard allowed={[ROLES.MANUFACTURER]}>
        <div className="flex flex-col items-center justify-center h-full min-h-screen">
          <svg
            className="animate-spin h-10 w-10 text-teal-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p className="mt-4 text-gray-700 text-lg">
            Loading dashboard analytics...
          </p>
        </div>
      </RoleGuard>
    );
  }

  return (
    <RoleGuard allowed={[ROLES.MANUFACTURER]}>
      <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-800 min-h-screen text-gray-900 dark:text-gray-100">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold">Manufacturer Dashboard</h2>
          {/* Quick Actions section */}
          <div className="flex space-x-2">
            <button className="flex items-center space-x-1 p-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors duration-200 text-xs sm:text-sm">
              <Sprout size={16} />
              <span>Register New Harvest</span>
            </button>
            <button className="flex items-center space-x-1 p-2 rounded-lg border-2 border-green-600 text-green-600 hover:bg-green-50 transition-colors duration-200 text-xs sm:text-sm">
              <Leaf size={16} />
              <span>View All Batches</span>
            </button>
            <button className="flex items-center space-x-1 p-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors duration-200 text-xs sm:text-sm">
              <Box size={16} />
              <span>Download Report</span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Existing Stock Card */}
          <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-3 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-1">
              <span className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                <Package size={18} />
              </span>
              <span className="bg-orange-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
                Urgent
              </span>
            </div>
            <h3 className="text-sm font-semibold">Existing Stock Count</h3>
            <p className="text-3xl font-bold my-1">
              {mockDashboardData.existingStockCount}
            </p>
            <p className="text-green-500 font-semibold text-xs">+5.2%</p>
            <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
              12 batches added today
            </p>
          </div>

          {/* Pending Requests Card */}
          <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-3 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-1">
              <span className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                <Clock size={18} />
              </span>
              <span className="bg-orange-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
                Urgent
              </span>
            </div>
            <h3 className="text-sm font-semibold">Pending Requests</h3>
            <p className="text-3xl font-bold my-1">
              {mockDashboardData.pendingRequests}
            </p>
            <p className="text-orange-500 font-semibold text-xs">
              3 requests {">"} 24hrs old
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
              Review and act now
            </p>
          </div>

          {/* Weekly Transactions Card */}
          <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-3 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-1">
              <span className="p-2 bg-green-100 text-green-600 rounded-lg">
                <Repeat size={18} />
              </span>
              <span className="bg-gray-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
                This Week
              </span>
            </div>
            <h3 className="text-sm font-semibold">Weekly Transactions</h3>
            <p className="text-3xl font-bold my-1">
              {mockDashboardData.weeklyTransactions.completed +
                mockDashboardData.weeklyTransactions.pending}
            </p>
            <p className="text-gray-500 dark:text-gray-400 font-semibold text-xs">
              {mockDashboardData.weeklyTransactions.completed} Completed{" "}
              {mockDashboardData.weeklyTransactions.pending} Pending
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
              Total actions this week
            </p>
          </div>

          {/* Spoilage Alerts Card */}
          <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-3 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-1">
              <span className="p-2 bg-red-100 text-red-600 rounded-lg">
                <FlaskConical size={18} />
              </span>
              <span className="bg-red-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
                Expiring
              </span>
            </div>
            <h3 className="text-sm font-semibold">Spoilage Alerts</h3>
            <p className="text-3xl font-bold my-1">
              {mockDashboardData.spoilageAlerts}
            </p>
            <p className="text-red-500 font-semibold text-xs">
              3 batches expiring {"<"} 48 hrs
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
              Act now to prevent loss
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
          {/* Bar Chart for Stock Status */}
          <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-4">
            <h3 className="text-xl font-bold mb-4">Stock Status Overview</h3>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={stockStatusData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="value"
                    name="Units"
                    fill="#00C49F"
                    radius={[10, 10, 0, 0]}
                    barSize={60} // Reduced bar size
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart for Herb Types Distribution */}
          <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-4">
            <h3 className="text-xl font-bold mb-4">Herb Types in Stock</h3>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stockChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {stockChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}
