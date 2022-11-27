import {apiUrl} from './constants';

interface AuthReq {
    email: string,
    password: string
}

interface Settings {
    url: string,
    headers: { "Content-Type": String, authorization?: String }

}

class ApiAuth {

    private _url: string;
    private _headers: any

    constructor({url, headers}: Settings) {
        this._url = url;
        this._headers = headers;
    }

    #checkResponse(response: string) {

    }

    newUser({email, password}: AuthReq): Promise<{
        data: {
            _id: String,
            email: String
        }
    }> {
        return fetch(`${this._url}/signup`, {
            method: "POST",
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                email,
                password
            })
        })
            .then(res => {
                return res.ok ? res.json() : Promise.reject(res.status);
            });
    }

    loginIn({email, password}: AuthReq): Promise<{ token: string }> {
        return fetch(`${this._url}/signin`, {
            method: "POST",
            headers:this._headers,
            body: JSON.stringify({
                email,
                password
            })
        })
            .then(response => {
                return response.ok ? response.json() : Promise.reject(response.status);
            })
    }

    getUser(token: string): Promise<{ _id: String, email: String }> {
        return fetch(`${this._url}/users/me`, {
            method: "GET",
            headers: {
                ...this._headers,
                "Authorization": `Bearer ${token}`
            },
        }).then((response) => {
            return response.ok ? response.json() : Promise.reject(response.status);
        });
    }
}

export const apiAuth = new ApiAuth({
    url: 'https://auth.nomoreparties.co',
    headers: {
        "Content-Type": "application/json",
    }
});