export * from './constants';

export const getFormBody = (params) => {
  let formBody = [];

  for (let property in params) {
    let encodedKey = encodeURIComponent(property); // 'user name' => 'user%20name'
    let encodedValue = encodeURIComponent(params[property]); // aakash 123 => aakash%2020123

    formBody.push(encodedKey + '=' + encodedValue);
  }

  return formBody.join('&'); // 'username=aakash&password=123213'
};

export const setItemInLocalStorage = (key, value) => {
  // Validate the key and value
  if (!key || !value) {
    console.log('Need key and value to set item in local storage');
    return;
  }
  // Refine the value which contains object type
  const valueToStore =
    typeof value !== 'string' ? JSON.stringify(value) : value;

  // Set value in local storage
  localStorage.setItem(key, valueToStore);
};

export const getItemFromLocalStorage = (key) => {
  // Validate the key
  if (!key) {
    console.log('Need key get item from local storage');
    return;
  }

  // Set value in local storage
  return localStorage.getItem(key);
};

export const removeItemFromLocalStorage = (key) => {
  // Validate the key and value
  if (!key) {
    console.log('Need key to remove item from local storage');
    return;
  }

  // Set value in local storage
  localStorage.removeItem(key);
};
