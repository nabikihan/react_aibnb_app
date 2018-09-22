import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';


class AuthService{

//////////////////////refresh login page to check if token is valid///////////////////////

    tokenKey = 'auth_token';

    getToken() {
        return localStorage.getItem(this.tokenKey);
    }

    decode(token) {
        return jwt.decode(token);
    }

    getExpiration(token) {
       const exp = this.decode(token).exp;
       return moment.unix(exp);
    }


    isValid(token) {
       return moment().isBefore(this.getExpiration(token));
    }

    saveToken(token) {
        localStorage.setItem(this.tokenKey, token);
    }

    isAuthenticated() {
        const token = this.getToken();

        return (token && this.isValid(token)) ? true : false;
    }
    
    getUsername() {
        return this.decode(this.getToken()).username;
    }

//////////////////////logout and invalidate user///////////////////////

    invalidateUser() {
        localStorage.removeItem(this.tokenKey);
    }



}

export default new AuthService();