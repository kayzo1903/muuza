"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { HiLocationMarker } from "react-icons/hi";
import { useLoadScript } from "@react-google-maps/api";

const libraries: ("places")[] = ["places"];

interface LocationPickerProps {
  onLocationSelect: (location: string) => void;
}

const LocationPicker: React.FC<LocationPickerProps> = ({ onLocationSelect }) => {
  const [searchValue, setSearchValue] = useState("");
  const [predictions, setPredictions] = useState<google.maps.places.AutocompletePrediction[]>([]);
  const autocompleteServiceRef = useRef<google.maps.places.AutocompleteService | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries,
  });

  useEffect(() => {
    if (isLoaded && !loadError && typeof window !== "undefined" && google && google.maps) {
      if (!autocompleteServiceRef.current) {
        autocompleteServiceRef.current = new google.maps.places.AutocompleteService();
      }
    }
  }, [isLoaded, loadError]);

  const getPlacePredictions = useCallback((inputValue: string) => {
    if (!autocompleteServiceRef.current) return;

    if (!inputValue.trim()) {
      setPredictions([]);
      return;
    }

    // Tanzania bounding box (north, south, east, west)
    const tanzaniaBounds = {
      north: -0.985, // slightly above Lake Victoria
      south: -11.745, // south border
      east: 40.45,    // Indian Ocean coast
      west: 29.35,    // west border near Rwanda/Burundi
    };

    const request: google.maps.places.AutocompleteRequest = {
      input: inputValue,
      locationRestriction: tanzaniaBounds, // replaces componentRestrictions
    };

    autocompleteServiceRef.current.getPlacePredictions(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        setPredictions(results);
      } else {
        setPredictions([]);
      }
    });
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    getPlacePredictions(value);
  };

  const handlePredictionClick = (prediction: google.maps.places.AutocompletePrediction) => {
    setSearchValue(prediction.description);
    setPredictions([]);
    onLocationSelect(prediction.description);
    inputRef.current?.focus();
  };

  if (loadError) return <p>Error loading Google Maps</p>;
  if (!isLoaded) return <p>Loading Google Maps...</p>;

  return (
    <div className="relative w-full">
      <HiLocationMarker className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600 text-2xl" />
      <input
        ref={inputRef}
        type="text"
        value={searchValue}
        onChange={handleInputChange}
        placeholder="Enter your location"
        className="shadow-md w-full px-2 py-3 pl-12 h-16 pr-4 mb-4 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-600"
      />
      {predictions.length > 0 && (
        <ul className="absolute left-0 right-0 z-10 mt-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {predictions.map((prediction) => (
            <li
              key={prediction.place_id}
              onClick={() => handlePredictionClick(prediction)}
              className="px-4 py-3 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer text-gray-900 dark:text-white"
            >
              {prediction.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationPicker;
