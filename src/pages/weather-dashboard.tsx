import { Button } from "@/components/ui/button";
import { useGeolocation } from "@/hooks/use-geolocation";
import { RefreshCw } from "lucide-react";
import React from "react";

const WeatherDashboard = () => {
  const {
    coordinates,
    error: locationError,
    getLocation,
    isLoading: locationLoading,
  } = useGeolocation();
  console.log(coordinates);

  const handleRefresh = () => {
    getLocation();

    if (coordinates) {
      //reload
    }
  };

  if (locationLoading) {
  }
  return (
    <>
      <div className="space-y-4">
        {/* Favorive Cities */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight">My location</h1>
          <Button variant="outline" size="icon" onClick={handleRefresh}>
            <RefreshCw className="h4 w-4" />
          </Button>
        </div>

        {/*Current and Hourly weather */}
      </div>
    </>
  );
};

export default WeatherDashboard;
