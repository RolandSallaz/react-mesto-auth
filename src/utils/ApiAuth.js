
class ApiAuth {
    constructor() {
        this._url = "https://auth.nomoreparties.co";
        this._headers = { "Content-Type": "application/json" };
        this._checkResponse = this._checkResponse.bind(this);
    }
    _checkResponse(response) {
        return response.ok ? response.json() : Promise.reject(response.status);
    }
    newUser({ email, pass }) {
        return fetch(`${this._url}/signup`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                "password": pass,
                "email": email
            })
        })
            .then(res => {
                return this._checkResponse(res);
            });
    }
    loginIn({ email, pass }) {
        return fetch(`${this._url}/signin`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                "password": pass,
                "email": email
            })
        })
            .then(res => {
                return this._checkResponse(res);
            });
    }
    checkToken(token) {
        return fetch(`${this._url}/users/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })
            .then(res => {
                return this._checkResponse(res);
            });
    }

}
const apiAuth = new ApiAuth();
export default apiAuth;