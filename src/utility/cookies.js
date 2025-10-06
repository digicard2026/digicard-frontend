// Function to set a cookie
export function setCookie(username, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = username + "=" + value + ";" + expires + ";path=/";
  }
  
  // Function to get a specific cookie by name
  export function getCookie(username) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${username}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  
  // Function to delete a cookie
  export function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }
  