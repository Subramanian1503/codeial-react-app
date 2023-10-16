import styles from '../styles/settings.module.css';
import { useAuth } from '../hooks';
import { useState } from 'react';

const Settings = () => {
  // Get the authentication information from the context
  const auth = useAuth();

  // Declare a state for is in editProfile mode
  const [isEditProfileEnabled, setIsEditProfileEnabled] = useState(false);
  const [name, setName] = useState(false);
  const [password, setPassword] = useState(auth.user?.name);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [saveForm, setSaveForm] = useState(false);

  // Event handlers
  const handleEditProfile = () => {
    setIsEditProfileEnabled(!isEditProfileEnabled);
  };

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

        <div className={styles.fieldValue}>{auth.user?.email}</div>
      </div>

      {/* name field */}
      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
        {isEditProfileEnabled ? (
          <input
            type="text"
            className={styles.input}
            value={auth.user?.name}
            onChange={(event) => setName(event.target.value)}
          />
        ) : (
          <div className={styles.fieldValue}>{auth.user?.name}</div>
        )}
      </div>

      {isEditProfileEnabled && (
        <>
          {/* password field */}
          <div className={styles.field}>
            <div className={styles.fieldLabel}>Password</div>

            <input
              className={styles.input}
              type="password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          {/* confirm password field */}
          <div className={styles.field}>
            <div className={styles.fieldLabel}>Confirm Password</div>

            <input
              className={styles.input}
              type="password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
        </>
      )}

      {/* button group */}
      <div className={styles.btnGrp}>
        {isEditProfileEnabled ? (
          <>
            {/* save button */}
            <button className={`button ${styles.saveBtn}`}>
              {saveForm ? 'Saving Profile...' : 'Save Profile'}
            </button>

            {/* go back button */}
            <button
              className={`button ${styles.goBack}`}
              onClick={() => setIsEditProfileEnabled(false)}
            >
              Go Back
            </button>
          </>
        ) : (
          <>
            {/* edit button */}
            <button
              className={`button ${styles.editBtn}`}
              onClick={handleEditProfile}
            >
              Edit Profile
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Settings;
