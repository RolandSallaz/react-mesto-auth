import { apiUrl, apiAuthKey } from "./constants";
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
            headers: this._headers
        }).then(res => {
            return this._checkResponse(res);
        });
    }
    setUserInfo(newName, newInfo) {
        return fetch(`${this._url}users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({ name: newName, about: newInfo })
        }).then(res => {
            return this._checkResponse(res);
        });
    }
    getCards() {
        return fetch(`${this._url}cards`, {
            headers: this._headers
        }).then(res => {
            return this._checkResponse(res);
        });
    }
    sendCard(name, link) {
        return fetch(`${this._url}cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({ name, link })
        }).then(res => {
            return this._checkResponse(res);
        });
    }
    deleteCard(id) {
        return fetch(`${this._url}cards/${id}`, {
            method: "DELETE",
            headers: this._headers,
        }).then(res => {
            return this._checkResponse(res);
        });
    }
    changeLikeCardStatus(id, prop) {
        return fetch(`${this._url}cards/likes/${id}`, {
            method: prop,
            headers: this._headers,
        }).then(res => {
            return this._checkResponse(res);
        });
    }

    changerAvatar(avatar) {
        return fetch(`${this._url}users/me/avatar`, {
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
        authorization: apiAuthKey,
        "Content-type": "application/json"
    }
});
export default api;