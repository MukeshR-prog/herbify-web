"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Badge, Divider, Progress, Avatar, Chip } from "@heroui/react";
import {
  MapPin,
  Calendar,
  Shield,
  FileText,
  Camera,
  Truck,
  User,
  Phone,
  Mail,
  Award,
  Leaf,
  Scale,
  Star,
  Download,
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Droplets,
  Sun,
  Package,
  Factory,
  BarChart3,
  Eye,
  MessageSquare,
  Calendar as CalendarIcon,
  DollarSign,
  Target,
  Users,
  Building2,
  Zap,
  ShieldCheck,
  Activity,
  Thermometer,
  Microscope,
  ChevronRight,
  ExternalLink,
  Timer,
  Globe,
  Truck as TruckIcon,
  CheckCircle2,
  AlertCircle,
  Info,
  Briefcase,
  CreditCard,
  MapPin as LocationIcon,
} from "lucide-react";

// Import custom components

import MetricDisplay from "@/components/cards/MetricDisplay";
import TimelineStep from "@/components/timeline/TimelineStep";
import LabReportCard from "@/components/cards/LabReportCard";
import InputItem from "@/components/cards/InputItem";
import ImageShowcase from "@/components/gallery/ImageShowcase";
import ActionButton from "@/components/buttons/ActionButton";
import SchedulePickupModal from "@/components/modals/SchedulePickupModal";
import SectionCard from "@/components/cards/SectionCard";

const FarmerRequestDetailsPage = () => {
  const { id } = useParams();
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  const dummyData = {
    id,
    name: "Ramesh Singh",
    herb: "Premium Turmeric",
    quantity: "150 kg",
    quality: "Grade A+",
    location: "Rajasthan, India",
    notes:
      "Premium organic cultivation with traditional methods. Ready for immediate collection with complete documentation and quality certificates.",
    geoTag: "26.9124° N, 75.7873° E",
    cultivatedDate: "2025-03-15",
    harvestedDate: "2025-08-20",
    requestDate: "2025-08-25",
    farmerImage: "https://randomuser.me/api/portraits/men/32.jpg",

    timeline: [
      {
        date: "2025-03-15",
        event: "Land Preparation",
        description: "Soil testing and organic preparation completed",
        status: "completed",
        icon: Sun,
      },
      {
        date: "2025-03-20",
        event: "Seeds Planted",
        description: "Premium rhizomes planted with 98% germination rate",
        status: "completed",
        icon: Leaf,
      },
      {
        date: "2025-04-20",
        event: "Growth Monitoring",
        description: "Regular monitoring and organic fertilization",
        status: "completed",
        icon: Activity,
      },
      {
        date: "2025-06-15",
        event: "Mid-Season Care",
        description: "Pest control and disease prevention measures",
        status: "completed",
        icon: Shield,
      },
      {
        date: "2025-08-10",
        event: "Pre-Harvest Testing",
        description: "Quality assessment and curcumin content analysis",
        status: "completed",
        icon: Microscope,
      },
      {
        date: "2025-08-20",
        event: "Harvest Complete",
        description: "Perfect timing harvest with optimal curcumin levels",
        status: "completed",
        icon: CheckCircle2,
      },
      {
        date: "2025-08-25",
        event: "Quality Certified",
        description: "All lab tests passed, ready for collection",
        status: "active",
        icon: Award,
      },
    ],

    pesticides: [
      {
        name: "Neem Oil Extract",
        type: "100% Organic",
        usage: "Natural pest deterrent",
        date: "2025-04-10",
        quantity: "2.5L/acre",
        safety: "excellent",
        category: "organic",
      },
      {
        name: "Vermicompost Premium",
        type: "Organic Fertilizer",
        usage: "Soil enrichment",
        date: "2025-03-20",
        quantity: "600kg/acre",
        safety: "excellent",
        category: "fertilizer",
      },
      {
        name: "Trichoderma Viride",
        type: "Bio-Fungicide",
        usage: "Root disease prevention",
        date: "2025-05-05",
        quantity: "1kg/acre",
        safety: "excellent",
        category: "biocontrol",
      },
      {
        name: "Rock Phosphate",
        type: "Natural Mineral",
        usage: "Phosphorus supplement",
        date: "2025-04-15",
        quantity: "50kg/acre",
        safety: "good",
        category: "mineral",
      },
    ],

    labReports: [
      {
        id: "LAB-TUR-001",
        testType: "Pesticide Residue Analysis",
        status: "Excellent",
        date: "2025-08-22",
        lab: "National Food Safety Laboratory, Delhi",
        results:
          "Zero pesticide residues detected - Exceeds EU organic standards",
        score: 98,
        priority: "high",
        downloadLink: "#",
      },
      {
        id: "LAB-TUR-002",
        testType: "Purity report",
        status: "Premium",
        date: "2025-08-21",
        lab: "Spice Board Research Institute",
        results: "Curcumin: 6.8% | Purity: 99.4% | Exceptional quality grade",
        score: 97,
        priority: "high",
        downloadLink: "#",
      },
      {
        id: "LAB-TUR-003",
        testType: "Microbiological Safety",
        status: "Passed",
        date: "2025-08-23",
        lab: "Agricultural Quality Control Lab",
        results: "All pathogens negative | Safe for consumption",
        score: 95,
        priority: "medium",
        downloadLink: "#",
      },
      {
        id: "LAB-TUR-004",
        testType: "Heavy Metals Analysis",
        status: "Excellent",
        date: "2025-08-24",
        lab: "Environmental Testing Center",
        results: "All heavy metals within safe limits | Premium grade",
        score: 96,
        priority: "high",
        downloadLink: "#",
      },
    ],

    images: {
      field:
        "https://etimg.etb2bimg.com/photo/84335031.cms",
      harvested:
        "https://media.istockphoto.com/id/511574907/photo/gardener-gathers-rosemary-herb.jpg?s=612x612&w=0&k=20&c=v1E-KFayRn2FLYiflR8n7Z-XpD1N9tFG54EsAnuttJI=",
      packed:
        "https://static.theprint.in/wp-content/uploads/2023/09/farmer-Parwar-696x392.jpg?compress=true&quality=80&w=376&dpr=2.6",
      processed:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG4iNSF2yBkMvcn0uAAi-IGG1QGolOxvb_uw&s",
      quality:
        "https://farmonaut.com/wp-content/uploads/2025/06/Agricultural-Packaging-Solutions-Boost-Freshness-Cut-Waste_2.jpg",
      storage:
        "https://static.theprint.in/wp-content/uploads/2023/09/farmer-Parwar-696x392.jpg?compress=true&quality=80&w=376&dpr=2.6",
    },

    farmDetails: {
      farmSize: "5.2 acres",
      soilType: "Red laterite (pH 6.8)",
      irrigationType: "Precision drip irrigation system",
      certifications: [
        "NPOP Organic",
        "Fair Trade Certified",
        "ISO 22000",
        "HACCP",
      ],
      previousCrops: ["Organic Wheat", "Mustard", "Chickpea rotation"],
      experience: "18 years",
      farmingMethod: "Regenerative Agriculture",
    },

    contactInfo: {
      phone: "+91 98765 43210",
      email: "ramesh.singh@organicfarm.com",
      alternateContact: "+91 87654 32109",
      whatsapp: "+91 98765 43210",
    },

    pricing: {
      expectedPrice: "₹125",
      marketRate: "₹118",
      minimumPrice: "₹112",
      premiumRate: "₹132",
      priceUnit: "per kg",
      totalValue: "₹18,750",
    },

    logistics: {
      preferredPickupDate: "2025-08-28",
      packagingType: "Food-grade jute bags (25kg each)",
      storageCondition: "Temperature-controlled warehouse (18-22°C)",
      transportMode: "Refrigerated vehicle preferred",
      readyForPickup: true,
      estimatedLoadTime: "45 minutes",
    },

    metrics: {
      qualityScore: 97,
      reliabilityScore: 95,
      sustainabilityScore: 98,
      marketDemand: 92,
      priceCompetitiveness: 89,
    },

    businessInfo: {
      registrationNumber: "REG/OFS/2019/4521",
      gstNumber: "08ABCDE1234F1Z5",
      bankVerified: true,
      insurance: "Crop Insurance Active",
    },
  };

  const handleSchedulePickup = (scheduleData) => {
    console.log("Pickup scheduled:", scheduleData);
    // Here you would typically make an API call to save the schedule
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      {/* Modern Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-indigo-100 rounded-xl">
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                    Collection Request
                  </h1>
                  <p className="text-slate-600 text-sm sm:text-base">
                    Request ID:{" "}
                    <span className="font-mono font-semibold">
                      #{dummyData.id}
                    </span>
                  </p>
                </div>
              </div>
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl">
                Comprehensive quality analysis and collection details for
                premium {dummyData.herb}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Badge color="success" variant="shadow" size="lg">
                <CheckCircle className="w-4 h-4 mr-2" />
                Ready for Collection
              </Badge>
              <Badge color="primary" variant="flat">
                Premium Grade
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        {/* Metrics Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <MetricDisplay
            icon={Star}
            label="Overall Quality"
            value={`${dummyData.metrics.qualityScore}%`}
            subValue="Premium Grade"
            color="emerald"
            // size="large"
            percentage={92}
            trend={+5}
          />

          <MetricDisplay
            icon={TrendingUp}
            label="Reliability Score"
            value={`${dummyData.metrics.reliabilityScore}%`}
            subValue="Consistent Supply"
            color="blue"
            percentage={dummyData.metrics.reliabilityScore}
            trend={+3}
          />

          <MetricDisplay
            icon={Leaf}
            label="Sustainability"
            value={`${dummyData.metrics.sustainabilityScore}%`}
            subValue="Eco Certified"
            color="green"
            percentage={dummyData.metrics.sustainabilityScore}
            trend={+2}
          />

          <MetricDisplay
            icon={BarChart3}
            label="Market Demand"
            value={`${dummyData.metrics.marketDemand}%`}
            subValue="High Growth Region"
            color="purple"
            percentage={dummyData.metrics.marketDemand}
            trend={+7}
          />

          <MetricDisplay
            icon={DollarSign}
            label="Price Index"
            value={`${dummyData.metrics.priceCompetitiveness}%`}
            subValue="Competitive Pricing"
            color="amber"
            percentage={dummyData.metrics.priceCompetitiveness}
            trend={-2}
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-11 gap-4 sm:gap-6">
          {/* Main Content */}
          <div className="xl:col-span-7 space-y-4 sm:space-y-6">
            {/* Farmer Profile */}
            <SectionCard
              icon={User}
              title="Farmer Profile & Business Details"
              subtitle="Certified organic farmer with 18+ years experience"
              headerColor="bg-gradient-to-r from-blue-50 to-indigo-50"
            >
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-6">
                <div className="relative mx-auto sm:mx-0">
                  <Avatar
                    src={dummyData.farmerImage}
                    alt={dummyData.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 border-4 border-white shadow-lg"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-emerald-500 rounded-full p-2 border-2 border-white">
                    <Award className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                      {dummyData.name}
                    </h3>
                    <Badge color="success" variant="flat" size="lg">
                      <ShieldCheck className="w-4 h-4 mr-1" />
                      Verified Farmer
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-slate-600">
                      <Phone className="w-4 h-4" />
                      <span className="text-sm">
                        {dummyData.contactInfo.phone}
                      </span>
                    </div>
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-slate-600">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm truncate">
                        {dummyData.contactInfo.email}
                      </span>
                    </div>
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-slate-600">
                      <LocationIcon className="w-4 h-4" />
                      <span className="text-sm">{dummyData.location}</span>
                    </div>
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-slate-600">
                      <BarChart3 className="w-4 h-4" />
                      <span className="text-sm">
                        {dummyData.farmDetails.farmSize} Organic Farm
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 text-sm">
                    <div className="text-center sm:text-left">
                      <span className="text-slate-500">Registration:</span>
                      <span className="font-mono ml-2 block sm:inline">
                        {dummyData.businessInfo.registrationNumber}
                      </span>
                    </div>
                    <div className="text-center sm:text-left">
                      <span className="text-slate-500">GST Number:</span>
                      <span className="font-mono ml-2 block sm:inline">
                        {dummyData.businessInfo.gstNumber}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                    {dummyData.farmDetails.certifications.map((cert, index) => (
                      <Chip
                        key={index}
                        size="sm"
                        color="success"
                        variant="flat"
                        startContent={<Award className="w-3 h-3" />}
                      >
                        {cert}
                      </Chip>
                    ))}
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* Product Overview */}
            <SectionCard
              icon={Leaf}
              title="Product Collection Overview"
              subtitle="Premium organic turmeric ready for immediate collection"
              headerColor="bg-gradient-to-r from-emerald-50 to-green-50"
            >
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
                <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-emerald-100 to-green-100 rounded-2xl border-2 border-emerald-200">
                  <Leaf className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-600 mx-auto mb-3" />
                  <p className="text-xs sm:text-sm text-slate-600 mb-1">
                    Product Type
                  </p>
                  <p className="font-bold text-sm sm:text-lg text-slate-900">
                    {dummyData.herb}
                  </p>
                </div>
                <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl border-2 border-blue-200">
                  <Scale className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600 mx-auto mb-3" />
                  <p className="text-xs sm:text-sm text-slate-600 mb-1">
                    Total Quantity
                  </p>
                  <p className="font-bold text-sm sm:text-lg text-slate-900">
                    {dummyData.quantity}
                  </p>
                </div>
                <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-purple-100 to-violet-100 rounded-2xl border-2 border-purple-200">
                  <Star className="w-8 h-8 sm:w-10 sm:h-10 text-purple-600 mx-auto mb-3" />
                  <p className="text-xs sm:text-sm text-slate-600 mb-1">
                    Quality Grade
                  </p>
                  <p className="font-bold text-sm sm:text-lg text-purple-900">
                    {dummyData.quality}
                  </p>
                </div>
                <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl border-2 border-amber-200">
                  <DollarSign className="w-8 h-8 sm:w-10 sm:h-10 text-amber-600 mx-auto mb-3" />
                  <p className="text-xs sm:text-sm text-slate-600 mb-1">
                    Total Value
                  </p>
                  <p className="font-bold text-sm sm:text-lg text-amber-800">
                    {dummyData.pricing.totalValue}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 p-4 bg-slate-50 rounded-xl">
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Location Details
                  </h4>
                  <p className="text-sm text-slate-600 mb-1">
                    Coordinates: {dummyData.geoTag}
                  </p>
                  <p className="text-sm text-slate-600">
                    Soil: {dummyData.farmDetails.soilType}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                    <Droplets className="w-4 h-4" />
                    Cultivation Method
                  </h4>
                  <p className="text-sm text-slate-600 mb-1">
                    Method: {dummyData.farmDetails.farmingMethod}
                  </p>
                  <p className="text-sm text-slate-600">
                    Irrigation: {dummyData.farmDetails.irrigationType}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    Storage & Packaging
                  </h4>
                  <p className="text-sm text-slate-600 mb-1">
                    Storage: {dummyData.logistics.storageCondition}
                  </p>
                  <p className="text-sm text-slate-600">
                    Packaging: {dummyData.logistics.packagingType}
                  </p>
                </div>
              </div>
            </SectionCard>

            {/* Cultivation Timeline */}
            <SectionCard
              icon={Clock}
              title="Complete Cultivation Journey"
              subtitle="From seed to harvest - 158 days of careful cultivation"
              headerColor="bg-gradient-to-r from-violet-50 to-purple-50"
            >
              <div className="space-y-4">
                {dummyData.timeline.map((item, index) => (
                  <TimelineStep
                    key={index}
                    item={item}
                    index={index}
                    isLast={index === dummyData.timeline.length - 1}
                  />
                ))}
              </div>
            </SectionCard>

            {/* Agricultural Inputs */}
            <SectionCard
              icon={Shield}
              title="Agricultural Inputs & Safety Profile"
              subtitle="100% organic and bio-approved inputs used throughout cultivation"
              headerColor="bg-gradient-to-r from-green-50 to-emerald-50"
            >
              <div className="space-y-4">
                {dummyData.pesticides.map((input, index) => (
                  <InputItem key={index} input={input} />
                ))}
              </div>
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <ShieldCheck className="w-5 h-5 text-green-600" />
                  <h4 className="font-semibold text-green-800">
                    Safety Certification
                  </h4>
                </div>
                <p className="text-sm text-green-700">
                  All inputs are certified organic and comply with NPOP, EU
                  Organic, and USDA Organic standards. Zero synthetic chemicals
                  or harmful substances used throughout the cultivation cycle.
                </p>
              </div>
            </SectionCard>

            {/* Lab Test Reports */}
            <SectionCard
              icon={Microscope}
              title="Quality Assurance & Lab Reports"
              subtitle="Comprehensive testing by certified laboratories"
              headerColor="bg-gradient-to-r from-blue-50 to-cyan-50"
            >
              <div className="grid gap-6">
                {dummyData.labReports.map((report, index) => (
                  <LabReportCard key={index} report={report} />
                ))}
              </div>
              <div className="mt-6 p-6 bg-blue-50 border border-blue-200 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <BarChart3 className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-800">
                        Overall Quality Rating
                      </h4>
                      <p className="text-sm text-blue-600">
                        Based on all lab test results
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-blue-800">
                      96.5%
                    </div>
                    <div className="text-sm text-blue-600">Premium Grade</div>
                  </div>
                </div>
                <Progress
                  value={96.5}
                  color="primary"
                  size="lg"
                  className="max-w-full"
                />
              </div>
            </SectionCard>
          </div>

          {/* Sidebar */}
          <div className="xl:col-span-4 space-y-4 sm:space-y-6">
            {/* Visual Documentation */}
            <SectionCard
              icon={Camera}
              title="Visual Documentation"
              subtitle="Complete photographic record"
              headerColor="bg-gradient-to-r from-indigo-50 to-purple-50"
            >
              <ImageShowcase images={dummyData.images} />
            </SectionCard>

            {/* Logistics & Pricing */}
            <SectionCard
              icon={TruckIcon}
              title="Logistics & Pricing"
              subtitle="Collection and payment details"
              headerColor="bg-gradient-to-r from-amber-50 to-orange-50"
            >
              <div className="space-y-4 sm:space-y-6">
                {/* Collection Details */}
                <div className="p-4 bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <CalendarIcon className="w-5 h-5 text-indigo-600" />
                    </div>
                    <h4 className="font-semibold text-slate-800">
                      Collection Schedule
                    </h4>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Preferred Date:</span>
                      <span className="font-semibold">
                        {new Date(
                          dummyData.logistics.preferredPickupDate
                        ).toLocaleDateString("en-IN", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Est. Load Time:</span>
                      <span className="font-semibold">
                        {dummyData.logistics.estimatedLoadTime}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Transport Mode:</span>
                      <span className="font-semibold">
                        {dummyData.logistics.transportMode}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Pricing Breakdown */}
                <div className="p-4 bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-emerald-100 rounded-lg">
                      <DollarSign className="w-5 h-5 text-emerald-600" />
                    </div>
                    <h4 className="font-semibold text-slate-800">
                      Pricing Structure
                    </h4>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Expected Price:</span>
                      <span className="font-bold text-lg text-emerald-700">
                        {dummyData.pricing.expectedPrice}/kg
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Market Rate:</span>
                      <span className="font-semibold">
                        {dummyData.pricing.marketRate}/kg
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Premium Rate:</span>
                      <span className="font-semibold text-amber-600">
                        {dummyData.pricing.premiumRate}/kg
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Minimum Price:</span>
                      <span className="font-semibold text-red-600">
                        {dummyData.pricing.minimumPrice}/kg
                      </span>
                    </div>
                    <Divider className="my-2" />
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-slate-700">
                        Total Value:
                      </span>
                      <span className="font-bold text-xl text-slate-900">
                        {dummyData.pricing.totalValue}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Payment & Business Info */}
                <div className="p-4 bg-gradient-to-br from-slate-50 to-gray-50 border border-slate-200 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-slate-100 rounded-lg">
                      <CreditCard className="w-5 h-5 text-slate-600" />
                    </div>
                    <h4 className="font-semibold text-slate-800">
                      Payment & Verification
                    </h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Bank Verified:</span>
                      <Badge color="success" size="sm">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Insurance:</span>
                      <Badge color="primary" size="sm" variant="flat">
                        Active Coverage
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">GST Status:</span>
                      <Badge color="success" size="sm">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Registered
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* Action Center */}
            <SectionCard
              icon={Target}
              title="Action Center"
              subtitle="Quick actions and communication"
              headerColor="bg-gradient-to-r from-rose-50 to-pink-50"
            >
              <div className="space-y-3">
                <ActionButton
                  icon={CheckCircle2}
                  label="Accept Collection Request"
                  color="success"
                  size="lg"
                />
                <ActionButton
                  icon={Calendar}
                  label="Schedule Pickup Time"
                  color="primary"
                  size="lg"
                  onClick={() => setIsScheduleModalOpen(true)}
                />
                <ActionButton
                  icon={Phone}
                  label="Call Farmer Direct"
                  color="default"
                  variant="bordered"
                />
                <ActionButton
                  icon={MessageSquare}
                  label="Send WhatsApp Message"
                  color="success"
                  variant="flat"
                />
                <ActionButton
                  icon={MapPin}
                  label="View Farm Location"
                  color="primary"
                  variant="flat"
                />
                <ActionButton
                  icon={Eye}
                  label="Track in Real-time"
                  color="secondary"
                  variant="flat"
                />
                <ActionButton
                  icon={AlertCircle}
                  label="Report Quality Issue"
                  color="warning"
                  variant="flat"
                />
                <ActionButton
                  icon={Briefcase}
                  label="Generate Contract"
                  color="default"
                  variant="flat"
                />
              </div>
            </SectionCard>

            {/* Request Summary */}
            <SectionCard
              icon={Info}
              title="Request Summary"
              subtitle="Key details and metadata"
              headerColor="bg-gradient-to-r from-gray-50 to-slate-50"
            >
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl">
                  <h4 className="font-semibold text-slate-800 mb-2">
                    Farmer's Note
                  </h4>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {dummyData.notes}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3 text-sm">
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                    <span className="text-slate-600">Request ID:</span>
                    <span className="font-mono font-semibold">
                      FR-{dummyData.id}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                    <span className="text-slate-600">Submitted:</span>
                    <span className="font-semibold">
                      {new Date(dummyData.requestDate).toLocaleDateString(
                        "en-IN",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                    <span className="text-slate-600">Last Updated:</span>
                    <span className="font-semibold">
                      {new Date().toLocaleDateString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                    <span className="text-slate-600">Priority Status:</span>
                    <Badge color="warning" variant="flat">
                      <Timer className="w-3 h-3 mr-1" />
                      High Priority
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                    <span className="text-slate-600">Collection Status:</span>
                    <Badge color="success" variant="shadow">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Ready
                    </Badge>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                    <Clock className="w-3 h-3" />
                    <span>
                      Last activity: {new Date().toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>
            </SectionCard>
          </div>
        </div>
      </div>

      {/* Schedule Pickup Modal */}
      <SchedulePickupModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        farmerData={dummyData}
        onSchedule={handleSchedulePickup}
      />
    </div>
  );
};

export default FarmerRequestDetailsPage;
