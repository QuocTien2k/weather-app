import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import React from "react";

const WeatherDashboard = () => {
  return (
    <>
      <div>
        {/* Favorive Cities */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight">My location</h1>
          <Button variant="outline" size="icon">
            <RefreshCw className="h4 w-4" />
          </Button>
        </div>

        {/*Current and Hourly weather */}
      </div>
    </>
  );
};

export default WeatherDashboard;
