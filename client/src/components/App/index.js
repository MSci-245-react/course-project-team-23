import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Review from "../Review";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Review />} />
        </Routes>
      </div>
    </Router>
  );
};
export default App;