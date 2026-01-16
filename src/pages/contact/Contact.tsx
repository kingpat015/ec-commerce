import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  MessageSquare,
} from "lucide-react";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, send to backend
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-20 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center shadow-lg">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-6 tracking-tight">
            Get in <span className="font-semibold">Touch</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto font-light">
            Have questions about our packaging solutions? We'd love to hear from
            you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-gray-200">
            <h2 className="text-3xl font-light text-gray-900 mb-8">
              Send us a <span className="font-semibold">Message</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all text-gray-900"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all text-gray-900"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all text-gray-900"
                  placeholder="What is this regarding?"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all resize-none text-gray-900"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <button
                type="submit"
                className="w-full px-8 py-5 bg-gray-900 text-white rounded-2xl font-semibold hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>

              {submitted && (
                <div className="p-5 bg-green-50 border border-green-200 text-green-800 rounded-2xl flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium">
                    Thank you! Your message has been sent successfully.
                  </span>
                </div>
              )}
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-gray-200">
              <h3 className="text-3xl font-light text-gray-900 mb-8">
                Contact <span className="font-semibold">Information</span>
              </h3>
              <div className="space-y-8">
                <ContactInfo
                  icon={<Mail className="w-6 h-6" />}
                  title="Email"
                  value="info@exelpackcorp.com"
                  href="mailto:info@exelpackcorp.com"
                  color="green"
                />
                <ContactInfo
                  icon={<Phone className="w-6 h-6" />}
                  title="Phone"
                  value="(049) 502-0295"
                  href="tel:+63495020295"
                  color="red"
                />
                <ContactInfo
                  icon={<MapPin className="w-6 h-6" />}
                  title="Address"
                  value="Blk 2 Lot 2, Filinvest Technology Park, Ciudad de Calamba, Calamba City, Laguna"
                  href="https://www.google.com/maps/search/?api=1&query=Exelpack+Corporation+Block+2+Lot+2+Filinvest+Technology+Park+Ciudad+de+Calamba+Calamba+City+Laguna"
                  color="yellow"
                />
                <ContactInfo
                  icon={<Clock className="w-6 h-6" />}
                  title="Business Hours"
                  value="Monday - Friday: 8:00 AM - 5:00 PM"
                  color="green"
                />
              </div>
            </div>

            {/* Google Maps */}
            <div className="rounded-3xl overflow-hidden shadow-lg border border-gray-200">
              <div className="h-80">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3869.8!2d121.16!3d14.21!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDEyJzM2LjAiTiAxMjHCsDA5JzM2LjAiRQ!5e0!3m2!1sen!2sph!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Exelpack Corporation Location"
                ></iframe>
              </div>
            </div>

            {/* Help Center Card */}
            <div className="bg-gray-900 rounded-3xl p-10 text-white shadow-lg">
              <h4 className="font-light text-2xl mb-3">
                Need Quick <span className="font-semibold">Answers?</span>
              </h4>
              <p className="text-gray-300 mb-6 leading-relaxed font-light text-base">
                Browse our product catalog or check out our packaging solutions.
              </p>
              <Link
                to="/products"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                View Products
                <span className="text-xl">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactInfo: React.FC<{
  icon: React.ReactNode;
  title: string;
  value: string;
  href?: string;
  color: "green" | "red" | "yellow";
}> = ({ icon, title, value, href, color }) => {
  const colorClasses = {
    green: "text-green-600",
    red: "text-red-600",
    yellow: "text-yellow-600",
  };

  const content = (
    <div className="flex items-start gap-5 group">
      <div
        className={`flex-shrink-0 ${colorClasses[color]} group-hover:scale-110 transition-transform duration-300`}
      >
        {icon}
      </div>
      <div className="flex-1">
        <p className="font-bold text-gray-900 mb-2 text-base">{title}</p>
        <p
          className={`text-gray-700 leading-relaxed text-base ${
            href
              ? "group-hover:text-gray-900 transition-colors font-medium"
              : ""
          }`}
        >
          {value}
        </p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {content}
      </a>
    );
  }

  return content;
};

export default Contact;
