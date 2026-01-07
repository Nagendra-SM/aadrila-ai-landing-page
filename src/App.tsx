import { ThemeProvider } from "./components/common/ThemeProvider";
import SplashScreen from "./components/common/SplashScreen";
import { useState, useCallback } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import MainLayout from "./components/layout/MainLayout";
import { lazy, Suspense } from 'react';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
    // Small delay to ensure smooth transition
    setTimeout(() => setContentVisible(true), 100);
  }, []);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <div className="min-h-screen">
            {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
            <div
              className={`min-h-screen transition-opacity duration-700 ${
                contentVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route element={<MainLayout />}>
                  <Route index element={<Home />} />
                  <Route path="about" element={<About />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
              </Suspense>
            </div>
          </div>
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
