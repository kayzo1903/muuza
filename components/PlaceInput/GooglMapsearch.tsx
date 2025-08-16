"use client";
import React, { useState, useEffect, useRef } from "react";
import { useLoadScript } from "@react-google-maps/api";
import { HiLocationMarker } from "react-icons/hi";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";

const libraries: "places"[] = ["places"];

const SearchFoods: React.FC = () => {
  const t = useTranslations("HomePage");
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

  const route = useRouter()


  useEffect(() => {
    if (isLoaded && typeof window !== "undefined" && google && google.maps) {
      autocompleteServiceRef.current =
        new google.maps.places.AutocompleteService();
    }

    // Load the saved location from localStorage, if it exists
    const savedLocation = localStorage.getItem("userLocation");
    if (savedLocation) {
      setSearchValue(savedLocation);
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
  };

  const handleSaveLocation = (event: React.FormEvent) => {
    event.preventDefault();

    // Save the location to localStorage, replacing any existing location
    localStorage.setItem("userLocation", searchValue);

    // Clear predictions after saving
    setPredictions([]);

    // redirect to shop
    route.push("/shop")
  };

  if (!isLoaded) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSaveLocation} className="w-full">
      <div className="relative max-w-md">
        <HiLocationMarker className="absolute left-3 top-7 transform -translate-y-1/2 text-skin text-4xl text-gray-950" />
        <input
          type="text"
          value={searchValue}
          onChange={handleInputChange}
          placeholder={t("placeholder")}
          className="w-full h-16 bg-white shadow-md px-2 py-3 pl-14 pr-4 mb-4 bg-gray-1000 rounded-lg text-gray-700 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600"
        />
        {predictions.length > 0 && (
          <ul className="absolute left-0 right-0 z-10 mt-2 bg-white dark:bg-gray-600 border rounded-lg shadow-lg">
            {predictions.map((prediction) => (
              <li
                key={prediction.place_id}
                onClick={() => handlePredictionClick(prediction)}
                className="px-4 py-2 hover:bg-gray-200 hover:dark:text-gray-700 cursor-pointer"
              >
                {prediction.description}
              </li>
            ))}
          </ul>
        )}
        <button
          type="submit"
          className="h-16 capitalize text-white bg-green-600  dark:bg-green-900 rounded-xl bg-skin rounded-x py-2 px-2 text-xl w-full md:w-1/2  transition-all duration-300 "
        >
          {t("ctaButton")}
        </button>
      </div>
    </form>
  );
};

export default  SearchFoods;
