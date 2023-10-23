import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registration from './Registration';
import PostContent from './PostContent'; // Create a PostContent component

function App() {
  return (
    <Router>
      <Routes>
        <Route  path="/" element={<Registration />} />
        <Route path="/post-content" element={<PostContent/>} />
        </Routes>
    </Router>
  );
}

export default App;
