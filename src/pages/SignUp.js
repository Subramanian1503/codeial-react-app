import styles from '../styles/login.module.css';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks';

const SignUp = () => {
  // Create required states to store the values of the form entered by the user
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signingIn, setSigningIn] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  // If user logged in already route to home page
  if (auth.user) {
    return <Navigate to="/" />;
  }

  // Define required methods to handle submit event
  const handleSubmitEvent = async (event) => {
    // Prevent default behavior
    event.preventDefault();

    setSigningIn(true);

    // Validate the user inputs with proper error message
    if (!name || !email || !password || !confirmPassword) {
      toast.error('Please enter all required information for sign up');
      // Set signing in flag to flase
      setSigningIn(false);
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Provided password and confirm password not matching');
      // Set signing in flag to flase
      setSigningIn(false);
      return;
    }

    // execute API call to fetch information from server
    const response = await auth.signUp(name, email, password, confirmPassword);

    if (response.success) {
      // if yes, say that is toasify notification
      toast.success('User sign in successfull');
      // redirect to login page
      navigate('/login');
    } else {
      // if not, then say the same to the user
      toast.error(response.message);
    }

    // Set signing in flag to flase
    setSigningIn(false);
  };

  // Define the JSX required to show as UI
  return (
    <form className={styles.loginForm} onSubmit={handleSubmitEvent}>
      {/* header */}
      <span className={styles.loginSignupHeader}>Sign Up</span>
      {/* name */}
      <div className={styles.field}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
      </div>
      {/* email */}
      <div className={styles.field}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
      </div>
      {/* password */}
      <div className={styles.field}>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </div>
      {/* confirm password */}
      <div className={styles.field}>
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        ></input>
      </div>
      {/* submit button */}
      <div className={styles.field}>
        <button disabled={signingIn}>
          {signingIn ? 'Signing in...' : 'Sign In'}
        </button>
      </div>
    </form>
  );
};

export default SignUp;
