import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainContent1 from './MainContent1';
import Explore from './Explore';
import Crear from './Crear';

const AppPinterest = () => (
  <Router>
    <Routes>
      <Route path="/" element={<MainContent1 />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/crear" element={<Crear />} />
    </Routes>
  </Router>
);

ReactDOM.render(<AppPinterest />, document.getElementById('root'));
export default AppPinterest;