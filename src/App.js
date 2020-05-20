import React from 'react';
import { AuthCheck } from 'reactfire';
import { preloadSDKs, preloadData } from './preload';
import LoginPage from './LoginPage';
import AppRouter from './AppRouter';

function App() {
  preloadSDKs().then(preloadData());

  return (
    <AuthCheck fallback={<LoginPage />}>
      <AppRouter />
    </AuthCheck>
  );
}

export default App;
