"use client";
import { Card, CardBody } from "@heroui/react";
import { motion } from "framer-motion";

const SuggestionCard = ({ icon, title, description, footer, color }) => {
  return (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
      <Card className={`shadow-md border-0 ${color} text-gray-800`}>
        <CardBody className="space-y-2">
          <div className="flex items-center gap-2 font-semibold">
            {icon}
            <span>{title}</span>
          </div>
          <p className="text-sm">{description}</p>
          {footer && <p className="text-xs text-gray-600">{footer}</p>}
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default SuggestionCard;
