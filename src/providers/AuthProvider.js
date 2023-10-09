import { createContext } from 'react';
import { useAuthProvider } from '../hooks';

const initialState = {
  user: null,
  login: () => {},
  logout: () => {},
  loading: true,
};

// Creating Auth context component
export const AuthContext = createContext(initialState);

// Create Auth provider component
export const AuthProvider = ({ children }) => {
  // Getting the user authentication information from Auth provider
  const auth = useAuthProvider();

  // Setting the value of authentication information to the child node passed as prop
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
