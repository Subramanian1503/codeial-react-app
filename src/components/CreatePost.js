import styles from '../styles/home.module.css';
import { useState } from 'react';
import { createPost } from '../api';
import { toast } from 'react-toastify';
import { usePosts } from '../hooks';

const CreatePost = () => {
  // Define the required state variables
  const [post, setPost] = useState();
  const [addingPost, setAddingPost] = useState(false);
  const posts = usePosts();

  const handleAddPostClick = async (event) => {
    event.preventDefault();
    setAddingPost(true);
    // Call the API call to create the post
    const response = await createPost(post);

    if (response.success) {
      setPost('');
      posts.updatePostsInState(response.data.post);
      toast.success('Post created successfully!');
    } else {
      toast.error(`Failed due to ${response.message}`);
    }
    setAddingPost(false);
  };

  // Define the UI of the create post component
  return (
    <div className={styles.createPost}>
      <textarea
        value={post}
        onChange={(event) => setPost(event.target.value)}
      />
      <div>
        <button
          className={styles.addPostBtn}
          onClick={handleAddPostClick}
          disabled={addingPost}
        >
          {addingPost ? 'Adding post...' : 'Add post'}
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
