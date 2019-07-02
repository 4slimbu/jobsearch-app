# Kchahiyo 

## Remote API
API_BASE_URL = "http://www.kchahiyo.com/api/v1";

Use ip address for local api if localhost doesn't work
API_BASE_URL = "http://192.168.0.101/api/v1";

## How to set up
    - Clone the repo
    - Run npm install
    - Configure the api url on: ./src/constants/app.js
    - Run expo start --android (assuming you have already setup emulator or android phone)
    
## How to publish app to expo server
    - Run: expo publish
    
## How to build stand alone .apk (android)
    - Run: expo build:android