
import React, { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
  SheetDescription,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/CartContext';
import { Trash2, Minus, Plus, Send, Info, AlertCircle, MessageSquare } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Textarea } from '@/components/ui/textarea';


const CartSheet = ({ isOpen, onOpenChange }) => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!name.trim()) errors.name = 'El nombre es obligatorio.';
    if (!email.trim()) {
      errors.email = 'El email es obligatorio.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'El formato del email no es válido.';
    }
    if (phone.trim() && !/^\+?[0-9\s-()]{7,20}$/.test(phone)) {
        errors.phone = 'El formato del teléfono no es válido.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSendRequest = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast({
        title: 'Error en el formulario',
        description: 'Por favor, corrige los errores antes de enviar.',
        variant: 'destructive',
      });
      return;
    }

    if (cart.length === 0) {
      toast({
        title: 'Solicitud vacía',
        description: 'Añade productos antes de enviar tu solicitud.',
        variant: 'destructive',
      });
      return;
    }

    const productList = cart.map(item => {
      let productInfo = `- ${item.name} (Cantidad: ${item.quantity})`;
      if (item.selectedSize) {
        productInfo += ` (Talla: ${item.selectedSize})`;
      }
      return productInfo;
    }).join('\n');

    const message = `
      Nueva solicitud de SpookyCorp:
      Nombre: ${name}
      Email: ${email}
      Teléfono: ${phone || 'No proporcionado'}
      Indicaciones Adicionales: ${notes || 'Ninguna'}
      Productos Solicitados:
      ${productList}
      Total Estimado: ${getTotalPrice().toFixed(2)} €
    `;
    console.log("Solicitud enviada (simulado):", message);

    toast({
      title: 'Solicitud Enviada',
      description: 'Hemos recibido tu solicitud. Nos pondremos en contacto contigo pronto.',
    });
    clearCart();
    setName('');
    setEmail('');
    setPhone('');
    setNotes('');
    setFormErrors({});
    onOpenChange(false); 
  };
  
  return (
    <Sheet open={isOpen} onOpenChange={(open) => {
      if (!open) {
        setFormErrors({}); 
      }
      onOpenChange(open);
    }}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col p-0">
        <SheetHeader className="p-6 pb-4">
          <SheetTitle className="text-2xl font-bold site-title-font text-primary">Tu Solicitud de Productos</SheetTitle>
           <SheetDescription className="text-sm text-muted-foreground flex items-center">
            <Info size={16} className="mr-2 text-primary" />
            Completa tus datos y envía la solicitud. Nos pondremos en contacto para finalizar.
          </SheetDescription>
        </SheetHeader>
        
        <ScrollArea className="flex-grow px-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-10">
              <img  alt="Calavera triste" class="w-24 h-24 mb-4 opacity-50" src="https://images.unsplash.com/photo-1484019102027-3e5424078e11" />
              <p className="text-xl font-semibold text-foreground">Tu solicitud está vacía</p>
              <p className="text-muted-foreground">Añade algunos productos para empezar.</p>
            </div>
          ) : (
            <div className="space-y-4 py-2">
              {cart.map((item) => (
                <div key={item.cartItemId} className="flex items-center space-x-4 bg-card/50 p-3 rounded-md">
                  <img 
                    src={item.image || "https://images.unsplash.com/photo-1610891015188-5369212db097"}
                    alt={item.name}
                    class="w-16 h-16 object-cover rounded"
                   src="https://images.unsplash.com/photo-1492448497576-45b1efcdc02c" />
                  <div className="flex-grow">
                    <h4 className="font-semibold text-sm text-foreground">{item.name}</h4>
                    {item.selectedSize && <p className="text-xs text-muted-foreground">Talla: {item.selectedSize}</p>}
                    <p className="text-xs text-muted-foreground">{item.price.toFixed(2)} €</p>
                    <div className="flex items-center mt-1">
                      <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}>
                        <Minus size={12} />
                      </Button>
                      <span className="mx-2 text-sm font-medium">{item.quantity}</span>
                      <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}>
                        <Plus size={12} />
                      </Button>
                    </div>
                  </div>
                  <div className="text-right">
                     <p className="font-semibold text-sm text-primary">{(item.price * item.quantity).toFixed(2)} €</p>
                     <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive mt-1" onClick={() => removeFromCart(item.cartItemId)}>
                        <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
        
        {cart.length > 0 && (
          <form onSubmit={handleSendRequest} className="border-t border-border">
            <div className="px-6 pt-4">
              <div className="flex justify-between items-center mb-4">
                <p className="text-lg font-semibold text-foreground">Total Estimado:</p>
                <p className="text-xl font-bold text-primary">{getTotalPrice().toFixed(2)} €</p>
              </div>
            </div>
            <ScrollArea className="px-6 max-h-[calc(100vh-450px)]"> {/* Adjusted max height */}
              <div className="space-y-3 pb-2">
                 <div>
                   <label htmlFor="cart-name" className="block text-xs font-medium text-muted-foreground mb-1">Nombre</label>
                   <input type="text" id="cart-name" value={name} onChange={(e) => setName(e.target.value)} className={`w-full px-3 py-2 text-sm bg-secondary/50 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${formErrors.name ? 'border-destructive ring-destructive' : 'border-input'}`} placeholder="Tu nombre completo"/>
                   {formErrors.name && <p className="text-xs text-destructive mt-1 flex items-center"><AlertCircle size={14} className="mr-1"/>{formErrors.name}</p>}
                 </div>
                 <div>
                   <label htmlFor="cart-email" className="block text-xs font-medium text-muted-foreground mb-1">Email</label>
                   <input type="email" id="cart-email" value={email} onChange={(e) => setEmail(e.target.value)} className={`w-full px-3 py-2 text-sm bg-secondary/50 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${formErrors.email ? 'border-destructive ring-destructive' : 'border-input'}`} placeholder="tu.email@ejemplo.com"/>
                   {formErrors.email && <p className="text-xs text-destructive mt-1 flex items-center"><AlertCircle size={14} className="mr-1"/>{formErrors.email}</p>}
                 </div>
                  <div>
                   <label htmlFor="cart-phone" className="block text-xs font-medium text-muted-foreground mb-1">Teléfono (Opcional)</label>
                   <input type="tel" id="cart-phone" value={phone} onChange={(e) => setPhone(e.target.value)} className={`w-full px-3 py-2 text-sm bg-secondary/50 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${formErrors.phone ? 'border-destructive ring-destructive' : 'border-input'}`} placeholder="Tu número de teléfono"/>
                   {formErrors.phone && <p className="text-xs text-destructive mt-1 flex items-center"><AlertCircle size={14} className="mr-1"/>{formErrors.phone}</p>}
                 </div>
                 <div>
                  <label htmlFor="cart-notes" className="block text-xs font-medium text-muted-foreground mb-1 flex items-center">
                    <MessageSquare size={14} className="mr-1.5" />
                    Indicaciones Adicionales (Opcional)
                  </label>
                  <Textarea 
                    id="cart-notes" 
                    value={notes} 
                    onChange={(e) => setNotes(e.target.value)} 
                    className="w-full px-3 py-2 text-sm bg-secondary/50 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary min-h-[80px]" 
                    placeholder="Ej: Envolver para regalo, consultar disponibilidad de otro color..."
                  />
                 </div>
              </div>
            </ScrollArea>
            <SheetFooter className="p-6 bg-secondary/30 border-t border-border mt-auto">
              <SheetClose asChild>
                <Button variant="outline" className="w-full sm:w-auto">Seguir Explorando</Button>
              </SheetClose>
              <Button type="submit" className="w-full sm:w-auto">
                <Send size={16} className="mr-2" />
                Enviar Solicitud
              </Button>
            </SheetFooter>
          </form>
        )}
         {cart.length === 0 && (
            <SheetFooter className="p-6 bg-secondary/30 border-t border-border mt-auto">
                <SheetClose asChild>
                    <Button variant="outline" className="w-full">Seguir Explorando</Button>
                </SheetClose>
            </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
