import React from "react";
import { Link } from "react-router-dom";

const About: React.FC = () => {
  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: "'Roboto', 'Open Sans', sans-serif" }}
    >
      {/* Hero Section with Image */}
      <section className="relative h-[50vh] overflow-hidden -mt-4">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/85 via-green-900/70 to-gray-800/85 z-10" />
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80"
          alt="Exelpack Facility"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center text-white max-w-3xl px-6">
            <div className="inline-block px-4 py-1 bg-green-600/30 backdrop-blur-sm border border-green-400/30 rounded-full mb-6">
              <p className="text-xs tracking-wider uppercase text-green-300 font-semibold">
                About Us
              </p>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              The New Way to Progress
            </h1>
            <p className="text-base md:text-lg text-gray-200">
              Leading packaging innovation since 2005
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview with Image */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Image */}
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=800&q=80"
                alt="Exelpack Corporation"
                className="w-full h-96 object-cover rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-green-600/10 rounded-full blur-3xl"></div>
            </div>

            {/* Content */}
            <div>
              <div className="inline-block px-4 py-1 bg-green-100 text-green-700 rounded-full mb-4">
                <span className="text-xs font-semibold tracking-wider uppercase">
                  Who We Are
                </span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Exelpack Corporation
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p className="text-justify">
                  Established in September 2005, Exelpack Corporation has grown
                  to become a trusted name in the packaging industry. Our
                  state-of-the-art facility spans 3,700 square meters at the
                  PEZA Zone at Filinvest Technology Park, Ciudad de Calamba,
                  Laguna, strategically positioned to serve both local and
                  international clients with efficiency and reliability.
                </p>
                <p className="text-justify">
                  We specialize in the design and fabrication of polymer foams
                  and the conversion of corrugated boxes, providing customized
                  packaging solutions that meet the exacting standards of
                  various industries. As an ISO 9001:2015 certified company, we
                  uphold the highest standards in quality management, ensuring
                  that every product we deliver meets strict industry
                  requirements.
                </p>
                <p className="text-justify">
                  At Exelpack Corporation, we go beyond fabrication—we provide
                  total packaging solutions that protect, promote, and add value
                  to every product. Our dedication to innovation, quality, and
                  sustainability drives us to be a trusted partner for
                  businesses across diverse industries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision - Side by Side */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Mission */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Our Mission
                </h3>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <p className="text-gray-700 leading-relaxed text-justify">
                  Our mission is to deliver innovative and sustainable packaging
                  solutions that meet the highest standards of quality. We are
                  committed to on-time delivery, competitive pricing, and
                  building lasting partnerships with our customers through
                  reliability, integrity, and continuous improvement. We empower
                  our employees as key contributors to our success by fostering
                  a culture of collaboration, growth, and shared responsibility.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <p className="text-gray-700 leading-relaxed text-justify">
                  To be the most trusted packaging partner in the
                  country—delivering world-class quality, sustainable
                  innovation, and exceptional value. We aim to lead the industry
                  through operational excellence, strong customer relationships,
                  and a people-driven culture that ensures long-term growth for
                  our stakeholders.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 20th Anniversary Section with Building Image */}
      <section className="py-16 relative overflow-hidden">
        {/* Background Image with Green Overlay */}
        <div className="absolute inset-0">
          <img
            src="https://scontent.fmnl9-3.fna.fbcdn.net/v/t39.30808-6/274549881_5009990132381883_7283827719346864774_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeHWJ8vLxLYQF3VvRjkqGXPUF8kYqPXNQT0XyRio9c1BPZmTvPYXxTGJQz5YQ8yZFXOY5J0S5d5qW5gFJH0aHxJ9&_nc_ohc=8wPqGvZ5Y_kQ7kNvgGZyB0v&_nc_zt=23&_nc_ht=scontent.fmnl9-3.fna&_nc_gid=AcLYz5vJGDlwSPOqoJ3TZLw&oh=00_AYBRdCf_j5n0vYGJpxCEQlZJmFLDVBD5_j0ZT5LKxJUwZw&oe=678C0B3A"
            alt="Exelpack Corporation Building"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src =
                "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80";
            }}
          />
          <div className="absolute inset-0 bg-green-600/85"></div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-3xl mx-auto text-white">
            <div className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <span className="text-xs tracking-wider uppercase font-semibold">
                Milestone
              </span>
            </div>
            <h2 className="text-4xl font-bold mb-6">20th Anniversary</h2>
            <p className="text-lg text-green-50 leading-relaxed text-justify">
              Two decades of excellence in packaging solutions. From our humble
              beginnings in 2005 to becoming an industry leader, we've
              continuously evolved to meet the changing needs of our clients
              while maintaining our commitment to quality, innovation, and
              customer satisfaction.
            </p>
          </div>
        </div>
      </section>

      {/* Company Video Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block px-4 py-1 bg-green-100 text-green-700 rounded-full mb-4">
                <span className="text-xs font-semibold tracking-wider uppercase">
                  Our Story
                </span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                See Exelpack in Action
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover our state-of-the-art facility, innovative processes,
                and dedicated team committed to delivering excellence
              </p>
            </div>

            {/* Video Container with Decorative Frame */}
            <div className="relative">
              {/* Decorative background elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-green-200/30 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-yellow-200/30 rounded-full blur-2xl"></div>

              {/* Main frame container */}
              <div className="relative bg-gradient-to-br from-green-100 via-white to-yellow-100 p-2 rounded-3xl">
                {/* Inner frame with shadow */}
                <div className="relative bg-white p-3 rounded-2xl shadow-xl">
                  {/* Video with rounded corners */}
                  <div className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-white">
                    <div className="aspect-video">
                      <iframe
                        className="w-full h-full"
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                        title="Exelpack Corporation Company Video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>

                  {/* Decorative corner accents */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-green-600 rounded-tl-2xl"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-green-600 rounded-tr-2xl"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-yellow-500 rounded-bl-2xl"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-yellow-500 rounded-br-2xl"></div>
                </div>
              </div>
            </div>

            {/* Video Caption */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500 italic">
                Experience our journey of innovation and excellence in packaging
                solutions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block px-4 py-1 bg-green-100 text-green-700 rounded-full mb-4">
                <span className="text-xs font-semibold tracking-wider uppercase">
                  Our Advantages
                </span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Choose Us?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We combine expertise, quality, and innovation to deliver
                packaging solutions that exceed expectations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-xl border border-green-100 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white text-xl font-bold">1</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  What can we do to protect your valuable products?
                </h3>
                <p className="text-sm text-gray-600 text-justify">
                  Custom-designed packaging solutions tailored to your specific
                  product protection needs
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border border-blue-100 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white text-xl font-bold">2</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Do you possess state-of-the-art machineries for packaging?
                </h3>
                <p className="text-sm text-gray-600 text-justify">
                  Advanced equipment and technology ensuring precision and
                  quality in every package
                </p>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-white p-6 rounded-xl border border-yellow-100 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white text-xl font-bold">3</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Does your team have enough expertise?
                </h3>
                <p className="text-sm text-gray-600 text-justify">
                  Skilled professionals with years of experience in packaging
                  design and production
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl border border-purple-100 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white text-xl font-bold">4</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Do you have trained technical people?
                </h3>
                <p className="text-sm text-gray-600 text-justify">
                  Certified technicians ensuring quality control and technical
                  excellence
                </p>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-white p-6 rounded-xl border border-red-100 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white text-xl font-bold">5</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Do you have a factory for your packaging?
                </h3>
                <p className="text-sm text-gray-600 text-justify">
                  3,700 sqm facility at Filinvest Technology Park equipped for
                  large-scale production
                </p>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-white p-6 rounded-xl border border-teal-100 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white text-xl font-bold">6</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Are you an ISO/TS certified company?
                </h3>
                <p className="text-sm text-gray-600 text-justify">
                  ISO 9001:2015 certified, ensuring international quality
                  management standards
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-12 text-center border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Ready to Work Together?
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Let's discuss how we can provide the perfect packaging solution
                for your business needs
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link
                  to="/products"
                  className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all hover:shadow-lg hover:-translate-y-0.5"
                >
                  View Products
                </Link>
                <Link
                  to="/contact"
                  className="px-8 py-3 border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-semibold rounded-lg transition-all"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
