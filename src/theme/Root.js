import React from 'react';
import BookChat from '../components/BookChat';

export default function Root({children}) {
  // Use environment variable for API URL, fallback to localhost for development
  const apiBaseUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';

  return (
    <>
      {children}
      <BookChat apiBaseUrl={apiBaseUrl} />
    </>
  );
}
