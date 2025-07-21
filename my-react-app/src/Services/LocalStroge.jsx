export const getStorageData = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

export const setStorageData = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};