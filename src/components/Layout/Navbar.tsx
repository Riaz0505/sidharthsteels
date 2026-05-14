import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Mail, ArrowRight, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SERVICES } from "../../constants";
import { cn } from "../../lib/utils";
import logo from "../../assets/logoss.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services", hasDropdown: true },
    { name: "Blog", path: "/blog" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 w-full z-[100] transition-all duration-300",
          isScrolled ? "bg-white shadow-lg py-2" : "bg-white/95 backdrop-blur-sm border-b border-steel-100 py-3"
        )}
      >
        <div className="container-custom">
          <div className="flex justify-between items-center px-4 md:px-6">
            <Link to="/" className="flex items-center group py-1">
              <img 
                src={logo} 
                alt="Logo" 
                className="h-16 md:h-24 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
              />
            </Link>
  
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <div 
                  key={link.name} 
                  className="relative group"
                  onMouseEnter={() => link.hasDropdown && setIsServicesOpen(true)}
                  onMouseLeave={() => link.hasDropdown && setIsServicesOpen(false)}
                >
                  <Link
                    to={link.path}
                    className={cn(
                      "text-[10px] font-bold uppercase tracking-[0.1em] transition-all flex items-center gap-1 py-2",
                      location.pathname === link.path 
                        ? "text-primary"
                        : "text-steel-500 hover:text-primary"
                    )}
                  >
                    {link.name}
                    {link.hasDropdown && <ChevronDown size={12} className={cn("transition-transform", isServicesOpen && "rotate-180")} />}
                  </Link>
  
                  {link.hasDropdown && (
                    <AnimatePresence>
                      {isServicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full left-0 w-64 bg-white shadow-2xl rounded-xl border border-steel-100 py-4 z-[70] overflow-hidden"
                        >
                          {SERVICES.map((service) => (
                            <Link
                              key={service.id}
                              to={`/services#${service.id}`}
                              className="block px-6 py-3 text-[10px] font-bold text-steel-700 hover:text-primary hover:bg-steel-50 transition-colors uppercase tracking-widest border-l-2 border-transparent hover:border-primary"
                            >
                              {service.title}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
              <a
                href="tel:+914422334455"
                className={cn(
                  "px-6 py-2.5 bg-primary text-white text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all hover:scale-105 shadow-lg shadow-primary/20",
                )}
              >
                Get Quote
              </a>
            </div>
  
            {/* Mobile Menu Toggle */}
            <button
              className={cn(
                "md:hidden p-3 rounded-xl transition-all shadow-sm z-[70]",
                isScrolled 
                  ? "bg-steel-50 text-steel-950 border border-steel-100" 
                  : "bg-white text-steel-950 border border-steel-100 shadow-md"
              )}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={24} className="text-primary" /> : <Menu size={24} className="text-primary" />}
            </button>
          </div>
        </div>
      </nav>
  
      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="fixed inset-0 bg-black/60 z-[110] md:hidden backdrop-blur-sm"
               onClick={() => setIsOpen(false)}
            />
            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 right-0 w-full xs:w-[85%] max-w-sm bg-white shadow-2xl z-[120] md:hidden flex flex-col"
            >
              <div className="p-4 border-b border-steel-100 flex justify-between items-center bg-white sticky top-0 z-10">
                <div className="py-2">
                   <img src={logo} alt="Logo" className="h-16 w-auto object-contain" />
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-3 text-primary hover:bg-brand-red-50 transition-colors bg-steel-50 rounded-xl shadow-sm"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="flex-grow flex flex-col p-6 space-y-1 overflow-y-auto bg-white">
                {navLinks.map((link) => (
                  <div key={link.name} className="flex flex-col">
                    {link.hasDropdown ? (
                      <>
                        <button
                          onClick={() => setIsServicesOpen(!isServicesOpen)}
                          className={cn(
                            "text-base font-bold py-5 px-3 flex justify-between items-center border-b border-steel-50 transition-colors w-full",
                            isServicesOpen ? "text-primary" : "text-steel-950"
                          )}
                        >
                          {link.name}
                          <ChevronDown size={18} className={cn("transition-transform text-primary", isServicesOpen && "rotate-180")} />
                        </button>
                        <AnimatePresence>
                          {isServicesOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="bg-steel-50/80 rounded-2xl overflow-hidden my-2"
                            >
                              <div className="p-4 space-y-2">
                                {SERVICES.map(s => (
                                  <Link 
                                    key={s.id}
                                    to={`/services?id=${s.id}`}
                                    onClick={() => setIsOpen(false)}
                                    className="block py-4 px-3 text-[11px] font-bold text-steel-600 uppercase tracking-widest border-b border-steel-100 last:border-none hover:text-primary transition-colors"
                                  >
                                    • {s.title}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "text-base font-bold py-5 px-3 flex justify-between items-center border-b border-steel-50 transition-colors",
                          location.pathname === link.path ? "text-primary bg-brand-red-50/50 rounded-2xl border-none" : "text-steel-950"
                        )}
                      >
                        {link.name}
                        <ArrowRight size={18} className={cn(
                          "transition-all",
                          location.pathname === link.path ? "text-primary translate-x-1" : "text-steel-200"
                        )} />
                      </Link>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="p-6 border-t border-steel-100 space-y-4 bg-white">
                <Link 
                  to="/contact" 
                  onClick={() => setIsOpen(false)}
                  className="w-full py-5 bg-primary text-white text-[11px] font-bold uppercase tracking-widest rounded-2xl text-center flex items-center justify-center gap-3 shadow-2xl shadow-primary/30"
                >
                  Get Custom Quote <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
