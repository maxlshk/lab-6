import { Request, Response } from 'express';
import axios from 'axios';

export const getWeather = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const location = 'San Francisco';

    const locationResponse = await axios.get(
      `https://www.metaweather.com/api/location/search/`,
      {
        params: { query: location },
      }
    );

    if (locationResponse.data.length === 0) {
      res.status(404).json({ message: 'Location not found' });
      return;
    }

    const woeid = locationResponse.data[0].woeid;

    const weatherResponse = await axios.get(
      `https://www.metaweather.com/api/location/${woeid}/`
    );

    res.json(weatherResponse.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching weather data' });
  }
};
