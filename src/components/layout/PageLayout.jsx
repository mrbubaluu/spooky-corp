
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/Footer';

const PageLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background/95">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;
