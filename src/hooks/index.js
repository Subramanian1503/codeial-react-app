import { useContext, useState, useEffect } from 'react';
import {
  login as userLogin,
  createUser,
  updateUser,
  fetchFriends,
  getPosts,
} from '../api';
import { AuthContext } from '../providers/AuthProvider';
import { PostsContext } from '../providers/PostsProvider';
import {
  setItemInLocalStorage,
  removeItemFromLocalStorage,
  CODEIAL_AUTHORIZATION_KEY,
  getItemFromLocalStorage,
} from '../utils';
import jwt from 'jwt-decode';

// Get the auth information from the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Defining user auth provider hook
export const useAuthProvider = () => {
  // Define authentication information
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Define a method to get user from JWT token present in the local storage
  useEffect(() => {
    const getUser = async () => {
      // Getting JWT token from local storage
      const jwt_token = getItemFromLocalStorage(CODEIAL_AUTHORIZATION_KEY);

      if (jwt_token) {
        // Decode the JWT token to the user
        const user = jwt(jwt_token);

        // Get friends of the user
        const response = await fetchFriends();
        let friendships = [];

        if (response.success) {
          friendships = response.data.friends;
        }

        // Set the user information to the state
        setUser({
          ...user,
          friendships,
        });

        // Set loading state
        setLoading(false);
      }
    };

    getUser();
  }, []);

  // Define the authentication related methods
  // Login
  const login = async (email, password) => {
    // Trigger login API call and get the response
    const response = await userLogin(email, password);

    // Check if the response is success
    // If yes then set the user to the state
    if (response.success) {
      // Set the user information to the state
      setUser(response.data.user);
      // Store the token in local storage
      setItemInLocalStorage(
        CODEIAL_AUTHORIZATION_KEY,
        response.data.token ? response.data.token : null
      );
      setLoading(false);
      return {
        success: true,
      };
    } else {
      // If no then say user login invalid
      return {
        success: false,
        message: response.message,
      };
    }
  };

  // Define the authentication related methods
  // EditProfile
  const editUser = async (userId, name, password, confirmPassword) => {
    // Trigger edit user API call and get the response
    const response = await updateUser(userId, name, password, confirmPassword);

    // Check if the response is success
    // If yes then set the user to the state
    if (response.success) {
      // Set the user information to the state
      setUser(response.data.user);
      // Store the token in local storage
      setItemInLocalStorage(
        CODEIAL_AUTHORIZATION_KEY,
        response.data.token ? response.data.token : null
      );
      setLoading(false);
      return {
        success: true,
        user: response.data.user,
      };
    } else {
      // If no then say user login invalid
      return {
        success: false,
        message: response.message,
      };
    }
  };

  // Logout
  const logout = () => {
    // Set the user to null
    setUser(null);

    // Remove the token from the local storage
    removeItemFromLocalStorage(CODEIAL_AUTHORIZATION_KEY, null);
  };

  // SignUp
  const signUp = async (name, email, password, confirmPassword) => {
    const response = await createUser(name, email, password, confirmPassword);

    if (response.success) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  const updateUserFriendShip = (isAddFriend, friendship, userId) => {
    if (isAddFriend) {
      // Set the user state with new friend
      if (friendship) {
        setUser({
          ...user,
          friendships: [...user.friendships, friendship],
        });
      }
    } else {
      const updatedfriendShip = user.friendships.filter(
        (friend) => friend._id !== userId
      );
      // Set the user state with new friend
      setUser({
        ...user,
        friendships: updatedfriendShip,
      });
    }
  };

  return {
    user,
    loading,
    login,
    logout,
    signUp,
    editUser,
    updateUserFriendShip,
  };
};

export const usePosts = () => {
  return useContext(PostsContext);
};

// Define the usePostsProvider hook so that this hook always return the posts, loading and a update method to update the state of the post
export const usePostsProvider = () => {
  const [posts, setPosts] = useState(null);
  const [loader, setLoader] = useState(true);

  // Use Effect to fetch post from server
  useEffect(() => {
    // Defining a function which call get posts method
    const fetchPosts = async () => {
      const response = await getPosts();

      if (response.success) {
        setPosts(response.data.posts);
      }

      setLoader(false);
      return response;
    };
    // Call the function
    fetchPosts();
  }, []);

  const updatePostsInState = (post) => {
    const newPosts = [post, ...posts];
    console.log('Post Added', newPosts);
    setPosts(newPosts);
  };

  // Add comment functionality
  const addComment = (comment, postId) => {
    // Find the post with provided Id
    const newPosts = posts.map((post) => {
      if (post._id === postId) {
        return {
          ...post,
          comments: [...post.comments, comment],
        };
      }
      return post;
    });

    // set the comment in the post
    setPosts(newPosts);
  };

  return {
    data: posts,
    loader,
    updatePostsInState,
    addComment,
  };
};
