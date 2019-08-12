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
    
## App Logic
### Navigation
Navigation is handled by using React Navigation for all cases
except the back button.

#### Issue with react-navigation goBack().
In our case we have categories, manage posts and search tab.
All uses the common PostList screen to display post. So, if we define PostList 
route in any of the tab say Categories tab, then even though we are in search screen, the back button 
will take us back to Categories tab which is not what we wanted.
Another way would be to define PostList screen as separate stack but it would mean
back button won't work any more.
Another way would be to define PostList screen in each tab, thus back button will
take us back to the nearest PostList screen which will meet our use case. But, what about
going back from Drawer or from Modal, it will still not work as expected. 

Solution:
Use react-navigation to navigate
Use redux to store the last visited route
Use custom back button which will navigate to the last visited route from the redux store
