import * as _ from "lodash";
import {AsyncStorage} from "react-native";
import * as shortid from "shortid";

export function showExcerpt(string, length) {
    return string.length > length ?
        string.substring(0, length) + "..." :
        string;
}

export function trimNavTitle(title) {
    return showExcerpt(title, 20);
}

export function trimListTitle(title) {
    return showExcerpt(title, 37);
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

    return  primaryImage && primaryImage.url ? {uri: primaryImage.url} : false;
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

export function prettyDistance(distanceInKm) {
    if (! distanceInKm) {
        distanceInKm = 0;
    }

    return Number((distanceInKm * 1).toFixed(0)) + ' km';
}

export function onlyAdditionalImages(postImages) {
    return _.filter(postImages, function(o) {return !o.is_primary});
}

export function toggleItemInArray(itemsArray, item) {
    let arr = itemsArray && itemsArray.length > 0 ? itemsArray : [];

    let index = arr.indexOf(item);
    if (index > -1) {
        arr.splice(index, 1);
    } else {
        arr.push(item);
    }

    return arr;
}

export function toQueryString(queryObject) {
    let queryString = '';

    _.map(queryObject, function (item, key) {
        queryString += '&' + key + '=' + item;
    });

    return queryString;
}

export function humanReadableFilterInfo(meta, filter) {
    const {search, category, radius, orderBy} = filter;
    const {to, total} = meta;
    let displayInfoText = 'No Posts';

    if (total > 0) {
        displayInfoText = 'Showing 1 - ' + to + ' of ' + total;
    }

    if (search !== "") {
        displayInfoText += ' containing text "' + search + '"';
    }

    if (category.length > 0) {
        displayInfoText += ' with category filter on';
    }

    if (radius !== "") {
        displayInfoText += ' within ' + prettyDistance(radius);
    }

    if (orderBy) {
        displayInfoText += ' order by ' + orderBy;
    }

    return displayInfoText;
}

export function generateUniqueId(id = null) {
    let uniqueId = shortid.generate();

    if (!_.isEmpty(id)) {
        uniqueId = uniqueId + '_' + id;
    }

    return uniqueId;
}