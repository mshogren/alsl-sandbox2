import React from 'react';
import { cleanup, render, wait } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import '@ungap/global-this';
import { FirebaseAppProvider } from 'reactfire';
import App from './App';

jest.mock('reactfire', () => {
  return {
    ...jest.requireActual('reactfire'),
    preloadFirestore: jest.fn(),
    preloadAuth: jest.fn(),
    preloadUser: jest.fn(),
  };
});

jest.mock('./LoginPage', () => {
  return {
    __esModule: true,
    default: () => {
      return 'LoginPage';
    },
  };
});

jest.mock('./AppRouter', () => {
  return {
    __esModule: true,
    default: () => {
      return 'AppRouter';
    },
  };
});

// taken from https://github.com/FirebaseExtended/reactfire/blob/master/reactfire/auth/auth.test.tsx
class MockAuth {
  constructor() {
    this.app = {
      name: '[DEFAULT]',
    };
    this.user = null;
    this.subscriber = null;
  }

  notifySubscriber() {
    if (this.subscriber) {
      this.subscriber.next(this.user);
    }
  }

  onIdTokenChanged(s) {
    this.subscriber = s;
    this.notifySubscriber();
  }

  updateUser(u) {
    this.user = u;
    this.notifySubscriber();
  }
}
const mockAuth = new MockAuth();
const mockFirebase = {
  auth: () => mockAuth,
};

function Component() {
  return (
    <FirebaseAppProvider firebaseApp={mockFirebase}>
      <React.Suspense fallback="loading...">
        <App />
      </React.Suspense>
    </FirebaseAppProvider>
  );
}

beforeEach(() => {
  act(() => mockFirebase.auth().updateUser(null));
});

afterEach(() => {
  act(() => {
    cleanup();
    jest.clearAllMocks();
  });
});

test('preloads firebase SDKs and data', () => {
  App();
});

test('renders login page', async () => {
  const { getByText } = render(<Component />);
  await wait(() => expect(getByText(/LoginPage/i)).toBeInTheDocument());
});

test('renders app router', async () => {
  const { getByText } = render(<Component />);
  act(() => mockFirebase.auth().updateUser({ uid: 'testuser' }));
  await wait(() => expect(getByText(/AppRouter/i)).toBeInTheDocument());
});
