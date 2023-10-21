import styles from '../styles/settings.module.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Loader } from '../components';
import { toast } from 'react-toastify';
import { fetchUser } from '../api';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks';

const UserProfile = () => {
  // Get userId from the param using useParam hook
  const { userId } = useParams();

  // Declare the required states for this component
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();

  // Get current user profile information
  const auth = useAuth();

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
    };
    // Call the method
    getUser();

    // set loading is false
    setLoading(false);
  }, [userId]);

  // Create a method to find whether the current rendered user profile is the friend of the logged in user
  const isFriendOfCurrentUser = () => {
    // Get the current logged in user information
    const currentUser = auth.user;

    // Get the friend ids of the user
    // console.log(currentUser);
    // return true;
    const friendIds = currentUser.friendships.map((friend) => friend.to_user._id);

    // Check if the current user profile id is a part of friend ids
    return friendIds.includes(userId);
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
            <button className={`button ${styles.saveBtn}`}>
              Remove Friend
            </button>
          ) : (
            <button className={`button ${styles.saveBtn}`}>Add Friend</button>
          )}
        </div>
      </div>
    );
  }
};

export default UserProfile;
