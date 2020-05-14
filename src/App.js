import React from 'react';
import {
  useAuth,
  useFirebaseApp,
  preloadUser,
  preloadAuth,
  preloadFirestore,
  SuspenseWithPerf,
  AuthCheck,
} from 'reactfire';
import { StyledFirebaseAuth } from 'react-firebaseui';
import { Spinner } from 'reactstrap';
import logo from './logo.svg';
import './App.css';

const preloadSDKs = (firebaseApp) => {
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

const preloadData = async (firebaseApp) => {
  const user = await preloadUser(firebaseApp);

  if (user) {
    // preloadFirestoreDoc(firestore => firestore.doc('count/counter'), firebaseApp);
  }
};

function LoadingPage() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Spinner />
    </div>
  );
}

function LoginPage() {
  const auth = useAuth;

  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false,
    },
  };

  return <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth()} />;
}

function App() {
  const firebaseApp = useFirebaseApp();
  preloadSDKs(firebaseApp).then(preloadData(firebaseApp));

  return (
    <SuspenseWithPerf fallback={<LoadingPage />}>
      <AuthCheck fallback={<LoginPage />}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      </AuthCheck>
    </SuspenseWithPerf>
  );
}

export default App;
