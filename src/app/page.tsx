'use client';
import { useEffect, useState } from 'react';
import { ImSpinner2 } from 'react-icons/im';

import { getHours } from '@/helpers/time';
import { WeatherData } from '@/model/weather';

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    (async () => {
      navigator.geolocation.getCurrentPosition(async function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const params = new URLSearchParams({
          latitude: latitude + '',
          longitude: longitude + '',
          units: 'metric',
        });

        const response = await fetch('api/weather/getCurrent?' + params, {
          method: 'GET',
        });

        const data = await response.json();

        if (data) {
          setWeather(data);
        }
      });
    })();
  }, []);

  return (
    <main className="h-screen w-full">
      {!weather ? (
        <div className="h-full w-full bg-white/20 center">
          <ImSpinner2 size={50} className="animate-spin" />
        </div>
      ) : (
        <>
          <video
            className="h-full w-full object-cover"
            src={`/videos/${weather.weather[0].main.toLocaleLowerCase()}.mp4`}
            autoPlay
            loop
            muted
          />
          <div className="absolute top-0 h-full w-full center">
            <div className="h-auto max-w-sm rounded-xl border border-gray-300/10 bg-white/20 p-6 shadow-md backdrop-blur-lg">
              <div className="flex-col center">
                <span className="text-2xl font-bold text-black">
                  {weather.name}
                </span>
                <span className="text-lg text-gray-600">
                  {weather.coord.lat + ',' + weather.coord.lon}
                </span>
                <span className="text-lg font-medium text-black">
                  {weather.weather[0].description.replace(/^\w/, (c) =>
                    c.toUpperCase(),
                  )}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-x-4 gap-y-5 whitespace-nowrap text-xl">
                <div className="flex-col p-4 text-lg  center">
                  <span>Mínima</span> <span>{weather.main.temp_min} ºC</span>
                </div>
                <div className="flex-col p-4 font-semibold center">
                  <span>Temperatura</span> <span>{weather.main.temp} ºC</span>
                </div>
                <div className="flex-col p-4 text-lg center">
                  <span>Máxima</span> <span>{weather.main.temp_max} ºC</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 font-semibold text-black">
                <div className="col-span-1 flex-col rounded-md bg-white/20 p-4 center">
                  <span className="text-xl text-gray-600">Vento</span>
                  <span>{(weather.wind.speed * 3.6).toFixed(1)} km/h</span>
                </div>
                <div className="col-span-1 flex-col rounded-md bg-white/20 p-4 center">
                  <span className="text-xl text-gray-600">Pressão</span>
                  <span>
                    {weather.main.pressure.toFixed(1) as unknown as number} hPa
                  </span>
                </div>
                <div className="col-span-2 rounded-md bg-white/20 p-4 center">
                  <div className="w-1/2 flex-col center ">
                    <span className="text-xl text-gray-600">Nascer do sol</span>
                    <span>{getHours(weather.sys.sunrise)} AM</span>
                  </div>
                  <div className="w-1/2 flex-col center">
                    <span className="text-xl text-gray-600">Por do sol</span>
                    <span>{getHours(weather.sys.sunset)} PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
