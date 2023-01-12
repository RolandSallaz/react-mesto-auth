export interface IUser {
  _id: string
  email: string
  avatar: string
  cohort: string
  about: string
}

export interface ICard {
  createdAt: string
  likes: IUser[]
  link: string
  name: string
  owner: IUser
  _id: string
}

export interface IApiSettings {
    readonly url: string;
    readonly headers: {};
  }

export interface IUserInfo  {
    name: String
    about: String
  }

export interface IPlace {
    name: String
    link: String
  }
  