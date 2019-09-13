import axios from "axios";

export function getDateString(divider = '-', date = new Date()) {
    return date.toJSON().slice(0, 10).replace(/-/g, divider);
}

export function containsDigitOnly(value) {
    return /^\d*$/.test(value);
}

export function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

export function isEmail(email) {
    return /(\S+)@(\S+)\.(\S+)/.test(email);
}

export function getCSRF(name = 'csrftoken') {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

export function setAxiosDefaults() {
    axios.defaults.withCredentials = true;
    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';
}