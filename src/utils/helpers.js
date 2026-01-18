/**
 * Helper Utility Functions
 * 
 * This module contains utility functions used across the application
 * for date formatting, validation, and other common operations.
 */

/**
 * Format a date string to a more readable format
 * 
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @returns {string} Formatted date string (e.g., "January 15, 2026")
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString + 'T00:00:00');
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

/**
 * Get the day name from a date string
 * 
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @returns {string} Day name (e.g., "Monday")
 */
export const getDayName = (dateString) => {
  const date = new Date(dateString + 'T00:00:00');
  return date.toLocaleDateString('en-US', { weekday: 'long' });
};

/**
 * Get month and year from a month key
 * 
 * @param {string} monthKey - Month in YYYY-MM format
 * @returns {string} Formatted month and year (e.g., "January 2026")
 */
export const formatMonthYear = (monthKey) => {
  const [year, month] = monthKey.split('-');
  const date = new Date(year, parseInt(month) - 1, 1);
  const options = { year: 'numeric', month: 'long' };
  return date.toLocaleDateString('en-US', options);
};

/**
 * Validate email format
 * 
 * @param {string} email - Email address to validate
 * @returns {boolean} True if valid email format
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number format (10 digits)
 * 
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid phone format
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone);
};

/**
 * Extract hour from slot string
 * 
 * @param {string} slot - Slot string (e.g., "2:00 PM to 3:00 PM")
 * @param {number} index - Index in slots array
 * @returns {number} Hour value (0-23)
 */
export const getHourFromSlot = (slot, index) => {
  return index; // Since slots are in order from 0-23
};
