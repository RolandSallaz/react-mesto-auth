import { Redirect, Route } from "react-router"
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const ProtectedRoute = ({ component: Component, ...props }) => {
    const currentUser = useContext(CurrentUserContext);
    return (
        <Route>
            {
                () => props.loggedIn === true && currentUser ? <Component {...props} /> : <Redirect to="/sign-in"></Redirect>
            }
        </Route>
    )
}



export default ProtectedRoute;