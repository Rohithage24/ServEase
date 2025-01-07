import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Adjust the import path as needed

const PrivateRoute = ({ component: Component, ...rest }) => {
    const [auth] = useAuth(); // Use the useAuth hook to get the authentication state

    return (
        <Route
            {...rest}
            render={(props) =>
                auth.user ? ( // Check if the user is authenticated
                    <Component {...props} /> // Render the component if authenticated
                ) : (
                    <Redirect to="/login" /> // Redirect to the login page if not authenticated
                )
            }
        />
    );
};

export default PrivateRoute;