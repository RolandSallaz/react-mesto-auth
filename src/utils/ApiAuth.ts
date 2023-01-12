import { IUser,IApiSettings } from './Interfaces';

export interface IAuthReq {
    email: string,
    password: string
}

  export type TToken = {
    token: string;
}

class ApiAuth {
    private _url: string;
    private _headers: {[key:string]:string}

    constructor({url, headers}: IApiSettings) {
        this._url = url;
        this._headers = headers;
    }

    private checkResponse<T>(res: Response): Promise<T> {
        return res.ok ? res.json() : Promise.reject(res.status);
    }

    public newUser ({email, password}: IAuthReq) {
        return fetch(`${this._url}/signup`, {
            method: "POST",
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                email,
                password
            })
        })
            .then(this.checkResponse);
    }

    public loginIn({email, password}: IAuthReq) {
        return fetch(`${this._url}/signin`, {
            method: "POST",
            headers:this._headers,
            body: JSON.stringify({
                email,
                password
            })
        })
            .then(this.checkResponse<TToken>)
            .then(data=> {
                localStorage.setItem('jwt', data.token);
                return data
            })
    }

    public getUser(token: string) {
        return fetch(`${this._url}/users/me`, {
            method: "GET",
            headers: {
                ...this._headers,
                "Authorization": `Bearer ${token}`
            },
        }).then(this.checkResponse<{data:{email:String,_id:String}}>);
    }
}

export const apiAuth = new ApiAuth({
    url: 'https://auth.nomoreparties.co',
    headers: {
        "Content-Type": "application/json",
    }
});



