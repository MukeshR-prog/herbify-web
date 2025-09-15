"use client";
import React from "react";
import MLPageHeader from "../../../components/ml-analysis/MLPageHeader";
import CriticalAlertCard from "../../../components/ml-analysis/CriticalAlertCard";
import MLMetricsCard from "../../../components/ml-analysis/MLMetricsCard";
import BatchStatusCard from "../../../components/ml-analysis/BatchStatusCard";
import EnvironmentCard from "../../../components/ml-analysis/EnvironmentCard";
import AIInsightsCard from "../../../components/ml-analysis/AIInsightsCard";
import { Card, CardBody } from "@heroui/react";
import { 
  Target, 
  Brain, 
  AlertTriangle, 
  Calendar, 
  Package2, 
  Recycle, 
  ShoppingCart,
  TrendingUp,
  Lightbulb 
} from "lucide-react";

export default function MLAnalysisPage() {
  // Sample data - replace with your API calls
  const headerStats = {
    activeBatches: 247,
    predictionAccuracy: 94,
    alertsToday: 3
  };

  const environmentalData = [
    { time: "1h", val: 27 },
    { time: "2h", val: 28 },
    { time: "3h", val: 29 },
    { time: "4h", val: 32 },
    { time: "5h", val: 28 },
    { time: "6h", val: 27 },
  ];

  const humidityData = [
    { time: "1h", val: 72 },
    { time: "2h", val: 75 },
    { time: "3h", val: 73 },
    { time: "4h", val: 78 },
    { time: "5h", val: 75 },
    { time: "6h", val: 74 },
  ];

  const airQualityData = [
    { time: "1h", val: 88 },
    { time: "2h", val: 90 },
    { time: "3h", val: 89 },
    { time: "4h", val: 87 },
    { time: "5h", val: 91 },
    { time: "6h", val: 90 },
  ];

  const handleViewBatchDetails = (batchId) => {
    console.log("View batch details:", batchId);
  };

  const handleDispatchUrgent = (batchId) => {
    console.log("Dispatch urgent:", batchId);
  };

  const handleMarkForDisposal = (batchId) => {
    console.log("Mark for disposal:", batchId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <MLPageHeader 
          isModelActive={true}
          title="Quality Tracking & ML Predictions"
          subtitle="AI-powered quality analysis and spoilage predictions for optimal inventory management"
          stats={headerStats}
        />

        {/* Critical Alerts Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            Critical Alerts
          </h2>
          <CriticalAlertCard
            batchId="HRB-2024-003"
            herb="Neem Leaves"
            timeRemaining="48 hours"
            confidence={92}
            temperature={28}
            humidity={75}
            location="Warehouse A-12"
            severity="high"
            onDispatch={() => handleDispatchUrgent("HRB-2024-003")}
            onDispose={() => handleMarkForDisposal("HRB-2024-003")}
            onViewDetails={() => handleViewBatchDetails("HRB-2024-003")}
          />
        </section>

        {/* ML Metrics Overview */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Brain className="w-6 h-6 text-indigo-500" />
            ML Performance Metrics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <MLMetricsCard
              title="Quality Score"
              value="87.5%"
              subtitle="Average quality across all batches"
              percentage={88}
              color="success"
              trend="up"
              icon={Target}
              additionalData={{
                "This Week": "+2.1%",
                "Target": "90%"
              }}
              onViewDetails={() => console.log("View quality details")}
            />
            <MLMetricsCard
              title="ML Predictions"
              value="247"
              subtitle="Active batch predictions"
              percentage={94}
              color="primary"
              trend="stable"
              icon={Brain}
              additionalData={{
                "Accuracy": "94.2%", 
                "Today": "3 alerts"
              }}
              onViewDetails={() => console.log("View prediction details")}
            />
            <MLMetricsCard
              title="Risk Assessment" 
              value="12"
              subtitle="Batches requiring attention"
              percentage={75}
              color="warning"
              trend="down"
              icon={AlertTriangle}
              additionalData={{
                "Critical": "3",
                "Warning": "9"
              }}
              onViewDetails={() => console.log("View risk details")}
            />
          </div>
        </section>

        {/* Batch Status Overview */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Package2 className="w-6 h-6 text-emerald-500" />
            Batch Status Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <BatchStatusCard
              batchId="HRB-2024-002"
              herb="Ashwagandha"
              quantity="180kg"
              status="warning"
              message="Spoilage risk detected in 12 days"
              progress={70}
              lastUpdated="2 hours ago"
              priority="high"
              additionalInfo="Temperature trending upward"
              onViewDetails={() => handleViewBatchDetails("HRB-2024-002")}
            />
            <BatchStatusCard
              batchId="HRB-2024-001"
              herb="Turmeric"
              quantity="250kg"
              status="good"
              message="Optimal storage conditions maintained"
              progress={95}
              lastUpdated="1 hour ago" 
              priority="normal"
              additionalInfo="All parameters within range"
              onViewDetails={() => handleViewBatchDetails("HRB-2024-001")}
            />
            <BatchStatusCard
              batchId="HRB-2024-003"
              herb="Neem Leaves"
              quantity="75kg"
              status="critical"
              message="Immediate action required"
              progress={30}
              lastUpdated="15 minutes ago"
              priority="high"
              additionalInfo="Multiple environmental thresholds exceeded"
              onViewDetails={() => handleViewBatchDetails("HRB-2024-003")}
            />
            <BatchStatusCard
              batchId="HRB-2024-004"
              herb="Tulsi"
              quantity="120kg"
              status="fresh"
              message="Recently added to inventory"
              progress={100}
              lastUpdated="30 minutes ago"
              priority="normal"
              additionalInfo="Quality assessment completed"
              onViewDetails={() => handleViewBatchDetails("HRB-2024-004")}
            />
          </div>
        </section>

        {/* Environmental Monitoring */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-blue-500" />
            Environmental Monitoring
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <EnvironmentCard
              type="temperature"
              label="Storage Temperature"
              value={28}
              unit="°C"
              status="Above Optimal"
              data={environmentalData}
              min={24}
              max={32}
              avg={28.2}
              lastUpdated="5 mins ago"
              trend="up"
              threshold={26}
              onViewDetails={() => console.log("View temperature details")}
            />
            <EnvironmentCard
              type="humidity"
              label="Humidity Levels"
              value={75}
              unit="%"
              status="High Moisture"
              data={humidityData}
              min={65}
              max={80}
              avg={74.5}
              lastUpdated="3 mins ago"
              trend="stable"
              threshold={70}
              onViewDetails={() => console.log("View humidity details")}
            />
            <EnvironmentCard
              type="air"
              label="Air Quality Index"
              value={89}
              unit=""
              status="Optimal"
              data={airQualityData}
              min={85}
              max={95}
              avg={89.2}
              lastUpdated="1 min ago"
              trend="up"
              threshold={80}
              onViewDetails={() => console.log("View air quality details")}
            />
          </div>
        </section>

        {/* AI Insights & Recommendations */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-purple-500" />
              AI-Powered Recommendations
            </h2>
            <Card className="bg-gradient-to-r from-purple-100 to-indigo-100 border-purple-200 border">
              <CardBody className="px-4 py-2">
                <span className="text-purple-800 font-semibold text-sm">🧠 Smart Insights Active</span>
              </CardBody>
            </Card>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Left Column - Optimization Suggestions */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-slate-800 border-b border-slate-200 pb-2">
                Optimization Suggestions
              </h3>
              
              <AIInsightsCard
                type="suggestion"
                title="Optimal Usage Timeline"
                description="Batch #HRB-2024-001 (Turmeric): Best consumed before March 15, 2024 for maximum potency. Current quality retention at 95%."
                footer="Confidence: 94% | Expected shelf life: 287 days remaining"
                priority="high"
                icon={Calendar}
                actionLabel="Schedule Processing"
                onAction={() => console.log("Schedule processing")}
              />
              
              <AIInsightsCard
                type="optimization"
                title="Storage Optimization"
                description="Vacuum packaging with desiccant at 15–18°C recommended for Batch #HRB-2024-002. This could extend shelf life significantly."
                footer="Potential extension: +45 days | Cost-effective solution available"
                priority="normal"
                icon={Package2}
                actionLabel="View Implementation"
                onAction={() => console.log("View storage optimization")}
              />
              
              <AIInsightsCard
                type="suggestion"
                title="Seasonal Risk Alert"
                description="Monsoon season (June–Sept): 40% higher spoilage risk detected. Climate-controlled storage strongly recommended for all batches."
                footer="Historical analysis: Similar batches show 15% degradation during this period"
                priority="high"
                icon={AlertTriangle}
                actionLabel="View Risk Mitigation"
                onAction={() => console.log("View risk mitigation")}
              />
              
              <AIInsightsCard
                type="optimization"
                title="Alternative Processing"
                description="If Batch #HRB-2024-003 approaches expiry: Consider oil extraction or powder form to maximize utility and recover value."
                footer="Recovery value: 70–80% of original batch value | Processing time: 2-3 days"
                priority="normal"
                icon={Recycle}
                actionLabel="Explore Options"
                onAction={() => console.log("Explore processing options")}
              />
            </div>

            {/* Right Column - Market Intelligence */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-slate-800 border-b border-slate-200 pb-2">
                Market Intelligence
              </h3>
              
              <AIInsightsCard
                type="market"
                title="Market Demand Forecast"
                isMarketCard={true}
                icon={ShoppingCart}
                data={{
                  list: [
                    { label: "Tulsi (Current Batch)", value: "↗ High Demand", trend: "up" },
                    { label: "Export Market (EU)", value: "↗ Growing +15%", trend: "up" },
                    { label: "Domestic Pharma", value: "→ Stable", trend: "stable" },
                    { label: "Seasonal Peak", value: "Feb–Apr 2024", trend: "stable" }
                  ]
                }}
              />

              <AIInsightsCard
                type="market"
                title="Pricing Recommendations"
                isMarketCard={true}
                icon={TrendingUp}
                data={{
                  pricing: {
                    "Current Market Rate": "₹450–520/kg",
                    "Premium Quality Bonus": "+12% (Grade A)",
                    "Export Premium": "+25% (EU Compliance)", 
                    "Suggested Price": "₹580–650/kg"
                  }
                }}
              />

              <AIInsightsCard
                type="optimization"
                title="Supply Chain Optimization"
                isMarketCard={true}
                icon={Package2}
                data={{
                  bulletPoints: [
                    "Reduce transport time by 2 days using Route A",
                    "Bundle with Batch #HRB-2024-004 for cost efficiency",
                    "Schedule off-peak processing (−8% cost reduction)",
                    "⚠ Avoid transport during Mar 10–15 (festival delays expected)"
                  ]
                }}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
