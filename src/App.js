import React from 'react';
import {
  preloadUser,
  preloadAuth,
  preloadFirestore,
  AuthCheck,
} from 'reactfire';
import LoginPage from './LoginPage';
import AppRouter from './AppRouter';

export const preloadSDKs = (firebaseApp) => {
  return Promise.all([
    preloadFirestore({
      firebaseApp,
      setup(firestore) {
        return firestore().enablePersistence();
      },
    }),
    preloadAuth({ firebaseApp }),
  ]);
};

export const preloadData = async (firebaseApp) => {
  const user = await preloadUser(firebaseApp);

  if (user) {
    // preloadFirestoreDoc(firestore => firestore.doc('count/counter'), firebaseApp);
  }
};

function App() {
  preloadSDKs().then(preloadData());

  return (
    <AuthCheck fallback={<LoginPage />}>
      <AppRouter />
    </AuthCheck>
  );
}

export default App;
