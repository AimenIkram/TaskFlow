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
  THEME: 'taskflow_theme',
  USER_NAME: 'taskflow_user_name'
});

/**
 * Validates that the provided user name is a valid non-empty string.
 *
 * @param {unknown} name - User name to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const isValidUserName = (name) => {
  return typeof name === 'string' && name.trim().length > 0;
};

/**
 * Derives clean uppercase initials (1-2 characters) from a given name.
 * e.g. "Aimen Ikram" -> "AI", "Alex" -> "A", "" -> "TF"
 *
 * @param {string} name - Full user name
 * @returns {string} - Up to two uppercase initials
 */
export const getInitials = (name) => {
  if (!name || typeof name !== 'string') return 'TF';
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'TF';
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

/**
 * Returns a personalized, time-of-day greeting (e.g. "Good morning", "Good afternoon", "Good evening").
 *
 * @param {Date} [date] - Date instance (defaults to current time)
 * @returns {string} - Contextual greeting string
 */
export const getTimeGreeting = (date = new Date()) => {
  const hour = date.getHours();
  if (hour >= 5 && hour < 12) {
    return 'Good morning';
  } else if (hour >= 12 && hour < 17) {
    return 'Good afternoon';
  } else if (hour >= 17 && hour < 22) {
    return 'Good evening';
  }
  return 'Good evening';
};

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
