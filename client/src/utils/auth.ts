import { jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    const token = this.getToken();
    if (token) {
      return jwtDecode(token);
    }
    return null;
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }
  
  isTokenExpired(token: string) {
    const decoded: any = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  }

  getToken(): string {
    return localStorage.getItem('authToken') || '';
  }

  login(idToken: string) {
    localStorage.setItem('authToken', idToken);
    window.location.href = '/kanban';
  }

  logout() {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  }
}

export default new AuthService();
