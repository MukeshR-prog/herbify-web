"use client";
import CriticalAlertCard from "@/components/cards/CriticalAlertCard";
import MetricCard from "@/components/cards/MetricCard";
import BatchStatusCard from "@/components/cards/BatchStatusCard";
import EnvironmentCard from "@/components/cards/EnvironmentCard";
import MarketCard from "@/components/cards/MarketCard";
import SuggestionCard from "@/components/cards/SuggestionCard";
import { FaBoxOpen, FaRecycle } from "react-icons/fa6";
import { FaCalendarAlt, FaExclamationTriangle } from "react-icons/fa";

export default function MLPredictionsPage() {
  const tempData = [
    { time: "1h", val: 27 },
    { time: "2h", val: 28 },
    { time: "3h", val: 29 },
    { time: "4h", val: 50 },
    { time: "5h", val: 28 },
    { time: "6h", val: 27 },
  ];
  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Quality Tracking & ML Predictions</h2>
        <span className="text-green-600 text-sm font-medium">
          ● AI Model Active
        </span>
      </div>
      <p className="text-sm text-gray-500">
        AI-powered quality analysis and spoilage predictions
      </p>

      {/* Critical Alert */}

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <CriticalAlertCard
          batchId="HRB-2024-003"
          herb="Neem Leaves"
          time="48 hours"
          confidence={92}
          temp={28}
          humidity={75}
        />
        <MetricCard
          title="Quality Score"
          value="87.5%"
          subtitle="+2% since last week"
          percentage={88}
          color="text-green-600"
          trend="up"
        />
        <MetricCard
          title="ML Predictions"
          value="247 batches"
          subtitle="3 critical alerts today"
          percentage={75}
          color="text-red-600"
          trend="down"
        />
      </div>

      {/* Batch Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <BatchStatusCard
          batchId="HRB-2024-002"
          herb="Ashwagandha"
          quantity="180kg"
          status="warning"
          message="Spoilage risk in 12 days"
          progress={70}
        />
        <BatchStatusCard
          batchId="HRB-2024-001"
          herb="Turmeric"
          quantity="250kg"
          status="good"
          message="Optimal condition"
          progress={95}
        />
        <BatchStatusCard
          batchId="HRB-2024-003"
          herb="Neem Leaves"
          quantity="75kg"
          status="critical"
          message="Spoilage risk in 2 days"
          progress={30}
        />
        <BatchStatusCard
          batchId="HRB-2024-004"
          herb="Tulsi"
          quantity="120kg"
          status="fresh"
          message="Recently added"
          progress={100}
        />
      </div>

      {/* Environment Monitoring */}
      <h3 className="text-lg font-semibold mt-6">Environmental Monitoring</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <EnvironmentCard
          type="temperature"
          label="Temperature"
          value={28}
          unit="°C"
          status="Above Optimal"
          statusColor="bg-red-100 text-red-600"
          data={tempData}
          min={26}
          max={30}
          avg={28.2}
          lastUpdated="5 mins ago"
        />

        <EnvironmentCard
          type="humidity"
          label="Humidity"
          value={75}
          unit="%"
          status="High Moisture"
          statusColor="bg-orange-100 text-orange-600"
          data={tempData}
          min={65}
          max={80}
          avg={72.3}
          lastUpdated="3 mins ago"
        />

        <EnvironmentCard
          type="air"
          label="Air Quality"
          value="Good"
          unit=""
          status="Optimal"
          statusColor="bg-green-100 text-green-600"
          data={tempData}
          min={85}
          max={95}
          avg={90}
          lastUpdated="1 min ago"
        />
      </div>
       <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <span className="text-green-600">🌿 AI-Powered Recommendations</span>
          <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs">
            Smart Insights
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Optimization Suggestions */}
        <div className="space-y-4">
          <SuggestionCard
            icon={<FaCalendarAlt className="text-green-600" />}
            title="Optimal Usage Timeline"
            description="Batch #HERB123: Best consumed before March 15, 2024 for maximum potency."
            footer="Confidence: 94% | Expected shelf life: 287 days"
            color="bg-green-50"
          />
          <SuggestionCard
            icon={<FaBoxOpen className="text-blue-600" />}
            title="Storage Optimization"
            description="Vacuum packaging with desiccant at 15–18°C recommended for extended shelf life."
            footer="Potential extension: +45 days | Cost-effective solution"
            color="bg-blue-50"
          />
          <SuggestionCard
            icon={<FaExclamationTriangle className="text-yellow-600" />}
            title="Seasonal Risk Alert"
            description="Monsoon season (June–Sept): 40% higher spoilage risk. Use climate-controlled storage."
            footer="Historical: Similar batches show 15% degradation"
            color="bg-yellow-50"
          />
          <SuggestionCard
            icon={<FaRecycle className="text-purple-600" />}
            title="Alternative Processing"
            description="If approaching expiry: Consider oil extraction or powder form for extended utility."
            footer="Recovery value: 70–80% of original batch value"
            color="bg-purple-50"
          />
        </div>

        {/* Right: Market Intelligence */}
        <div className="space-y-4">
          <MarketCard title="Market Demand Forecast">
            <ul className="space-y-1">
              <li className="flex justify-between">
                <span>Tulsi (Current Batch)</span> <span className="text-green-600">↗ High Demand</span>
              </li>
              <li className="flex justify-between">
                <span>Export Market (EU)</span> <span className="text-blue-600">↗ Growing +15%</span>
              </li>
              <li className="flex justify-between">
                <span>Domestic Pharma</span> <span className="text-orange-600">→ Stable</span>
              </li>
              <li className="flex justify-between">
                <span>Seasonal Peak</span> <span className="text-gray-500">Feb–Apr 2024</span>
              </li>
            </ul>
          </MarketCard>

          <MarketCard title="Pricing Recommendations">
            <p>Current Market Rate: ₹450–520/kg</p>
            <p>Premium Quality Bonus: +12% (Grade A)</p>
            <p>Export Premium: +25% (EU Compliance)</p>
            <p className="text-green-600 font-semibold">Suggested Price: ₹580–650/kg</p>
          </MarketCard>

          <MarketCard title="Supply Chain Optimization">
            <ul className="list-disc pl-5 space-y-1">
              <li className="text-green-600">Reduce transport time by 2 days using Route A</li>
              <li>Bundle with Batch #HERB124 for cost efficiency</li>
              <li>Schedule off-peak processing (−8% cost)</li>
              <li className="text-orange-600">⚠ Avoid transport during Mar 10–15 (festival delays)</li>
            </ul>
          </MarketCard>
        </div>
      </div>
    </div>
    </div>
  );
}
