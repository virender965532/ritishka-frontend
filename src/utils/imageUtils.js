// Utility functions for handling image URLs
import config from '../config/config';

const S3_BASE_URL = config.S3_BASE_URL;

/**
 * Constructs a full S3 URL from a directory/filename path
 * @param {string} imagePath - The directory/filename path (e.g., "categories/57a66d6d-36aa-4963-9a11-ae1b026df802.jpg")
 * @returns {string} The full S3 URL
 */
export const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // If it's a File object (for preview), return the object URL
  if (imagePath instanceof File) {
    return URL.createObjectURL(imagePath);
  }
  
  // Construct the full URL
  return `${S3_BASE_URL}/${imagePath}`;
};

/**
 * Constructs a full S3 URL for video from a directory/filename path
 * @param {string} videoPath - The directory/filename path
 * @returns {string} The full S3 URL
 */
export const getVideoUrl = (videoPath) => {
  if (!videoPath) return '';
  
  // If it's already a full URL, return as is
  if (videoPath.startsWith('http')) {
    return videoPath;
  }
  
  // If it's a File object (for preview), return the object URL
  if (videoPath instanceof File) {
    return URL.createObjectURL(videoPath);
  }
  
  // Construct the full URL
  return `${S3_BASE_URL}/${videoPath}`;
};

/**
 * Checks if a path is a full URL or just a directory/filename
 * @param {string} path - The path to check
 * @returns {boolean} True if it's a full URL
 */
export const isFullUrl = (path) => {
  return path && path.startsWith('http');
}; 