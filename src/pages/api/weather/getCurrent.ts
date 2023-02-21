import { WeatherData } from '@/model/weather';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = ResponseError | WeatherData;

type ResponseError = {
  error: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if(req.method === 'GET') {
    const {latitude, longitude} = req.query;

    if(!latitude || !longitude) {
      return res.status(400).json({
        error: 'Missing latitude or longitude'
      });
    }
    
    const response: WeatherData = await fetch(`
      https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=pt_br&units=metric&appid=${process.env.API_WEATHER_KEY}
    `)
      .then(response => response.json())
      .catch(error => {
        console.error(error);
      });
  
      if(!response) {
        return res.status(500).json({ error: 'Unable to fetch data' });
      }

      return res.status(200).json(response);
    };
}
