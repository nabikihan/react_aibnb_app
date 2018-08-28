import axios from 'axios';
import authService from './auth-service';


//这个用来做AXIOS interceptor，我们可以attach token TO the request TO server
//这个页面由actions里面的index调用。

class AxiosService{

    axiosInstance = {};

    constructor(){
        this.initInstance();
    }


    // timeout:request get times OUT的毫秒数。
    //注意，这里是"/API/V1"
    initInstance(){
        this.axiosInstance = axios.create({
            baseURL:'/api/v1',
            timeout: 1000
        });


        // CONFIG.headers，会把BEARER存入header，你到inspector里面的network的header就能看到token了。
        this.axiosInstance.interceptors.request.use(
            (config) => {
                const token = authService.getToken();
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            });
        return this.axiosInstance;
    }



    getInstance() {
        return this.axiosInstance || this.initInstance();
    }

}

//这里export一个object， 你不能直接export class，之前我们都是用connect mapstateprops来export class的。
export default new AxiosService();



