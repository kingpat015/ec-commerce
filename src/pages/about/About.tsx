import React from "react";
import { Link } from "react-router-dom";
import {
  Package,
  Target,
  Eye,
  Award,
  Users,
  Lightbulb,
  CheckCircle,
  Factory,
} from "lucide-react";

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-20 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-24">
          <div className="inline-block mb-6">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
              <Package className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-6 tracking-tight">
            About <span className="font-semibold">Exelpack</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
            Leading provider of innovative packaging solutions since 2005
          </p>
        </div>

        {/* Company Story */}
        <section className="mb-32">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1 h-12 bg-green-600 rounded-full"></div>
                <h2 className="text-3xl font-light text-gray-900">Our Story</h2>
              </div>
            </div>
            <div className="space-y-8 text-lg text-gray-700 leading-relaxed font-light">
              <p>
                Established in September 2005, Exelpack Corporation has grown to
                become a trusted name in the packaging industry. Our
                state-of-the-art facility spans 3,700 square meters at the
                Filinvest Technology Park in Calamba City, Laguna, strategically
                positioned to serve major industrial hubs across the
                Philippines.
              </p>
              <p>
                We specialize in the design and fabrication of polymer foams and
                the conversion of corrugated boxes, providing customized
                packaging solutions that meet the exacting standards of various
                industries. In December 2010, we achieved ISO 9001:2008
                certification, demonstrating our commitment to quality
                management and continuous improvement.
              </p>
              <p>
                Today, we proudly serve leading companies in the electronics,
                semiconductors, food, and pharmaceutical sectors, delivering
                innovative packaging solutions that protect products while
                optimizing costs and sustainability.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mb-32">
          <div className="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto">
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-light text-gray-900">Mission</h3>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed font-light">
                To provide product innovation and design for all fields of
                manufacturing industries, delivering reasonably priced quality
                products on time. We believe that customer satisfaction is the
                cornerstone of a successful company.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-light text-gray-900">Vision</h3>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed font-light">
                To be the preferred packaging solutions partner for
                manufacturing industries across the Philippines, recognized for
                our commitment to quality, innovation, and exceptional customer
                service in every product we deliver.
              </p>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-4">
              Core <span className="font-semibold">Values</span>
            </h2>
            <p className="text-lg text-gray-600 font-light">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <ValueCard
              icon={<CheckCircle className="w-7 h-7" />}
              title="Quality Excellence"
              description="ISO 9001:2008 certified processes ensuring consistent, high-quality packaging solutions"
              color="green"
            />
            <ValueCard
              icon={<Users className="w-7 h-7" />}
              title="Customer Satisfaction"
              description="Building lasting relationships through reliable service and on-time delivery"
              color="red"
            />
            <ValueCard
              icon={<Lightbulb className="w-7 h-7" />}
              title="Innovation"
              description="Continuous product development and design solutions for evolving industry needs"
              color="yellow"
            />
            <ValueCard
              icon={<Award className="w-7 h-7" />}
              title="Reliability"
              description="Consistent quality and dependable partnerships you can count on"
              color="green"
            />
            <ValueCard
              icon={<Package className="w-7 h-7" />}
              title="Specialization"
              description="Expert knowledge in polymer foams and corrugated box conversion"
              color="red"
            />
            <ValueCard
              icon={<Factory className="w-7 h-7" />}
              title="Industry Focus"
              description="Tailored solutions for electronics, semiconductors, food, and pharmaceuticals"
              color="yellow"
            />
          </div>
        </section>

        {/* Industries We Serve */}
        <section className="mb-32">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light text-gray-900 mb-4">
                Industries <span className="font-semibold">We Serve</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-12">
              <IndustryCard
                title="Electronics & Semiconductors"
                description="Precision packaging solutions with ESD protection and custom foam inserts for sensitive electronic components"
                color="green"
              />
              <IndustryCard
                title="Food Industry"
                description="Food-grade packaging materials ensuring product safety and freshness during storage and transportation"
                color="red"
              />
              <IndustryCard
                title="Pharmaceutical"
                description="Compliant packaging solutions meeting stringent pharmaceutical industry standards and requirements"
                color="yellow"
              />
              <IndustryCard
                title="General Manufacturing"
                description="Custom-designed packaging for diverse manufacturing needs, from heavy machinery to delicate products"
                color="green"
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gray-900 rounded-3xl p-16">
            <h2 className="text-4xl font-light text-white mb-6">
              Join Our <span className="font-semibold">Team</span>
            </h2>
            <p className="text-xl text-gray-300 mb-10 font-light max-w-2xl mx-auto">
              We're always looking for talented individuals who share our
              commitment to excellence and innovation
            </p>
            <Link
              to="/bulletin?type=hiring"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Users className="w-5 h-5" />
              View Open Positions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const ValueCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  color: "green" | "red" | "yellow";
}> = ({ icon, title, description, color }) => {
  const colorClasses = {
    green: "text-green-600",
    red: "text-red-600",
    yellow: "text-yellow-600",
  };

  const bgClasses = {
    green: "bg-green-50 hover:bg-green-100",
    red: "bg-red-50 hover:bg-red-100",
    yellow: "bg-yellow-50 hover:bg-yellow-100",
  };

  return (
    <div
      className={`group p-8 rounded-2xl ${bgClasses[color]} transition-all duration-300`}
    >
      <div
        className={`${colorClasses[color]} mb-6 group-hover:scale-110 transition-transform duration-300`}
      >
        {icon}
      </div>
      <h4 className="text-xl font-medium text-gray-900 mb-3">{title}</h4>
      <p className="text-base text-gray-600 leading-relaxed font-light">
        {description}
      </p>
    </div>
  );
};

const IndustryCard: React.FC<{
  title: string;
  description: string;
  color: "green" | "red" | "yellow";
}> = ({ title, description, color }) => {
  const colorClasses = {
    green: "bg-green-600",
    red: "bg-red-600",
    yellow: "bg-yellow-500",
  };

  return (
    <div className="group">
      <div className="flex items-start gap-4 mb-4">
        <div
          className={`w-3 h-3 ${colorClasses[color]} rounded-full mt-2 group-hover:scale-125 transition-transform duration-300`}
        ></div>
        <h4 className="text-2xl font-light text-gray-900">{title}</h4>
      </div>
      <p className="text-lg text-gray-600 leading-relaxed font-light pl-7">
        {description}
      </p>
    </div>
  );
};

export default About;
