import React from "react";
import { Button } from "@heroui/react";
import LoadingSpinner from "./LoadingSpinner";

const LoadingButton = ({ 
  children,
  isLoading = false,
  loadingText = "Loading...",
  onClick = () => {},
  disabled = false,
  variant = "solid",
  color = "primary",
  size = "md",
  startContent = null,
  endContent = null,
  className = "",
  fullWidth = false,
  spinnerSize = "small",
  spinnerColor = "#ffffff",
  ...props
}) => {
  const handleClick = (e) => {
    if (!isLoading && !disabled) {
      onClick(e);
    }
  };

  return (
    <Button
      {...props}
      variant={variant}
      color={color}
      size={size}
      className={className}
      fullWidth={fullWidth}
      disabled={disabled || isLoading}
      onClick={handleClick}
      startContent={
        isLoading ? (
          <LoadingSpinner 
            size={spinnerSize} 
            color={spinnerColor} 
            message=""
            className="mr-1"
          />
        ) : (
          startContent
        )
      }
      endContent={!isLoading ? endContent : null}
    >
      {isLoading ? loadingText : children}
    </Button>
  );
};

export default LoadingButton;