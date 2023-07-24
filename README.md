
# Weather API Backend

This is a Node.js backend server that provides real-time weather data for multiple cities. It fetches weather information from the OpenWeatherMap API and responds with the data in JSON format.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your_username/your_weather_api_backend.git
cd your_weather_api_backend

2. Install dependencies:
   npm install

3. Create a .env file in the root directory of the project and add your OpenWeatherMap API key:
    OPENWEATHER_API_KEY=your_openweather_api_key_here

## API Endpoint
### POST /getWeather

Request :
POST http://localhost:3000/getWeather
Content-Type: application/json

{
  "cities": ["toronto", "mumbai", "london"]
}

Response :
{
  "weather": {
    "toronto": {
      "temperature": "24C",
      "description": "Clear sky"
    },
    "mumbai": {
      "temperature": "34C",
      "description": "Scattered clouds"
    },
    "london": {
      "temperature": "14C",
      "description": "Light rain"
    }
  }
}

##Dependencies

- Express: Web framework for Node.js.
- Axios: Promise-based HTTP client for making API requests.
- Cors: Middleware to enable CORS in Express.
- dotenv: Loads environment variables from a .env file.
