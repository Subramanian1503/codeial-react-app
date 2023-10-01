import { CODEIAL_AUTHORIZATION_KEY, API_URLS } from '../utils/index';

const customFetch = async (url, { body, ...customConfig }) => {
  // Get the authorization token from the local storage
  const token = window.localStorage.getItem(CODEIAL_AUTHORIZATION_KEY);

  // construct headers object with content-type and Accept
  const headers = {
    'content-type': 'application/json',
    Accept: 'application/json',
  };

  // set authorization token in headers if token is present
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // Initialize config object with custom configurations, headers
  const config = {
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  // if body is present set the body to config
  if (body) {
    config.body = JSON.stringify(body);
  }

  // call fetch
  try {
    // Fetch data from server using URL and configurations passed
    const response = await fetch(url, config);
    
    // Conver the data into JSON to use the retrieved informations
    const data = await response.json();

    // If response is success then return the data
    if (data.success) {
      return {
        data: data.data,
        success: true,
      };
    }

    // Throw exception if the response status is failure
    throw new Error(data.message);
  } catch (error) {
    // Logging the error message
    console.log(error);

    // Return failure error response with success status as false
    return {
      message: error.message,
      success: false,
    };
  }
};

// Get all the posts based on limit and page size
export const getPosts = (page = 1, limit = 5) => {
  // Trigger cutom fetch API to fecth data of page requested and with the given limit
  return customFetch(API_URLS.posts(page, limit), {
    method: 'GET',
  });
};
