
import React from 'react';
import { Toaster } from '@/components/ui/toaster';
import CartProvider from '@/context/CartContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import HomePage from '@/pages/HomePage';


const App = () => {
  return (
    <CartProvider>
      <Router>
        <PageLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </PageLayout>
      </Router>
      <Toaster />
    </CartProvider>
  );
};

export default App;
