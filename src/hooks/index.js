import { useContext, useState } from 'react';
import { login as userLogin } from '../api';
import { AuthContext } from '../providers/AuthProvider';
import {
  setItemInLocalStorage,
  removeItemFromLocalStorage,
  CODEIAL_AUTHORIZATION_KEY,
} from '../utils';

// Get the auth information from the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Defining user auth provider hook
export const useAuthProvider = () => {
  // Define authentication information
  const [user, setUser] = useState();
  const [loading, setLoading] = useState();

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
