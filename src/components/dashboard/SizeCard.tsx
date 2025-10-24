"use client";

import { cn } from "@/lib/utils";
import { IconType } from "react-icons/lib";

const SizeCard = ({
  color,
  Icon,
  height,
  width,
  name,
}: {
  color: string;
  Icon: IconType;
  height: number;
  width: number;
  name: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-1 w-full">
      {/* Icon Container */}
      <div 
        className={cn(
          "p-2 rounded-full transition-all duration-200 group-hover:scale-110",
          "bg-gradient-to-br from-gray-200 to-gray-100 dark:from-white/20 dark:to-white/10 backdrop-blur-sm",
          "border border-gray-300 dark:border-white/30 shadow-md"
        )}
      >
        <Icon className={cn("size-4", color)} />
      </div>
      
      {/* Name */}
      <p className="text-sm font-medium text-gray-900 dark:text-white text-center leading-tight w-full min-w-0 px-1">
        {name}
      </p>
    </div>
  );
};

export default SizeCard;