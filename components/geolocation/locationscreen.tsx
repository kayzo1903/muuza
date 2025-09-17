"use client";

import { useState, useEffect } from "react";
import { Loader2, MapPin, Compass, X } from "lucide-react";
import { Button } from "@/components/ui/button";

type LocationStatus = "idle" | "loading" | "success" | "error";

interface LocationData {
  latitude: number;
  longitude: number;
}

interface LocationScreenProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationSet: (location: LocationData) => void;
}

export default function LocationScreen({ isOpen, onClose, onLocationSet }: LocationScreenProps) {
  const [status, setStatus] = useState<LocationStatus>("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setStatus("idle");
      setError("");
    }
  }, [isOpen]);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setStatus("loading");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setStatus("success");
        setTimeout(() => onLocationSet(userLocation), 1000);
      },
      (err) => {
        setError(err.message || "Permission denied or location unavailable.");
        setStatus("error");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6 relative shadow-xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="mb-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 rounded-full bg-green-600 flex items-center justify-center">
              <Compass className="w-7 h-7 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Muuza</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Allow location access to find stores near you
          </p>
        </div>

        {/* Button */}
        <Button onClick={handleGetLocation} disabled={status === "loading"} className="w-full">
          {status === "loading" ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Detecting...
            </>
          ) : (
            <>
              <MapPin className="mr-2 h-4 w-4" />
              Use My Location
            </>
          )}
        </Button>

        {/* Error */}
        {error && <p className="mt-3 text-sm text-red-500 text-center">{error}</p>}

        {/* Manual entry */}
        <p
          onClick={onClose}
          className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center cursor-pointer hover:underline"
        >
          Enter address manually
        </p>
      </div>
    </div>
  );
}
