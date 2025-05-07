
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Expand, Minimize, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ImageGallery = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [direction, setDirection] = useState(0);

  const safeImages = images && images.length > 0 
    ? images 
    : [{ id: 'placeholder', src: "https://images.unsplash.com/photo-1600721688193-188906d69497", alt: "Placeholder Image" }];


  const nextImage = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % safeImages.length);
  }, [safeImages.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + safeImages.length) % safeImages.length);
  }, [safeImages.length]);

  const paginate = useCallback((newDirection) => {
    setDirection(newDirection);
    if (newDirection > 0) nextImage();
    else prevImage();
  }, [nextImage, prevImage]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };
  
  const handleThumbnailClick = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  }

  const imageVariants = {
    enter: (dir) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir) => ({
      zIndex: 0,
      x: dir < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  const MainImageDisplay = ({ inModal = false }) => (
    <div className={`relative ${inModal ? 'w-full h-full' : 'w-full h-[300px] md:h-full'} overflow-hidden bg-black/10`}>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={imageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 }}}
          className="absolute inset-0 w-full h-full"
        >
          <img 
            class="w-full h-full object-contain"
            alt={safeImages[currentIndex].alt || `Product image ${currentIndex + 1}`}
           src="https://images.unsplash.com/photo-1677693972403-db681288b5da" />
        </motion.div>
      </AnimatePresence>

      {safeImages.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-1/2 left-2 transform -translate-y-1/2 z-10 ${inModal ? 'text-white bg-black/30 hover:bg-black/50' : 'text-foreground bg-background/30 hover:bg-background/50'} rounded-full h-10 w-10`}
            onClick={() => paginate(-1)}
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-1/2 right-2 transform -translate-y-1/2 z-10 ${inModal ? 'text-white bg-black/30 hover:bg-black/50' : 'text-foreground bg-background/30 hover:bg-background/50'} rounded-full h-10 w-10`}
            onClick={() => paginate(1)}
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </Button>
        </>
      )}

      <Button
          variant="ghost"
          size="icon"
          className={`absolute ${inModal ? 'top-4 right-14' : 'bottom-2 right-2'} z-10 ${inModal ? 'text-white bg-black/30 hover:bg-black/50' : 'text-foreground bg-background/30 hover:bg-background/50'} rounded-full h-10 w-10`}
          onClick={toggleFullscreen}
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          {isFullscreen ? <Minimize size={20} /> : <Expand size={20} />}
      </Button>
      {isFullscreen && inModal && (
         <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-2 z-10 text-white bg-black/30 hover:bg-black/50 rounded-full h-10 w-10"
            onClick={toggleFullscreen}
            aria-label="Close fullscreen"
          >
            <X size={24} />
          </Button>
      )}
    </div>
  );

  if (safeImages[0].id === 'placeholder' && safeImages[0].src === "https://images.unsplash.com/photo-1600721688193-188906d69497") {
     return <div className="w-full h-full bg-secondary flex items-center justify-center text-muted-foreground md:rounded-l-xl md:rounded-r-none rounded-t-xl overflow-hidden">No images available</div>;
  }

  return (
    <div className="flex flex-col h-full md:rounded-l-xl md:rounded-r-none rounded-t-xl overflow-hidden">
      <MainImageDisplay />
      {safeImages.length > 1 && (
        <div className="p-2 bg-background/50">
          <div className="flex space-x-2 overflow-x-auto">
            {safeImages.map((image, index) => (
              <button
                key={image.id || index}
                onClick={() => handleThumbnailClick(index)}
                className={`w-16 h-16 rounded border-2 flex-shrink-0 overflow-hidden ${currentIndex === index ? 'border-primary' : 'border-transparent hover:border-primary/50'}`}
                aria-label={`View image ${index + 1}`}
              >
                <img 
                  class="w-full h-full object-cover"
                  alt={image.alt || `Thumbnail ${index + 1}`}
                 src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
              </button>
            ))}
          </div>
        </div>
      )}

      {isFullscreen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4"
          onClick={toggleFullscreen}
        >
            <div className="w-full h-full max-w-screen-xl max-h-screen-xl relative" onClick={(e) => e.stopPropagation()}>
                 <MainImageDisplay inModal={true} />
            </div>
        </motion.div>
      )}
    </div>
  );
};

export default ImageGallery;
