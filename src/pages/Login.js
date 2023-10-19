import styles from '../styles/login.module.css';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useAuth } from '../hooks';
import { useNavigate, Navigate } from 'react-router-dom';

const Login = () => {
  // Defining states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const authProvider = useAuth();
  const navigate = useNavigate();

  // If user logged in already route to home page
  if (authProvider.user) {
    return <Navigate to="/" />;
  }

  const handleLoginFormSubmit = async (e) => {
    // Prevent the default behavior
    e.preventDefault();

    // setLoggingIn as true
    setLoggingIn(true);

    // Add validation to check if the email and password provided
    if (!email || !password) {
      // If not then send a toast notification says please enter both email and password
      toast.error('Please enter both email and password');
    }

    // Log in the user using the provided email and password
    const response = await authProvider.login(email, password);

    console.log(response);

    // check if the login was successfull
    if (response.success) {
      // if yes, say that is toasify notification
      toast.success('User login successfull');
      // redirect to Home page
      navigate('/');
    } else {
      // if not, then say the same to the user
      toast.error(response.message);
    }

    //Set the logging in flag to false
    setLoggingIn(false);

    // Navigate to home
  };

  return (
    <form className={styles.loginForm} onSubmit={handleLoginFormSubmit}>
      {/* login header */}
      <span className={styles.loginSignupHeader}>Log In</span>
      {/* email field */}
      <div className={styles.field}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
      </div>

      {/* password field */}
      <div className={styles.field}>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </div>

      {/* login button */}
      <div className={styles.field}>
        <button disabled={loggingIn}>
          {loggingIn ? 'Logging in...' : 'Log In'}
        </button>
      </div>
    </form>
  );
};

export default Login;
