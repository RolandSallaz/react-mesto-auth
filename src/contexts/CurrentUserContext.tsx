import {createContext} from "react";
import {IUser} from "../utils/Interfaces";

const CurrentUserContext = createContext<IUser | null>(null);
export default CurrentUserContext;