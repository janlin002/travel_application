import React from 'react';
import { Container } from '@material-ui/core';
import {
  BrowserRouter,
  // HashRouter,
  Routes,
  Route,
} from 'react-router-dom';

import Home from './components/Home/home';
import Navbar from './components/Navbar/navbar';
import Auth from './components/Auth/auth';

function App() {
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
