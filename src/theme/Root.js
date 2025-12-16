import React from 'react';
import BookChat from '../components/BookChat';

export default function Root({children}) {
  // API URL configuration
  // For Vercel deployment: Uses /api endpoint on same domain
  // For local development: Uses localhost:8000
  const apiBaseUrl = typeof window !== 'undefined'
    ? (process.env.NODE_ENV === 'production'
        ? '/api' // Vercel serverless function path
        : 'http://localhost:8000') // Local development
    : 'http://localhost:8000';

  return (
    <>
      {children}
      <BookChat apiBaseUrl={apiBaseUrl} />
    </>
  );
}
