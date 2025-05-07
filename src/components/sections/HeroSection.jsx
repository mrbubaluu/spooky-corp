
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';
import HeroCarousel from '@/components/HeroCarousel';

const HeroSection = () => {
  const carouselImages = [
    { id: 1, src: "https://images.unsplash.com/photo-1587613864490-6480550a177f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80", alt: "Model showcasing dark fashion textile" },
    { id: 2, src: "https://images.unsplash.com/photo-1551028719-00167b16e2d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80", alt: "Close up of spooky themed textile pattern" },
    { id: 3, src: "https://images.unsplash.com/photo-1604176359050-c5051f39f0a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80", alt: "Artistic shot of SpookyCorp product line" },
    { id: 4, src: "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80", alt: "Lifestyle image with SpookyCorp apparel" }
  ];

  return (
    <section id="inicio" className="relative overflow-hidden bg-background">
      <HeroCarousel images={carouselImages} />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent z-10" />
    </section>
  );
};

export default HeroSection;
