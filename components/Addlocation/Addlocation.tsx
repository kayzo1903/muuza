import React, { useEffect, useState } from "react";
import { IoLocation } from "react-icons/io5";
import { Link } from "@/i18n/routing";

function Addlocation() {
  const [savedLocation, setSavedLocation] = useState<string | null>(null);

  useEffect(() => {
    // Check if location is stored in localStorage
    const location = localStorage.getItem("userLocation");
    setSavedLocation(location);
  }, []);

  return (
    <div className="px-4 flex gap-2 items-center pb-4">
      <IoLocation className="text-3xl text-skin" />
      {savedLocation ? (
        <p className="text-sm font-thin text-balance">
           {savedLocation}
        </p>
      ) : (
        <Link href={"/location"} className="text-sm font-thin text-balance capitalize">
          Add your location for a better experience
        </Link>
      )}
    </div>
  );
}

export default Addlocation;
