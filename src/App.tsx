import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Compenonets/LayoutArea/Header/Header';
import Menu from './Compenonets/LayoutArea/Menu/Menu';
import Footer from './Compenonets/LayoutArea/Footer/Footer';
import Routing from './Compenonets/LayoutArea/Routing/Routing';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="Layout">
      <header>
        <Header />
      </header>
      <div className='content-container'>
        <aside>
          <Menu />
        </aside>
        <main>
          <Routing />
          <Outlet />
        </main>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
