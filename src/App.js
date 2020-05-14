import React, { useState } from 'react';
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
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Spinner,
} from 'reactstrap';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

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

function Home() {
  return <p>Home</p>;
}

function Products() {
  return <p>Products</p>;
}

function Taxes() {
  return <p>Taxes</p>;
}

function App() {
  const firebaseApp = useFirebaseApp();
  preloadSDKs(firebaseApp).then(preloadData(firebaseApp));

  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <SuspenseWithPerf fallback={<LoadingPage />}>
      <AuthCheck fallback={<LoginPage />}>
        <Router>
          <div>
            <Navbar color="faded" light expand="md">
              <NavbarBrand tag={Link} to="/" className="mr-auto">
                Home
              </NavbarBrand>
              <NavbarToggler onClick={toggleNavbar} className="mr-2" />
              <Collapse isOpen={!collapsed} navbar>
                <Nav navbar>
                  <NavItem>
                    <NavLink tag={Link} to="/products">
                      Products
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} to="/taxes">
                      Taxes
                    </NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>

            <Switch>
              <Route path="/products">
                <Products />
              </Route>
              <Route path="/taxes">
                <Taxes />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </Router>
      </AuthCheck>
    </SuspenseWithPerf>
  );
}

export default App;
