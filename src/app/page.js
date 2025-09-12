"use client";

import React from "react";
import {
  Shield,
  Eye,
  Package,
  Users,
  Leaf,
  TrendingUp,
  CheckCircle,
  Globe,
  Database,
  Smartphone,
  BarChart3,
  FileText,
  Star,
  ArrowRight,
  Menu,
  X,
  Play,
  Download,
  QrCode,
  Brain,
  Cloud,
  Phone,
  Link,
  TestTube,
  Truck,
  ShoppingCart,
} from "lucide-react";
import { useState } from "react";

// Reusable Components
const ChallengeCard = ({
  icon: Icon,
  title,
  description,
  metric,
  metricLabel,
  color,
  bgColor,
}) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow">
    <div
      className={`w-16 h-16 rounded-full ${bgColor} flex items-center justify-center mb-6`}
    >
      <Icon className={`w-8 h-8 ${color}`} />
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
    <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
    <div className={`rounded-xl p-4 ${bgColor} bg-opacity-10`}>
      <div className={`text-3xl font-bold ${color} mb-1`}>{metric}</div>
      <div className="text-sm text-gray-600">{metricLabel}</div>
    </div>
  </div>
);

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  iconColor,
  bgColor,
}) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
    <div
      className={`w-12 h-12 rounded-xl ${bgColor} flex items-center justify-center mb-4`}
    >
      <Icon className={`w-6 h-6 ${iconColor}`} />
    </div>
    <h3 className="text-lg font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed text-sm">{description}</p>
    <button
      className={`mt-4 text-sm font-medium ${iconColor} hover:underline flex items-center`}
    >
      Learn More <ArrowRight className="w-4 h-4 ml-1" />
    </button>
  </div>
);

const TestimonialCard = ({ name, role, location, quote, avatar }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
    <div className="flex mb-4">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
      ))}
    </div>
    <p className="text-gray-700 mb-6 leading-relaxed">"{quote}"</p>
    <div className="flex items-center">
      <div className="w-12 h-12 rounded-full bg-gray-200 mr-3 flex items-center justify-center">
        <span className="text-lg font-semibold text-gray-600">
          {name.charAt(0)}
        </span>
      </div>
      <div>
        <p className="font-bold text-gray-900">{name}</p>
        <p className="text-sm text-gray-500">
          {role}, {location}
        </p>
      </div>
    </div>
  </div>
);

const TransformCard = ({
  icon: Icon,
  title,
  description,
  metrics,
  bgColor,
  iconColor,
}) => (
  <div className={`${bgColor} rounded-2xl p-8 text-center`}>
    <div className="w-32 h-32 rounded-2xl bg-white bg-opacity-20 flex items-center justify-center mx-auto mb-6">
      <Icon className="w-16 h-16 text-white" />
    </div>
    <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
    <p className="text-white text-opacity-90 mb-6 leading-relaxed">
      {description}
    </p>
    <div className="grid grid-cols-2 gap-4">
      {metrics.map((metric, index) => (
        <div key={index} className="bg-white bg-opacity-20 rounded-xl p-3">
          <div className="text-2xl font-bold text-white">{metric.value}</div>
          <div className="text-sm text-white text-opacity-80">
            {metric.label}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const WorkflowStep = ({
  icon: Icon,
  title,
  description,
  color,
  bgColor,
  step,
}) => (
  <div className="text-center">
    <div
      className={`w-16 h-16 rounded-full ${bgColor} flex items-center justify-center mx-auto mb-4`}
    >
      <Icon className={`w-8 h-8 ${color}`} />
    </div>
    <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

const TechCard = ({ icon: Icon, title, description, color }) => (
  <div className={`${color} rounded-2xl p-8 text-center`}>
    <div className="w-16 h-16 rounded-2xl bg-white bg-opacity-20 flex items-center justify-center mx-auto mb-4">
      <Icon className="w-8 h-8 text-white" />
    </div>
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-white text-opacity-90 text-sm">{description}</p>
  </div>
);

export default function HerBChainLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">
                  HerBChain
                </span>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a
                  href="#about"
                  className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium"
                >
                  About
                </a>
                <a
                  href="#features"
                  className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium"
                >
                  Features
                </a>
                <a
                  href="#impact"
                  className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium"
                >
                  Impact
                </a>
                <a
                  href="#workflow"
                  className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium"
                >
                  How It Works
                </a>
                <a
                  href="#contact"
                  className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium"
                >
                  Contact
                </a>
              </div>
            </div>

            <div className="hidden md:block">
              <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium">
                Try Demo
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-600 hover:text-blue-600"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
                <a
                  href="#about"
                  className="block text-gray-600 hover:text-blue-600 px-3 py-2 text-base font-medium"
                >
                  About
                </a>
                <a
                  href="#features"
                  className="block text-gray-600 hover:text-blue-600 px-3 py-2 text-base font-medium"
                >
                  Features
                </a>
                <a
                  href="#impact"
                  className="block text-gray-600 hover:text-blue-600 px-3 py-2 text-base font-medium"
                >
                  Impact
                </a>
                <a
                  href="#workflow"
                  className="block text-gray-600 hover:text-blue-600 px-3 py-2 text-base font-medium"
                >
                  How It Works
                </a>
                <a
                  href="#contact"
                  className="block text-gray-600 hover:text-blue-600 px-3 py-2 text-base font-medium"
                >
                  Contact
                </a>
                <button className="w-full text-left bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium">
                  Try Demo
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Government Badge */}
          <div className="mb-8">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
              <CheckCircle className="w-4 h-4 mr-2" />
              Government Approved • SIH 2024
            </span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-8">
                <span className="text-green-500">HerBChain</span> –<br />
                <span className="text-gray-900">Trust, Quality &</span>
                <br />
                <span className="text-blue-500">Traceability</span>{" "}
                <span className="text-gray-900">for</span>
                <br />
                <span className="text-green-500">Medicinal Plants</span>
              </h1>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                Revolutionary blockchain-powered platform ensuring complete
                transparency and authenticity in the herbal medicine supply
                chain. From farm to pharmacy, every step is verified and
                traceable.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-blue-500 text-white px-8 py-4 rounded-xl hover:bg-blue-600 transition-colors flex items-center justify-center font-medium">
                  <Play className="mr-2 w-5 h-5" />
                  Try Demo
                </button>
                <button className="border-2 border-green-500 text-green-600 px-8 py-4 rounded-xl hover:bg-green-50 transition-colors flex items-center justify-center font-medium">
                  <Download className="mr-2 w-5 h-5" />
                  Download Brochure
                </button>
              </div>
            </div>

            {/* Hero Illustration */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-400 via-blue-500 to-green-400 rounded-3xl p-8 h-96 relative overflow-hidden">
                {/* Blockchain network visualization */}
                <div className="absolute inset-4 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    {/* Central blockchain node */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-2xl font-bold text-blue-600">
                        B
                      </span>
                    </div>

                    {/* QR codes scattered around */}
                    <div className="absolute top-4 left-4 w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                      <QrCode className="w-8 h-8 text-blue-600" />
                    </div>
                    <div className="absolute top-4 right-4 w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                      <QrCode className="w-8 h-8 text-green-600" />
                    </div>
                    <div className="absolute bottom-4 left-8 w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                      <QrCode className="w-8 h-8 text-purple-600" />
                    </div>
                    <div className="absolute bottom-4 right-8 w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                      <QrCode className="w-8 h-8 text-orange-600" />
                    </div>

                    {/* Farmer illustrations represented by icons */}
                    <div className="absolute bottom-8 left-1/4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute bottom-8 right-1/4 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                      <Leaf className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-500 mb-2">10K+</div>
              <div className="text-lg font-semibold text-gray-900 mb-1">
                Farmers Connected
              </div>
              <div className="text-gray-600 text-sm">
                Empowering agricultural communities
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-500 mb-2">500+</div>
              <div className="text-lg font-semibold text-gray-900 mb-1">
                Herb Varieties
              </div>
              <div className="text-gray-600 text-sm">
                Comprehensive medicinal plant database
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">99.9%</div>
              <div className="text-lg font-semibold text-gray-900 mb-1">
                Accuracy Rate
              </div>
              <div className="text-gray-600 text-sm">
                Reliable traceability and verification
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Industry Challenges */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Current Industry Challenges
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The herbal medicine industry faces critical issues that compromise
              quality, safety, and consumer trust.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <ChallengeCard
              icon={Eye}
              title="Lack of Traceability"
              description="Unable to trace the origin of herbs, leading to uncertainty about quality, authenticity, and safety of medicinal plants in the supply chain."
              metric="78%"
              metricLabel="of herbs lack proper documentation"
              color="text-red-500"
              bgColor="bg-red-100"
            />
            <ChallengeCard
              icon={Package}
              title="Mixing & Substitution"
              description="Fraudulent practices include mixing inferior herbs or complete substitution with cheaper alternatives, compromising therapeutic efficacy."
              metric="45%"
              metricLabel="contamination rate in samples"
              color="text-orange-500"
              bgColor="bg-orange-100"
            />
            <ChallengeCard
              icon={TrendingUp}
              title="Export Rejection"
              description="High rejection rates at international borders due to quality concerns, pesticide residues, and lack of proper certification documentation."
              metric="₹2000Cr"
              metricLabel="annual loss due to rejections"
              color="text-red-500"
              bgColor="bg-red-100"
            />
          </div>
        </div>
      </section>

      {/* Blockchain-powered Transparency */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
              <Shield className="w-4 h-4 mr-2" />
              Revolutionary Solution
            </span>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">
                Blockchain-Powered
                <br />
                <span className="text-blue-500">Transparency</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                HerBChain leverages cutting-edge blockchain technology combined
                with AI-powered quality assessment to create an immutable,
                transparent, and trustworthy herbal medicine supply chain. Every
                herb is tagged with a unique QR code that contains its complete
                journey from seed to shelf.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-0.5" />
                  <span className="text-gray-700">
                    Immutable blockchain records ensure data integrity
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-0.5" />
                  <span className="text-gray-700">
                    AI/ML algorithms detect quality and authenticity
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-0.5" />
                  <span className="text-gray-700">
                    Real-time tracking from farm to consumer
                  </span>
                </li>
              </ul>
              <button className="bg-green-500 text-white px-8 py-3 rounded-xl hover:bg-green-600 transition-colors flex items-center font-medium">
                <ArrowRight className="mr-2 w-5 h-5" />
                Explore Technology
              </button>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-400 rounded-3xl p-8 h-96 relative overflow-hidden">
                {/* Blockchain network visualization */}
                <div className="absolute inset-4 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    {/* Central blockchain node */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-2xl font-bold text-blue-600">
                        B
                      </span>
                    </div>

                    {/* Connected nodes */}
                    <div className="absolute top-8 left-8 w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md">
                      <QrCode className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="absolute top-8 right-8 w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md">
                      <QrCode className="w-6 h-6 text-cyan-600" />
                    </div>
                    <div className="absolute bottom-8 left-12 w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md">
                      <QrCode className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="absolute bottom-8 right-12 w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md">
                      <QrCode className="w-6 h-6 text-purple-600" />
                    </div>

                    {/* Connection lines */}
                    <svg className="absolute inset-0 w-full h-full">
                      <line
                        x1="50%"
                        y1="50%"
                        x2="25%"
                        y2="25%"
                        stroke="white"
                        strokeWidth="2"
                        strokeOpacity="0.6"
                      />
                      <line
                        x1="50%"
                        y1="50%"
                        x2="75%"
                        y2="25%"
                        stroke="white"
                        strokeWidth="2"
                        strokeOpacity="0.6"
                      />
                      <line
                        x1="50%"
                        y1="50%"
                        x2="30%"
                        y2="75%"
                        stroke="white"
                        strokeWidth="2"
                        strokeOpacity="0.6"
                      />
                      <line
                        x1="50%"
                        y1="50%"
                        x2="70%"
                        y2="75%"
                        stroke="white"
                        strokeWidth="2"
                        strokeOpacity="0.6"
                      />
                    </svg>
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <Leaf className="w-4 h-4 text-white" />
                </div>
                <div className="absolute bottom-4 left-4 w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <Link className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Platform Features */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Platform Features
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Advanced technology stack designed to revolutionize the herbal
              medicine industry with transparency, quality assurance, and trust.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={QrCode}
              title="Tamper-Proof QR Codes"
              description="Unique blockchain-secured QR codes for each herb batch, containing complete traceability information that cannot be altered or duplicated."
              iconColor="text-blue-600"
              bgColor="bg-blue-100"
            />
            <FeatureCard
              icon={Brain}
              title="AI/ML Quality Assessment"
              description="Advanced machine learning algorithms analyze herb quality, detect adulterants, and verify authenticity through image recognition and spectral analysis."
              iconColor="text-green-600"
              bgColor="bg-green-100"
            />
            <FeatureCard
              icon={Smartphone}
              title="Farmer Mobile Tools"
              description="User-friendly mobile application for farmers to record cultivation data, upload photos, and manage their herb inventory with ease."
              iconColor="text-yellow-600"
              bgColor="bg-yellow-100"
            />
            <FeatureCard
              icon={FileText}
              title="Compliance Reports"
              description="Automated generation of regulatory compliance reports meeting international standards for export and quality certification."
              iconColor="text-purple-600"
              bgColor="bg-purple-100"
            />
            <FeatureCard
              icon={Eye}
              title="Consumer Transparency"
              description="Complete visibility for end consumers to verify herb authenticity, view cultivation details, and access quality certificates."
              iconColor="text-cyan-600"
              bgColor="bg-cyan-100"
            />
            <FeatureCard
              icon={BarChart3}
              title="Analytics Dashboard"
              description="Comprehensive analytics and insights for stakeholders to track performance, identify trends, and optimize supply chain efficiency."
              iconColor="text-red-600"
              bgColor="bg-red-100"
            />
          </div>
        </div>
      </section>

      {/* Transforming Lives */}
      <section id="impact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Transforming Lives Across the Value Chain
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              HerBChain creates positive impact for every stakeholder in the
              herbal medicine ecosystem, from farmers to consumers.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <TransformCard
              icon={Users}
              title="Empowered Farmers"
              description="Direct access to premium markets, fair pricing, and reduced middleman dependency. Farmers earn 40% more income through verified quality certification."
              bgColor="bg-gradient-to-br from-green-400 to-green-500"
              metrics={[
                { value: "40%", label: "Income Increase" },
                { value: "10K+", label: "Farmers Onboarded" },
              ]}
            />
            <TransformCard
              icon={TrendingUp}
              title="Confident Exporters"
              description="Dramatically reduced rejection rates at international borders through verified quality documentation and compliance certificates."
              bgColor="bg-gradient-to-br from-blue-400 to-purple-500"
              metrics={[
                { value: "85%", label: "Rejection Reduction" },
                { value: "₹500Cr", label: "Export Value Added" },
              ]}
            />
            <TransformCard
              icon={Shield}
              title="Trusted Consumers"
              description="Complete transparency about herb origin, quality, and authenticity. Consumers can verify every product before purchase for guaranteed purity."
              bgColor="bg-gradient-to-br from-cyan-400 to-blue-500"
              metrics={[
                { value: "99%", label: "Trust Score" },
                { value: "1M+", label: "QR Scans Daily" },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Complete Traceability Workflow */}
      <section id="workflow" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Complete Traceability Workflow
            </h2>
            <p className="text-xl text-gray-600">
              From seed to shelf, every step is recorded, verified, and made
              transparent through our blockchain-powered platform.
            </p>
          </div>

          {/* Workflow Steps */}
          <div className="bg-white rounded-3xl p-8 mb-12 shadow-sm">
            <div className="grid md:grid-cols-5 gap-8 items-center">
              <WorkflowStep
                icon={Leaf}
                title="Farmer"
                description="Cultivation data, soil conditions, organic practices recorded"
                color="text-green-600"
                bgColor="bg-green-100"
                step="1"
              />
              <div className="hidden md:flex justify-center">
                <ArrowRight className="w-6 h-6 text-gray-400" />
              </div>
              <WorkflowStep
                icon={Link}
                title="Blockchain"
                description="Immutable records created, QR codes generated"
                color="text-blue-600"
                bgColor="bg-blue-100"
                step="2"
              />
              <div className="hidden md:flex justify-center">
                <ArrowRight className="w-6 h-6 text-gray-400" />
              </div>
              <WorkflowStep
                icon={TestTube}
                title="Lab Test"
                description="Quality analysis, purity verification, AI assessment"
                color="text-purple-600"
                bgColor="bg-purple-100"
                step="3"
              />
              <div className="hidden md:flex justify-center">
                <ArrowRight className="w-6 h-6 text-gray-400" />
              </div>
              <WorkflowStep
                icon={Truck}
                title="Processor"
                description="Manufacturing data, batch information, packaging details"
                color="text-orange-600"
                bgColor="bg-orange-100"
                step="4"
              />
              <div className="hidden md:flex justify-center">
                <ArrowRight className="w-6 h-6 text-gray-400" />
              </div>
              <WorkflowStep
                icon={ShoppingCart}
                title="Consumer"
                description="QR scan reveals complete journey, quality certificates"
                color="text-cyan-600"
                bgColor="bg-cyan-100"
                step="5"
              />
            </div>
          </div>

          {/* Workflow Benefits */}
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="text-2xl font-bold text-green-600 mb-2">
                Real-time
              </div>
              <div className="text-gray-600">Data Updates</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="text-2xl font-bold text-blue-600 mb-2">100%</div>
              <div className="text-gray-600">Transparency</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="text-2xl font-bold text-purple-600 mb-2">
                Immutable
              </div>
              <div className="text-gray-600">Records</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="text-2xl font-bold text-cyan-600 mb-2">
                Instant
              </div>
              <div className="text-gray-600">Verification</div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Technology Stack */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Advanced Technology Stack
            </h2>
            <p className="text-xl text-gray-300">
              Built on cutting-edge technologies to ensure scalability,
              security, and reliability.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <TechCard
              icon={Shield}
              title="Blockchain"
              description="Ethereum-based smart contracts ensure data immutability"
              color="bg-blue-600"
            />
            <TechCard
              icon={Brain}
              title="AI/ML"
              description="TensorFlow models for quality assessment and fraud detection"
              color="bg-green-600"
            />
            <TechCard
              icon={Cloud}
              title="Cloud"
              description="AWS infrastructure for scalable and secure operations"
              color="bg-yellow-600"
            />
            <TechCard
              icon={Phone}
              title="Mobile"
              description="Cross-platform apps built with React Native"
              color="bg-purple-600"
            />
          </div>

          {/* Expanding Beyond Medicinal Herbs */}
          <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-3xl p-12 text-center">
            <h3 className="text-3xl font-bold text-white mb-4">
              Expanding Beyond Medicinal Herbs
            </h3>
            <p className="text-xl text-white mb-8 opacity-90">
              Our platform is designed to scale across multiple agricultural
              sectors, ensuring transparency and quality everywhere.
            </p>
            <div class="flex flex-wrap justify-center gap-4">
              <span class="bg-white/20 text-gray-800 px-6 py-3 rounded-full font-medium transition-all duration-300 hover:bg-white/80 hover:text-black hover:scale-105 hover:shadow-lg cursor-pointer">
                🌿 Ayurveda
              </span>
              <span class="bg-white/20 text-gray-800 px-6 py-3 rounded-full font-medium transition-all duration-300 hover:bg-white/80 hover:text-black hover:scale-105 hover:shadow-lg cursor-pointer">
                🌶️ Spices
              </span>
              <span class="bg-white/20 text-gray-800 px-6 py-3 rounded-full font-medium transition-all duration-300 hover:bg-white/80 hover:text-black hover:scale-105 hover:shadow-lg cursor-pointer">
                🥗 Organic Food
              </span>
              <span class="bg-white/20 text-gray-800 px-6 py-3 rounded-full font-medium transition-all duration-300 hover:bg-white/80 hover:text-black hover:scale-105 hover:shadow-lg cursor-pointer">
                ☕ Coffee & Tea
              </span>
              <span class="bg-white/20 text-gray-800 px-6 py-3 rounded-full font-medium transition-all duration-300 hover:bg-white/80 hover:text-black hover:scale-105 hover:shadow-lg cursor-pointer">
                🌾 Hemp Products
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* What Our Users Say */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600">
              Real experiences from farmers, exporters, and consumers who trust
              HerBChain.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              name="Priya Sharma"
              role="Organic Farmer"
              location="Kerala"
              quote="HerBChain has transformed my business. I now get direct access to premium buyers and earn 45% more income. The mobile app is so easy to use!"
            />
            <TestimonialCard
              name="Rajesh Gupta"
              role="Export Manager"
              location="Mumbai"
              quote="Our rejection rates have dropped by 80% since using HerBChain. International buyers now trust our quality certificates completely. It's a game-changer!"
            />
            <TestimonialCard
              name="Dr. Meera Patel"
              role="Ayurvedic Practitioner"
              location="Gujarat"
              quote="As a practitioner, I need to ensure the herbs I prescribe are authentic. HerBChain's QR verification gives me complete confidence in the quality and origin."
            />
          </div>
        </div>
      </section>

      {/* Ready to Transform */}
      <section
        id="contact"
        className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Herbal Business?
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Join thousands of farmers, exporters, and consumers who trust
            HerBChain for authentic, traceable, and quality-assured herbal
            medicines.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button className="bg-blue-500 text-white px-8 py-4 rounded-xl hover:bg-blue-600 transition-colors text-lg font-semibold flex items-center justify-center">
              <Star className="w-5 h-5 mr-2" />
              Start Free Trial
            </button>
            <button className="border-2 border-green-500 text-green-600 px-8 py-4 rounded-xl hover:bg-green-50 transition-colors text-lg font-semibold">
              Schedule Demo
            </button>
          </div>
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
            <span className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-1" />
              Government approved
            </span>
            <span className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-1" />
              SIH 2024 Winner
            </span>
            <span className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-1" />
              ISO 27001 Certified
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">HerBChain</span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Revolutionizing the herbal medicine industry through blockchain
                technology, ensuring transparency, quality, and trust from farm
                to pharmacy.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-400">
                  <Globe className="w-4 h-4 mr-2" />
                  contact@herbchain.gov.in
                </div>
                <div className="flex items-center text-gray-400">
                  <Phone className="w-4 h-4 mr-2" />
                  +91 11 2345 6789
                </div>
                <div className="flex items-center text-gray-400">
                  <Users className="w-4 h-4 mr-2" />
                  Ministry of AYUSH, New Delhi
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Platform
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Key Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Success Stories
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Training Videos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Community Forum
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Support
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Data Security
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Compliance
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Certifications
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 mb-4 md:mb-0">
              © 2024 HerBChain. All rights reserved.
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">Powered by</span>
              <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                SIH 2024
              </span>
              <span className="flex items-center text-sm text-gray-400">
                <CheckCircle className="w-4 h-4 mr-1" />
                Government of India
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
