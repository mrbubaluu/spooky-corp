import React from 'react';
import { motion } from 'framer-motion';
import ProductCatalog from '@/components/ProductCatalog';

const ProductsSection = ({ onAddToCart }) => {
  return (
    <section id="productos" className="py-20 bg-secondary/50">
      <div className="container mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 section-title-font text-primary">Nuestros Productos</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Explora nuestra selección de productos textiles de alta calidad, diseñados con atención al detalle y materiales premium.
          </p>
        </motion.div>
        <ProductCatalog onAddToCart={onAddToCart} />
      </div>
    </section>
  );
};

export default ProductsSection;
