"use client";
import { Image } from "@heroui/react";
import {
  Sun,
  Leaf,
  Microscope,
  Factory,
  Package,
  Building2,
} from "lucide-react";

const ImageShowcase = ({ images }) => {
  const imageData = [
    {
      key: "field",
      title: "Field Cultivation",
      subtitle: "Organic farming methods",
      icon: Sun,
      color: "amber",
    },
    {
      key: "harvested",
      title: "Fresh Harvest",
      subtitle: "Peak quality rhizomes",
      icon: Leaf,
      color: "emerald",
    },
    {
      key: "quality",
      title: "Quality Assessment",
      subtitle: "Laboratory testing",
      icon: Microscope,
      color: "blue",
    },
    {
      key: "processed",
      title: "Processing Stage",
      subtitle: "Traditional methods",
      icon: Factory,
      color: "purple",
    },
    {
      key: "packed",
      title: "Ready for Collection",
      subtitle: "Premium packaging",
      icon: Package,
      color: "indigo",
    },
    {
      key: "storage",
      title: "Storage Facility",
      subtitle: "Climate controlled",
      icon: Building2,
      color: "slate",
    },
  ];

  const colorVariants = {
    amber: "bg-amber-500",
    emerald: "bg-emerald-500",
    blue: "bg-blue-500",
    purple: "bg-purple-500",
    indigo: "bg-indigo-500",
    slate: "bg-slate-500",
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {imageData.map((item, index) => {
        const Icon = item.icon;
        return (
          <div
            key={index}
            className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500"
          >
            {/* Background image */}
            <div className="relative">
              <Image
                src={images[item.key] || images.field}
                alt={item.title}
                className="w-full h-64 sm:h-56 object-cover rounded-3xl transition-transform duration-700 group-hover:scale-110"
                radius="none"
                removeWrapper
              />

              {/* Dark overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent group-hover:from-black/80 transition-all duration-300"></div>

              {/* Content overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center gap-4 mb-3">
                  <div
                    className={`
                      p-3 ${colorVariants[item.color]} 
                      bg-opacity-90 backdrop-blur-sm 
                      rounded-xl shadow-lg border border-white/20
                    `}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                    <p className="text-sm text-slate-200 font-medium">
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                {/* Progress indicator */}
                <div className="flex items-center justify-between">
                  <div className="text-xs text-slate-300">
                    Stage {index + 1} of 6
                  </div>
                  <div className="flex space-x-1">
                    {Array.from({ length: 6 }, (_, i) => (
                      <div
                        key={i}
                        className={`
                          w-2 h-2 rounded-full transition-all duration-300
                          ${i <= index ? "bg-white shadow-lg" : "bg-white/30"}
                        `}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ImageShowcase;
