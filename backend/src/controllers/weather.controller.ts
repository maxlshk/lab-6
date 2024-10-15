import { Request, Response } from 'express';
import axios from 'axios';

export const getWeather = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
      res.status(400).json({
        message: 'Missing required query parameters: latitude and longtitude',
      });
      return;
    }

    const API_KEY = process.env.WEATHER_API_KEY;

    const weatherResponse = await axios.get(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}/next7days?key=${API_KEY}&unitGroup=uk&include=days&elements=tempmax,tempmin,conditions,description,pressure,humidity,visibility,winddir,windspeed`
    );

    res.json(weatherResponse.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching weather data' });
  }
};
