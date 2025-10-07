import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Plane, Home, MapPin, ChevronRight, BookOpen, FileText, Users, MessageCircle, Bot } from "lucide-react";

export default function Resources() {
  const resourceCategories = [
    {
      title: "Pre Arrival",
      description: "Everything you need to know before coming to State College",
      icon: Plane,
      path: "/resources/pre-arrival",
      color: "from-igsa-saffron to-igsa-orange",
      textColor: "text-igsa-saffron",
      items: ["Visa Guidelines", "Housing Information", "Essential Documents", "Packing Checklist"]
    },
    {
      title: "Post Arrival",
      description: "Your first steps after arriving in State College",
      icon: Home,
      path: "/resources/post-arrival",
      color: "from-igsa-blue to-igsa-green",
      textColor: "text-igsa-blue",
      items: ["University Registration", "SSN Application", "Bank Account Setup", "Health Insurance"]
    },
    {
      title: "Living in State College",
      description: "Local tips and guides for daily life",
      icon: MapPin,
      path: "/resources/living-in-state-college",
      color: "from-igsa-green to-igsa-blue",
      textColor: "text-igsa-green",
      items: ["Transportation", "Grocery Stores", "Restaurants", "Local Services"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-igsa-blue/10 to-igsa-green/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="text-igsa-blue">Resources</span> & Guides
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive guides to help you navigate your journey from preparation to settling in State College
            </p>
          </div>
        </div>
      </section>

      {/* Main Resource Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {resourceCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Link
                  key={index}
                  to={category.path}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden"
                >
                  {/* Header with gradient */}
                  <div className={`h-32 bg-gradient-to-r ${category.color} flex items-center justify-center relative overflow-hidden`}>
                    <Icon className="w-16 h-16 text-white z-10" />
                    <div className="absolute top-4 right-4 w-24 h-24 bg-white/20 rounded-full"></div>
                    <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-white/10 rounded-full"></div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-igsa-saffron transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {category.description}
                    </p>

                    {/* Preview Items */}
                    <div className="space-y-2 mb-6">
                      {category.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center text-sm text-gray-500">
                          <div className="w-2 h-2 bg-igsa-saffron rounded-full mr-3"></div>
                          {item}
                        </div>
                      ))}
                    </div>

                    {/* Action Button */}
                    <div className={`flex items-center ${category.textColor} font-semibold group-hover:translate-x-2 transition-transform`}>
                      <span>Explore Guide</span>
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Additional Resources</h2>
            <p className="text-xl text-gray-600">Quick access to important information</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <BookOpen className="w-12 h-12 text-igsa-saffron mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Academic Resources</h3>
              <p className="text-gray-600 text-sm">University policies, academic calendar, and support services</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <FileText className="w-12 h-12 text-igsa-blue mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Important Forms</h3>
              <p className="text-gray-600 text-sm">Download essential forms and documents</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <Users className="w-12 h-12 text-igsa-green mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact Support</h3>
              <p className="text-gray-600 text-sm">Get in touch with IGSA volunteers for personalized help</p>
            </div>

            {/* New Forum Card */}
            <Link to="/forum" className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-1 group">
              <MessageCircle className="w-12 h-12 text-igsa-blue mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Community Forum</h3>
              <p className="text-gray-600 text-sm mb-4">Join discussions, ask questions, and connect with fellow international graduate students</p>
              <div className="flex items-center text-igsa-blue font-semibold group-hover:translate-x-2 transition-transform">
                <span>Join Forum</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </Link>

            {/* New AI Assistant Card */}
            <Link to="/forum" className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-1 group">
              <Bot className="w-12 h-12 text-igsa-saffron mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Assistant</h3>
              <p className="text-gray-600 text-sm mb-4">Get instant answers to questions about events, housing, visa, and student life</p>
              <div className="flex items-center text-igsa-saffron font-semibold group-hover:translate-x-2 transition-transform">
                <span>Chat Now</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
