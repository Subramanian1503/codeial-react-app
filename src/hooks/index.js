import { useContext, useState, useEffect } from 'react';
import { login as userLogin } from '../api';
import { AuthContext } from '../providers/AuthProvider';
import {
  setItemInLocalStorage,
  removeItemFromLocalStorage,
  CODEIAL_AUTHORIZATION_KEY,
  getItemFromLocalStorage,
} from '../utils';
import jwt from 'jwt-decode';

// Get the auth information from the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Defining user auth provider hook
export const useAuthProvider = () => {
  // Define authentication information
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Define a method to get user from JWT token present in the local storage
  useEffect(() => {
    // Getting JWT token from local storage
    const jwt_token = getItemFromLocalStorage(CODEIAL_AUTHORIZATION_KEY);

    if (jwt_token) {
      // Decode the JWT token to the user
      const user = jwt(jwt_token);

      // Set the user information to the state
      setUser(user);
    }
    // Set loading state
    setLoading(false);
  }, []);

  // Define the authentication related methods
  // Login
  const login = async (email, password) => {
    // Trigger login API call and get the response
    const response = await userLogin(email, password);

    // Check if the response is success
    // If yes then set the user to the state
    if (response.success) {
      // Set the user information to the state
      setUser(response.data.user);
      // Store the token in local storage
      setItemInLocalStorage(
        CODEIAL_AUTHORIZATION_KEY,
        response.data.token ? response.data.token : null
      );
      return {
        success: true,
      };
    } else {
      // If no then say user login invalid
      return {
        success: false,
        message: response.message,
      };
    }
  };

  // Logout
  const logout = () => {
    // Set the user to null
    setUser(null);

    // Remove the token from the local storage
    removeItemFromLocalStorage(CODEIAL_AUTHORIZATION_KEY, null);
  };

  return {
    user,
    loading,
    login,
    logout,
  };
};
