import styles from '../styles/home.module.css';
import { CreatePost, FriendsList, Loader, Post } from '../components';
import { useAuth, usePosts } from '../hooks';

const Home = () => {
  // Defining the state for post to store it
  const auth = useAuth();
  // Getting the posts from the created context
  const posts = usePosts();

  if (posts.loader) {
    return <Loader />;
  } else {
    // Define the JSX for Home page
    return (
      <div className={styles.home}>
        {/* posts-list */}
        <div className={styles.postsList}>
          {/* create post  */}
          <CreatePost />
          {posts.data.map((post) => 
            <Post key={post._id} post={post} />
          )}
        </div>

        {/* friends-list */}
        {auth.user && <FriendsList />}
      </div>
    );
  }
};

//Defining props validation for Home component
// Home.prototype = {
//   posts: PropTypes.array.isRequired,
// };

export default Home;
