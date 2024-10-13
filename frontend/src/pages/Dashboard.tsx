import { useState, useEffect } from 'react';
import { WeatherData } from '../typings';
import WeatherCard from '../components/WeatherCard';
import { getAccessToken } from '../utils/auth';
import Skeleton from 'react-loading-skeleton';

export default function Dashboard() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchWeatherData = async (latitude: number, longitude: number) => {
      try {
        const baseurl = import.meta.env.VITE_API_URL as string;
        const accessToken = getAccessToken();
        const response = await fetch(
          `${baseurl}/weather?latitude=${latitude}&longitude=${longitude}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const result: WeatherData = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherData(latitude, longitude);
      },
      (error) => {
        console.log('Location access denied or error occurred:', error);
        fetchWeatherData(40.7128, -74.006);
      }
    );
  }, []);

  const dayLabels = ['Today', 'Tomorrow'];

  const generateDateLabel = (index: number) => {
    const date = new Date();
    date.setDate(date.getDate() + index);

    const day = date.getDate();
    const month = date.toLocaleDateString('en-US', { month: 'long' });

    const getDaySuffix = (day: number) => {
      if (day >= 11 && day <= 13) return 'th';
      switch (day % 10) {
        case 1:
          return 'st';
        case 2:
          return 'nd';
        case 3:
          return 'rd';
        default:
          return 'th';
      }
    };

    return `${month} ${day}${getDaySuffix(day)}`;
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        {loading ? <Skeleton width={200} /> : data?.timezone}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading
          ? Array.from({ length: 8 }).map((_, index) => (
              <WeatherCard key={index} dayLabel="" skeleton />
            ))
          : data?.days.map((day, index) => (
              <WeatherCard
                key={index}
                dayLabel={dayLabels[index] || generateDateLabel(index)}
                {...day}
              />
            ))}
      </div>
    </div>
  );
}
