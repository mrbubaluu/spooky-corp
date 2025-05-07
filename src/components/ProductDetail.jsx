
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X, ShoppingCart, Check, AlertCircle, ChevronLeft, ChevronRight, Expand, Minimize } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import ImageGallery from '@/components/ImageGallery';

const ProductDetail = ({ product, isOpen, onClose, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [showSizeWarning, setShowSizeWarning] = useState(false);
  const { toast } = useToast();

  if (!product) return null;

  const needsSizeSelection = product.category === 'camisetas' || product.category === 'sudaderas';
  const availableSizes = ['S', 'M', 'L', 'XL', 'XXL'];
  
  const productImages = product.galleryImages && product.galleryImages.length > 0 
    ? product.galleryImages
    : [{ id: 'default', src: product.image || "https://images.unsplash.com/photo-1515982094567-d2b7c4bea6ea", alt: product.name }];


  const handleAddToCartClick = () => {
    if (needsSizeSelection && !selectedSize) {
      setShowSizeWarning(true);
      toast({
        title: "Selecciona una talla",
        description: "Por favor, elige una talla para este producto.",
        variant: "destructive",
      });
      return;
    }
    setShowSizeWarning(false);
    onAddToCart({ ...product, selectedSize });
    setSelectedSize(null); 
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setShowSizeWarning(false);
  };

  const handleClose = () => {
    setSelectedSize(null);
    setShowSizeWarning(false);
    onClose();
  }

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', damping: 30, stiffness: 300, duration: 0.3 }
    },
    exit: {
      opacity: 0,
      y: 50,
      scale: 0.9,
      transition: { duration: 0.2 }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={handleClose} 
        >
          <motion.div
            className="bg-card rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row"
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()} 
          >
            <div className="md:w-1/2 relative">
              <ImageGallery images={productImages} />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-3 top-3 z-[60] text-foreground/70 hover:text-foreground bg-background/50 hover:bg-background/80 rounded-full"
                onClick={handleClose}
                aria-label="Cerrar"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="md:w-1/2 p-6 sm:p-8 flex flex-col overflow-y-auto">
              <div className="mb-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary uppercase tracking-wider">
                  {product.category}
                </span>
              </div>
              <h2 className="text-3xl font-bold mb-2 text-foreground">{product.name}</h2>
              <p className="text-2xl text-primary font-semibold mb-5">{product.price.toFixed(2)} €</p>
              
              <p className="text-muted-foreground mb-6 text-sm leading-relaxed flex-grow">{product.description}</p>
              
              {product.details && product.details.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-md font-semibold mb-2 text-foreground/90">Características:</h3>
                  <ul className="space-y-1.5 text-sm">
                    {product.details.map((detail, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="h-4 w-4 text-primary mr-2.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {needsSizeSelection && (
                <div className="mb-6">
                  <h3 className="text-md font-semibold mb-2 text-foreground/90">Selecciona Talla:</h3>
                  <div className="flex flex-wrap gap-2">
                    {availableSizes.map((size) => (
                      <Button 
                        key={size} 
                        variant={selectedSize === size ? "default" : "outline"} 
                        size="sm" 
                        className={`h-9 w-9 p-0 ${selectedSize === size ? '' : 'hover:bg-primary/10 hover:border-primary'}`}
                        onClick={() => handleSizeSelect(size)}
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                  {showSizeWarning && (
                    <motion.p 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-destructive text-xs mt-2 flex items-center">
                      <AlertCircle size={14} className="mr-1" /> Por favor, selecciona una talla.
                    </motion.p>
                  )}
                </div>
              )}
              
              <Button
                size="lg"
                className="w-full mt-auto py-3 text-md"
                onClick={handleAddToCartClick}
              >
                Añadir a Solicitud <ShoppingCart className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductDetail;
