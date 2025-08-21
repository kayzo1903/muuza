"use client";

import { useEffect, useState } from "react";

interface DistanceFilterProps {
  onDistanceChange: (distance: number) => void;
  defaultDistance?: number;
  min?: number;
  max?: number;
}

export default function DistanceFilter({ 
  onDistanceChange, 
  defaultDistance = 3, 
  min = 1, 
  max = 5 
}: DistanceFilterProps) {
  const [distance, setDistance] = useState(defaultDistance);

  // Load from localStorage on component mount
  useEffect(() => {
    const savedDistance = localStorage.getItem("distanceFilter");
    if (savedDistance) {
      const parsedDistance = parseInt(savedDistance);
      setDistance(parsedDistance);
      onDistanceChange(parsedDistance);
    }
  }, [onDistanceChange]);

  // Save to localStorage and notify parent when distance changes
  const handleDistanceChange = (newDistance: number) => {
    setDistance(newDistance);
    localStorage.setItem("distanceFilter", newDistance.toString());
    onDistanceChange(newDistance);
  };

  return (
    <div className="flex items-center gap-3 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md">
      <span className="text-sm whitespace-nowrap">Within:</span>
      <input
        type="range"
        min={min}
        max={max}
        step="1"
        value={distance}
        onChange={(e) => handleDistanceChange(parseInt(e.target.value))}
        className="w-24 h-2 bg-green-100 rounded-lg appearance-none cursor-pointer 
                 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 
                 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-600 [&::-webkit-slider-thumb]:border-2 
                 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-sm
                 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full 
                 [&::-moz-range-thumb]:bg-green-600 [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white 
                 [&::-moz-range-thumb]:shadow-sm [&::-moz-range-thumb]:border-none
                 [&::-moz-range-track]:h-2 [&::-moz-range-track]:bg-green-100 [&::-moz-range-track]:rounded-lg"
      />
      <span className="text-sm bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 px-2 py-1 rounded-md min-w-[2rem] text-center">
        {distance}km
      </span>
    </div>
  );
}