import React from "react";
import { Card, CardBody, Tabs, Tab } from "@heroui/react";
import { Package, Truck, BarChart3, Activity } from "lucide-react";

const StockTabs = ({ 
  activeTab = "instock", 
  onTabChange = () => {},
  instockContent,
  dispatchedContent 
}) => {
  const tabs = [
    {
      key: "instock",
      title: "In-Stock",
      icon: Package,
      description: "Currently available herbs and batches",
      count: null // Can be passed as prop
    },
    {
      key: "dispatched", 
      title: "Dispatched Stock",
      icon: Truck,
      description: "History of stock sent to manufacturers",
      count: null // Can be passed as prop
    }
  ];

  return (
    <div className="w-full">
      <Tabs
        aria-label="Stock management tabs"
        selectedKey={activeTab}
        onSelectionChange={onTabChange}
        variant="underlined"
        classNames={{
          base: "w-full",
          tabList: "w-full relative border-b border-slate-200 bg-white rounded-none p-0",
          cursor: "bg-blue-600 shadow-lg",
          tab: "px-6 py-4 h-auto",
          tabContent: "group-data-[selected=true]:text-blue-600 font-medium"
        }}
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <Tab
              key={tab.key}
              title={
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Icon className="w-5 h-5" />
                    <span className="font-semibold">{tab.title}</span>
                  </div>
                  {tab.count && (
                    <div className="px-2 py-1 bg-slate-200 text-slate-700 text-xs font-semibold rounded-full">
                      {tab.count}
                    </div>
                  )}
                </div>
              }
            >
              <div className="pt-6">
                {tab.key === "instock" ? instockContent : dispatchedContent}
              </div>
            </Tab>
          );
        })}
      </Tabs>
    </div>
  );
};

export default StockTabs;