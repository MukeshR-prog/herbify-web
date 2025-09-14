"use client";
import React, { useState } from "react";
import {
  CheckCircle,
  Loader2,
  Clock,
  Truck,
  MapPin,
  Calendar,
  User,
  Package,
  AlertTriangle,
  ChevronRight,
  Eye,
  Download,
  ExternalLink,
  Thermometer,
  Shield,
  Activity,
  Bell,
  Navigation
} from "lucide-react";

const EnhancedJourneyTimeline = () => {
  const [selectedStep, setSelectedStep] = useState(null);
  const [showLiveTracking, setShowLiveTracking] = useState(false);

  const journeyData = [
    {
      id: 1,
      title: "Cultivation Site",
      subtitle: "Organic Farm - Kerala",
      status: "Completed",
      timestamp: "2024-03-15T08:00:00Z",
      completedAt: "2024-05-20T16:30:00Z",
      duration: "66 days",
      progress: 100,
      location: "Wayanad, Kerala, India",
      coordinates: { lat: 11.6854, lng: 76.1320 },
      priority: "normal",
      bgColor: "bg-green-50 border-green-200",
      statusColor: "bg-green-100 text-green-700 border-green-300",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      details: [
        { label: "Date Planted", value: "March 15, 2024", icon: Calendar },
        { label: "Harvest Date", value: "May 20, 2024", icon: Package },
        { label: "Farm License", value: "#OF-2024-KL-001", icon: Shield },
        { label: "Farmer", value: "Raj Krishnan", icon: User },
        { label: "Soil Quality", value: "Grade A Certified", icon: Activity },
        { label: "Weather Conditions", value: "Optimal", icon: Thermometer }
      ],
      metrics: [
        { label: "Yield", value: "250 kg", trend: "+12%" },
        { label: "Quality Score", value: "9.2/10", trend: "+0.3" },
        { label: "Organic Compliance", value: "100%", trend: "0%" }
      ],
      documents: [
        { name: "Organic Certificate", type: "PDF", size: "2.3 MB" },
        { name: "Soil Test Report", type: "PDF", size: "1.8 MB" },
        { name: "Harvest Photos", type: "Gallery", count: 15 }
      ],
      link: { label: "View Farm Details", href: "#" },
      alerts: []
    },
    {
      id: 2,
      title: "Processing Facility",
      subtitle: "GMP Certified Unit - Karnataka",
      status: "Completed",
      timestamp: "2024-05-22T09:15:00Z",
      completedAt: "2024-05-22T18:45:00Z",
      duration: "9 hours",
      progress: 100,
      location: "Bangalore, Karnataka, India",
      coordinates: { lat: 12.9716, lng: 77.5946 },
      priority: "normal",
      bgColor: "bg-blue-50 border-blue-200",
      statusColor: "bg-blue-100 text-blue-700 border-blue-300",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      details: [
        { label: "Processing Date", value: "May 22, 2024", icon: Calendar },
        { label: "Method", value: "Steam Distillation", icon: Package },
        { label: "Facility License", value: "#PF-2024-KA-087", icon: Shield },
        { label: "Quality Officer", value: "Dr. Priya Sharma", icon: User },
        { label: "Batch Temperature", value: "95°C ± 2°C", icon: Thermometer },
        { label: "Processing Time", value: "8.5 hours", icon: Clock }
      ],
      metrics: [
        { label: "Extraction Rate", value: "87%", trend: "+2%" },
        { label: "Purity Level", value: "99.2%", trend: "+0.1%" },
        { label: "Quality Grade", value: "Premium", trend: "0%" }
      ],
      documents: [
        { name: "Processing Report", type: "PDF", size: "3.1 MB" },
        { name: "Quality Analysis", type: "PDF", size: "2.7 MB" },
        { name: "GMP Certificate", type: "PDF", size: "1.2 MB" }
      ],
      link: { label: "View Processing Report", href: "#" },
      alerts: []
    },
    {
      id: 3,
      title: "In Transit",
      subtitle: "Temperature Controlled Transport",
      status: "Active",
      timestamp: "2024-05-23T08:30:00Z",
      estimatedCompletion: "2024-05-25T14:00:00Z",
      duration: "2 days 5.5 hours",
      progress: 65,
      location: "En route to Mumbai",
      coordinates: { lat: 18.5204, lng: 73.8567 }, // Current location
      priority: "high",
      bgColor: "bg-amber-50 border-amber-200",
      statusColor: "bg-amber-100 text-amber-700 border-amber-300",
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      details: [
        { label: "Departure", value: "May 23, 2024 08:30", icon: Navigation },
        { label: "ETA", value: "May 25, 2024 14:00", icon: Clock },
        { label: "Vehicle ID", value: "#TRK-4578", icon: Truck },
        { label: "Driver", value: "Mohammed Ali", icon: User },
        { label: "Current Location", value: "Pune, Maharashtra", icon: MapPin },
        { label: "Temperature", value: "4°C ± 1°C", icon: Thermometer }
      ],
      metrics: [
        { label: "Distance Covered", value: "680 km", trend: "+65%" },
        { label: "Avg Speed", value: "72 km/h", trend: "0%" },
        { label: "Temperature Stability", value: "100%", trend: "0%" }
      ],
      documents: [
        { name: "Transport Manifest", type: "PDF", size: "1.5 MB" },
        { name: "Driver License", type: "PDF", size: "890 KB" },
        { name: "GPS Route Log", type: "Data", realtime: true }
      ],
      link: { label: "Live Tracking", href: "#", action: "tracking" },
      alerts: [
        { type: "info", message: "Vehicle on schedule, temperature stable" }
      ],
      liveData: {
        speed: "68 km/h",
        fuelLevel: "78%",
        nextStop: "Mumbai - 2h 15m",
        tempRange: "3.8°C - 4.2°C"
      }
    },
    {
      id: 4,
      title: "Distribution Center",
      subtitle: "HerbMart Logistics Hub",
      status: "Pending",
      timestamp: null,
      estimatedStart: "2024-05-25T14:00:00Z",
      duration: "6 hours",
      progress: 0,
      location: "Mumbai, Maharashtra, India",
      coordinates: { lat: 19.0760, lng: 72.8777 },
      priority: "normal",
      bgColor: "bg-gray-50 border-gray-200",
      statusColor: "bg-gray-100 text-gray-600 border-gray-300",
      iconBg: "bg-gray-100",
      iconColor: "text-gray-500",
      details: [
        { label: "Location", value: "HerbMart Distribution, Mumbai", icon: MapPin },
        { label: "Status", value: "Awaiting shipment arrival", icon: Clock },
        { label: "Warehouse", value: "WH-MUM-001", icon: Package },
        { label: "Manager", value: "Anita Desai", icon: User },
        { label: "Storage Type", value: "Cold Storage", icon: Thermometer },
        { label: "Capacity", value: "Available", icon: Activity }
      ],
      metrics: [
        { label: "Processing Time", value: "TBD", trend: "0%" },
        { label: "Inventory Space", value: "85%", trend: "-5%" },
        { label: "Staff Available", value: "12", trend: "0%" }
      ],
      documents: [
        { name: "Warehouse License", type: "PDF", size: "1.1 MB" },
        { name: "Storage Guidelines", type: "PDF", size: "2.4 MB" }
      ],
      alerts: [
        { type: "warning", message: "Warehouse at 85% capacity - monitor closely" }
      ]
    }
  ];

  const getStepIcon = (step) => {
    if (step.status === "Completed") return CheckCircle;
    if (step.status === "Active") return step.title.toLowerCase().includes("transit") ? Truck : Loader2;
    return Clock;
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "Not started";
    return new Date(timestamp).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const LiveTrackingModal = ({ step, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Live Tracking</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Live metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {Object.entries(step.liveData || {}).map(([key, value]) => (
            <div key={key} className="bg-gray-50 p-3 rounded-lg">
              <div className="text-xs text-gray-500 uppercase tracking-wide">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </div>
              <div className="text-lg font-semibold text-gray-900">{value}</div>
            </div>
          ))}
        </div>

        {/* Mock GPS map */}
        <div className="bg-gradient-to-br from-blue-100 to-green-100 p-8 rounded-lg text-center mb-4">
          <MapPin className="h-12 w-12 mx-auto text-blue-600 mb-2" />
          <p className="text-gray-600">Interactive GPS Map</p>
          <p className="text-sm text-gray-500">Real-time vehicle location tracking</p>
        </div>

        <div className="text-sm text-gray-500 text-center">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Supply Chain Tracking</h1>
            <p className="text-gray-600 mt-1">Batch #HRB-2024-001 • Real-time visibility</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="h-4 w-4" />
              Export Report
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Bell className="h-4 w-4" />
              Alerts
            </button>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-xl border">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-600">Overall Progress</span>
            <span className="text-sm font-bold text-gray-900">65% Complete</span>
          </div>
          <div className="w-full bg-white rounded-full h-3 shadow-inner">
            <div className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500" style={{ width: "65%" }}></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>Started: Mar 15, 2024</span>
            <span>ETA: May 25, 2024</span>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Main timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-green-400 via-blue-400 via-amber-400 to-gray-300 rounded-full"></div>

        {journeyData.map((step, idx) => {
          const StepIcon = getStepIcon(step);
          const isExpanded = selectedStep === step.id;
          
          return (
            <div key={step.id} className="relative mb-8 last:mb-0">
              {/* Timeline node */}
              <div className={`absolute left-4 w-8 h-8 rounded-full border-4 border-white shadow-lg flex items-center justify-center ${step.iconBg}`}>
                <StepIcon className={`h-4 w-4 ${step.iconColor} ${step.status === 'Active' ? 'animate-pulse' : ''}`} />
              </div>

              {/* Content card */}
              <div className="ml-20">
                <div className={`rounded-2xl border-2 transition-all duration-300 ${step.bgColor} ${isExpanded ? 'shadow-xl scale-[1.02]' : 'shadow-md hover:shadow-lg'}`}>
                  {/* Card header */}
                  <div className="p-6 border-b border-gray-200/50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${step.statusColor}`}>
                            {step.status}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm">{step.subtitle}</p>
                      </div>
                      
                      <button
                        onClick={() => setSelectedStep(isExpanded ? null : step.id)}
                        className="p-2 hover:bg-white/50 rounded-lg transition-colors"
                      >
                        <ChevronRight className={`h-5 w-5 text-gray-500 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                      </button>
                    </div>

                    {/* Progress bar for active step */}
                    {step.status === 'Active' && (
                      <div className="mb-4">
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>Progress</span>
                          <span>{step.progress}%</span>
                        </div>
                        <div className="w-full bg-white rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-amber-400 to-orange-500 h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${step.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {/* Quick info */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-600">{step.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-600">{formatTimestamp(step.timestamp)}</span>
                      </div>
                      {step.duration && (
                        <div className="flex items-center gap-2">
                          <Activity className="h-4 w-4 text-gray-500" />
                          <span className="text-gray-600">{step.duration}</span>
                        </div>
                      )}
                    </div>

                    {/* Alerts */}
                    {step.alerts && step.alerts.length > 0 && (
                      <div className="mt-4">
                        {step.alerts.map((alert, i) => (
                          <div key={i} className={`flex items-center gap-2 p-3 rounded-lg ${
                            alert.type === 'warning' ? 'bg-yellow-100 text-yellow-800' : 
                            alert.type === 'error' ? 'bg-red-100 text-red-800' : 
                            'bg-blue-100 text-blue-800'
                          }`}>
                            <AlertTriangle className="h-4 w-4" />
                            <span className="text-sm">{alert.message}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Expanded content */}
                  {isExpanded && (
                    <div className="p-6 space-y-6">
                      {/* Metrics */}
                      {step.metrics && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Key Metrics</h4>
                          <div className="grid grid-cols-3 gap-4">
                            {step.metrics.map((metric, i) => (
                              <div key={i} className="bg-white p-4 rounded-lg border">
                                <div className="text-sm text-gray-500">{metric.label}</div>
                                <div className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                  {metric.value}
                                  {metric.trend !== "0%" && (
                                    <span className={`text-xs px-2 py-1 rounded-full ${
                                      metric.trend.startsWith('+') ? 'bg-green-100 text-green-700' : 
                                      'bg-red-100 text-red-700'
                                    }`}>
                                      {metric.trend}
                                    </span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Detailed information */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Detailed Information</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {step.details.map((detail, i) => {
                            const DetailIcon = detail.icon;
                            return (
                              <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                                <DetailIcon className="h-5 w-5 text-gray-500" />
                                <div>
                                  <div className="text-xs text-gray-500 uppercase tracking-wide">{detail.label}</div>
                                  <div className="text-sm font-medium text-gray-900">{detail.value}</div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Documents */}
                      {step.documents && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Documents & Reports</h4>
                          <div className="space-y-2">
                            {step.documents.map((doc, i) => (
                              <div key={i} className="flex items-center justify-between p-3 bg-white rounded-lg border hover:shadow-sm transition-shadow">
                                <div className="flex items-center gap-3">
                                  <div className="p-2 bg-gray-100 rounded">
                                    <Download className="h-4 w-4 text-gray-600" />
                                  </div>
                                  <div>
                                    <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                                    <div className="text-xs text-gray-500">
                                      {doc.type} {doc.size && `• ${doc.size}`} {doc.count && `• ${doc.count} items`}
                                    </div>
                                  </div>
                                </div>
                                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                  <Eye className="h-4 w-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Action button */}
                      {step.link && (
                        <div className="pt-4 border-t border-gray-200">
                          <button
                            onClick={() => step.link.action === 'tracking' && setShowLiveTracking(true)}
                            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            <ExternalLink className="h-4 w-4" />
                            {step.link.label}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Tracking Modal */}
      {showLiveTracking && (
        <LiveTrackingModal
          step={journeyData.find(s => s.status === 'Active')}
          onClose={() => setShowLiveTracking(false)}
        />
      )}
    </div>
  );
};

export default EnhancedJourneyTimeline;