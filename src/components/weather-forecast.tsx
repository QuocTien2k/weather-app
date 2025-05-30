import type { ForecastData } from "@/api/types";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";

interface WeatherForecastProps {
  data: ForecastData;
}

interface DailyForecast {
  date: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  wind: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
}

const WeatherForecast = ({ data }: WeatherForecastProps) => {
  const dailyForecasts = data.list.reduce((acc, forecast) => {
    const date = format(new Date(forecast.dt * 1000), "yyyy-MM-dd");

    if (!acc[date]) {
      acc[date] = {
        temp_min: forecast.main.temp_min,
        temp_max: forecast.main.temp_max,
        humidity: forecast.main.humidity,
        wind: forecast.wind.speed,
        weather: forecast.weather[0],
        date: forecast.dt,
      };
    } else {
      acc[date].temp_min = Math.min(acc[date].temp_min, forecast.main.temp_min);
      acc[date].temp_max = Math.max(acc[date].temp_max, forecast.main.temp_max);
    }

    //console.log(dailyForecasts);

    return acc;
  }, {} as Record<string, DailyForecast>);

  const nextDays = Object.values(dailyForecasts);

  const formatTemp = (temp: number) => `${Math.round(temp)}°`;

  const translate = (description: string) => {
    switch (description.toLowerCase()) {
      case "clear sky":
        return "Trời quang đãng";
      case "few clouds":
        return "Trời ít mây";
      case "scattered clouds":
        return "Mây rải rác";
      case "broken clouds":
        return "Mây đứt đoạn";
      case "overcast clouds":
        return "Mây u ám";
      case "light rain":
        return "Mưa nhẹ";
      case "moderate rain":
        return "Mưa vừa";
      case "heavy intensity rain":
        return "Mưa to";
      case "very heavy rain":
        return "Mưa rất to";
      case "extreme rain":
        return "Mưa cực lớn";
      case "shower rain":
        return "Mưa rào";
      case "thunderstorm":
        return "Giông bão";
      case "snow":
        return "Tuyết rơi";
      case "mist":
        return "Sương mù";
      case "fog":
        return "Sương dày";
      case "haze":
        return "Mù khô";
      case "smoke":
        return "Khói";
      case "sand":
      case "dust":
        return "Bụi";
      case "tornado":
        return "Lốc xoáy";
      default:
        return description; // fallback nếu chưa có trong danh sách
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dự báo 5 ngày kế tiếp</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {nextDays.map((day) => {
            return (
              <div
                key={day.date}
                className="grid grid-cols-3 items-center gap-4 rounded-lg border p-4"
              >
                <div>
                  <p className="font-medium">
                    {format(new Date(day.date * 1000), "EEE, MMM d", {
                      locale: vi,
                    })}
                  </p>
                  <p className="text-sm text-muted-foreground capitalize">
                    {translate(day.weather.description)}
                  </p>
                </div>
                <div className="flex justify-center gap-4">
                  <span className="flex items-center text-blue-500">
                    <ArrowDown className="mr-1 h-4 w-4" />
                    {formatTemp(day.temp_min)}
                  </span>
                  <span className="flex items-center text-red-500">
                    <ArrowUp className="mr-1 h-4 w-4" />
                    {formatTemp(day.temp_max)}
                  </span>
                </div>
                <div className="flex justify-end gap-4">
                  <span className="flex items-center gap-1">
                    <Droplets className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">{day.humidity}%</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Wind className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">{day.wind}m/s</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherForecast;
