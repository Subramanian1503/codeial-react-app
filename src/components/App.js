import { Home, Login, SignUp, Settings } from '../pages';
import { Loader, Navbar } from '../components';
import { BrowserRouter, Routes, Navigate } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { useAuth } from '../hooks';

function App() {
  // Check whether the user logged in
  const auth = useAuth();

  const PageNotFound = () => {
    return <h1>404</h1>;
  };

  if (auth.loading) {
    console.log('Loading', auth.loading);
    return <Loader />;
  } else {
    console.log('Loading', auth.loading);
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
            <Route path="/signUp" element={<SignUp />}></Route>

            {/* Define route for redirecting to settings page */}
            <Route path="/settings" element={<Settings />}></Route>

            <Route path="*" element={<Navigate to="/404" />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
