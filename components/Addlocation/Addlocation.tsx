import React, { useEffect, useState } from "react";
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
      📍
      {savedLocation ? (
        <Link href={"/location"} className="text-md text-balance">
           {savedLocation}
        </Link>
      ) : (
        <Link href={"/location"} className="text-xl text-balance capitalize">
          Add your location for a better experience
        </Link>
      )}
    </div>
  );
}

export default Addlocation;
