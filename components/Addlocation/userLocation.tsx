"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLoadScript } from "@react-google-maps/api";
import { HiLocationMarker } from "react-icons/hi";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";

const libraries: ("places")[] = ["places"];

const Userlocation: React.FC = () => {
  const t = useTranslations("locationpage");
  const [searchValue, setSearchValue] = useState<string>("");
  const [predictions, setPredictions] = useState<google.maps.places.AutocompletePrediction[]>([]);
  const autocompleteServiceRef = useRef<google.maps.places.AutocompleteService | null>(null);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries,
  });
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && typeof window !== "undefined" && google && google.maps) {
      autocompleteServiceRef.current = new google.maps.places.AutocompleteService();
    }

    // Load saved location from localStorage if it exists
    const savedLocation = localStorage.getItem("userLocation");
    if (savedLocation) {
      setSearchValue(savedLocation);
    }
  }, [isLoaded]);

  const getPlacePredictions = useCallback((value: string) => {
    if (!autocompleteServiceRef.current) return;

    if (!value.trim()) {
      setPredictions([]);
      return;
    }

    // Bounding box for Tanzania
    const tanzaniaBounds: google.maps.LatLngBoundsLiteral = {
      north: -0.985, // north edge
      south: -11.745, // south edge
      east: 40.45,    // east edge
      west: 29.35,    // west edge
    };

    const request: google.maps.places.AutocompleteRequest = {
      input: value,
      locationRestriction: tanzaniaBounds,
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
  };

  const handleSaveLocation = (event: React.FormEvent) => {
    event.preventDefault();
    localStorage.setItem("userLocation", searchValue);
    setPredictions([]);
    router.push("/shop");
  };

  if (!isLoaded) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSaveLocation} className="w-full py-2">
      <div className="relative w-full">
        <HiLocationMarker className="absolute left-3 top-8 transform -translate-y-1/2 text-skin text-2xl" />
        <input
          type="text"
          value={searchValue}
          onChange={handleInputChange}
          placeholder={t("placeholder")}
          className="shadow-md w-full px-2 py-3 pl-12 h-16 pr-4 mb-4 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-600"
        />
        {predictions.length > 0 && (
          <ul className="absolute left-0 right-0 z-10 mt-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {predictions.map((prediction) => (
              <li
                key={prediction.place_id}
                onClick={() => handlePredictionClick(prediction)}
                className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
              >
                {prediction.description}
              </li>
            ))}
          </ul>
        )}
        <button
          type="submit"
          className="text-white w-1/2 bg-skin rounded-xl py-2 px-2 text-xl hover:text-skin transition-all duration-300"
        >
          {t("addlocation")}
        </button>
      </div>
    </form>
  );
};

export default Userlocation;
