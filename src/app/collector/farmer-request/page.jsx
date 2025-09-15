"use client";

import React, { useState } from "react";
import { 
  Card, 
  CardBody, 
  Tabs, 
  Tab, 
  Badge, 
  Button, 
  Avatar, 
  Chip,
  Input,
  Select,
  SelectItem
} from "@heroui/react";
import { 
  Search, 
  Filter, 
  Calendar, 
  MapPin, 
  Star, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  RotateCcw,
  Eye,
  Phone,
  MessageSquare,
  TrendingUp,
  Package,
  User,
  DollarSign,
  Truck,
  HandCoins
} from "lucide-react";
import { useRouter } from "next/navigation";

const FarmerRequestsPage = () => {
  const [activeTab, setActiveTab] = useState("incoming");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const router = useRouter();
  // Mock data for different request states
  const requestsData = {
    incoming: [
      {
        id: "FR-2024-001",
        farmer: "Ramesh Singh",
        herb: "Premium Turmeric",
        quantity: "150 kg",
        location: "Rajasthan, India", 
        requestDate: "2024-08-25",
        qualityScore: 97,
        expectedPrice: "₹125/kg",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        priority: "high",
        estimatedValue: "₹18,750"
      },
      {
        id: "FR-2024-002", 
        farmer: "Sunita Devi",
        herb: "Organic Ashwagandha",
        quantity: "75 kg",
        location: "Madhya Pradesh, India",
        requestDate: "2024-08-24", 
        qualityScore: 94,
        expectedPrice: "₹280/kg",
        avatar: "https://randomuser.me/api/portraits/women/45.jpg", 
        priority: "medium",
        estimatedValue: "₹21,000"
      },
      {
        id: "FR-2024-003",
        farmer: "Mohan Lal", 
        herb: "Wild Brahmi",
        quantity: "45 kg",
        location: "Kerala, India",
        requestDate: "2024-08-23",
        qualityScore: 92,
        expectedPrice: "₹450/kg", 
        avatar: "https://randomuser.me/api/portraits/men/67.jpg",
        priority: "high",
        estimatedValue: "₹20,250"
      }
    ],
    approved: [
      {
        id: "FR-2024-004",
        farmer: "Lakshmi Reddy", 
        herb: "Organic Neem",
        quantity: "200 kg",
        location: "Andhra Pradesh, India",
        approvedDate: "2024-08-20",
        scheduledPickup: "2024-08-28",
        qualityScore: 96,
        agreedPrice: "₹85/kg",
        avatar: "https://randomuser.me/api/portraits/women/23.jpg",
        status: "scheduled",
        totalValue: "₹17,000"
      }
    ],
    rescheduled: [
      {
        id: "FR-2024-005",
        farmer: "Arjun Patel",
        herb: "Holy Basil (Tulsi)",
        quantity: "90 kg", 
        location: "Gujarat, India",
        originalDate: "2024-08-22",
        newDate: "2024-08-30",
        rescheduleReason: "Heavy rains affecting road access",
        qualityScore: 89,
        agreedPrice: "₹160/kg",
        avatar: "https://randomuser.me/api/portraits/men/54.jpg",
        totalValue: "₹14,400"
      }
    ],
    completed: [
      {
        id: "FR-2024-006", 
        farmer: "Kavita Sharma",
        herb: "Organic Turmeric",
        quantity: "120 kg",
        location: "Punjab, India", 
        completedDate: "2024-08-18",
        finalPrice: "₹130/kg",
        qualityScore: 95,
        avatar: "https://randomuser.me/api/portraits/women/67.jpg",
        rating: 5,
        totalValue: "₹15,600",
        feedback: "Excellent quality, timely delivery"
      }
    ]
  };

  const RequestCard = ({ request, type }) => {
    const priorityColors = {
      high: { color: "danger", text: "High Priority" },
      medium: { color: "warning", text: "Medium Priority" },
      low: { color: "default", text: "Low Priority" }
    };

    const statusConfig = {
      incoming: { 
        icon: AlertCircle, 
        color: "primary", 
        bgColor: "bg-blue-50",
        actions: ["View Details", "Accept", "Contact"]
      },
      approved: { 
        icon: CheckCircle2, 
        color: "success", 
        bgColor: "bg-green-50",
        actions: ["View Details", "Schedule", "Contact"]
      },
      rescheduled: { 
        icon: RotateCcw, 
        color: "warning", 
        bgColor: "bg-amber-50",
        actions: ["View Details", "Confirm", "Contact"]
      },
      completed: { 
        icon: CheckCircle2, 
        color: "success", 
        bgColor: "bg-emerald-50",
        actions: ["View Details", "Rate", "Reorder"]
      }
    };

    const config = statusConfig[type];
    const StatusIcon = config.icon;

    return (
      <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500">
        <CardBody className="p-6">
          <div className="flex items-start gap-4">
            {/* Avatar and Basic Info */}
            <div className="flex items-center gap-4 flex-1">
              <div className="relative">
                <Avatar
                  src={request.avatar}
                  alt={request.farmer}
                  size="lg"
                  className="border-2 border-white shadow-md"
                />
                <div className={`absolute -bottom-1 -right-1 p-1 rounded-full ${config.bgColor} border-2 border-white`}>
                  <StatusIcon className={`w-3 h-3 text-${config.color}-600`} />
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-1">{request.farmer}</h3>
                    <p className="text-slate-600 font-medium">{request.herb}</p>
                  </div>
                  <div className="text-right">
                    <Chip
                      color={config.color}
                      variant="flat"
                      size="sm"
                      startContent={<StatusIcon className="w-3 h-3" />}
                    >
                      {type.toUpperCase()}
                    </Chip>
                    {request.priority && (
                      <Badge
                        color={priorityColors[request.priority]?.color}
                        variant="flat"
                        size="sm"
                        className="ml-2"
                      >
                        {priorityColors[request.priority]?.text}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-slate-500" />
                    <div>
                      <p className="text-xs text-slate-500">Quantity</p>
                      <p className="font-semibold text-slate-700">{request.quantity}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-500" />
                    <div>
                      <p className="text-xs text-slate-500">Location</p>
                      <p className="font-semibold text-slate-700 truncate">{request.location.split(',')[0]}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-slate-500" />
                    <div>
                      <p className="text-xs text-slate-500">Quality</p>
                      <p className="font-semibold text-slate-700">{request.qualityScore}%</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <HandCoins className="w-4 h-4 text-slate-500" />
                    <div>
                      <p className="text-xs text-slate-500">Value</p>
                      <p className="font-semibold text-slate-700">
                        {request.estimatedValue || request.totalValue}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Date Information */}
                <div className="flex items-center gap-4 mb-4 text-sm text-slate-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {type === 'incoming' && `Requested: ${new Date(request.requestDate).toLocaleDateString('en-IN')}`}
                      {type === 'approved' && `Pickup: ${new Date(request.scheduledPickup).toLocaleDateString('en-IN')}`}
                      {type === 'rescheduled' && `New Date: ${new Date(request.newDate).toLocaleDateString('en-IN')}`}
                      {type === 'completed' && `Completed: ${new Date(request.completedDate).toLocaleDateString('en-IN')}`}
                    </span>
                  </div>
                  <Chip size="sm" variant="flat">
                    ID: {request.id}
                  </Chip>
                </div>

                {/* Type-specific Information */}
                {type === 'rescheduled' && (
                  <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-sm text-amber-800">
                      <strong>Reschedule Reason:</strong> {request.rescheduleReason}
                    </p>
                  </div>
                )}

                {type === 'completed' && request.feedback && (
                  <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="font-semibold text-green-800">Rating: {request.rating}/5</span>
                    </div>
                    <p className="text-sm text-green-700">{request.feedback}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2">
                  <Button 
                    size="sm" 
                    color="primary" 
                    variant="solid"
                    startContent={<Eye className="w-4 h-4" />}
                    href={`/collector/farmer-request/${request.id}`}
                    onPress={() => {router.push(`/collector/farmer-request/${request.id}`)}}
                  >
                    View Details
                  </Button>
                  
                  {type === 'incoming' && (
                    <Button 
                      size="sm" 
                      color="success" 
                      variant="flat"
                      startContent={<CheckCircle2 className="w-4 h-4" />}
                    >
                      Accept Request
                    </Button>
                  )}
                  
                  {type === 'approved' && (
                    <Button 
                      size="sm" 
                      color="warning" 
                      variant="flat"
                      startContent={<Calendar className="w-4 h-4" />}
                    >
                      Reschedule
                    </Button>
                  )}

                  {type === 'rescheduled' && (
                    <Button 
                      size="sm" 
                      color="success" 
                      variant="flat"
                      startContent={<CheckCircle2 className="w-4 h-4" />}
                    >
                      Confirm New Date
                    </Button>
                  )}

                  <Button 
                    size="sm" 
                    color="default" 
                    variant="bordered"
                    startContent={<Phone className="w-4 h-4" />}
                  >
                    Contact
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    );
  };

  const getTabStats = (type) => {
    const data = requestsData[type] || [];
    return {
      count: data.length,
      totalValue: data.reduce((sum, item) => {
        const value = parseInt((item.estimatedValue || item.totalValue || '₹0').replace(/[₹,]/g, ''));
        return sum + value;
      }, 0)
    };
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">Farmer Requests</h1>
              <p className="text-lg text-slate-600">Manage collection requests and scheduling</p>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Incoming", count: getTabStats("incoming").count, color: "bg-blue-100 text-blue-700" },
                { label: "Approved", count: getTabStats("approved").count, color: "bg-green-100 text-green-700" },
                { label: "Rescheduled", count: getTabStats("rescheduled").count, color: "bg-amber-100 text-amber-700" },
                { label: "Completed", count: getTabStats("completed").count, color: "bg-emerald-100 text-emerald-700" }
              ].map((stat, index) => (
                <div key={index} className={`p-4 rounded-xl ${stat.color} text-center`}>
                  <div className="text-2xl font-bold">{stat.count}</div>
                  <div className="text-sm font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <Card className="mb-6 shadow-lg">
          <CardBody className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <Input
                placeholder="Search farmers, herbs, or locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                startContent={<Search className="w-4 h-4 text-slate-500" />}
                className="flex-1"
                size="lg"
              />
              
              <Select
                placeholder="Sort by..."
                value={sortBy}
                onChange={setSortBy}
                className="lg:w-48"
                size="lg"
                startContent={<Filter className="w-4 h-4" />}
              >
                <SelectItem key="date" value="date">Date</SelectItem>
                <SelectItem key="price" value="price">Price</SelectItem>
                <SelectItem key="quality" value="quality">Quality Score</SelectItem>
                <SelectItem key="quantity" value="quantity">Quantity</SelectItem>
                <SelectItem key="location" value="location">Location</SelectItem>
              </Select>
            </div>
          </CardBody>
        </Card>

        {/* Tabs */}
        <Tabs
          selectedKey={activeTab}
          onSelectionChange={setActiveTab}
          variant="bordered"
          classNames={{
            base: "w-full",
            tabList: "gap-6 w-full relative rounded-lg bg-white shadow-lg p-2",
            cursor: "w-full bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg",
            tab: "max-w-fit px-6 py-4 h-12",
            tabContent: "group-data-[selected=true]:text-white font-semibold"
          }}
        >
          <Tab
            key="incoming"
            title={
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <span>Incoming Requests</span>
                <Chip size="sm" color="primary" variant="flat">
                  {getTabStats("incoming").count}
                </Chip>
              </div>
            }
          >
            <div className="mt-6 space-y-4">
              {requestsData.incoming.length > 0 ? (
                requestsData.incoming.map((request) => (
                  <RequestCard key={request.id} request={request} type="incoming" />
                ))
              ) : (
                <Card>
                  <CardBody className="text-center py-12">
                    <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-lg text-slate-600">No incoming requests at the moment</p>
                    <p className="text-sm text-slate-500">New requests will appear here</p>
                  </CardBody>
                </Card>
              )}
            </div>
          </Tab>

          <Tab
            key="approved"
            title={
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Approved</span>
                <Chip size="sm" color="success" variant="flat">
                  {getTabStats("approved").count}
                </Chip>
              </div>
            }
          >
            <div className="mt-6 space-y-4">
              {requestsData.approved.length > 0 ? (
                requestsData.approved.map((request) => (
                  <RequestCard key={request.id} request={request} type="approved" />
                ))
              ) : (
                <Card>
                  <CardBody className="text-center py-12">
                    <CheckCircle2 className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-lg text-slate-600">No approved requests</p>
                    <p className="text-sm text-slate-500">Approved requests will show here</p>
                  </CardBody>
                </Card>
              )}
            </div>
          </Tab>

          <Tab
            key="rescheduled"
            title={
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4" />
                <span>Rescheduled</span>
                <Chip size="sm" color="warning" variant="flat">
                  {getTabStats("rescheduled").count}
                </Chip>
              </div>
            }
          >
            <div className="mt-6 space-y-4">
              {requestsData.rescheduled.length > 0 ? (
                requestsData.rescheduled.map((request) => (
                  <RequestCard key={request.id} request={request} type="rescheduled" />
                ))
              ) : (
                <Card>
                  <CardBody className="text-center py-12">
                    <RotateCcw className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-lg text-slate-600">No rescheduled requests</p>
                    <p className="text-sm text-slate-500">Rescheduled pickups will appear here</p>
                  </CardBody>
                </Card>
              )}
            </div>
          </Tab>

          <Tab
            key="completed"
            title={
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Completed</span>
                <Chip size="sm" color="success" variant="flat">
                  {getTabStats("completed").count}
                </Chip>
              </div>
            }
          >
            <div className="mt-6 space-y-4">
              {requestsData.completed.length > 0 ? (
                requestsData.completed.map((request) => (
                  <RequestCard key={request.id} request={request} type="completed" />
                ))
              ) : (
                <Card>
                  <CardBody className="text-center py-12">
                    <CheckCircle2 className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-lg text-slate-600">No completed requests yet</p>
                    <p className="text-sm text-slate-500">Completed collections will show here</p>
                  </CardBody>
                </Card>
              )}
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default FarmerRequestsPage;