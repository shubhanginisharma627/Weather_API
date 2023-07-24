import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv'; // Import the dotenv package
dotenv.config(); 
const app = express();
const port =process.env.PORT | 3000;

const API_KEY = process.env.OPENWEATHER_API_KEY;

app.use(cors());
// Middleware to parse JSON in the request body
app.use(express.json());

// POST endpoint to get weather data for multiple cities
app.post('/getWeather', async (req, res) => {
  const { cities } = req.body;

  if (!cities || !Array.isArray(cities) || cities.length === 0) {
    return res.status(400).json({ error: 'Invalid input. Please provide an array of city names.' });
  }

  try {
    const weatherData = await Promise.all(
      cities.map(async (city) => {
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
        const response = await axios.get(url);

        const temperature = `${response.data.main.temp}C`;
        const weatherDescription = response.data.weather[0].description;

        return { city, temperature, weatherDescription };
      })
    );

    const weatherResult = weatherData.reduce((result, data) => ({ ...result, [data.city]: { temperature: data.temperature, description: data.weatherDescription } }), {});
    return res.json({ weather: weatherResult });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch weather data.' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
