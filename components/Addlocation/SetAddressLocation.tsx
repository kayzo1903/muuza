"use client";
import React, { useState, useEffect, useRef } from "react";
import { HiLocationMarker } from "react-icons/hi";
import { useLoadScript } from "@react-google-maps/api";

const libraries: "places"[] = ["places"];

interface LocationPickerProps {
  onLocationSelect: (location: string) => void; // Callback when a location is selected
}

const LocationPicker: React.FC<LocationPickerProps> = ({ onLocationSelect }) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [predictions, setPredictions] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);
  const autocompleteServiceRef =
    useRef<google.maps.places.AutocompleteService | null>(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries,
  });

  useEffect(() => {
    if (isLoaded && typeof window !== "undefined" && google && google.maps) {
      autocompleteServiceRef.current =
        new google.maps.places.AutocompleteService();
    }
  }, [isLoaded]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);

    if (value && autocompleteServiceRef.current) {
      const request = {
        input: value,
        componentRestrictions: { country: "tz" },
      };

      autocompleteServiceRef.current.getPlacePredictions(
        request,
        (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            setPredictions(results);
          } else {
            setPredictions([]);
          }
        }
      );
    } else {
      setPredictions([]);
    }
  };

  const handlePredictionClick = (
    prediction: google.maps.places.AutocompletePrediction
  ) => {
    setSearchValue(prediction.description);
    setPredictions([]);
    onLocationSelect(prediction.description); // Pass the selected location to the parent
  };

  if (!isLoaded) return <p>Loading...</p>;

  return (
    <div className="relative w-full">
      <HiLocationMarker className="absolute left-3 top-8 transform -translate-y-1/2 text-skin text-2xl" />
      <input
        type="text"
        value={searchValue}
        onChange={handleInputChange}
        placeholder="Enter your location"
        className="shadow-md w-full px-2 py-3 pl-12 h-16 pr-4 mb-4 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-600"
      />
      {predictions.length > 0 && (
        <ul className="absolute left-0 right-0 z-10 mt-2 bg-gray-100 dark:bg-gray-700 border rounded-lg shadow-lg">
          {predictions.map((prediction) => (
            <li
              key={prediction.place_id}
              onClick={() => handlePredictionClick(prediction)}
              className="px-4 py-2 hover:bg-gray-500 cursor-pointer"
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
