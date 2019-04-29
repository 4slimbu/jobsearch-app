export function showExcerpt(string, length) {
    return string.length > length ?
        string.substring(0, length) + "..." :
        string;
}

export function toReadable(mysql_date) {
    let t;

    console.log('mysql date', mysql_date);

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

        return day + ' ' + month + ' ' + year + ' ' + hours + ':' + minutes;
    }

    return '';
}