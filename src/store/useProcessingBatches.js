"use client";

import { useState, useEffect } from 'react';

// Key for localStorage
const PROCESSING_BATCHES_KEY = 'herbify_processing_batches';

// Initial processing batches structure
const initialProcessingBatches = [
  {
    batchId: "PRC-2024-001",
    batchName: "Turmeric Extract Batch",
    herb: "Turmeric",
    species: "Curcuma longa",
    addedDate: "15 Sept 2025",
    quantity: "90 kg (18 bags)",
    stage: "Extraction",
    progress: 75,
    lastUpdate: "16 Sept 2025",
    items: [
      {
        batchId: "HRB-2024-001",
        herbType: "Turmeric",
        scientificName: "Curcuma longa",
        quantity: "45 kg",
        bags: "9",
        expiryDays: 45,
        addedDate: "2025-09-10T09:30:00Z"
      },
      {
        batchId: "HRB-2024-004",
        herbType: "Turmeric",
        scientificName: "Curcuma longa",
        quantity: "45 kg",
        bags: "9",
        expiryDays: 30,
        addedDate: "2025-09-12T09:30:00Z"
      }
    ]
  }
];

// Custom hook for processing batches
export const useProcessingBatches = () => {
  const [processingBatches, setProcessingBatches] = useState(initialProcessingBatches);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(PROCESSING_BATCHES_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setProcessingBatches(parsed);
      }
    } catch (error) {
      console.error('Error loading processing batches from localStorage:', error);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever processingBatches changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(PROCESSING_BATCHES_KEY, JSON.stringify(processingBatches));
      } catch (error) {
        console.error('Error saving processing batches to localStorage:', error);
      }
    }
  }, [processingBatches, isLoaded]);

  // Add a new batch
  const addBatch = (batchData) => {
    const newBatch = {
      batchId: batchData.batchId,
      batchName: batchData.batchName,
      herb: batchData.selectedItems.length > 0 ? batchData.selectedItems[0].herbType : 'Mixed Herbs',
      species: batchData.selectedItems.length > 0 ? batchData.selectedItems[0].scientificName : 'Multiple species',
      addedDate: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }),
      quantity: `${batchData.selectedItems.reduce((total, item) => {
        const qty = parseInt(item.quantity.split(' ')[0]);
        return total + qty;
      }, 0)} kg (${batchData.selectedItems.reduce((total, item) => total + parseInt(item.bags), 0)} bags)`,
      stage: "Preparation",
      progress: 0,
      lastUpdate: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }),
      items: batchData.selectedItems
    };

    setProcessingBatches(prev => [...prev, newBatch]);
  };

  // Remove a batch
  const removeBatch = (batchId) => {
    setProcessingBatches(prev => prev.filter(batch => batch.batchId !== batchId));
  };

  // Update batch progress
  const updateBatchProgress = (batchId, progress, stage) => {
    setProcessingBatches(prev => prev.map(batch =>
      batch.batchId === batchId
        ? {
            ...batch,
            progress,
            stage,
            lastUpdate: new Date().toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            })
          }
        : batch
    ));
  };

  return {
    processingBatches,
    addBatch,
    removeBatch,
    updateBatchProgress,
    isLoaded
  };
};