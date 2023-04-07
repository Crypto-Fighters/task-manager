export type LOADING_STATE = 'IDLE' | 'REQUEST' | 'SUCCESS' | 'FAILURE';

export const inProgress = (state: LOADING_STATE) => state === 'REQUEST';

export const inIdle = (state: LOADING_STATE) => state === 'IDLE';

export const inSuccess = (state: LOADING_STATE) => state === 'IDLE';

export const inFailure = (state: LOADING_STATE) => state === 'FAILURE';

export const inProgressOrFailure = (state: LOADING_STATE) => state === 'REQUEST' || state === 'FAILURE';

export function getCookie(name: string) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name: string, value: string, options: any = {}) {

    options = {
        path: '/',
        ...options
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }

    document.cookie = updatedCookie;
}