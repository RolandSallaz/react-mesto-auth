import {Navigate} from 'react-router'

interface props {
    children: JSX.Element | JSX.Element[]
    loggedIn: Boolean
}

export default function ProtectedRoute({children, loggedIn}: props) {
    return loggedIn ? <>{children}</> : <Navigate to="/sign-in"/>
}
