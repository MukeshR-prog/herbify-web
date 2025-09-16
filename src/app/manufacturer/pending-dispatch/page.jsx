"use client";

import React, { useState, useEffect } from "react";
import { RoleGuard } from "@/components/RoleGuard";
import { ROLES } from "@/utils/roles";

// Mock data for batches that are currently under processing
const mockUnderProcessingBatches = [
  {
    batchId: "HRB-2025-009",
    herb: "Gotu Kola",
    species: "Centella asiatica",
    quantity: "90 kg (18 bags)",
    quality: 85,
    processingStage: "Grinding",
    labReportLink: "#",
    urgent: false,
  },
  {
    batchId: "HRB-2025-010",
    herb: "Ashwagandha",
    species: "Withania somnifera",
    quantity: "180 kg (36 bags)",
    quality: 70,
    processingStage: "Extraction",
    labReportLink: "#",
    urgent: true,
  },
  {
    batchId: "HRB-2025-011",
    herb: "Brahmi",
    species: "Bacopa monnieri",
    quantity: "65 kg (13 bags)",
    quality: 76,
    processingStage: "Blending",
    labReportLink: "#",
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

export default function UnderProcessing() {
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
            Loading batches under processing...
          </p>
        </div>
      </RoleGuard>
    );
  }

  return (
    <RoleGuard allowed={[ROLES.MANUFACTURER]}>
      <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">Batches Under Processing</h2>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          Monitor the progress and quality of batches currently being processed.
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
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-full shadow-md transition-colors duration-200 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path></svg>
              Add New Log
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
                  Processing Stage
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Quality
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {mockUnderProcessingBatches.map((batch) => (
                <tr key={batch.batchId}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{batch.batchId}</div>
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-200">
                      {batch.processingStage}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <QualityBar quality={batch.quality} />
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{batch.quality}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-2">
                      <button className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white py-1 px-3 rounded-full text-xs font-semibold">
                        View Log
                      </button>
                      <button className={`py-1 px-3 rounded-full text-xs font-semibold ${batch.urgent ? 'bg-red-500 text-white' : 'bg-green-600 text-white'}`}>
                        {batch.urgent ? 'Urgent' : 'Complete'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </RoleGuard>
  );
}
