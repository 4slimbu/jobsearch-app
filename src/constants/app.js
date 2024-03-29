import {Dimensions} from 'react-native';

export default {
    app: {
        APP_NAME: "K CHAHIYO?",
        // API_BASE_URL: "http://10.0.2.2:8000/api/v1",
        // API_BASE_URL: "http://api.jobsearch.test/api/v1",
        API_BASE_URL: "https://api.jobsearch.com/api/v1",
        FB_APP_KEY: "637805180007920",
        GOOGLE_API_KEY: "AIzaSyBsLWTX7nI81gitMCcVrBZuRRNd49zQqj8",
        SCREEN_WIDTH: Dimensions.get('window').width,
        SCREEN_HEIGHT: Dimensions.get('window').height,
        LOGO_URL: require('../../assets/images/logo-full.png'),
        LOGO_INNER_URL: require('../../assets/images/logo-icon.png'),
        // TODO: fix require not working
        // PLACE_HOLDER_IMAGE_URL: require('../../assets/images/placeholder.png'),
        // PLACE_HOLDER_AVATAR_URL: require('../../assets/images/user-hp.png'),
        // BG_IMAGE: require('../../assets/images/wallpaper_4.jpg'),
    },
    routes: {
        CATEGORIES: 'Categories',
        HOME: 'Categories'
    }
};