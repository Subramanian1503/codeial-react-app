import { useEffect } from 'react';
import { getPosts } from '../api';

function App() {
  useEffect(() => {
    // Defining a function which call get posts method
    const fetchPosts = async () => {
      const response = await getPosts();
      return response;
    };
    // Call the function
    fetchPosts();
  }, []);

  return <div className="App">Hello world</div>;
}

export default App;
