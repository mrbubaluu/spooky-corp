
import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Twitter, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary border-t border-border pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <div>
            <div className="flex items-center mb-4 space-x-2">
               <img src="https://storage.googleapis.com/hostinger-horizons-assets-prod/9427de9c-1bf6-4441-a88a-84d0d9ed3498/1e39cbdf86326678e86482a08e10a043.png" alt="SpookyCorp Logo" className="h-10 w-auto" />
               <h3 className="text-2xl font-bold site-title-font text-primary">SpookyCorp</h3>
            </div>
            <p className="text-muted-foreground text-sm">
              Productos textiles con personalidad y un toque de misterio para quienes buscan destacar.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-foreground/90">Enlaces Rápidos</h4>
            <ul className="space-y-2.5">
              <li><a href="#inicio" className="text-sm text-muted-foreground hover:text-primary transition-colors">Inicio</a></li>
              <li><a href="#productos" className="text-sm text-muted-foreground hover:text-primary transition-colors">Productos</a></li>
              <li><a href="#nosotros" className="text-sm text-muted-foreground hover:text-primary transition-colors">Sobre Nosotros</a></li>
              <li><a href="#contacto" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contacto</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-foreground/90">Categorías Populares</h4>
            <ul className="space-y-2.5">
              <li><a href="#productos" className="text-sm text-muted-foreground hover:text-primary transition-colors">Camisetas</a></li>
              <li><a href="#productos" className="text-sm text-muted-foreground hover:text-primary transition-colors">Sudaderas</a></li>
              <li><a href="#productos" className="text-sm text-muted-foreground hover:text-primary transition-colors">Accesorios</a></li>
              <li><a href="#productos" className="text-sm text-muted-foreground hover:text-primary transition-colors">Decoración Hogar</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-foreground/90">Conecta con Nosotros</h4>
            <div className="flex space-x-4 mb-5">
              <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors"><Instagram className="h-6 w-6" /></a>
              <a href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors"><Facebook className="h-6 w-6" /></a>
              <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors"><Twitter className="h-6 w-6" /></a>
            </div>
            <a href="mailto:info@spookycorp.com" className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
              <Mail className="h-5 w-5 mr-2.5" />
              info@spookycorp.com
            </a>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 text-center">
          <motion.p 
            className="text-muted-foreground text-xs"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            © {currentYear} SpookyCorp. Todos los derechos reservados. Diseñado con <Heart className="h-3.5 w-3.5 inline-block text-primary fill-current" /> en la web.
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
