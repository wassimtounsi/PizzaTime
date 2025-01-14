import { registerUser, loginUser } from '../api/authapi';

class AuthService {
    async register(userData) {
        const response = await registerUser(userData);
        return response.data;
    }

    async login(userData) {
        const response = await loginUser(userData);
        localStorage.setItem('authToken', response.data.token);
        return response.data.token;
    }

    logout() {
        localStorage.removeItem('authToken');
    }

    getToken() {
        return localStorage.getItem('authToken');
    }
}

export default new AuthService();
