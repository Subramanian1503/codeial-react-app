import { useEffect, useState } from 'react';
import { getPosts } from '../api';
import { Home } from '../pages';
import { Loader, Navbar } from '../components';

function App() {
  const [posts, setPosts] = useState([]);
  const [loader, setLoader] = useState(true);

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
        <Navbar />
        <Home posts={posts} />
      </div>
    );
  }
}

export default App;
