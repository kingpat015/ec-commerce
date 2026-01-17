import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Mail,
  Phone,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";

const Footer: React.FC = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Intersection Observer for scroll animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    // Observe all animatable elements
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll(".footer-animate");
      elements.forEach((el) => {
        if (observerRef.current) {
          observerRef.current.observe(el);
        }
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-gray-300">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .footer-animate {
          opacity: 0;
          transform: translateY(30px);
        }

        .footer-animate.animate-in {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>

      <div className="container mx-auto px-4 py-12">
        {/* Trust Badge Section */}
        <div className="footer-animate mb-12 bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-2xl p-6 border border-slate-700">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-cyan-400">20+</div>
              <div className="text-xs text-gray-400 uppercase tracking-wide">
                Years Experience
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-cyan-400">3,700</div>
              <div className="text-xs text-gray-400 uppercase tracking-wide">
                Square Meters Facility
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-cyan-400">100+</div>
              <div className="text-xs text-gray-400 uppercase tracking-wide">
                Satisfied Clients
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-cyan-400">ISO</div>
              <div className="text-xs text-gray-400 uppercase tracking-wide">
                Certified Quality
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-10">
          {/* Company Info */}
          <div className="md:col-span-1 footer-animate">
            <div className="mb-4">
              <h3 className="text-white text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Exelpack
              </h3>
              <p className="text-xs text-gray-500 mt-1">Corporation</p>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Your trusted partner for quality products and exceptional service
              since 2005.
            </p>

            {/* Social Media */}
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-blue-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-pink-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-blue-500 flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-sky-500 flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-animate" style={{ animationDelay: "0.1s" }}>
            <h4 className="text-white text-sm font-bold mb-4 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-cyan-400 transition-colors text-sm flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-px bg-cyan-400 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-cyan-400 transition-colors text-sm flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-px bg-cyan-400 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-gray-400 hover:text-cyan-400 transition-colors text-sm flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-px bg-cyan-400 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/bulletin"
                  className="text-gray-400 hover:text-cyan-400 transition-colors text-sm flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-px bg-cyan-400 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                  Bulletin
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Products */}
          <div className="footer-animate" style={{ animationDelay: "0.2s" }}>
            <h4 className="text-white text-sm font-bold mb-4 uppercase tracking-wider">
              Our Products
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-cyan-400 transition-colors text-sm flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-px bg-cyan-400 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                  Polymer Foams
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-cyan-400 transition-colors text-sm flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-px bg-cyan-400 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                  Packaging Solutions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-cyan-400 transition-colors text-sm flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-px bg-cyan-400 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                  Custom Designs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-cyan-400 transition-colors text-sm flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-px bg-cyan-400 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                  Industrial Supplies
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="footer-animate" style={{ animationDelay: "0.3s" }}>
            <h4 className="text-white text-sm font-bold mb-4 uppercase tracking-wider">
              Support
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-cyan-400 transition-colors text-sm flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-px bg-cyan-400 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                  Contact Us
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-cyan-400 transition-colors text-sm flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-px bg-cyan-400 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-cyan-400 transition-colors text-sm flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-px bg-cyan-400 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-cyan-400 transition-colors text-sm flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-px bg-cyan-400 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-animate" style={{ animationDelay: "0.4s" }}>
            <h4 className="text-white text-sm font-bold mb-4 uppercase tracking-wider">
              Get In Touch
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 group">
                <div className="w-9 h-9 rounded-lg bg-slate-800 group-hover:bg-cyan-600 flex items-center justify-center flex-shrink-0 transition-all duration-300">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">Email</span>
                  <a
                    href="mailto:info@exelpackcorp.com"
                    className="text-sm text-gray-300 hover:text-cyan-400 transition-colors"
                  >
                    info@exelpackcorp.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-9 h-9 rounded-lg bg-slate-800 group-hover:bg-cyan-600 flex items-center justify-center flex-shrink-0 transition-all duration-300">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">Phone</span>
                  <a
                    href="tel:+63495454321"
                    className="text-sm text-gray-300 hover:text-cyan-400 transition-colors"
                  >
                    (049) 545-4321
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-9 h-9 rounded-lg bg-slate-800 group-hover:bg-cyan-600 flex items-center justify-center flex-shrink-0 transition-all duration-300">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">Location</span>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Exelpack+Corporation+Block+2+Lot+2+Filinvest+Technology+Park+Ciudad+de+Calamba+Calamba+City+Laguna"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-300 hover:text-cyan-400 transition-colors leading-tight"
                  >
                    Blk 2 Lot 2, Filinvest Technology Park,
                    <br />
                    Ciudad de Calamba, Calamba City,
                    <br />
                    Laguna 4027, Philippines
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8">
          {/* Certifications & Partners */}
          <div
            className="footer-animate mb-6 flex flex-wrap items-center justify-center gap-6 pb-6 border-b border-slate-800"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="text-xs text-gray-500 flex items-center gap-2">
              <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
              PEZA Zone Located
            </div>
            <div className="text-xs text-gray-500 flex items-center gap-2">
              <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
              Established 2005
            </div>
            <div className="text-xs text-gray-500 flex items-center gap-2">
              <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
              Local & International Clients
            </div>
            <div className="text-xs text-gray-500 flex items-center gap-2">
              <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
              Quality Certified
            </div>
          </div>

          <div
            className="footer-animate flex flex-col md:flex-row justify-between items-center gap-4"
            style={{ animationDelay: "0.6s" }}
          >
            <p className="text-sm text-gray-500">
              &copy; 2026{" "}
              <span className="text-gray-400 font-semibold">
                Exelpack Corporation
              </span>
              . All rights reserved.
            </p>
            <div className="flex gap-6 text-xs text-gray-500">
              <a href="#" className="hover:text-cyan-400 transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-cyan-400 transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-cyan-400 transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
