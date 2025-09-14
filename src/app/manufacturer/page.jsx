"use client";

import React, { useState, useEffect } from "react";
import { RoleGuard } from "@/components/RoleGuard";
import { ROLES } from "@/utils/roles";
import { BarChart, Bar, PieChart, Pie, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

// Mock data to simulate the state of the system
const mockDashboardData = {
  existingStockCount: 247,
  pendingRequests: 12,
  weeklyTransactions: { completed: 73, pending: 16 },
  spoilageAlerts: 3,
};

// Mock data for the inventory table
const mockBatches = [
  {
    batchId: "HRB-2024-003",
    herb: "Neem Leaves",
    species: "Azadirachta indica",
    addedDate: "5 Sept 2025",
    quantity: "75 kg (15 bags)",
    quality: 45,
    expiry: "Exp: 14 Sept 2025",
    expiryDays: 0,
    urgent: true,
  },
  {
    batchId: "HRB-2024-008",
    herb: "Fenugreek",
    species: "Trigonella foenum-graecum",
    addedDate: "29 Aug 2025",
    quantity: "150 kg (30 bags)",
    quality: 68,
    expiry: "Exp: 20 Sept 2025",
    expiryDays: 6,
    urgent: true,
  },
  {
    batchId: "HRB-2024-002",
    herb: "Ashwagandha",
    species: "Withania somnifera",
    addedDate: "3 Sept 2025",
    quantity: "180 kg (36 bags)",
    quality: 70,
    expiry: "Exp: 10 Oct 2025",
    expiryDays: 10,
    urgent: false,
  },
  {
    batchId: "HRB-2024-001",
    herb: "Gotu Kola",
    species: "Centella asiatica",
    addedDate: "1 Sept 2025",
    quantity: "90 kg (18 bags)",
    quality: 85,
    expiry: "Exp: 25 Oct 2025",
    expiryDays: 41,
    urgent: false,
  },
];

// Mock data for the dashboard charts
const stockData = {
  incoming: 150,
  existing: 420,
  underProcessing: 85,
  toDispatch: 110,
  dispatched: 345,
};

const stockChartData = [
  { name: 'Incoming', value: stockData.incoming },
  { name: 'Existing', value: stockData.existing },
  { name: 'Processing', value: stockData.underProcessing },
  { name: 'To Dispatch', value: stockData.toDispatch },
  { name: 'Dispatched', value: stockData.dispatched },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const QualityBar = ({ quality }) => {
  let bgColor;
  if (quality < 50) {
    bgColor = "bg-red-500";
  } else if (quality < 75) {
    bgColor = "bg-yellow-500";
  } else {
    bgColor = "bg-green-500";
  }

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div className={`h-2.5 rounded-full ${bgColor}`} style={{ width: `${quality}%` }}></div>
    </div>
  );
};

const ExpiryTag = ({ days }) => {
  let colorClass = "text-gray-600";
  let text = `${days} days left`;
  if (days <= 0) {
    colorClass = "text-red-500 font-semibold";
    text = "0 days left";
  } else if (days <= 7) {
    colorClass = "text-orange-500 font-semibold";
  }

  return (
    <div className={colorClass}>
      {text}
    </div>
  );
};

export default function AnalyticsDashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <RoleGuard allowed={[ROLES.MANUFACTURER]}>
        <div className="flex flex-col items-center justify-center h-full min-h-screen">
          <svg className="animate-spin h-10 w-10 text-teal-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-4 text-gray-700 text-lg">
            Loading dashboard analytics...
          </p>
        </div>
      </RoleGuard>
    );
  }

  return (
    <RoleGuard allowed={[ROLES.MANUFACTURER]}>
      <div className="p-4 sm:p-6 lg:p-8 bg-white text-gray-900 min-h-screen" style={{ backgroundColor: '#fff', color: '#222' }}>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Existing Stock Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between" style={{ backgroundColor: '#fff', color: '#222' }}>
            <div className="flex justify-between items-start mb-4">
              <span className="text-4xl text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor"><path d="M11 2C8.243 2 6 4.243 6 7c0 2.451 1.777 4.492 4.14 4.93L10 12h-1c-2.757 0-5 2.243-5 5v5h2v-5c0-1.654 1.346-3 3-3h1v1.93l.14-.07c2.363-.438 4.14-2.479 4.14-4.93a5 5 0 00-5-5zM17 12c-2.757 0-5 2.243-5 5v5h2v-5c0-1.654 1.346-3 3-3s3 1.346 3 3v5h2v-5c0-2.757-2.243-5-5-5zM17 2c-2.757 0-5 2.243-5 5s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z"></path></svg>
              </span>
              <span className="bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-full">Urgent</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Existing Stock Count</h3>
            <p className="text-5xl font-bold text-gray-900 my-2">{mockDashboardData.existingStockCount}</p>
            <p className="text-green-500 font-semibold">+5.2%</p>
            <p className="text-gray-500 text-sm mt-2">12 batches added today</p>
          </div>

          {/* Pending Requests Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between" style={{ backgroundColor: '#fff', color: '#222' }}>
            <div className="flex justify-between items-start mb-4">
              <span className="text-4xl text-orange-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path></svg>
              </span>
              <span className="bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-full">Urgent</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Pending Requests</h3>
            <p className="text-5xl font-bold text-gray-900 my-2">{mockDashboardData.pendingRequests}</p>
            <p className="text-orange-500 font-semibold">3 requests {'>'} 24hrs old</p>
          </div>

          {/* Weekly Transactions Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between" style={{ backgroundColor: '#fff', color: '#222' }}>
            <div className="flex justify-between items-start mb-4">
              <span className="text-4xl text-green-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor"><path d="M17 12c.001-2.766-2.244-5-5-5s-5 2.234-5 5 2.244 5 5 5 5-2.234 5-5zM10 12c0-1.104.896-2 2-2s2 .896 2 2-.896 2-2 2-2-.896-2-2zM12 2A10 10 0 002 12a10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2zm0 18a8 8 0 01-8-8c0-4.411 3.589-8 8-8s8 3.589 8 8a8 8 0 01-8 8z"></path></svg>
              </span>
              <span className="bg-gray-500 text-white text-xs font-semibold px-2 py-1 rounded-full">This Week</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Weekly Transactions</h3>
            <p className="text-5xl font-bold text-gray-900 my-2">{mockDashboardData.weeklyTransactions.completed + mockDashboardData.weeklyTransactions.pending}</p>
            <p className="text-gray-500 font-semibold">{mockDashboardData.weeklyTransactions.completed} Completed {mockDashboardData.weeklyTransactions.pending} Pending</p>
          </div>

          {/* Spoilage Alerts Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between" style={{ backgroundColor: '#fff', color: '#222' }}>
            <div className="flex justify-between items-start mb-4">
              <span className="text-4xl text-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor"><path d="M21 15.01c0-1.89-1.213-3.483-3.04-4.062A4.013 4.013 0 0017 4a4.013 4.013 0 00-3.96-3.078C9.404 1.102 7.152 4.298 7.02 7.02l.142 3.14-3.14.142C1.523 10.323.01 12.03.01 14a3.999 3.999 0 004 4.02v4h4v-4a3.999 3.999 0 004-4.02z"></path></svg>
              </span>
              <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">Expiring</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Spoilage Alerts</h3>
            <p className="text-5xl font-bold text-gray-900 my-2">{mockDashboardData.spoilageAlerts}</p>
            <p className="text-red-500 font-semibold">3 batches expiring {'<'} 48 hrs</p>
          </div>
        </div>

        {/* --- */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Bar Chart for all Stock Categories */}
          <div className="bg-white rounded-xl shadow-lg p-6" style={{ backgroundColor: '#fff', color: '#222' }}>
            <h3 className="text-xl font-bold mb-4 text-gray-800">Current Stock Breakdown</h3>
            <div className="w-full h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stockChartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" name="Units" fill="#00C49F" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart for all Stock Categories */}
          <div className="bg-white rounded-xl shadow-lg p-6" style={{ backgroundColor: '#fff', color: '#222' }}>
            <h3 className="text-xl font-bold mb-4 text-gray-800">Stock Distribution</h3>
            <div className="w-full h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stockChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {stockChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-2 text-gray-800">Existing Stock Inventory</h2>
        <p className="mb-4 text-gray-600">
          Manage and monitor your herbal stock batches.
        </p>

        {/* Action and Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 space-y-4 md:space-y-0">
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search by Batch ID or Herb..."
              className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>

          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
            <select className="px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent">
              <option>All Categories</option>
              <option>Incoming</option>
              <option>Under Processing</option>
            </select>
            <select className="px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent">
              <option>Sort By: Expiry Date</option>
              <option>Sort By: Quality</option>
            </select>
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-full shadow-md transition-colors duration-200 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path></svg>
              Add Stock
            </button>
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded-full shadow-md transition-colors duration-200 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M17.001 20H7.001c-1.103 0-2-.897-2-2V9.001c0-1.103.897-2 2-2h10c1.103 0 2 .897 2 2v8.999c0 1.103-.897 2-2 2zm-10-10V9.001h10V10h-10zm0 2h10v6h-10v-6zM15 4c0-1.103.897-2 2-2s2 .897 2 2v1h-4V4z"></path></svg>
              Export
            </button>
          </div>
        </div>

        {/* Inventory Table */}
  <div className="bg-white rounded-xl shadow-lg overflow-x-auto" style={{ backgroundColor: '#fff', color: '#222' }}>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Batch ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Herb
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quality
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expiry
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  QR
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockBatches.map((batch) => (
                <tr key={batch.batchId}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{batch.batchId}</div>
                    <div className="text-xs text-gray-500">Added: {batch.addedDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 1012 22 10 10 0 0012 2zm-1.5 15.5V10h3v7.5h-3zm-1-8h5v-2h-5v2z"></path></svg>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{batch.herb}</div>
                        <div className="text-xs text-gray-500">{batch.species}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {batch.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <QualityBar quality={batch.quality} />
                    <div className="text-xs text-gray-500 mt-1">{batch.quality}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <ExpiryTag days={batch.expiryDays} />
                    <div className="text-xs text-gray-500">{batch.expiry}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=40x40&data=${batch.batchId}`}
                      alt="QR Code"
                      className="h-10 w-10"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <button className={`py-1 px-3 rounded-full text-xs font-semibold ${batch.urgent ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                        {batch.urgent ? 'Urgent' : 'Dispatch'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --- */}

  
      </div>
    </RoleGuard>
  );
}
