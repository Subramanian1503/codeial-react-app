import styles from '../styles/home.module.css';
import { useAuth } from '../hooks';
import { Link } from 'react-router-dom';

const FriendsList = () => {
  // Define required states for this component
  const auth = useAuth();
  const { friendships = [] } = auth.user;

  // Define the UI of this component
  return (
    <div className={styles.friendsList}>
      {/* header for friends list */}
      <div className={styles.header}>Friends List</div>
      {/* check if the user having friends, If not show no friends found */}
      {friendships && friendships.length === 0 && (
        <div className={styles.noFriends}>No friends found</div>
      )}
      {/* If there are friends, then show them as list */}
      {friendships &&
        friendships.map((friend) => (
          <Link
            key={`friend-${friend._id}`}
            className={styles.friendsItem}
            to={`/user/${friend._id}`}
          >
            {console.log("user link", `/user/${friend._id}`)}
            {/* profile image of the friend */}
            <div className={styles.friendsImg}>
              <img
                src="https://cdn-icons-png.flaticon.com/128/4140/4140048.png"
                alt="friend_profile_image"
              ></img>
            </div>

            {/* email address of the friend */}
            <div className={styles.friendsName}>{friend.to_user.name}</div>
          </Link>
        ))}
    </div>
  );
};

export default FriendsList;
