import { CODEIAL_AUTHORIZATION_KEY } from '../utils/index';

const customFetch = async (url, customConfig) => {
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
    const response = fetch(url, config);
    const data = await response.json();

    if (response.success) {
      return {
        data: data.data,
        success: true,
      };
    }

    throw new Error(data.message);
  } catch (error) {
    console.log(error);

    return {
      message: error.message,
      success: false,
    };
  }
};

const getPosts = () => {};
