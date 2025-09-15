"use client";
import { Card, CardHeader, CardBody } from "@heroui/react";
import { LuClock } from "react-icons/lu";
import { CiBoxes } from "react-icons/ci";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { LiaExclamationTriangleSolid } from "react-icons/lia";

const StatsCard = ({ stats }) => {
  const getIcon = (type) => {
    switch (type) {
      case "users":
        return <CiBoxes className="h-5 w-5" />;
      case "clock":
        return <LuClock className="h-5 w-5" />;
      case "transactions":
        return <FaArrowRightArrowLeft className="h-5 w-5" />;
      case "alerts":
        return <LiaExclamationTriangleSolid className="h-5 w-5" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800";
      case "warning":
        return "bg-orange-100 text-orange-800";
      case "info":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTrendColor = (trend) => {
    return trend?.startsWith("+") ? "text-green-600" : "text-red-600";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
        >
          <CardHeader className="flex items-center justify-between p-3">
            <div
              className={`p-2 rounded-md ${
                stat.iconBg === "blue"
                  ? "bg-blue-100 text-blue-600"
                  : stat.iconBg === "orange"
                  ? "bg-orange-100 text-orange-600"
                  : stat.iconBg === "green"
                  ? "bg-green-100 text-green-600"
                  : stat.iconBg === "red"
                  ? "bg-red-100 text-red-600"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {getIcon(stat.icon)}
            </div>
            {stat.badge && (
              <span
                className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(
                  stat.badgeType
                )}`}
              >
                {stat.badge}
              </span>
            )}
          </CardHeader>

          <CardBody className="p-3">
            <div className="space-y-1">
              <div className="flex items-end gap-2">
                <h3 className="text-2xl font-semibold text-gray-900">
                  {stat.value}
                </h3>
                {stat.trend && (
                  <span
                    className={`text-xs font-medium ${getTrendColor(
                      stat.trend
                    )}`}
                  >
                    {stat.trend}
                  </span>
                )}
              </div>
              <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
            </div>

            {stat.subtitle && (
              <div className="mt-2 pt-2 border-t border-gray-100">
                <div className="flex items-center gap-2 text-xs">
                  {stat.subtitleIcon && (
                    <span
                      className={
                        stat.subtitleIcon === "up"
                          ? "text-green-500"
                          : stat.subtitleIcon === "warning"
                          ? "text-orange-500"
                          : stat.subtitleIcon === "check"
                          ? "text-green-500"
                          : stat.subtitleIcon === "pending"
                          ? "text-orange-500"
                          : "text-gray-500"
                      }
                    >
                      {stat.subtitleIcon === "up" && "↗"}
                      {stat.subtitleIcon === "warning" && "●"}
                      {stat.subtitleIcon === "check" && "✓"}
                      {stat.subtitleIcon === "pending" && "⏳"}
                    </span>
                  )}
                  <span
                    className={
                      stat.subtitleColor === "green"
                        ? "text-green-600"
                        : stat.subtitleColor === "orange"
                        ? "text-orange-600"
                        : "text-gray-500"
                    }
                  >
                    {stat.subtitle}
                  </span>
                </div>
              </div>
            )}
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default StatsCard;
