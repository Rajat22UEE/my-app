"use client";
import React from "react";
import { cn } from "@/lib/utils"; // Utility for conditional class merging

const Button = ({ variant = "default", className, ...props }) => {
  const baseStyles = "px-4 py-2 rounded-md font-medium transition";
  const variants = {
    default: "bg-blue-500 text-white hover:bg-blue-600",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
    ghost: "text-gray-600 hover:bg-gray-200",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    />
  );
};

export default Button;
