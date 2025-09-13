"use client";
import { Card, CardBody } from "@heroui/react";
import { motion } from "framer-motion";

const MarketCard = ({ title, children }) => {
  return (
    <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
      <Card className="shadow-md border-0 bg-white h-full">
        <CardBody className="space-y-2">
          <h4 className="font-semibold text-gray-700">{title}</h4>
          <div className="text-sm text-gray-600">{children}</div>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default MarketCard;
