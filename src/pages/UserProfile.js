import styles from '../styles/settings.module.css';
import { useLocation } from 'react-router-dom';

const UserProfile = () => {
  // Get access to the state passed from the link which can be accesed through useLocation hook
  const { state } = useLocation();
  const user = state.user;

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
        <button className={`button ${styles.saveBtn}`}>Add Friend</button>

        {/* remove friend button */}
        <button className={`button ${styles.saveBtn}`}>Remove Friend</button>
      </div>
    </div>
  );
};

export default UserProfile;
