import axios, { AxiosInstance, AxiosError } from "axios";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

class ApiService {
    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: API_URL,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Interceptor para adicionar token
        this.api.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('adminToken');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // Interceptor para tratar erros
        this.api.interceptors.response.use(
            (response) => response,
            async (error: AxiosError) => {
                if (error.response?.status === 401) {
                    // Token expirado, tentar refresh
                    const refreshToken = localStorage.getItem('refreshToken');
                    if (refreshToken) {
                        try {
                            const response = await this.refreshToken(refreshToken);
                            localStorage.setItem('adminToken', response.data.token);
                            localStorage.setItem('refreshToken', response.data.refreshToken);

                            // Retry original request
                            if (error.config) {
                                error.config.headers.Authorization = `Bearer ${response.data.token}`;
                                return this.api.request(error.config);
                            }
                        } catch (refreshError) {
                            // Refresh falhou, fazer logout
                            this.logout();
                            window.location.href = '/admin/login';
                        }
                    } else {
                        this.logout();
                        window.location.href = '/admin/login';
                    }
                }
                return Promise.reject(error);
            }
        );
    }

    private async refreshToken(refreshToken: string) {
        return this.api.post('/api/v1/auth/refresh', { refreshToken });
    }

    private logout() {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('adminUser');
        localStorage.removeItem('tokenExpiry');
    }

    public getApi() {
        return this.api;
    }

}

export const apiService = new ApiService();
export const api = apiService.getApi();