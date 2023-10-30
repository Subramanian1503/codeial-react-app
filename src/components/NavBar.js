import { Link } from 'react-router-dom';
import styles from '../styles/navbar.module.css';
import { useAuth } from '../hooks';
import { useEffect, useState } from 'react';
import { searchUsers } from '../api';

const Navbar = () => {
  // Get auth information from the auth context
  const auth = useAuth();
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const response = await searchUsers(searchText);
      if (response.success) {
        setSearchResults(response.data.users);
      }
    };

    if (searchText.length > 2) {
      fetchResults();
    }
  }, [searchText]);

  return (
    <div className={styles.nav}>
      <div className={styles.leftDiv}>
        <a href="/">
          <img
            alt=""
            src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
          />
        </a>
      </div>

      <div className={styles.searchContainer}>
        <img
          className={styles.searchIcon}
          src="https://cdn-icons-png.flaticon.com/128/54/54481.png"
        />

        <input
          placeholder="Search user"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />

        {searchResults.length > 0 && (
          <div className={styles.searchResults}>
            <ul key={`user-${searchResults._id}`}>
              {searchResults.map((result) => {
                return (
                  <li className={styles.searchResultsRow}>
                    <Link to={`/user/${result._id}`}>
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/4140/4140048.png"
                        alt="result_user_pic"
                      ></img>
                      <span>{result.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      <div className={styles.rightNav}>
        {/* show the user information only if it is available in auth context */}
        {auth.user && (
          <div className={styles.user}>
            <Link to="/settings">
              <img
                src="https://cdn-icons-png.flaticon.com/128/4140/4140048.png"
                alt="user_dp"
                className={styles.userDp}
              />
            </Link>
            <span>{auth.user.name}</span>
          </div>
        )}

        <div className={styles.navLinks}>
          <ul>
            {/* show logout only if user auth information is available in auth context  */}
            {auth.user ? (
              <>
                <li>
                  <a onClick={auth.logout}>Log out</a>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Log in</Link>
                </li>
                <li>
                  <Link to="/signup">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
