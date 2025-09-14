import { Card, CardHeader, CardBody } from "@heroui/react";

const SectionCard = ({ 
  icon: Icon, 
  title, 
  subtitle, 
  children, 
  className = "", 
  headerColor = "bg-gradient-to-r from-slate-50 to-gray-50",
  iconBgColor = "bg-white",
  iconColor = "text-slate-700"
}) => (
  <Card className={`shadow-xl border-0 overflow-hidden hover:shadow-2xl transition-all duration-300 ${className}`}>
    <CardHeader className={`${headerColor} border-b border-slate-200 pb-6`}>
      <div className="flex items-center gap-4">
        <div className={`p-4 ${iconBgColor} rounded-2xl shadow-md hover:shadow-lg transition-shadow`}>
          <Icon className={`w-7 h-7 ${iconColor}`} />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-slate-900 mb-1">{title}</h3>
          {subtitle && <p className="text-sm text-slate-600 leading-relaxed">{subtitle}</p>}
        </div>
      </div>
    </CardHeader>
    <CardBody className="p-8">
      {children}
    </CardBody>
  </Card>
);

export default SectionCard;