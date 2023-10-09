import { useEffect, useState } from 'react';
import { getPosts } from '../api';
import { Home, Login } from '../pages';
import { Loader, Navbar } from '../components';
import { BrowserRouter, Routes, Navigate } from 'react-router-dom';
import { Route } from 'react-router-dom';

function App() {
  const [posts, setPosts] = useState([]);
  const [loader, setLoader] = useState(true);

  const PageNotFound = () => {
    return <h1>404</h1>;
  };

  useEffect(() => {
    // Defining a function which call get posts method
    const fetchPosts = async () => {
      const response = await getPosts();

      if (response.success) {
        setPosts(response.data.posts);
      }

      setLoader(false);
      return response;
    };
    // Call the function
    fetchPosts();
  }, []);

  if (loader) {
    return <Loader />;
  } else {
    return (
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Routes>
            {/* Defining Home route */}
            <Route path="/" element={<Home posts={posts} />}></Route>

            {/* Defining Login route */}
            <Route path="/login" element={<Login />}></Route>

            {/* Defining default route for 404 */}
            <Route path="/404" element={<PageNotFound />}></Route>

            <Route path="*" element={<Navigate to="/404" />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
