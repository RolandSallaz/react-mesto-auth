import { apiUrl } from "./constants";
import { IUser,IApiSettings, ICard, IUserInfo, IPlace } from './Interfaces';

class Api {
    private _url: string;
    private _headers: {[key:string]:string}

    constructor({url,headers}:IApiSettings) {
        this._url = url;
        this._headers = headers;
    }
    private checkResponse<T>(res: Response): Promise<T> {
        return res.ok ? res.json() : Promise.reject(res.status);
    }
    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers
        })
            .then(this.checkResponse<IUser>)
    }
    setUserInfo({name,about}:IUserInfo) {
        return fetch(`${this._url}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({ name, about })
        }).then(this.checkResponse<IUser>);
    }
    getCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers
        }).then(this.checkResponse<ICard[]>);
    }
    sendCard({name,link}:IPlace) {
        return fetch(`${this._url}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({ name, link })
        }).then(this.checkResponse<ICard>);
    }
    deleteCard(id:string) {
        return fetch(`${this._url}/cards/${id}`, {
            method: "DELETE",
            headers: this._headers,
        }).then(this.checkResponse<ICard[]>);
    }
    changeLikeCardStatus(id:string, prop: 'DELETE' | 'PUT') {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: prop,
            headers: this._headers,
        }).then(this.checkResponse<ICard>);
    }

    changerAvatar(avatar:String) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({ avatar }),
        }).then(this.checkResponse<IUser>);
    }
}

const api = new Api({
    url: apiUrl,
    headers: {
        "Content-Type": "application/json",
        authorization:'6df61dab-da31-4f8e-8ce7-f211bdfa5ef2',
    }
});

export default api;