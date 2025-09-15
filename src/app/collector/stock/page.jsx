"use client";

import React, { useState } from "react";
import { 
  Package, 
  Truck, 
  TrendingUp, 
  AlertTriangle, 
  Users, 
  Clock,
  BarChart3,
  Activity
} from "lucide-react";
import StockSummaryCard from "@/components/stock/StockSummaryCard";
import StockAnalyticsChart from "@/components/stock/StockAnalyticsChart";
import StockTable from "@/components/stock/StockTable";
import StockTabs from "@/components/stock/StockTabs";

const StockPage = () => {
  const [activeTab, setActiveTab] = useState("instock");

  // Sample data - replace with actual API calls
  const instockSummary = {
    totalQuantity: "2,847 kg",
    totalBatches: 42,
    herbVarieties: 15,
    expiryRisk: "8 batches"
  };

  const dispatchedSummary = {
    totalDispatched: "1,235 kg", 
    completedDispatches: 28,
    manufacturersConnected: 7,
    pendingDeliveries: 5
  };

  // In-Stock Sample Data
  const instockData = [
    {
      id: "1",
      batchId: "BTH-2024-001",
      herbName: "Turmeric",
      herbType: "Anti-inflammatory",
      quantity: "125",
      unit: "kg",
      source: "Rajesh Kumar",
      sourceType: "Farmer",
      dateReceived: "2024-01-15",
      expiryRisk: "Low",
      status: "Available"
    },
    {
      id: "2", 
      batchId: "BTH-2024-002",
      herbName: "Ashwagandha",
      herbType: "Adaptogen",
      quantity: "89",
      unit: "kg", 
      source: "Priya Collective",
      sourceType: "Collector",
      dateReceived: "2024-01-12",
      expiryRisk: "Medium",
      status: "Available"
    },
    {
      id: "3",
      batchId: "BTH-2024-003", 
      herbName: "Neem",
      herbType: "Antibacterial",
      quantity: "67",
      unit: "kg",
      source: "Suresh Farming",
      sourceType: "Farmer", 
      dateReceived: "2024-01-08",
      expiryRisk: "High",
      status: "Expiring Soon"
    },
    {
      id: "4",
      batchId: "BTH-2024-004",
      herbName: "Brahmi",
      herbType: "Cognitive",
      quantity: "143",
      unit: "kg",
      source: "Wellness Farmers",
      sourceType: "Collective",
      dateReceived: "2024-01-20",
      expiryRisk: "Low",
      status: "Available"
    },
    {
      id: "5",
      batchId: "BTH-2024-005",
      herbName: "Triphala",
      herbType: "Digestive",
      quantity: "234",
      unit: "kg", 
      source: "Kumar Brothers",
      sourceType: "Farmer",
      dateReceived: "2024-01-18",
      expiryRisk: "Low", 
      status: "Available"
    }
  ];

  // Dispatched Stock Sample Data
  const dispatchedData = [
    {
      id: "1",
      dispatchId: "DSP-2024-001", 
      herbName: "Turmeric",
      herbType: "Anti-inflammatory",
      quantitySent: "200",
      unit: "kg",
      manufacturerName: "Himalaya Wellness",
      manufacturerLocation: "Mumbai, MH",
      dateOfDispatch: "2024-01-10",
      status: "Delivered"
    },
    {
      id: "2",
      dispatchId: "DSP-2024-002",
      herbName: "Ashwagandha", 
      herbType: "Adaptogen",
      quantitySent: "150",
      unit: "kg",
      manufacturerName: "Patanjali Ayurved",
      manufacturerLocation: "Haridwar, UK",
      dateOfDispatch: "2024-01-08",
      status: "In Transit"
    },
    {
      id: "3",
      dispatchId: "DSP-2024-003",
      herbName: "Brahmi",
      herbType: "Cognitive", 
      quantitySent: "75",
      unit: "kg",
      manufacturerName: "Baidyanath Group",
      manufacturerLocation: "Kolkata, WB",
      dateOfDispatch: "2024-01-12",
      status: "Completed"
    },
    {
      id: "4",
      dispatchId: "DSP-2024-004",
      herbName: "Neem",
      herbType: "Antibacterial",
      quantitySent: "180",
      unit: "kg",
      manufacturerName: "Dabur India",
      manufacturerLocation: "Ghaziabad, UP", 
      dateOfDispatch: "2024-01-14",
      status: "Pending"
    }
  ];

  // Chart Data
  const stockDistributionData = [
    { name: "Turmeric", value: 125 },
    { name: "Ashwagandha", value: 89 },
    { name: "Brahmi", value: 143 }, 
    { name: "Neem", value: 67 },
    { name: "Triphala", value: 234 },
    { name: "Others", value: 189 }
  ];

  const stockTrendData = [
    { name: "Week 1", value: 1200 },
    { name: "Week 2", value: 1450 },
    { name: "Week 3", value: 1680 },
    { name: "Week 4", value: 1320 },
    { name: "Week 5", value: 1890 },
    { name: "Week 6", value: 2100 },
    { name: "Week 7", value: 1950 }
  ];

  const dispatchTrendData = [
    { name: "Week 1", value: 800 },
    { name: "Week 2", value: 950 },
    { name: "Week 3", value: 1100 }, 
    { name: "Week 4", value: 850 },
    { name: "Week 5", value: 1200 },
    { name: "Week 6", value: 1350 },
    { name: "Week 7", value: 1150 }
  ];

  const dispatchDistributionData = [
    { name: "Himalaya Wellness", value: 35 },
    { name: "Patanjali Ayurved", value: 28 },
    { name: "Baidyanath Group", value: 22 },
    { name: "Dabur India", value: 15 }
  ];

  const handleRowClick = (item) => {
    // Navigate to farmer request page
    window.location.href = `/collector/farmer-request/${item.id}`;
  };

  const renderInstockTab = () => (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StockSummaryCard
          title="Total In-Stock"
          value={instockSummary.totalQuantity}
          subtitle="Available quantity"
          icon={Package}
          color="blue"
          trend={12}
        />
        <StockSummaryCard
          title="Batches Available" 
          value={instockSummary.totalBatches}
          subtitle="Active batches"
          icon={BarChart3}
          color="green"
          trend={8}
        />
        <StockSummaryCard
          title="Herb Varieties"
          value={instockSummary.herbVarieties}
          subtitle="Different herbs"
          icon={Activity}
          color="purple"
          trend={3}
        />
        <StockSummaryCard
          title="Expiry Risk"
          value={instockSummary.expiryRisk}
          subtitle="Needs attention"
          icon={AlertTriangle}
          color="amber"
          trend={-5}
        />
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StockAnalyticsChart
          type="pie"
          data={stockDistributionData}
          title="Stock Distribution by Herb Type"
          height={300}
          color="#3b82f6"
        />
        <StockAnalyticsChart
          type="line"
          data={stockTrendData}
          title="Stock Received Trend (Weekly)"
          height={300}
          color="#10b981"
        />
      </div>

      {/* Detailed Table */}
      <StockTable
        data={instockData}
        type="instock"
        onRowClick={handleRowClick}
        searchPlaceholder="Search by Batch ID, Herb Name, Source..."
        emptyMessage="No in-stock data available"
      />
    </div>
  );

  const renderDispatchedTab = () => (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StockSummaryCard
          title="Total Dispatched"
          value={dispatchedSummary.totalDispatched}
          subtitle="Quantity sent"
          icon={Truck}
          color="green"
          trend={15}
        />
        <StockSummaryCard
          title="Completed Dispatches"
          value={dispatchedSummary.completedDispatches}
          subtitle="Successful deliveries"
          icon={Package}
          color="blue"
          trend={18}
        />
        <StockSummaryCard
          title="Manufacturers"
          value={dispatchedSummary.manufacturersConnected}
          subtitle="Active connections"
          icon={Users}
          color="purple" 
          trend={2}
        />
        <StockSummaryCard
          title="Pending Deliveries"
          value={dispatchedSummary.pendingDeliveries}
          subtitle="In progress"
          icon={Clock}
          color="amber"
          trend={-10}
        />
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StockAnalyticsChart
          type="line"
          data={dispatchTrendData}
          title="Dispatch Trend (Weekly)"
          height={300}
          color="#8b5cf6"
        />
        <StockAnalyticsChart
          type="pie"
          data={dispatchDistributionData}
          title="Dispatch Distribution by Manufacturer"
          height={300}
          color="#f59e0b"
        />
      </div>

      {/* Detailed Table */}
      <StockTable
        data={dispatchedData}
        type="dispatched"
        onRowClick={handleRowClick}
        searchPlaceholder="Search by Dispatch ID, Herb Name, Manufacturer..."
        emptyMessage="No dispatched stock data available"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto p-6">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-100 rounded-xl shadow-sm">
              <Package className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Stock Management
              </h1>
              <p className="text-lg text-slate-600 mt-1">
                Track available stock and dispatched stock in real-time
              </p>
            </div>
          </div>
        </div>

        {/* Tabbed Content */}
        <StockTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          instockContent={renderInstockTab()}
          dispatchedContent={renderDispatchedTab()}
        />
      </div>
    </div>
  );
};

export default StockPage;