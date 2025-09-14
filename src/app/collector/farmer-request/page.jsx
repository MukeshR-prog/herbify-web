"use client";
import { useState } from "react";
import { Button, Chip } from "@heroui/react";
import FarmerRequestCard from "@/components/cards/FarmerRequestCard";

const initialRequests = [
  {
    id: "FR-2024-089",
    name: "Ramesh Singh",
    herb: "Turmeric",
    quantity: "150 kg",
    quality: "Grade A",
    location: "Rajasthan",
    notes: "Organic cultivation, ready for harvest. Quality certificates available.",
    addedDate: "2 days ago",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: "FR-2024-091",
    name: "Priya Sharma",
    herb: "Ashwagandha",
    quantity: "200 kg",
    quality: "Grade A+",
    location: "Madhya Pradesh",
    notes: "Premium quality roots, sun-dried following traditional methods.",
    addedDate: "5 days ago",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: "FR-2024-093",
    name: "Kumar Patel",
    herb: "Neem Leaves",
    quantity: "100 kg",
    quality: "Grade B+",
    location: "Gujarat",
    notes: "Fresh harvest, pesticide-free cultivation with organic certification.",
    addedDate: "1 day ago",
    image: "https://randomuser.me/api/portraits/men/36.jpg",
  },
  {
    id: "FR-2024-094",
    name: "Kumar Patel",
    herb: "Neem Leaves",
    quantity: "100 kg",
    quality: "Grade B+",
    location: "Gujarat",
    notes: "Fresh harvest, pesticide-free cultivation with organic certification.",
    addedDate: "1 day ago",
    image: "https://randomuser.me/api/portraits/men/36.jpg",
  },
  {
    id: "FR-2024-095",
    name: "Kumar Patel",
    herb: "Neem Leaves",
    quantity: "100 kg",
    quality: "Grade B+",
    location: "Gujarat",
    notes: "Fresh harvest, pesticide-free cultivation with organic certification.",
    addedDate: "1 day ago",
    image: "https://randomuser.me/api/portraits/men/36.jpg",
  },
  {
    id: "FR-2024-09",
    name: "Kumar Patel",
    herb: "Neem Leaves",
    quantity: "100 kg",
    quality: "Grade B+",
    location: "Gujarat",
    notes: "Fresh harvest, pesticide-free cultivation with organic certification.",
    addedDate: "1 day ago",
    image: "https://randomuser.me/api/portraits/men/36.jpg",
  },
];

const FarmerRequestsPage = () => {
  const [requests, setRequests] = useState(initialRequests);

  const handleApprove = (id) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
    alert(`Request ${id} Approved ✅`);
  };

  const handleReject = (id) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
    alert(`Request ${id} Rejected ❌`);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Pending Farmer Requests</h2>
          <p className="text-sm text-gray-500">
            Review and approve stock collection requests from farmers
          </p>
        </div>

        <div className="flex items-center gap-3 mt-4 md:mt-0">
          <Chip color="warning" variant="flat">
            {requests.length} Pending
          </Chip>
          <Button variant="bordered">Filter</Button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.map((req) => (
          <FarmerRequestCard
            key={req.id}
            request={req}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        ))}
      </div>

      {/* Load More */}
      {requests.length > 0 && (
        <div className="flex justify-center mt-8">
          <Button variant="flat" color="primary">
            Load More Requests
          </Button>
        </div>
      )}
    </div>
  );
};

export default FarmerRequestsPage;
