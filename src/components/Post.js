import styles from '../styles/home.module.css';
import { Link } from 'react-router-dom';
import { Comment } from '../components';
import { useState } from 'react';
import { createComment, toggleLike } from '../api';
import { toast } from 'react-toastify';
import { usePosts } from '../hooks';

const Post = (props) => {
  const [comment, setComment] = useState('');
  const [creatingComment, setCreatingComment] = useState(false);
  const posts = usePosts();

  const handleCreateComment = async (event) => {
    if (event.key === 'Enter') {
      // Prevent the default behavior
      event.preventDefault();

      setCreatingComment(true);

      // Create the comment with the post id
      const response = await createComment(comment, props.post._id);

      // Check the response
      if (response.success) {
        setComment('');
        posts.addComment(response.data.comment, props.post._id);
        toast.success('Comment created successfully');
      } else {
        toast.error(response.message);
      }
      setCreatingComment(false);
    }
  };

  // handle like behavior for post
  const handlePostLike = async (event) => {
    // Prevent default
    event.preventDefault();

    // Call the API to save the like status of the post
    const response = await toggleLike(props.post._id, 'Post');

    if (response.success) {
      if (response.data.deleted) {
        toast.success('Like removed successfully');
      } else {
        toast.success('Like added successfully');
        posts.addLike(props.post._id);
      }
    } else {
      toast.error(`Failed due to ${response.message}`);
    }
  };

  return (
    <div className={styles.postWrapper} key={props.post._id}>
      <div className={styles.postHeader}>
        <div className={styles.postAvatar}>
          <img
            src="https://cdn-icons-png.flaticon.com/128/4140/4140048.png"
            alt="user-pic"
          />
          <div>
            <Link
              to={`/user/${props.post.user._id}`}
              className={styles.postAuthor}
            >
              {props.post.user.name}
            </Link>
            <span className={styles.postTime}>a minute ago</span>
          </div>
        </div>
        <div className={styles.postContent}>{props.post.content}</div>

        <div className={styles.postActions}>
          <div className={styles.postLike}>
            <button>
              <img
                src="https://cdn-icons-png.flaticon.com/128/126/126473.png"
                alt="likes-icon"
                onClick={handlePostLike}
              />
            </button>
            <span>{props.post.likes.length}</span>
          </div>

          <div className={styles.postCommentsIcon}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/1380/1380338.png"
              alt="comments-icon"
            />
            <span>{props.post.comments.length}</span>
          </div>
        </div>
        <div className={styles.postCommentBox}>
          <input
            placeholder="Start typing a comment"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            onKeyDown={handleCreateComment}
          />
        </div>

        <div className={styles.postCommentsList}>
          {props.post.comments.map((comment) => (
            <Comment key={comment._id} comment={comment} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Post;
