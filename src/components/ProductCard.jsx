
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

const ProductCard = ({ product, onOpenDetail }) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      className="bg-card rounded-lg overflow-hidden shadow-lg product-card flex flex-col"
      variants={itemVariants}
    >
      <div className="relative h-72 overflow-hidden group">
        <img 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
         src={product.image || "https://images.unsplash.com/photo-1610891015188-5369212db097"} />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full h-12 w-12 hover:bg-primary/80"
            onClick={() => onOpenDetail(product)}
            aria-label="Ver detalles"
          >
            <Eye className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mb-1.5 text-foreground">{product.name}</h3>
        <p className="text-lg text-primary font-bold mb-2">{product.price.toFixed(2)} €</p>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-grow">{product.description}</p>
        <div className="mt-auto flex gap-2">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => onOpenDetail(product)}
          >
            Ver detalles y tallas
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
