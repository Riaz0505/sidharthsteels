import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { SITE_NAME, SERVICES } from "../../constants";
import logo from "../../assets/logoss.png";

export default function Footer() {
  return (
    <footer className="bg-steel-950 text-white pt-10 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center group">
              <div className="bg-white p-2 rounded-xl inline-block shadow-lg">
                <img 
                  src={logo} 
                  alt="Logo" 
                  className="h-12 md:h-24 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
                />
              </div>
            </Link>
            <p className="text-steel-400 text-sm leading-relaxed">
              Sidharth Steels is a premier trusted stainless steel dealer and stockist based in Chennai, serving as a key distribution hub for South India.
            </p>
            <div className="flex space-x-4">
              <Facebook size={18} className="text-steel-400 hover:text-primary cursor-pointer transition-colors" />
              <Twitter size={18} className="text-steel-400 hover:text-primary cursor-pointer transition-colors" />
              <Instagram size={18} className="text-steel-400 hover:text-primary cursor-pointer transition-colors" />
              <Linkedin size={18} className="text-steel-400 hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Navigations</h4>
            <ul className="space-y-4 text-steel-400 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-6">Our Products</h4>
            <ul className="space-y-4 text-steel-400 text-sm">
              {SERVICES.map(s => (
                <li key={s.id}>
                  <Link to={`/services?id=${s.id}`} className="hover:text-white transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6">Official Info</h4>
            <ul className="space-y-4 text-steel-400 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span>Chennai, Tamil Nadu, South India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="flex-shrink-0" />
                <a href="tel:+914422334455" className="hover:text-primary transition-colors">+91 44 2233 4455</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="flex-shrink-0" />
                <a href="mailto:info@sidharthsteel.com" className="hover:text-primary transition-colors">info@sidharthsteel.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-4 flex flex-col md:flex-row justify-between items-center gap-4 text-steel-500 text-xs">
          <p>© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
          <div className="flex space-x-6">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <span className="hover:text-white cursor-pointer">Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
