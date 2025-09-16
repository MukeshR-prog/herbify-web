"use client";

import React, { useState, useEffect } from "react";
import { RoleGuard } from "@/components/RoleGuard";
import { ROLES } from "@/utils/roles";
import { useProcessingBatches } from "@/store/useProcessingBatches";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@heroui/react";
import HerbsDataTable from "@/components/HerbsDataTable";

// Reusable Progress Bar component
const ProcessingProgress = ({ progress }) => {
  let bgColor;
  if (progress < 50) {
    bgColor = "bg-red-500";
  } else if (progress < 80) {
    bgColor = "bg-yellow-500";
  } else {
    bgColor = "bg-green-500";
  }

  return (
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
      <div
        className={`h-2.5 rounded-full ${bgColor}`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default function UnderProcessing() {
  const [loading, setLoading] = useState(true);
  const { processingBatches, isLoaded } = useProcessingBatches();
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const handleViewDetails = (batch) => {
    setSelectedBatch(batch);
    setIsDetailsModalOpen(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  // Transform processing batches data to match HerbsDataTable format
  // This must be called before any conditional returns to maintain hook order
  const transformedData = React.useMemo(() => {
    if (!processingBatches || !Array.isArray(processingBatches)) return [];
    
    return processingBatches.map(batch => {
      if (!batch) return null;
      
      // Ensure addedDate is a string
      const addedDate = batch.addedDate instanceof Date 
        ? batch.addedDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
        : (batch.addedDate || new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }));
      
      return {
        batchId: batch.batchId || 'Unknown',
        herbType: batch.batchName || batch.herb || 'Unknown Batch',
        scientificName: batch.species || 'Unknown species',
        quantity: batch.quantity ? String(batch.quantity).split(' ')[0] : '0',
        bags: batch.quantity ? (String(batch.quantity).match(/\((\d+)\s*bags\)/)?.[1] || '0') : '0',
        expiryDays: 30,
        addedDate: addedDate,
        stage: batch.stage || 'Unknown',
        progress: batch.progress || 0,
        lastUpdate: batch.lastUpdate || new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        items: batch.items || []
      };
    }).filter(Boolean);
  }, [processingBatches]);

  // Wait for both loading states
  if (loading || !isLoaded) {
    return (
      <RoleGuard allowed={[ROLES.MANUFACTURER]}>
        <div className="flex flex-col items-center justify-center h-full min-h-screen">
          <svg className="animate-spin h-10 w-10 text-teal-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-4 text-gray-700 dark:text-gray-300 text-lg">
            Loading processing batches...
          </p>
        </div>
      </RoleGuard>
    );
  }

  return (
    <RoleGuard allowed={[ROLES.MANUFACTURER]}>
      <div className="relative">
        <HerbsDataTable 
          data={transformedData} 
          enableBatchCreation={false}
          onViewDetails={handleViewDetails}
          title="Under Processing"
          subtitle="Track the progress of batches in the manufacturing pipeline"
        />

        {/* Batch Details Modal */}
        <Modal 
          isOpen={isDetailsModalOpen} 
          onOpenChange={setIsDetailsModalOpen}
          size="4xl"
          scrollBehavior="inside"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  <h3 className="text-lg font-semibold">Batch Details: {selectedBatch?.batchName}</h3>
                  <p className="text-sm text-gray-600">Batch ID: {selectedBatch?.batchId}</p>
                </ModalHeader>
                <ModalBody>
                  {selectedBatch && (
                    <div className="space-y-6">
                      {/* Batch Summary */}
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Batch Summary</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Herb:</span>
                            <p className="font-medium">{selectedBatch.herb}</p>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Species:</span>
                            <p className="font-medium">{selectedBatch.species}</p>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Total Quantity:</span>
                            <p className="font-medium">{selectedBatch.quantity}</p>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Stage:</span>
                            <p className="font-medium">{selectedBatch.stage}</p>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Progress:</span>
                            <p className="font-medium">{selectedBatch.progress}%</p>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Added Date:</span>
                            <p className="font-medium">{selectedBatch.addedDate instanceof Date 
                              ? selectedBatch.addedDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
                              : selectedBatch.addedDate}</p>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Last Update:</span>
                            <p className="font-medium">{selectedBatch.lastUpdate instanceof Date 
                              ? selectedBatch.lastUpdate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
                              : selectedBatch.lastUpdate}</p>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Items Count:</span>
                            <p className="font-medium">{selectedBatch.items.length}</p>
                          </div>
                        </div>
                      </div>

                      {/* Individual Items */}
                      <div>
                        <h4 className="font-semibold mb-3">Individual Herb Items</h4>
                        <div className="space-y-3">
                          {selectedBatch.items.map((item, index) => (
                            <div key={item.batchId} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                              <div className="flex justify-between items-start mb-2">
                                <h5 className="font-medium">Item {index + 1}: {item.batchId}</h5>
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  Added: {new Date(item.addedDate).toLocaleDateString('en-IN', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric'
                                  })}
                                </span>
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                                <div>
                                  <span className="text-gray-600 dark:text-gray-400">Herb Type:</span>
                                  <p className="font-medium">{item.herbType}</p>
                                </div>
                                <div>
                                  <span className="text-gray-600 dark:text-gray-400">Scientific Name:</span>
                                  <p className="font-medium">{item.scientificName}</p>
                                </div>
                                <div>
                                  <span className="text-gray-600 dark:text-gray-400">Quantity:</span>
                                  <p className="font-medium">{item.quantity} ({item.bags} bags)</p>
                                </div>
                                <div>
                                  <span className="text-gray-600 dark:text-gray-400">Expiry:</span>
                                  <p className="font-medium">{item.expiryDays} days</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </RoleGuard>
  );
}
