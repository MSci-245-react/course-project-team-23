import React, {useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Landing from '../Landing';
import Discover from '../Discover';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import PasswordForget from '../PasswordForget';
import UserInfo from '../UserInfo';
import Recommendations from '../Recommendations';
import Plan from '../Plan'
import {withFirebase} from '../Firebase';
import DailyPlanner from '../DailyPlanner';
import CommunityForum from '../CommunityForum';
import Tips from '../Tips';

// Optionally, you can create a ProtectedRoute component
const ProtectedRoute = ({children, authenticated}) => {
  return authenticated ? children : <Navigate to="/SignIn" />;
};

const App = props => {
  const [authUser, setAuthUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const listener = props.firebase.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        setAuthUser(authUser);
        setAuthenticated(true);
      } else {
        setAuthUser(null);
        setAuthenticated(false);
      }
    });

    // Cleanup subscription on unmount
    return () => listener();
  }, [props.firebase.auth]); // Re-run the effect if props.firebase.auth changes

  return (
    <Router>
      <div style={{margin: '0px', color: 'Black'}}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/PasswordForget" element={<PasswordForget />} />
          {/* Protected Routes */}
          <Route
            path="/Discover"
            element={
              <ProtectedRoute authenticated={authenticated}>
                <Discover />
              </ProtectedRoute>
            }
          />
          <Route
            path="/UserInfo"
            element={
              <ProtectedRoute authenticated={authenticated}>
                <UserInfo />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Recommendations"
            element={
              <ProtectedRoute authenticated={authenticated}>
                <Recommendations />
              </ProtectedRoute>
            }
          />
          <Route
            path="/DailyPlanner"
            element={
              <ProtectedRoute authenticated={authenticated}>
                <DailyPlanner />
              </ProtectedRoute>
            }
          />
          <Route
            path="/CommunityForum"
            element={
              <ProtectedRoute authenticated={authenticated}>
                <CommunityForum />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Tips"
            element={
              <ProtectedRoute authenticated={authenticated}>
                <Tips />
              </ProtectedRoute>
            }
          />
          {/* Redirect unauthenticated users from protected routes */}
          {authenticated ? null : (
            <Route path="*" element={<Navigate to="/SignIn" />} />
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default withFirebase(App);
