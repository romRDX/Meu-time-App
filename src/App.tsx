import React from 'react';
import './App.css';
import AppProvider from './hooks';
import Routes from './routes';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <AppProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </AppProvider>
    </div>
  );
}

export default App;
