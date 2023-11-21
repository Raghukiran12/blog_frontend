
// Function to get user data
export const getUserData = () => {
    // Retrieve the user data from local storage
    const userData = JSON.parse(localStorage.getItem('userData'));
    return userData;
  };
  