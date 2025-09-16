"use client";

import React, { useState, useEffect } from "react";
import { RoleGuard } from "@/components/RoleGuard";
import { ROLES } from "@/utils/roles";

// Mock data for the inventory table
const mockBatches = [
  {
    batchId: "HRB-2025-003",
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
    batchId: "HRB-2025-008",
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
    batchId: "HRB-2025-002",
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
    batchId: "HRB-2025-001",
    herb: "Gotu Kola",
    species: "Centella asiatica",
    addedDate: "1 Sept 2025",
    quantity: "90 kg (18 bags)",
    quality: 85,
    expiry: "Exp: 25 Oct 2025",
    expiryDays: 41,
    urgent: false,
  },
  {
    batchId: "HRB-2025-007",
    herb: "Brahmi",
    species: "Bacopa monnieri",
    addedDate: "6 Sept 2025",
    quantity: "65 kg (13 bags)",
    quality: 76,
    expiry: "Exp: 27 Sept 2025",
    expiryDays: 13,
    urgent: false,
  },
  {
    batchId: "HRB-2025-006",
    herb: "Amla",
    species: "Phyllanthus emblica",
    addedDate: "8 Sept 2025",
    quantity: "200 kg (40 bags)",
    quality: 82,
    expiry: "Exp: 7 Oct 2025",
    expiryDays: 23,
    urgent: false,
  },
];

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
  let colorClass = "text-gray-600 dark:text-gray-400";
  let text = `${days} days left`;
  if (days <= 0) {
    colorClass = "text-red-500 font-semibold dark:text-red-400";
    text = "0 days left";
  } else if (days <= 7) {
    colorClass = "text-orange-500 font-semibold dark:text-orange-400";
  }

  return (
    <div className={colorClass}>
      {text}
    </div>
  );
};

export default function ExistingStock() {
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
          <p className="mt-4 text-gray-700 dark:text-gray-300 text-lg">
            Loading existing stock...
          </p>
        </div>
      </RoleGuard>
    );
  }

  return (
    <RoleGuard allowed={[ROLES.MANUFACTURER]}>
      <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">Existing Stock Inventory</h2>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          Manage and monitor your herbal stock batches.
        </p>

        {/* Action and Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 space-y-4 md:space-y-0">
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search by Batch ID or Herb..."
              className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>

          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
            <select className="px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white dark:border-gray-700">
              <option>All Categories</option>
              <option>Incoming</option>
              <option>Under Processing</option>
            </select>
            <select className="px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white dark:border-gray-700">
              <option>Sort By: Expiry Date</option>
              <option>Sort By: Quality</option>
            </select>
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-full shadow-md transition-colors duration-200 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path></svg>
              Add Stock
            </button>
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded-full shadow-md transition-colors duration-200 flex items-center justify-center dark:bg-gray-600 dark:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M17.001 20H7.001c-1.103 0-2-.897-2-2V9.001c0-1.103.897-2 2-2h10c1.103 0 2 .897 2 2v8.999c0 1.103-.897 2-2 2zm-10-10V9.001h10V10h-10zm0 2h10v6h-10v-6zM15 4c0-1.103.897-2 2-2s2 .897 2 2v1h-4V4z"></path></svg>
              Export
            </button>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Batch ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Herb
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Quality
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Expiry
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  QR
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {mockBatches.map((batch) => (
                <tr key={batch.batchId}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{batch.batchId}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Added: {batch.addedDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 dark:text-gray-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 1012 22 10 10 0 0012 2zm-1.5 15.5V10h3v7.5h-3zm-1-8h5v-2h-5v2z"></path></svg>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{batch.herb}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{batch.species}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {batch.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <QualityBar quality={batch.quality} />
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{batch.quality}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <ExpiryTag days={batch.expiryDays} />
                    <div className="text-xs text-gray-500 dark:text-gray-400">{batch.expiry}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=40x40&data=${batch.batchId}`}
                      alt="QR Code"
                      className="h-10 w-10"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-2">
                      <button className={`py-1 px-3 rounded-full text-xs font-semibold ${batch.urgent ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-white'}`}>
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

        <div className="flex justify-between items-center mt-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Showing 1 - 5 of 10</p>
          <div className="flex space-x-2">
            <button className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-semibold">
              ‹
            </button>
            <button className="bg-green-600 text-white py-2 px-4 rounded-full font-semibold">
              1
            </button>
            <button className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-semibold">
              2
            </button>
            <button className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-semibold">
              ›
            </button>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}
