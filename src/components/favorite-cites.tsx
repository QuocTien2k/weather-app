import { useFavorite } from "@/hooks/use-favorite";
import { ScrollArea } from "./ui/scroll-area";
import { useNavigate } from "react-router-dom";
import { useWeatherQuery } from "@/hooks/use-weather";
import { Button } from "./ui/button";
import { Loader2, X } from "lucide-react";
import { toast } from "sonner";

interface FavoriteCityTabletProps {
  id: string;
  name: string;
  lat: number;
  lon: number;
  onRemove: (id: string) => void;
}

const FavoriteCtes = () => {
  const { favorites, removeFavorite } = useFavorite();
  if (!favorites.length) {
    return null;
  }

  return (
    <>
      <h1 className="text-xl font-bold tracking-tight">Yêu thích</h1>
      <ScrollArea className="w-full pb-4">
        <div className="flex gap-4">
          {favorites.map((city) => {
            return (
              <FavoriteCityTablet
                key={city.id}
                {...city}
                onRemove={() => removeFavorite.mutate(city.id)}
              />
            );
          })}
        </div>
      </ScrollArea>
    </>
  );
};

function FavoriteCityTablet({
  id,
  name,
  lat,
  lon,
  onRemove,
}: FavoriteCityTabletProps) {
  const navigate = useNavigate();
  const { data: weather, isLoading } = useWeatherQuery({ lat, lon });

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
    <div
      onClick={() => navigate(`/city/${name}?lat=${lat}&lon=${lon}`)}
      role="button"
      tabIndex={0}
      className="relative flex min-w-[250px] cursor-pointer items-center gap-3 rounded-lg border bg-card p-4 pr-8 shadow-sm transition-all hover:shadow-md"
    >
      <Button
        className="absolute right-1 top-1 h-6 w-6 rounded-full p-0 hover:text-destructive-foreground group-hover:opacity-100"
        size={"icon"}
        variant={"ghost"}
        onClick={(e) => {
          e.stopPropagation();
          onRemove(id);
          toast.error(`Đã xóa ${name} ra khỏi mục yêu thích`);
        }}
      >
        <X className="h-4 w-4" />
      </Button>
      {isLoading ? (
        <div className="flex h-8 items-center justify-center">
          <Loader2 className="h-4 w-4 animate-spin" />
        </div>
      ) : weather ? (
        <>
          <div className="flex items-center gap-2">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
              alt={translate(weather.weather[0].description)}
              className="h-8 w-8"
            />
            <div>
              <p className="font-medium">{name}</p>
              <p className="text-xs text-muted-foreground">
                {weather.sys.country}
              </p>
            </div>
          </div>
          <div className="ml-auto text-right">
            <p className="text-xl font-bold">
              {Math.round(weather.main.temp)}°
            </p>
            <p className="text-xs capitalize text-muted-foreground">
              {translate(weather.weather[0].description)}
            </p>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default FavoriteCtes;
