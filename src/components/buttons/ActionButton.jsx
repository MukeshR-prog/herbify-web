import { Button } from "@heroui/react";
import { ChevronRight } from "lucide-react";

const ActionButton = ({ 
  icon: Icon, 
  label, 
  color = "primary", 
  variant = "solid", 
  size = "lg",
  onClick,
  disabled = false,
  isLoading = false,
  fullWidth = true
}) => (
  <Button 
    color={color} 
    variant={variant}
    size={size}
    className={`${fullWidth ? 'w-full' : ''} justify-start font-semibold hover:scale-105 transition-transform`}
    startContent={<Icon className="w-5 h-5" />}
    endContent={!isLoading && <ChevronRight className="w-4 h-4 opacity-50" />}
    onPress={onClick}
    disabled={disabled}
    isLoading={isLoading}
  >
    {label}
  </Button>
);

export default ActionButton;