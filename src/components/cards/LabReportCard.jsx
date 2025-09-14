import { Badge, Progress, Button } from "@heroui/react";
import { Microscope, Building2, Download, ExternalLink } from "lucide-react";

const LabReportCard = ({ report }) => {
  const priorityColors = {
    high: 'border-red-300 bg-gradient-to-br from-red-50 to-rose-50 shadow-red-100',
    medium: 'border-amber-300 bg-gradient-to-br from-amber-50 to-yellow-50 shadow-amber-100',
    low: 'border-slate-300 bg-gradient-to-br from-slate-50 to-gray-50 shadow-slate-100'
  };

  const statusColors = {
    'Excellent': { color: 'success', bgColor: 'bg-emerald-100', textColor: 'text-emerald-800' },
    'Premium': { color: 'success', bgColor: 'bg-emerald-100', textColor: 'text-emerald-800' },
    'Passed': { color: 'primary', bgColor: 'bg-blue-100', textColor: 'text-blue-800' },
    'Good': { color: 'warning', bgColor: 'bg-amber-100', textColor: 'text-amber-800' }
  };

  const currentStatus = statusColors[report.status] || statusColors['Good'];

  return (
    <div className={`
      p-8 border-2 rounded-3xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 
      ${priorityColors[report.priority] || priorityColors.low}
      relative overflow-hidden group
    `}>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-5 transform rotate-12 translate-x-8 -translate-y-8">
        <Microscope className="w-full h-full" />
      </div>

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-start gap-5">
            <div className="p-4 bg-white rounded-2xl shadow-md group-hover:shadow-lg transition-shadow">
              <Microscope className="w-8 h-8 text-slate-700" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-slate-800 mb-2">{report.testType}</h4>
              <div className="flex items-center gap-2 text-slate-600 mb-3">
                <Building2 className="w-4 h-4" />
                <span className="text-sm font-medium">{report.lab}</span>
              </div>
              <Badge variant="flat" size="sm" className="font-mono">
                {report.id}
              </Badge>
            </div>
          </div>
          
          <div className={`
            px-4 py-2 rounded-xl ${currentStatus.bgColor} border-2 border-white shadow-lg
          `}>
            <span className={`font-bold text-lg ${currentStatus.textColor}`}>
              {report.status}
            </span>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-slate-200 mb-4">
            <p className="text-slate-700 leading-relaxed font-medium">{report.results}</p>
          </div>
          
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-slate-600">Quality Score</span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-slate-800">{report.score}</span>
              <span className="text-lg text-slate-500">/100</span>
            </div>
          </div>
          
          <Progress 
            value={report.score} 
            color={report.score >= 95 ? "success" : report.score >= 85 ? "warning" : "danger"}
            size="lg"
            className="max-w-full"
            classNames={{
              track: "drop-shadow-md border border-default-100",
              indicator: "bg-gradient-to-r from-default-500 to-foreground-500"
            }}
          />
        </div>
        
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 pt-4 border-t border-slate-200">
          <div className="flex items-center gap-3">
            <Badge 
              color={report.priority === 'high' ? 'danger' : report.priority === 'medium' ? 'warning' : 'default'} 
              variant="flat" 
              size="sm"
            >
              {report.priority.toUpperCase()} PRIORITY
            </Badge>
            <span className="text-xs text-slate-500">
              Tested: {new Date(report.date).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'short', 
                day: 'numeric'
              })}
            </span>
          </div>
          
          <Button 
            size="md" 
            color="primary" 
            variant="shadow"
            startContent={<Download className="w-4 h-4" />}
            endContent={<ExternalLink className="w-4 h-4" />}
            className="font-semibold"
          >
            Download Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LabReportCard;