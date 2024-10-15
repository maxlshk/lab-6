import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUp,
  faCloud,
  faCloudShowersHeavy,
  faCloudSun,
  faCloudSunRain,
  faSun,
} from '@fortawesome/free-solid-svg-icons';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { DayWeather } from '../typings';

interface WeatherCardProps extends Partial<DayWeather> {
  dayLabel: string;
  skeleton?: boolean;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  dayLabel,
  tempmin,
  tempmax,
  winddir,
  windspeed,
  visibility,
  humidity,
  pressure,
  conditions,
  description,
  skeleton = false,
}) => {
  const getWeatherIcon = () => {
    switch (conditions?.toLowerCase()) {
      case 'rain':
        return faCloudShowersHeavy;
      case 'overcast':
        return faCloud;
      case 'clear':
        return faSun;
      case 'partially cloudy':
        return faCloudSun;
      case 'rain, partially cloudy':
        return faCloudSunRain;
      default:
        return faCloud;
    }
  };

  const analyzeWindDir = () => {
    const windDirection = winddir ? winddir % 360 : 0;
    const rotation = `rotate(${windDirection}deg)`;
    return <FontAwesomeIcon icon={faArrowUp} style={{ transform: rotation }} />;
  };

  return (
    <div className="group bg-white/80 hover:bg-white transition-all duration-500 rounded-lg shadow-lg p-4 flex flex-col items-center text-center space-y-2 transform hover:scale-105 hover:shadow-xl">
      <h3 className="text-gray-500 group-hover:text-gray-900 transition-colors duration-500 font-semibold">
        {skeleton ? <Skeleton baseColor="#d2d3d4" width={100} /> : dayLabel}
      </h3>
      <div className="flex items-center space-x-2">
        {skeleton ? (
          <Skeleton baseColor="#d2d3d4" circle={true} height={30} width={30} />
        ) : (
          <FontAwesomeIcon
            icon={getWeatherIcon()}
            size="xl"
            className="group-hover:animate-pulse"
          />
        )}
        <p className="text-gray-700 capitalize">
          {skeleton ? <Skeleton baseColor="#d2d3d4" width={80} /> : conditions}
        </p>
      </div>
      {skeleton ? (
        <Skeleton baseColor="#d2d3d4" width={150} />
      ) : (
        <p className="text-sm font-medium">
          Max:
          <span className="text-base"> {tempmax}°C </span>
          Min:
          <span className="text-base"> {tempmin}°C </span>
        </p>
      )}
      <div className="flex flex-1 flex-col gap-y-1.5 w-1/2 self-center">
        <p className="text-sm text-gray-600 flex justify-between">
          <b>Wind:</b>
          {skeleton ? (
            <Skeleton baseColor="#d2d3d4" width={100} />
          ) : (
            <>
              <span>
                {windspeed} mph {analyzeWindDir()}
              </span>
            </>
          )}
        </p>
        <p className="text-sm text-gray-600 flex justify-between">
          <b>Humidity:</b>{' '}
          {skeleton ? (
            <Skeleton baseColor="#d2d3d4" width={100} />
          ) : (
            `${humidity}%`
          )}
        </p>
        <p className="text-sm text-gray-600 flex justify-between">
          <b>Visibility:</b>{' '}
          {skeleton ? (
            <Skeleton baseColor="#d2d3d4" width={100} />
          ) : (
            `${visibility} miles`
          )}
        </p>
        <p className="text-sm text-gray-600 flex justify-between">
          <b>Pressure:</b>{' '}
          {skeleton ? (
            <Skeleton baseColor="#d2d3d4" width={100} />
          ) : (
            `${pressure} mb`
          )}
        </p>
      </div>
      <p className="text-sm text-gray-600">
        <b>Description:</b>{' '}
        {skeleton ? <Skeleton baseColor="#d2d3d4" width={150} /> : description}
      </p>
    </div>
  );
};

export default WeatherCard;
