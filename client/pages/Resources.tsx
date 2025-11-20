import { Link } from "react-router-dom";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Plane, Home, MapPin, ChevronRight, BookOpen, Users, MessageCircle, Bot, X } from "lucide-react";

function JoinWhatsappCard() {
  const [open, setOpen] = useState(false);
  const mailto = encodeURI(
    'mailto:psu.igsa@gmail.com?subject=WhatsApp Group Joining Request&body= !! Please include your name and phone number.!! '
  );

  return (
    <>
      <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col justify-between">
        <div>
          <BookOpen className="w-12 h-12 text-igsa-blue mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Join WhatsApp Group</h3>
          <p className="text-gray-600 text-sm">Request the joining details for our WhatsApp group</p>
        </div>

        <div className="mt-6">
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center px-4 py-2 bg-igsa-blue text-white rounded-md font-semibold hover:bg-igsa-blue/90 transition-colors"
          >
            Join WhatsApp
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 p-6">
            <button
              aria-label="Close"
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-gray-900 mb-4">Join the IGSA WhatsApp Group</h3>
            <p className="text-gray-700 mb-4">Anyone who wishes to join the group should e-mail <a className="text-igsa-blue underline" href="mailto:psu.igsa@gmail.com">psu.igsa@gmail.com</a> from their Penn State address, using the subject “WhatsApp Group Joining Request”, and include their name and phone number. You will then receive the group joining details.</p>

            <details className="mb-4">
              <summary className="cursor-pointer text-igsa-blue font-semibold">How do I know my Penn State email?</summary>
              <div className="mt-2 text-sm text-gray-700">
                <p className="mb-2">Your Penn State email address is your Penn State username followed by <code className="bg-gray-100 px-1 py-0.5 rounded">@psu.edu</code>. The username is the one you use to log in to the Penn State application portal.</p>
                <p className="mb-2">For example: if your name is Tulsidas Khan your username will look like tsk1234, then tsk1234@psu.edu is your email address.</p>
                <p className="mb-2">Try signing in at <a className="text-igsa-blue underline" href="https://outlook.office.com" target="_blank" rel="noreferrer">Outlook</a> (or <a className="text-igsa-blue underline" href="https://portal.office.com" target="_blank" rel="noreferrer">portal.office.com</a>)</p>
                <ul className="list-disc list-inside text-gray-700">
                  <li><a className="text-igsa-blue underline" href="https://accounts.psu.edu" target="_blank" rel="noreferrer">Penn State Accounts</a></li>
                </ul>
              </div>
            </details>

            <div className="flex justify-end mt-6">
              <a href={mailto} className="inline-flex items-center px-4 py-2 bg-igsa-saffron text-white rounded-md font-semibold mr-3">Email Now</a>
              <button onClick={() => setOpen(false)} className="px-4 py-2 border border-gray-200 rounded-md">Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

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

            {/* Join WhatsApp Card (replaces Important Forms) */}
            <JoinWhatsappCard />

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
