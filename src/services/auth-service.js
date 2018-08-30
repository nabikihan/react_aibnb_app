import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';

//当我们refresh我们的page之后， 用来check login information是否已经存在了-------isvalid
//当我们logout之后，我们要invalidate user。

class AuthService{

//////////////////////refresh login page to check if token is valid///////////////////////

    tokenKey = 'auth_token';

    getToken() {
        return localStorage.getItem(this.tokenKey);
    }

    // import our jwt token which is corresponding to login information
    // 然后用moment的UNIX function来比较token的expiration time
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


//////////////////////从token中获得username，并且把它显示在header中///////////////////////
    // username是我们在server中设controller user中好的，直接调用。

    getUsername() {
        return this.decode(this.getToken()).username;
    }

//////////////////////logout and invalidate user///////////////////////

    invalidateUser() {
        localStorage.removeItem(this.tokenKey);
    }



}

export default new AuthService();