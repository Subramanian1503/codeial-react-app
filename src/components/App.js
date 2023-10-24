import { Home, Login, SignUp, Settings } from '../pages';
import { Loader, Navbar } from '../components';
import { BrowserRouter, Routes, Navigate } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { useAuth } from '../hooks';
import UserProfile from '../pages/UserProfile';

function App() {
  // Check whether the user logged in
  const auth = useAuth();

  const PageNotFound = () => {
    return <h1>404</h1>;
  };

  const PrivateRoute = ({ children }) => {
    // Define the Route component with render function which will return the correct route based on the user login status
    if (auth.user) {
      return children;
    }
    return <Navigate to="/login" />;
  };

  if (auth.loading) {
    return <Loader />;
  } else {
    return (
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Routes>
            {/* Defining Home route */}
            <Route path="/" element={<Home />}></Route>

            {/* Defining Login route */}
            <Route path="/login" element={<Login />}></Route>

            {/* Defining default route for 404 */}
            <Route path="/404" element={<PageNotFound />}></Route>

            {/* Define route for redirecting to signUp page */}
            <Route path="/signup" element={<SignUp />}></Route>

            {/* Define route for redirecting to settings page */}
            <Route
              path="/settings"
              element={
                <PrivateRoute>
                  <Settings />
                </PrivateRoute>
              }
            ></Route>

            {/* Define route for redirecting to user profile page */}
            <Route
              path="/user/:userId"
              element={
                <PrivateRoute>
                  <UserProfile />
                </PrivateRoute>
              }
            ></Route>

            <Route path="*" element={<Navigate to="/404" />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
