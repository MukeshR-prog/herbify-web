import React from "react";
import { Card, CardBody, Button, Divider } from "@heroui/react";
import { Lightbulb, Calendar, ShoppingCart, TrendingUp, ExternalLink } from "lucide-react";

const AIInsightsCard = ({ 
  type = "suggestion", // suggestion, market, optimization
  title = "AI Insight",
  description = "No description available", 
  footer = null,
  icon = null,
  actionLabel = "Learn More",
  onAction = null,
  priority = "normal", // high, normal, low
  data = null,
  isMarketCard = false
}) => {
  const typeConfig = {
    suggestion: {
      bgColor: "bg-gradient-to-br from-blue-50 to-indigo-100",
      borderColor: "border-blue-200",
      iconBg: "bg-blue-100", 
      iconColor: "text-blue-600",
      defaultIcon: Lightbulb
    },
    market: {
      bgColor: "bg-gradient-to-br from-emerald-50 to-green-100",
      borderColor: "border-emerald-200",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600", 
      defaultIcon: ShoppingCart
    },
    optimization: {
      bgColor: "bg-gradient-to-br from-purple-50 to-violet-100",
      borderColor: "border-purple-200",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      defaultIcon: TrendingUp
    }
  };

  const priorityConfig = {
    high: {
      badge: "🔥 High Priority",
      badgeColor: "bg-red-100 text-red-700 border border-red-300"
    },
    normal: {
      badge: "📊 Standard",
      badgeColor: "bg-blue-100 text-blue-700 border border-blue-300" 
    },
    low: {
      badge: "💡 Suggestion", 
      badgeColor: "bg-gray-100 text-gray-700 border border-gray-300"
    }
  };

  const config = typeConfig[type];
  const IconComponent = icon || config.defaultIcon;
  const priorityInfo = priorityConfig[priority];

  if (isMarketCard) {
    return (
      <Card className={`${config.bgColor} ${config.borderColor} border-2 shadow-lg hover:shadow-xl transition-all duration-300`}>
        <CardBody className="p-6 space-y-4">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-3 ${config.iconBg} rounded-xl shadow-sm`}>
              <IconComponent className={`w-6 h-6 ${config.iconColor}`} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">{title}</h3>
          </div>

          {/* Market Data Content */}
          {data && (
            <div className="space-y-4">
              {data.list && (
                <ul className="space-y-3">
                  {data.list.map((item, index) => (
                    <li key={index} className="flex justify-between items-center p-3 bg-white/70 rounded-lg">
                      <span className="text-slate-700">{item.label}</span>
                      <span className={`font-semibold ${
                        item.trend === 'up' ? 'text-emerald-600' : 
                        item.trend === 'down' ? 'text-red-600' : 'text-slate-600'
                      }`}>
                        {item.value}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              
              {data.pricing && (
                <div className="space-y-2 p-4 bg-white/70 rounded-lg">
                  {Object.entries(data.pricing).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-slate-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="font-semibold text-slate-800">{value}</span>
                    </div>
                  ))}
                </div>
              )}

              {data.bulletPoints && (
                <ul className="space-y-2">
                  {data.bulletPoints.map((point, index) => (
                    <li key={index} className={`text-sm flex items-start gap-2 ${
                      point.includes('⚠') ? 'text-amber-700' : 
                      point.includes('Reduce') ? 'text-emerald-700' : 'text-slate-700'
                    }`}>
                      <span className="mt-1">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </CardBody>
      </Card>
    );
  }

  return (
    <Card className={`${config.bgColor} ${config.borderColor} border-2 shadow-lg hover:shadow-xl transition-all duration-300`}>
      <CardBody className="p-6 space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-3 ${config.iconBg} rounded-xl shadow-sm`}>
              <IconComponent className={`w-6 h-6 ${config.iconColor}`} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">{title}</h3>
            </div>
          </div>
          
          {priority !== 'normal' && (
            <span className={`px-3 py-1 text-xs font-medium rounded-full ${priorityInfo.badgeColor}`}>
              {priorityInfo.badge}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-white/50">
          <p className="text-slate-700 leading-relaxed">{description}</p>
        </div>

        {/* Footer */}
        {footer && (
          <>
            <Divider className="bg-white/50" />
            <div className="text-sm text-slate-600 bg-white/50 p-3 rounded-lg">
              {footer}
            </div>
          </>
        )}

        {/* Action Button */}
        {onAction && (
          <Button 
            variant="flat"
            color={type === 'suggestion' ? 'primary' : type === 'market' ? 'success' : 'secondary'}
            className="w-full"
            endContent={<ExternalLink className="w-4 h-4" />}
            onPress={onAction}
          >
            {actionLabel}
          </Button>
        )}
      </CardBody>
    </Card>
  );
};

export default AIInsightsCard;