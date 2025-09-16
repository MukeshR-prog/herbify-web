"use client";

import React, { useState, useEffect } from "react";
import { RoleGuard } from "@/components/RoleGuard";
import { ROLES } from "@/utils/roles";
import HerbsDataTable from "@/components/HerbsDataTable";
import { inventoryData as initialInventoryData } from "@/utils/inventoryData";
import { useProcessingBatches } from "@/store/useProcessingBatches";
import { Button } from "@heroui/react";
import { FaCheckCircle } from "react-icons/fa";

export default function ExistingStock() {
  const [loading, setLoading] = useState(true);
  const [inventoryData, setInventoryData] = useState(initialInventoryData);
  const [notification, setNotification] = useState(null);
  const { addBatch } = useProcessingBatches();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleBatchCreated = (batchDetails) => {
    // Get the selected items data
    const selectedItemsData = inventoryData.filter(item => 
      batchDetails.selectedItems.includes(item.batchId)
    );

    // Add batch to processing
    addBatch({
      ...batchDetails,
      selectedItems: selectedItemsData
    });

    // Remove selected items from inventory
    setInventoryData(prev => 
      prev.filter(item => !batchDetails.selectedItems.includes(item.batchId))
    );

    // Show notification
    setNotification({
      type: 'success',
      message: `Batch "${batchDetails.batchName}" created successfully with ${batchDetails.selectedItems.length} items!`,
      batchId: batchDetails.batchId
    });

    // Hide notification after 5 seconds
    setTimeout(() => setNotification(null), 5000);
  };

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
      <div className="relative">
        {/* Notification */}
        {notification && (
          <div className="fixed top-4 right-4 z-50 max-w-sm">
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-lg flex items-center gap-3">
              <FaCheckCircle className="w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-medium">{notification.message}</p>
                <p className="text-sm text-green-600">Batch ID: {notification.batchId}</p>
              </div>
              <button 
                onClick={() => setNotification(null)}
                className="ml-auto text-green-700 hover:text-green-900"
              >
                ×
              </button>
            </div>
          </div>
        )}

        <HerbsDataTable 
          data={inventoryData} 
          enableBatchCreation={true}
          onBatchCreated={handleBatchCreated}
        />
      </div>
    </RoleGuard>
  );
}
