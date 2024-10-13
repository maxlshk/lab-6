export type Location = {
  latitude: number;
  longitude: number;
};

export type DayWeather = {
  tempmax: number;
  tempmin: number;
  windspeed: number;
  winddir: number;
  pressure: number;
  visibility: number;
  humidity: number;
  conditions: string;
  description: string;
};

export type WeatherData = {
  queryCost: number;
  latitude: number;
  longitude: number;
  resolvedAddress: string;
  address: string;
  timezone: string;
  tzoffset: number;
  days: DayWeather[];
};
