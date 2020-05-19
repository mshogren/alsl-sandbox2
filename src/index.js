import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SuspenseWithPerf, FirebaseAppProvider } from 'reactfire';
import LoadingPage from './LoadingPage';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'firebase/performance';

const config = {
  apiKey: 'AIzaSyCmh9-qBBAR-4gkoCZdTm0Gh6zdITsJSjc',
  authDomain: 'alsl-sandbox2.firebaseapp.com',
  databaseURL: 'https://alsl-sandbox2.firebaseio.com',
  projectId: 'alsl-sandbox2',
  storageBucket: 'alsl-sandbox2.appspot.com',
  messagingSenderId: '587779077455',
  appId: '1:587779077455:web:4ebee4ec3576a2c7dbc13a',
};

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={config}>
      <SuspenseWithPerf fallback={<LoadingPage />}>
        <App />
      </SuspenseWithPerf>
    </FirebaseAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
