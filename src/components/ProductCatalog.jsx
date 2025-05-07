
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import ProductDetail from '@/components/ProductDetail';
import ProductCard from '@/components/ProductCard';
import { productsData, categoriesData } from '@/data/products.js';
import { useCart } from '@/context/CartContext';

const ProductCatalog = () => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const filteredProducts = selectedCategory === 'todos'
    ? productsData
    : productsData.filter(product => product.category === selectedCategory);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const openProductDetail = (product) => {
    setSelectedProduct(product);
    setIsDetailOpen(true);
  };

  const closeProductDetail = () => {
    setIsDetailOpen(false);
    setSelectedProduct(null);
  };

  const handleAddToCartFromCatalog = (product) => {
    addToCart(product);
  };

  const handleAddToCartFromDetail = (product) => {
    addToCart(product);
    closeProductDetail();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07
      }
    }
  };

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categoriesData.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            className={`category-button px-5 py-2.5 text-sm ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => handleCategoryChange(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onOpenDetail={openProductDetail}
            onAddToCart={handleAddToCartFromCatalog}
          />
        ))}
      </motion.div>

      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          isOpen={isDetailOpen}
          onClose={closeProductDetail}
          onAddToCart={() => handleAddToCartFromDetail(selectedProduct)}
        />
      )}
    </div>
  );
};

export default ProductCatalog;
