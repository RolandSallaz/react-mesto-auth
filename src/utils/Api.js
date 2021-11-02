import { apiUrl } from "./constants";
class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
        this._checkResponse = this._checkResponse.bind(this);
    }
    _checkResponse(response) {
        return response.ok ? response.json() : Promise.reject(response.status);
    }
    getUserInfo() {
        return fetch(`${this._url}users/me`, {
            credentials: 'include',
            headers: this._headers
        })
            .then(res => {
                return this._checkResponse(res);
            })
    }
    setUserInfo(newName, newInfo) {
        return fetch(`${this._url}users/me`, {
            credentials: 'include',
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({ name: newName, about: newInfo })
        }).then(res => {
            return this._checkResponse(res);
        });
    }
    getCards() {
        return fetch(`${this._url}cards`, {
            credentials: 'include',
            headers: this._headers
        }).then(res => {
            return this._checkResponse(res);
        });
    }
    sendCard(name, link) {
        return fetch(`${this._url}cards`, {
            method: "POST",
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({ name, link })
        }).then(res => {
            return this._checkResponse(res);
        });
    }
    deleteCard(id) {
        return fetch(`${this._url}cards/${id}`, {
            credentials: 'include',
            method: "DELETE",
            headers: this._headers,
        }).then(res => {
            return this._checkResponse(res);
        });
    }
    changeLikeCardStatus(id, prop) {
        return fetch(`${this._url}cards/${id}/likes`, {
            credentials: 'include',
            method: prop,
            headers: this._headers,
        }).then(res => {
            return this._checkResponse(res);
        });
    }

    changerAvatar(avatar) {
        return fetch(`${this._url}users/me/avatar`, {
            credentials: 'include',
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({ avatar }),
        }).then(res => {
            return this._checkResponse(res);
        });
    }
}

const api = new Api({
    url: apiUrl,
    headers: {
        "Content-Type": "application/json"
    }
});
export default api;