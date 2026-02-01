import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { EmotionProvider } from './context/EmotionContext';
import { MusicProvider } from './context/MusicContext';
import Home from './pages/Home';
import './index.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <EmotionProvider>
          <MusicProvider>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </MusicProvider>
        </EmotionProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
