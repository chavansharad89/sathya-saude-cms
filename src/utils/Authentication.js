import Cookies from 'universal-cookie';

export function setSession(token) {
    const cookies = new Cookies();
    cookies.set('token', token);
}

export function setUserDetails(user) {
    const cookies = new Cookies();
    cookies.set('user', user);
}

export function setVendorFileUuid(fileUuid) {
    const cookies = new Cookies();
    cookies.set('fileUuid', fileUuid);
}

export function isAuthenticated() {
    const cookies = new Cookies();
    return cookies.get('token') ? true : false;
}

export function getSessionToken() {
    const cookies = new Cookies();
    return cookies.get('token');
}

export function getUserDetails() {
    const cookies = new Cookies();
    return cookies.get('user');
}

export function getVendorFileUuid() {
    const cookies = new Cookies();
    return cookies.get('fileUuid');
}

export function removeSession() {
   
    let cookies = document.cookie.split(";");
    cookies.forEach((value, index) => {
        let key = cookies[index].split("=");
        document.cookie = key[0] + " =; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    });
}

export function removeCookies() {
    const cookies = new Cookies();
    return cookies.remove('user');
}

export function redirectToLogin() {
    removeSession();
    window.location.href = '/login';
}