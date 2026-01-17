import React, { useState, useEffect, useRef } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import api from "../../services/api";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    subject: "",
    fullName: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Page transition effect
    setTimeout(() => setPageLoaded(true), 50);

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

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    // Observe all animatable elements
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll(".animate-on-scroll");
      elements.forEach((el) => {
        if (observerRef.current) {
          observerRef.current.observe(el);
        }
      });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.submitContactForm(formData);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ subject: "", fullName: "", email: "", message: "" });
      }, 3000);
    } catch (error) {
      console.error("Error submitting contact form:", error);
      alert("Failed to send message. Please try again.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div
      className={`min-h-screen bg-gray-50 transition-opacity duration-700 ${
        pageLoaded ? "opacity-100" : "opacity-0"
      }`}
      style={{ fontFamily: "'Roboto', 'Open Sans', sans-serif" }}
    >
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

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
        }

        .animate-on-scroll.animate-in {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .animate-left {
          opacity: 0;
          transform: translateX(-30px);
        }

        .animate-left.animate-in {
          animation: fadeInLeft 0.6s ease-out forwards;
        }

        .animate-right {
          opacity: 0;
          transform: translateX(30px);
        }

        .animate-right.animate-in {
          animation: fadeInRight 0.6s ease-out forwards;
        }
      `}</style>

      {/* Hero Section - ENLARGED */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1600&q=80"
            alt="Contact Us"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-green-900/85 to-gray-800/90"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="inline-block px-4 py-1 bg-green-600/30 backdrop-blur-sm border border-green-400/30 rounded-full mb-6">
              <span className="text-xs tracking-wider uppercase text-green-300 font-semibold">
                Contact Us
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Let's Start a Conversation
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
              Have questions about our packaging solutions? We're here to help
              you find the perfect solution for your business needs.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16 max-w-7xl">
        <div className="grid lg:grid-cols-5 gap-10">
          {/* Contact Form - Takes 3 columns */}
          <div className="lg:col-span-3">
            <div className="animate-on-scroll animate-left bg-white rounded-2xl p-8 shadow-sm border-2 border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Send Us a Message
              </h2>
              <p className="text-sm text-gray-500 mb-8">
                Fill out the form below and we'll respond as soon as possible
              </p>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What can we help you with?"
                    className="w-full px-4 py-2.5 text-sm bg-gray-50 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-2.5 text-sm bg-gray-50 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@company.com"
                      className="w-full px-4 py-2.5 text-sm bg-gray-50 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Tell us more about your inquiry..."
                    className="w-full px-4 py-2.5 text-sm bg-gray-50 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all resize-none"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition-all shadow-sm hover:shadow-md flex items-center gap-2 hover:-translate-y-0.5"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>

                {submitted && (
                  <div className="p-4 bg-green-50 border-2 border-green-200 text-green-700 rounded-lg flex items-center gap-3 animate-in">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm font-medium">
                      Thank you! We'll get back to you soon.
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Contact Information - Takes 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Get in Touch Card */}
            <div className="animate-on-scroll animate-right bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-6 text-white shadow-lg">
              <h3 className="text-lg font-bold mb-2">Get in Touch</h3>
              <p className="text-sm text-green-50 leading-relaxed">
                We're available and eager to connect, providing the assistance
                you need for your packaging solutions.
              </p>
            </div>

            {/* Our Office */}
            <div
              className="animate-on-scroll animate-right bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-200"
              style={{ animationDelay: "0.1s" }}
            >
              <h3 className="text-lg font-bold text-gray-900 mb-5">
                Our Office
              </h3>
              <div className="space-y-4">
                <ContactInfo
                  icon={<MapPin className="w-4 h-4" />}
                  label="Address"
                  value="Blk 2 Lot 2, Filinvest Technology Park, Ciudad de Calamba, Calamba City, Laguna"
                  href="https://www.google.com/maps/search/?api=1&query=Exelpack+Corporation+Block+2+Lot+2+Filinvest+Technology+Park+Ciudad+de+Calamba+Calamba+City+Laguna"
                />
                <ContactInfo
                  icon={<Phone className="w-4 h-4" />}
                  label="Phone"
                  value="(049) 502-0295"
                  href="tel:+63495020295"
                />
                <ContactInfo
                  icon={<Mail className="w-4 h-4" />}
                  label="Email"
                  value="info@exelpackcorp.com"
                  href="mailto:info@exelpackcorp.com"
                />
              </div>
            </div>

            {/* Google Map */}
            <div
              className="animate-on-scroll animate-right rounded-2xl overflow-hidden shadow-lg border-2 border-gray-200"
              style={{ animationDelay: "0.2s" }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3869.8!2d121.16!3d14.21!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDEyJzM2LjAiTiAxMjHCsDA5JzM2LjAiRQ!5e0!3m2!1sen!2sph!4v1234567890"
                width="100%"
                height="240"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Exelpack Corporation Location"
              ></iframe>
            </div>

            {/* Office Images */}
            <div
              className="animate-on-scroll animate-right grid grid-cols-3 gap-3"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="relative group overflow-hidden rounded-xl shadow-md border-2 border-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80"
                  alt="Office 1"
                  className="w-full h-24 object-cover transition-transform group-hover:scale-110 duration-500"
                />
              </div>
              <div className="relative group overflow-hidden rounded-xl shadow-md border-2 border-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&q=80"
                  alt="Office 2"
                  className="w-full h-24 object-cover transition-transform group-hover:scale-110 duration-500"
                />
              </div>
              <div className="relative group overflow-hidden rounded-xl shadow-md border-2 border-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=400&q=80"
                  alt="Office 3"
                  className="w-full h-24 object-cover transition-transform group-hover:scale-110 duration-500"
                />
              </div>
            </div>

            {/* Business Hours */}
            <div
              className="animate-on-scroll animate-right bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-200"
              style={{ animationDelay: "0.4s" }}
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Business Hours
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <div className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0 border-2 border-green-200">
                    <Clock className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      Monday - Friday
                    </p>
                    <p className="text-xs text-gray-500 font-medium">
                      8:00 AM - 5:00 PM
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0 border-2 border-gray-200">
                    <Clock className="w-4 h-4 text-gray-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      Saturday - Sunday
                    </p>
                    <p className="text-xs text-gray-500 font-medium">Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div
              className="animate-on-scroll animate-right bg-gray-100 rounded-2xl p-6 border-2 border-gray-200"
              style={{ animationDelay: "0.5s" }}
            >
              <h4 className="text-sm font-bold text-gray-900 mb-3">
                Need Quick Answers?
              </h4>
              <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                Explore our products or learn more about our company
              </p>
              <div className="flex gap-2">
                <a
                  href="/products"
                  className="flex items-center gap-1 px-4 py-2 bg-green-600 text-white rounded-lg text-xs font-semibold hover:bg-green-700 transition-all hover:-translate-y-0.5 shadow-sm"
                >
                  Products
                  <ArrowRight className="w-3 h-3" />
                </a>
                <a
                  href="/about"
                  className="flex items-center gap-1 px-4 py-2 bg-white text-gray-700 rounded-lg text-xs font-semibold hover:bg-gray-50 transition-all border-2 border-gray-200 hover:-translate-y-0.5"
                >
                  About Us
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactInfo: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}> = ({ icon, label, value, href }) => {
  const content = (
    <div className="flex items-start gap-3 group">
      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-green-600 group-hover:bg-green-200 transition-all border-2 border-green-200">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-0.5">
          {label}
        </p>
        <p className="text-sm text-gray-900 break-words font-medium">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block hover:opacity-90 transition-opacity"
      >
        {content}
      </a>
    );
  }

  return content;
};

export default Contact;
