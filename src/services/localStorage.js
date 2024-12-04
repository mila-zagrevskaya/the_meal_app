export const saveToLocalStorage = (fieldName, data) => {
  try {
    const serializedData = JSON.stringify(data);

    localStorage.setItem(fieldName, serializedData);
  } catch (err) {
    console.error('Can\'t save state to localStorage');
  }
};

export const loadFromLocalStorage = (fieldName) => {
  try {
    const serializedData = localStorage.getItem(fieldName);

    return JSON.parse(serializedData);
  } catch (err) {
    return undefined;
  }
};

export const removeFromLocalStorage = (fieldName) => {
  try {
    localStorage.removeItem(fieldName);
  } catch (err) {
    console.error('Can\'t remove item from localStorage');
  }
};
