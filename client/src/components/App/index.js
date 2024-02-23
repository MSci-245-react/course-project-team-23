import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Review from '../Review';
import SignIn from '../SignIn';
import {FirebaseContext} from '../Firebase/index';
import {auth} from '../Firebase/firebase';

const App = () => {
  return (
    <FirebaseContext.Provider value={{auth}}>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<SignIn />} />
          </Routes>
        </div>
      </Router>
    </FirebaseContext.Provider>
  );
};
export default App;
