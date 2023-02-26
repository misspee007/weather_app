# Weather App
This monorepo holds the code for the frontend and backend of the app. Get the weather description of any city in the world.

## Homepage
https://weather-app-buy6.onrender.com

## API
### Base URL
https://weather-app-buy6.onrender.com/api

### Get City Weather Details
- Route: `/city/:city`
- Method: GET
- Responses:

    Code: 200
    
    Description: Request successful
    
    Content type: application/xml
    
    Example:
    
      <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
      <root>
          <coord>
              <lon>8.0812</lon>
              <lat>5.8086</lat>
          </coord>
          <weather>
              <id>804</id>
              <main>Clouds</main>
              <description>overcast clouds</description>
              <icon>04d</icon>
          </weather>
          <base>stations</base>
          <main>
              <temp>309.89</temp>
              <feels_like>309.45</feels_like>
              <temp_min>309.89</temp_min>
              <temp_max>309.89</temp_max>
              <pressure>1006</pressure>
              <humidity>26</humidity>
              <sea_level>1006</sea_level>
              <grnd_level>995</grnd_level>
          </main>
          <visibility>10000</visibility>
          <wind>
              <speed>1.36</speed>
              <deg>303</deg>
              <gust>2.23</gust>
          </wind>
          <clouds>
              <all>97</all>
          </clouds>
          <dt>1677427206</dt>
          <sys>
              <country>NG</country>
              <sunrise>1677390064</sunrise>
              <sunset>1677433234</sunset>
          </sys>
          <timezone>3600</timezone>
          <id>2320831</id>
          <name>Ugep</name>
          <cod>200</cod>
      </root>
      
    Code: 404
    
    Description: Route not found
    
    Content type: application/json
    
    Example:
    
      {
        "error": "City Wakanda not found"
      }     

## Development
### Starting the app
- Clone the repository
  ```
  git clone https://github.com/misspee007/weather_app.git
  ```
- Create an account on https://home.openweathermap.org/ and get an API key.

- Navigate to the root folder, copy the .env.example file and fill in the values. 
  ```
  cp .env.example .env
  ```
- Install dependencies and start server
  ```
  cd backend && npm install
  npm run start
  ```
- Open another terminal, install frontend dependencies and start the app
  ```
  cd frontend && npm install
  npm run dev
  ```
- Go to http://localhost:5173/page to view the app in development mode.
  
### Build
- Run build command
  ```
  cd frontend
  npm run build
  ```
- Go to http://localhost:PORT/page to view. If you don't specify a port in your `.env` file, the default port is 3000.

## Tools
- [Nodejs](https://nodejs.org)
- [Express](https://expressjs.com)
- [Reactjs](https://reactjs.org/)
- [Vite](https://vitejs.dev)
