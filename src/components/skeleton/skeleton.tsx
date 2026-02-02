import { cn } from "@/src/lib/utils";
import React from "react";
import { View } from "react-native";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "box" | "circle";
}

const Skeleton = ({ className, variant = "box" }: SkeletonProps) => {
  return (
    <View
      className={cn(
        "bg-gray-200 animate-pulse",
        variant === "box" && "rounded-md",
        variant === "circle" && "rounded-full",
        variant === "text" && "rounded h-4",
        className,
      )}
    />
  );
};

export default Skeleton;
