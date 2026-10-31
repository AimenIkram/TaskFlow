/**
 * LocalStorage Persistence Utilities for TaskFlow
 * Provides robust error handling, schema validation, and safe fallback mechanisms.
 */

/**
 * Storage keys used across the application.
 */
export const STORAGE_KEYS = Object.freeze({
  TASKS: 'taskflow_tasks',
  CATEGORIES: 'taskflow_categories',
  THEME: 'taskflow_theme'
});

/**
 * Validates that the provided theme string is a supported theme.
 * Only 'light' and 'dark' are valid.
 *
 * @param {unknown} theme - Theme value to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const isValidTheme = (theme) => {
  return theme === 'light' || theme === 'dark';
};

/**
 * Validates that the provided data is a valid tasks array.
 * Ensures data is an Array and every item is a valid object with at least an id and title.
 *
 * @param {unknown} data - Data to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const isValidTasksArray = (data) => {
  if (!Array.isArray(data)) {
    return false;
  }
  return data.every(
    (item) =>
      item !== null &&
      typeof item === 'object' &&
      typeof item.id === 'string' &&
      typeof item.title === 'string'
  );
};

/**
 * Validates that the provided data is a valid categories array.
 * Ensures data is an Array and every item is a valid object with at least an id and name.
 *
 * @param {unknown} data - Data to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const isValidCategoriesArray = (data) => {
  if (!Array.isArray(data)) {
    return false;
  }
  return data.every(
    (item) =>
      item !== null &&
      typeof item === 'object' &&
      typeof item.id === 'string' &&
      typeof item.name === 'string'
  );
};

/**
 * Safely loads and parses data from LocalStorage.
 *
 * 1. Checks if LocalStorage is supported and accessible.
 * 2. If the key does not exist, returns fallbackValue.
 * 3. Parses JSON string safely with try/catch to prevent crashes on malformed data.
 * 4. Runs validator if provided; if validation fails, falls back gracefully.
 *
 * @template T
 * @param {string} key - LocalStorage key
 * @param {T} fallbackValue - Value to return if missing or invalid
 * @param {(data: unknown) => boolean} [validator] - Optional validation function
 * @returns {T} - Loaded data or fallbackValue
 */
export const loadFromStorage = (key, fallbackValue, validator) => {
  if (typeof window === 'undefined' || !window.localStorage) {
    return fallbackValue;
  }

  try {
    const rawData = window.localStorage.getItem(key);
    if (rawData === null || rawData === undefined) {
      return fallbackValue;
    }

    const parsedData = JSON.parse(rawData);

    if (typeof validator === 'function') {
      if (!validator(parsedData)) {
        console.warn(`[TaskFlow Storage] Validation failed for "${key}". Falling back to default data.`);
        return fallbackValue;
      }
    }

    return parsedData;
  } catch (error) {
    console.error(`[TaskFlow Storage] Failed to read or parse "${key}" from LocalStorage:`, error);
    return fallbackValue;
  }
};

/**
 * Safely serializes and saves data to LocalStorage.
 *
 * 1. Checks if LocalStorage is supported and accessible.
 * 2. Uses JSON.stringify() to serialize data.
 * 3. Catches quota exceeded errors or security exceptions gracefully without crashing.
 *
 * @param {string} key - LocalStorage key
 * @param {unknown} value - Data to serialize and store
 * @returns {boolean} - True if successfully saved, false otherwise
 */
export const saveToStorage = (key, value) => {
  if (typeof window === 'undefined' || !window.localStorage) {
    return false;
  }

  try {
    const serialized = JSON.stringify(value);
    window.localStorage.setItem(key, serialized);
    return true;
  } catch (error) {
    console.error(`[TaskFlow Storage] Failed to save "${key}" to LocalStorage:`, error);
    return false;
  }
};
