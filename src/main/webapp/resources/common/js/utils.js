/**
 * RiversLau
 * 2017-10-25 10:00
 */
function isEmpty(str) {
    if (str == undefined || str == 'undefined' || str == '') {
        return true;
    }
    return false;
}

function isMatchPhoneFormat(str) {

    if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(str))) {
        return false;
    }
    return true;
}

function isMatchPasswordFormat(str) {
    if (str == undefined || str == '') {
        return false;
    } else if (str.length < 6 || str.length > 16) {
        return false;
    } else {
        return true;
    }
}