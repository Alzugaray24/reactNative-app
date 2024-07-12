export const getLastProfileImage = (profileData) => {
  const keys = Object.keys(profileData);
  const lastKey = keys[keys.length - 1];
  return profileData[lastKey].image;
};
