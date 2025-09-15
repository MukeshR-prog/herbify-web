"use client";
import HerbsDataTable from "@/components/HerbsDataTable";
import { RoleGuard } from "@/components/RoleGuard";
import StatsCard from "@/components/cards/StatsCard";
import { ROLES } from "@/utils/roles";
import { Card, CardBody, Progress, Chip, Badge, Button } from "@heroui/react";
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Package,
  Users,
  Activity,
  Brain,
  Target,
  DollarSign,
  Truck,
  BarChart3,
  HandCoins,
  Plus,
} from "lucide-react";
import { FaDownload } from "react-icons/fa";

export default function CollectorDashboard() {
  const inventoryData = [
    {
      batchId: "HRB-2024-001",
      addedDate: new Date("2025-09-10T09:30:00Z"), // when added
      herbType: "Turmeric",
      scientificName: "Curcuma longa",
      quantity: "250 kg",
      bags: "50",
      qualityScore: 92,
      expiryDays: new Date("2025-10-25T09:30:00Z"), // expiry date
    },
    {
      batchId: "HRB-2024-002",
      addedDate: new Date("2025-09-07T14:15:00Z"),
      herbType: "Ashwagandha",
      scientificName: "Withania somnifera",
      quantity: "180 kg",
      bags: "36",
      qualityScore: 78,
      expiryDays: new Date("2025-09-24T14:15:00Z"),
    },
    {
      batchId: "HRB-2024-003",
      addedDate: new Date("2025-09-05T10:00:00Z"),
      herbType: "Neem Leaves",
      scientificName: "Azadirachta indica",
      quantity: "75 kg",
      bags: "15",
      qualityScore: 45,
      expiryDays: new Date("2025-09-14T10:00:00Z"),
    },
    {
      batchId: "HRB-2024-004",
      addedDate: new Date("2025-09-09T12:00:00Z"),
      herbType: "Ginger",
      scientificName: "Zingiber officinale",
      quantity: "120 kg",
      bags: "24",
      qualityScore: 88,
      expiryDays: new Date("2025-10-12T12:00:00Z"),
    },
    {
      batchId: "HRB-2024-005",
      addedDate: new Date("2025-09-11T16:30:00Z"),
      herbType: "Tulsi",
      scientificName: "Ocimum tenuiflorum",
      quantity: "95 kg",
      bags: "19",
      qualityScore: 95,
      expiryDays: new Date("2025-11-10T16:30:00Z"),
    },
    {
      batchId: "HRB-2024-006",
      addedDate: new Date("2025-09-08T09:45:00Z"),
      herbType: "Amla",
      scientificName: "Phyllanthus emblica",
      quantity: "200 kg",
      bags: "40",
      qualityScore: 82,
      expiryDays: new Date("2025-10-07T09:45:00Z"),
    },
    {
      batchId: "HRB-2024-007",
      addedDate: new Date("2025-09-06T11:20:00Z"),
      herbType: "Brahmi",
      scientificName: "Bacopa monnieri",
      quantity: "65 kg",
      bags: "13",
      qualityScore: 76,
      expiryDays: new Date("2025-09-27T11:20:00Z"),
    },
    {
      batchId: "HRB-2024-008",
      addedDate: new Date("2025-08-29T08:00:00Z"),
      herbType: "Fenugreek",
      scientificName: "Trigonella foenum-graecum",
      quantity: "150 kg",
      bags: "30",
      qualityScore: 68,
      expiryDays: new Date("2025-09-20T08:00:00Z"),
    },
    {
      batchId: "HRB-2024-009",
      addedDate: new Date("2025-09-11T18:40:00Z"),
      herbType: "Cardamom",
      scientificName: "Elettaria cardamomum",
      quantity: "45 kg",
      bags: "9",
      qualityScore: 91,
      expiryDays: new Date("2025-12-10T18:40:00Z"),
    },
    {
      batchId: "HRB-2024-010",
      addedDate: new Date("2025-09-09T09:30:00Z"),
      herbType: "Cinnamon",
      scientificName: "Cinnamomum verum",
      quantity: "80 kg",
      bags: "16",
      qualityScore: 85,
      expiryDays: new Date("2025-10-14T09:30:00Z"),
    },
  ];
  // Calculate insights from current data
  const currentDate = new Date("2025-09-15T00:00:00Z");

  // Quality Score Analysis
  const averageQuality =
    inventoryData.reduce((sum, item) => sum + item.qualityScore, 0) /
    inventoryData.length;
  const highQualityCount = inventoryData.filter(
    (item) => item.qualityScore >= 85
  ).length;
  const lowQualityCount = inventoryData.filter(
    (item) => item.qualityScore < 70
  ).length;

  // Expiry Risk Analysis
  const expiringIn7Days = inventoryData.filter((item) => {
    const daysToExpiry = Math.ceil(
      (new Date(item.expiryDays) - currentDate) / (1000 * 60 * 60 * 24)
    );
    return daysToExpiry <= 7 && daysToExpiry > 0;
  }).length;

  const expiredCount = inventoryData.filter(
    (item) => new Date(item.expiryDays) < currentDate
  ).length;

  // Total inventory metrics
  const totalQuantityKg = inventoryData.reduce((sum, item) => {
    return sum + parseInt(item.quantity.split(" ")[0]);
  }, 0);

  const totalBags = inventoryData.reduce(
    (sum, item) => sum + parseInt(item.bags),
    0
  );

  // Recent additions (last 7 days)
  const recentAdditions = inventoryData.filter((item) => {
    const daysSinceAdded = Math.ceil(
      (currentDate - new Date(item.addedDate)) / (1000 * 60 * 60 * 24)
    );
    return daysSinceAdded <= 7;
  }).length;

  const statsData = [
    {
      icon: "users",
      iconBg: "blue",
      value: "247",
      title: "Existing Stock Count",
      trend: "+5.2%",
      subtitle: "12 batches added today",
      subtitleIcon: "up",
      subtitleColor: "green",
    },
    {
      icon: "clock",
      iconBg: "orange",
      value: "12",
      title: "Pending Requests",
      badge: "Urgent",
      badgeType: "warning",
      subtitle: "3 requests > 24hrs old",
      subtitleIcon: "warning",
      subtitleColor: "orange",
    },
    {
      icon: "transactions",
      iconBg: "green",
      value: "89",
      title: "Weekly Transactions",
      badge: "This Week",
      badgeType: "info",
      subtitle: "73 Completed 16 Pending",
      subtitleIcon: "check",
      subtitleColor: "green",
    },
    {
      icon: "alerts",
      iconBg: "red",
      value: "3",
      title: "Spoilage Alerts",
      badge: "Expiring",
      badgeType: "warning",
      subtitle: "3 batches expiring < 48 hrs",
      subtitleIcon: "warning",
      subtitleColor: "orange",
    },
  ];

  // Dashboard Insights
  const insights = [
    {
      title: "Quality Performance",
      type: "quality",
      icon: Target,
      color: "blue",
      data: {
        average: Math.round(averageQuality),
        highQuality: highQualityCount,
        lowQuality: lowQualityCount,
        trend: "+3.2%",
      },
    },
    {
      title: "Inventory Health",
      type: "inventory",
      icon: Package,
      color: "green",
      data: {
        totalKg: totalQuantityKg,
        totalBags: totalBags,
        recentAdditions: recentAdditions,
        trend: "+12.5%",
      },
    },
    {
      title: "Expiry Management",
      type: "expiry",
      icon: AlertTriangle,
      color: expiredCount > 0 ? "red" : expiringIn7Days > 2 ? "amber" : "green",
      data: {
        expiringIn7Days: expiringIn7Days,
        expired: expiredCount,
        safe: inventoryData.length - expiringIn7Days - expiredCount,
        priority:
          expiredCount > 0
            ? "Critical"
            : expiringIn7Days > 2
            ? "High"
            : "Normal",
      },
    },
    {
      title: "ML Predictions",
      type: "ml",
      icon: Brain,
      color: "purple",
      data: {
        spoilageRisk: "8%",
        demandForecast: "High",
        priceOptimal: "₹2,450/kg",
        accuracy: "94.2%",
      },
    },
    {
      title: "Market Intelligence",
      type: "market",
      icon: TrendingUp,
      color: "indigo",
      data: {
        demandTrend: "Rising",
        avgPrice: "₹2,380/kg",
        topDemand: "Turmeric, Ashwagandha",
        marketScore: 87,
      },
    },
    {
      title: "Operational Efficiency",
      type: "operations",
      icon: Activity,
      color: "emerald",
      data: {
        processingTime: "2.3 hrs",
        completionRate: "96.5%",
        pendingTasks: 4,
        efficiency: "Excellent",
      },
    },
  ];

  const renderInsightCard = (insight) => {
    const Icon = insight.icon;
    const colorConfig = {
      blue: "from-blue-50 to-blue-100 border-blue-200 text-blue-800",
      green: "from-green-50 to-green-100 border-green-200 text-green-800",
      amber: "from-amber-50 to-amber-100 border-amber-200 text-amber-800",
      red: "from-red-50 to-red-100 border-red-200 text-red-800",
      purple: "from-purple-50 to-purple-100 border-purple-200 text-purple-800",
      indigo: "from-indigo-50 to-indigo-100 border-indigo-200 text-indigo-800",
      emerald:
        "from-emerald-50 to-emerald-100 border-emerald-200 text-emerald-800",
    };

    return (
      <Card
        key={insight.title}
        className={`bg-gradient-to-br ${
          colorConfig[insight.color]
        } border-2 shadow-lg`}
      >
        <CardBody className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <Icon className="w-5 h-5" />
              <h3 className="font-semibold text-sm">{insight.title}</h3>
            </div>
            {insight.data.trend && (
              <Chip
                size="sm"
                variant="flat"
                color={
                  insight.data.trend.startsWith("+") ? "success" : "danger"
                }
              >
                {insight.data.trend}
              </Chip>
            )}
          </div>

          {insight.type === "quality" && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">
                  {insight.data.average}%
                </span>
                <span className="text-xs">Avg Quality</span>
              </div>
              <Progress
                value={insight.data.average}
                className="h-2"
                color="primary"
              />
              <div className="flex justify-between text-xs">
                <span>High Quality: {insight.data.highQuality}</span>
                <span>Low Quality: {insight.data.lowQuality}</span>
              </div>
            </div>
          )}

          {insight.type === "inventory" && (
            <div className="space-y-2">
              <div className="flex justify-between">
                <div>
                  <div className="text-xl font-bold">
                    {insight.data.totalKg} kg
                  </div>
                  <div className="text-xs opacity-75">Total Stock</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold">
                    {insight.data.totalBags}
                  </div>
                  <div className="text-xs opacity-75">Total Bags</div>
                </div>
              </div>
              <div className="text-xs">
                <CheckCircle className="w-3 h-3 inline mr-1" />
                {insight.data.recentAdditions} new batches this week
              </div>
            </div>
          )}

          {insight.type === "expiry" && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Chip
                  size="sm"
                  color={
                    insight.data.expired > 0
                      ? "danger"
                      : insight.data.expiringIn7Days > 2
                      ? "warning"
                      : "success"
                  }
                >
                  {insight.data.priority} Priority
                </Chip>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="text-center">
                  <div className="font-semibold text-red-600">
                    {insight.data.expired}
                  </div>
                  <div>Expired</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-amber-600">
                    {insight.data.expiringIn7Days}
                  </div>
                  <div>Expiring</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-green-600">
                    {insight.data.safe}
                  </div>
                  <div>Safe</div>
                </div>
              </div>
            </div>
          )}

          {insight.type === "ml" && (
            <div className="space-y-2">
              <div className="flex justify-between">
                <div>
                  <div className="text-lg font-bold">
                    {insight.data.spoilageRisk}
                  </div>
                  <div className="text-xs opacity-75">Spoilage Risk</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">
                    {insight.data.accuracy}
                  </div>
                  <div className="text-xs opacity-75">ML Accuracy</div>
                </div>
              </div>
              <div className="text-xs space-y-1">
                <div>Demand: {insight.data.demandForecast}</div>
                <div>Optimal Price: {insight.data.priceOptimal}</div>
              </div>
            </div>
          )}

          {insight.type === "market" && (
            <div className="space-y-2">
              <div className="flex justify-between">
                <div>
                  <div className="text-lg font-bold">
                    {insight.data.avgPrice}
                  </div>
                  <div className="text-xs opacity-75">Avg Market Price</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">
                    {insight.data.marketScore}
                  </div>
                  <div className="text-xs opacity-75">Market Score</div>
                </div>
              </div>
              <div className="text-xs space-y-1">
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  Trend: {insight.data.demandTrend}
                </div>
                <div>Top Demand: {insight.data.topDemand}</div>
              </div>
            </div>
          )}

          {insight.type === "operations" && (
            <div className="space-y-2">
              <div className="flex justify-between">
                <div>
                  <div className="text-lg font-bold">
                    {insight.data.processingTime}
                  </div>
                  <div className="text-xs opacity-75">Avg Processing</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">
                    {insight.data.completionRate}
                  </div>
                  <div className="text-xs opacity-75">Success Rate</div>
                </div>
              </div>
              <div className="flex justify-between items-center text-xs">
                <Badge
                  color={insight.data.pendingTasks <= 5 ? "success" : "warning"}
                >
                  {insight.data.pendingTasks} Pending
                </Badge>
                <span className="font-semibold">{insight.data.efficiency}</span>
              </div>
            </div>
          )}
        </CardBody>
      </Card>
    );
  };

  return (
    <RoleGuard allowed={[ROLES.COLLECTOR]}>
      <div
        className="bg-white text-black min-h-screen p-4"
        style={{ backgroundColor: "#fff", color: "#000" }}
      >
        <div className="p-6 flex justify-between items-start">
          {/* Left Side - Heading & Subtext */}
          <div>
            <h2 className="text-4xl font-bold mb-4 text-black">
              🚚 Collector Dashboard
            </h2>
            <p className="text-black mb-6 text-xl">
              Scan packages, verify authenticity, transfer custody.
            </p>
          </div>

          {/* Right Side - Buttons */}
          <div className="flex gap-3">
            <Button startContent={<Plus/>} className="w-fit px-6 py-2 rounded-lg shadow-md bg-[#64ae40] text-white">
             Request a Farmer
            </Button>
           <Button variant="bordered" startContent={<FaDownload />}>
                      Export
                    </Button>
          </div>
        </div>

        <StatsCard stats={statsData} />

        {/* Smart Insights Section */}
        <div className="mb-8 mt-6">
          <div className="flex items-center gap-3 mb-4">
            <Brain className="w-6 h-6 text-purple-600" />
            <h3 className="text-xl font-bold text-black">
              Smart Analytics & Insights
            </h3>
            <Chip size="sm" color="secondary" variant="flat">
              AI Powered
            </Chip>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {insights.map(renderInsightCard)}
          </div>
        </div>

        {/* Key Performance Indicators */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Key Performance Indicators
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 border-2">
              <CardBody className="p-4 text-center">
                <HandCoins className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-800">₹2.4L</div>
                <div className="text-sm text-blue-600">Monthly Revenue</div>
                <div className="text-xs text-green-600 mt-1">↗ +18.5%</div>
              </CardBody>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 border-2">
              <CardBody className="p-4 text-center">
                <Truck className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-800">94.2%</div>
                <div className="text-sm text-green-600">On-Time Delivery</div>
                <div className="text-xs text-green-600 mt-1">↗ +2.1%</div>
              </CardBody>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 border-2">
              <CardBody className="p-4 text-center">
                <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-800">127</div>
                <div className="text-sm text-purple-600">Active Farmers</div>
                <div className="text-xs text-purple-600 mt-1">↗ +12</div>
              </CardBody>
            </Card>

            <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200 border-2">
              <CardBody className="p-4 text-center">
                <Activity className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-amber-800">99.1%</div>
                <div className="text-sm text-amber-600">System Uptime</div>
                <div className="text-xs text-green-600 mt-1">↗ +0.3%</div>
              </CardBody>
            </Card>
          </div>
        </div>

        {/* Priority Actions */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            Priority Actions Required
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-l-4 border-red-500">
              <CardBody className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-semibold text-red-700">
                      Critical: Expired Inventory
                    </div>
                    <div className="text-sm text-slate-600 mt-1">
                      {expiredCount} batches have exceeded expiry date
                    </div>
                    <div className="text-xs text-red-600 mt-2">
                      Action: Review and dispose safely
                    </div>
                  </div>
                  <Chip size="sm" color="danger">
                    Urgent
                  </Chip>
                </div>
              </CardBody>
            </Card>

            <Card className="border-l-4 border-amber-500">
              <CardBody className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-semibold text-amber-700">
                      Warning: Expiring Soon
                    </div>
                    <div className="text-sm text-slate-600 mt-1">
                      {expiringIn7Days} batches expire within 7 days
                    </div>
                    <div className="text-xs text-amber-600 mt-2">
                      Action: Prioritize dispatch to manufacturers
                    </div>
                  </div>
                  <Chip size="sm" color="warning">
                    High
                  </Chip>
                </div>
              </CardBody>
            </Card>

            <Card className="border-l-4 border-blue-500">
              <CardBody className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-semibold text-blue-700">
                      Optimization: Quality Improvement
                    </div>
                    <div className="text-sm text-slate-600 mt-1">
                      {lowQualityCount} batches below quality threshold
                    </div>
                    <div className="text-xs text-blue-600 mt-2">
                      Action: Review collection practices with farmers
                    </div>
                  </div>
                  <Chip size="sm" color="primary">
                    Medium
                  </Chip>
                </div>
              </CardBody>
            </Card>

            <Card className="border-l-4 border-green-500">
              <CardBody className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-semibold text-green-700">
                      Opportunity: Market Demand
                    </div>
                    <div className="text-sm text-slate-600 mt-1">
                      High demand for Turmeric & Ashwagandha
                    </div>
                    <div className="text-xs text-green-600 mt-2">
                      Action: Increase procurement focus
                    </div>
                  </div>
                  <Chip size="sm" color="success">
                    Info
                  </Chip>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>

        <HerbsDataTable data={inventoryData} />
      </div>
    </RoleGuard>
  );
}
