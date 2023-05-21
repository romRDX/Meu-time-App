import React from 'react';
import './App.css';
import AppProvider from './hooks';
import Routes from './routes';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/header/header';

function App() {
  return (
    <div className="App">
      <AppProvider>
        <BrowserRouter>
          <Header />
          <Routes />
        </BrowserRouter>
      </AppProvider>
    </div>
  );
}

export default App;
