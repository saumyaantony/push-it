import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import CreateMenu from './Components/CreateMenu/CreateMenu';
import MenuForm from './Components/MenuForm/MenuForm';
import MenuList from './Components/MenuList/MenuList';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/create-menu" element={<MenuForm/>} />
        <Route path="/menu-list" element={<MenuList/>} />
      </Routes>
    </Router>
  );
};

export default App;
