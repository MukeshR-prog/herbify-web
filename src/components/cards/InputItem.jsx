import { Badge } from "@heroui/react";
import { Calendar, Scale, Shield, ShieldCheck, AlertTriangle } from "lucide-react";

const InputItem = ({ input }) => {
  const categoryColors = {
    organic: {
      gradient: 'from-green-100 via-emerald-50 to-green-100',
      border: 'border-green-300',
      shadow: 'shadow-green-100 hover:shadow-green-200'
    },
    fertilizer: {
      gradient: 'from-blue-100 via-cyan-50 to-blue-100', 
      border: 'border-blue-300',
      shadow: 'shadow-blue-100 hover:shadow-blue-200'
    },
    biocontrol: {
      gradient: 'from-purple-100 via-violet-50 to-purple-100',
      border: 'border-purple-300', 
      shadow: 'shadow-purple-100 hover:shadow-purple-200'
    },
    mineral: {
      gradient: 'from-amber-100 via-orange-50 to-amber-100',
      border: 'border-amber-300',
      shadow: 'shadow-amber-100 hover:shadow-amber-200'
    }
  };

  const safetyConfig = {
    excellent: { 
      icon: ShieldCheck, 
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
      badgeColor: 'success'
    },
    good: { 
      icon: Shield, 
      color: 'text-blue-600',
      bgColor: 'bg-blue-100', 
      badgeColor: 'primary'
    },
    moderate: { 
      icon: AlertTriangle, 
      color: 'text-amber-600',
      bgColor: 'bg-amber-100',
      badgeColor: 'warning'
    }
  };

  const categoryConfig = categoryColors[input.category] || categoryColors.organic;
  const safetyConfig_current = safetyConfig[input.safety] || safetyConfig.good;
  const SafetyIcon = safetyConfig_current.icon;

  return (
    <div className={`
      p-6 bg-gradient-to-r ${categoryConfig.gradient} border-2 ${categoryConfig.border} 
      rounded-2xl hover:shadow-xl ${categoryConfig.shadow} transition-all duration-300 
      hover:-translate-y-1 relative overflow-hidden group
    `}>
      {/* Background pattern */}
      <div className="absolute top-0 right-0 w-20 h-20 opacity-10 transform rotate-12 translate-x-4 -translate-y-4">
        <SafetyIcon className="w-full h-full" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className={`p-4 bg-white rounded-2xl shadow-md group-hover:shadow-lg transition-shadow ${safetyConfig_current.bgColor}/20 border border-white`}>
              <SafetyIcon className={`w-7 h-7 ${safetyConfig_current.color}`} />
            </div>
            <div>
              <h4 className="text-xl font-bold text-slate-800 mb-1">{input.name}</h4>
              <p className="text-slate-600 mb-3 font-medium">{input.usage}</p>
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(input.date).toLocaleDateString('en-IN', { 
                    month: 'short', 
                    day: 'numeric',
                    year: 'numeric'
                  })}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Scale className="w-4 h-4" />
                  <span className="font-semibold">{input.quantity}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-right space-y-2">
            <Badge 
              color={
                input.category === 'organic' ? 'success' : 
                input.category === 'fertilizer' ? 'primary' : 
                input.category === 'biocontrol' ? 'secondary' :
                'warning'
              }
              variant="shadow"
              size="lg"
              className="font-semibold"
            >
              {input.type}
            </Badge>
            <div>
              <Badge 
                color={safetyConfig_current.badgeColor}
                variant="flat"
                size="sm"
              >
                {input.safety.toUpperCase()} SAFETY
              </Badge>
            </div>
          </div>
        </div>

        {/* Additional info bar */}
        <div className="flex justify-between items-center pt-4 border-t border-white/50">
          <div className="text-xs text-slate-600">
            Category: <span className="font-semibold capitalize">{input.category}</span>
          </div>
          <div className="text-xs text-slate-600">
            Application Rate: <span className="font-semibold">{input.quantity}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputItem;