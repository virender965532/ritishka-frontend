// Configuration file for environment variables
const config = {
  // S3 Base URL for images and videos
  S3_BASE_URL: process.env.REACT_APP_S3_BASE_URL || 'https://ritishka-backend-s3-public-bucket.s3.ap-south-1.amazonaws.com',
  
  // Backend API URL
  BACKEND_URL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000',
  
  // Other configuration options can be added here
};

export default config; 