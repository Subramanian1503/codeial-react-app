import styles from '../styles/settings.module.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Loader } from '../components';
import { toast } from 'react-toastify';
import { addFriend, fetchUser, removeFriend } from '../api';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks';

const UserProfile = () => {
  // Get userId from the param using useParam hook
  const { userId } = useParams();

  // Declare the required states for this component
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const [requestInProgress, setRequestInProgress] = useState();

  // Get current user profile information
  const auth = useAuth();

  console.log('User', auth.user);

  // Declare useEffect to provide the user information by making a API call to the server
  useEffect(() => {
    // Declare a async method to trigger getUser API call
    const getUser = async () => {
      // Get the API call response
      const response = await fetchUser(userId);

      // Check if the response is sucess or failure
      if (response.success) {
        // Set the user response to the state
        setUser(response.data.user);
      } else {
        // Acknowledge the user about the failure
        toast.error(response.message);

        // Navigate the user to the home page
        return <Navigate to="/" />;
      }

      // set loading is false
      setLoading(false);
    };
    // Call the method
    getUser();
  }, [userId]);

  // Create a method to find whether the current rendered user profile is the friend of the logged in user
  const isFriendOfCurrentUser = () => {
    // Get the current logged in user information
    const currentUser = auth.user;

    // Get the friend ids of the user
    // console.log(currentUser);
    // return true;

    console.log();
    const friendIds = currentUser.friendships.map(
      (friend) => friend.to_user._id
    );

    // Check if the current user profile id is a part of friend ids
    return friendIds.includes(userId);
  };

  const handleAddFriendClick = async () => {
    setRequestInProgress(true);
    // Make API call to create friendship of this user with current logged in user
    const response = await addFriend(userId);
    // Check the API response
    // If Success, Update the state of the user in auth
    if (response.success) {
      const { friendship } = response.data;
      auth.updateUserFriendShip(true, friendship);

      // Toast the success notification
      toast.success('Friend added successfully');
    } else {
      // Else, toast the error notification with the message received from the API
      toast.error(`Failed with erro: ${response.message}`);
    }
    setRequestInProgress(false);
  };

  const handleRemoveFriendClick = async () => {
    setRequestInProgress(true);
    // Make API call to create friendship of this user with current logged in user
    const response = await removeFriend(userId);
    // Check the API response
    // If Success, Update the state of the user in auth
    if (response.success) {
      auth.updateUserFriendShip(false, {}, userId);

      // Toast the success notification
      toast.success('Friend removed successfully');
    } else {
      // Else, toast the error notification with the message received from the API
      toast.error(`Failed with error: ${response.message}`);
    }
    setRequestInProgress(false);
  };

  if (loading) {
    return <Loader />;
  } else {
    return (
      <div className={styles.settings}>
        {/* user profile image */}
        <div className={styles.imgContainer}>
          <img
            src="https://cdn-icons-png.flaticon.com/128/4140/4140048.png"
            alt="user_profile_picture"
          ></img>
        </div>

        {/* email field */}
        <div className={styles.field}>
          <div className={styles.fieldLabel}>Email</div>

          <div className={styles.fieldValue}>{user?.email}</div>
        </div>

        {/* name field */}
        <div className={styles.field}>
          <div className={styles.fieldLabel}>Name</div>

          <div className={styles.fieldValue}>{user?.name}</div>
        </div>

        {/* button group */}
        <div className={styles.btnGrp}>
          {/* add friend button */}
          {isFriendOfCurrentUser() ? (
            <button
              className={`button ${styles.saveBtn}`}
              onClick={handleRemoveFriendClick}
            >
              {requestInProgress ? 'Removing Friend...' : 'Remove Friend'}
            </button>
          ) : (
            <button
              className={`button ${styles.saveBtn}`}
              onClick={handleAddFriendClick}
            >
              {requestInProgress ? 'Adding Friend...' : 'Add Friend'}
            </button>
          )}
        </div>
      </div>
    );
  }
};

export default UserProfile;
