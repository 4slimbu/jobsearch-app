import * as _ from "lodash";
import {AsyncStorage} from "react-native";

export function showExcerpt(string, length) {
    return string.length > length ?
        string.substring(0, length) + "..." :
        string;
}

export function toReadable(mysql_date) {
    let t;

    if (typeof mysql_date === 'string' && mysql_date !== '') {
        t = mysql_date.split(/[- :]/);

        //when t[3], t[4] and t[5] are missing they defaults to zero
        let d = new Date(t[0], t[1] - 1, t[2], t[3] || 0, t[4] || 0, t[5] || 0);

        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        let day = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();
        let hours = d.getHours() > 9 ? d.getHours() : '0' + d.getHours();
        let minutes = d.getMinutes() > 9 ? d.getMinutes() : '0' + d.getMinutes();

        // return day + ' ' + month + ' ' + year + ' ' + hours + ':' + minutes;
        return day + ' ' + month + ' ' + year;
    }

    return '';
}

export function getFeaturedImageSrc(postImages) {
    const primaryImage = _.find(postImages, {"is_primary": true});

    return  primaryImage && primaryImage.url ? {uri: primaryImage.url} : require('../../../assets/images/placeholder.png');
}

export function findFeaturedImage(postImages) {
    const primaryImage = _.find(postImages, {"is_primary": true});

    if (primaryImage) {
        return {
            ...primaryImage,
            uri: primaryImage.url
        };
    }

    return null;
}

export function findAdditionalImages(postImages) {
    let newPostImages = [];

    _.forEach(postImages, (postImage, key) => {
        if (! postImage.is_primary) {
            newPostImages.push({
                ...postImage,
                uri: postImage.url
            })
        }
    });

    return newPostImages;
}

export async function getDeviceId() {
    let deviceId = '';
    try {
        deviceId =  await AsyncStorage.getItem('loksewa:auth:deviceId');
    } catch (error) {
    }
    return deviceId;
}

export function validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}