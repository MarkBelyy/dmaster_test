import axios from "axios";
import TokenService from "./token.service";

const instance = axios.create({
    baseURL: "http://192.168.0.29:9010",
    headers: {
        "Content-Type": "application/json",
    },
});

instance.interceptors.request.use(
    (config) => {
        const token = TokenService.getLocalAccessToken();
        if (token) {
            // console.log(`token: ${token}`);
            config.headers["Authorization"] = token;  // for Spring Boot back-end
            // config.headers["x-access-token"] = token; // for Node.js Express back-end
            if (config.method === 'get' && config.params) {
                config.url += `?${Object.keys(config.params).map(key => `${key}=${config.params[key]}`).join('&')}`;
                // console.log(config.url)
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;

        if (originalConfig.url !== "/auth/signin" && err.response) {
            // Access Token was expired
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;

                try {
                    const rs = await instance.post("/auth/refreshtoken", {
                        refreshToken: TokenService.getLocalRefreshToken(),
                    });

                    const { accessToken } = rs.data;
                    TokenService.updateLocalAccessToken(accessToken);

                    return instance(originalConfig);
                } catch (_error) {
                    return Promise.reject(_error);
                }
            }
        }

        return Promise.reject(err);
    }
);

export default instance;
