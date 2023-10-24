import styles from '../styles/home.module.css';
import { Comment, FriendsList, Loader } from '../components';
import { useState, useEffect } from 'react';
import { getPosts } from '../api';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks';

const Home = () => {
  // Defining the state for post to store it
  const [posts, setPosts] = useState([]);
  const [loader, setLoader] = useState(true);
  const auth = useAuth();

  // Use Effect to fetch post from server
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
    // Define the JSX for Home page
    return (
      <div className={styles.home}>
        {/* posts-list */}
        <div className={styles.postsList}>
          {posts.map((post) => (
            <div className={styles.postWrapper} key={post._id}>
              <div className={styles.postHeader}>
                <div className={styles.postAvatar}>
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/4140/4140048.png"
                    alt="user-pic"
                  />
                  <div>
                    <Link
                      to={`/user/${post.user._id}`}
                      className={styles.postAuthor}
                    >
                      {post.user.name}
                    </Link>
                    <span className={styles.postTime}>a minute ago</span>
                  </div>
                </div>
                <div className={styles.postContent}>{post.content}</div>

                <div className={styles.postActions}>
                  <div className={styles.postLike}>
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/126/126473.png"
                      alt="likes-icon"
                    />
                    <span>5</span>
                  </div>

                  <div className={styles.postCommentsIcon}>
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/1380/1380338.png"
                      alt="comments-icon"
                    />
                    <span>2</span>
                  </div>
                </div>
                <div className={styles.postCommentBox}>
                  <input placeholder="Start typing a comment" />
                </div>

                <div className={styles.postCommentsList}>
                  {post.comments.map((comment) => (
                    <Comment key={comment._id} comment={comment} />
                  ))}
                </div>
              </div>
            </div>
          ))}
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
