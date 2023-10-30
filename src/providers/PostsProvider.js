import { createContext } from 'react';

import { usePostsProvider } from '../hooks';

const initialState = {
  posts: [],
  loading: true,
  updatePostsInState: () => {},
  addComment: () => {},
};

export const PostsContext = createContext(initialState);

export const PostsProvider = ({ children }) => {
  const posts = usePostsProvider();

  return (
    <PostsContext.Provider value={posts}>{children}</PostsContext.Provider>
  );
};
