const AuthService = {
    getToken() {
        return localStorage.getItem('jwtToken');
    },
    setToken(token) {
        localStorage.setItem('jwtToken', token);
    }
};

export default AuthService;