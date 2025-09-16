// src/data/mockData.js

export const mockDashboardData = {
    // These numbers are now based on the inventoryData array
    existingStockCount: 6,
    pendingRequests: 2,
    weeklyTransactions: { completed: 8, pending: 2 },
    spoilageAlerts: 3,
};

export const inventoryData = [
    {
        batchId: "HRB-2024-001",
        addedDate: new Date("2025-09-10T09:30:00Z"),
        herbType: "Turmeric",
        scientificName: "Curcuma longa",
        quantity: "250 kg",
        bags: "50",
        expiryDays: 45, // days from now
        expiryDate: new Date("2025-10-25T09:30:00Z"),
    },
    {
        batchId: "HRB-2024-002",
        addedDate: new Date("2025-09-07T14:15:00Z"),
        herbType: "Ashwagandha",
        scientificName: "Withania somnifera",
        quantity: "180 kg",
        bags: "36",
        expiryDays: 10,
        expiryDate: new Date("2025-09-24T14:15:00Z"),
    },
    {
        batchId: "HRB-2024-003",
        addedDate: new Date("2025-09-05T10:00:00Z"),
        herbType: "Turmeric",
        scientificName: "Curcuma longa",
        quantity: "75 kg",
        bags: "15",
        expiryDays: 0,
        expiryDate: new Date("2025-09-14T10:00:00Z"),
    },
    {
        batchId: "HRB-2024-004",
        addedDate: new Date("2025-09-09T12:00:00Z"),
        herbType: "Ginger",
        scientificName: "Zingiber officinale",
        quantity: "120 kg",
        bags: "24",
        expiryDays: 27,
        expiryDate: new Date("2025-10-12T12:00:00Z"),
    },
    {
        batchId: "HRB-2024-005",
        addedDate: new Date("2025-09-11T16:30:00Z"),
        herbType: "Ashwagandha",
        scientificName: "Withania somnifera",
        quantity: "95 kg",
        bags: "19",
        expiryDays: 57,
        expiryDate: new Date("2025-11-10T16:30:00Z"),
    },
    {
        batchId: "HRB-2024-006",
        addedDate: new Date("2025-09-08T09:45:00Z"),
        herbType: "Ginger",
        scientificName: "Phyllanthus emblica",
        quantity: "200 kg",
        bags: "40",
        expiryDays: 22,
        expiryDate: new Date("2025-10-07T09:45:00Z"),
    },
];

export const stockChartData = [
  { name: "Existing", value: 6 }, // Reflects the new inventoryData count
  { name: "Processing", value: 4 }, // Example mock value
  { name: "Dispatched", value: 6 },  // Example mock value
];

export const COLORS = ["#00C49F", "#FFBB28", "#0088FE", "#FF8042"];
