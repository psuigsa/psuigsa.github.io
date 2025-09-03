import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Users, BookOpen, Calendar, MapPin, Heart, Star } from "lucide-react";
import Navigation from "@/components/Navigation";
import ParticleIndiaMap from "@/components/ParticleIndiaMap";
import InteractiveText from "@/components/InteractiveText";
import AutoFitText from "@/components/AutoFitText";

export default function Index() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: "Welcome to IGSA",
      subtitle: "Indian Graduate Student Association",
      description: "Building bridges, Creating connections, Celebrating culture",
      gradient: "from-igsa-saffron to-igsa-orange"
    },
    {
      title: "Celebrate Together",
      subtitle: "Festivals & Cultural Events",
      description: "Diwali, Durga Puja, Pongal, and more awaiting you",
      gradient: "from-igsa-blue to-igsa-green"
    },
    {
      title: "Support Network",
      subtitle: "Pre & Post Arrival Resources",
      description: "Everything you need for your journey in State College",
      gradient: "from-igsa-green to-igsa-blue"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: Users,
      title: "Community",
      description: "Connect with fellow Indian graduate students",
      color: "text-igsa-saffron"
    },
    {
      icon: BookOpen,
      title: "Resources",
      description: "Pre-arrival, post-arrival, and living guides",
      color: "text-igsa-blue"
    },
    {
      icon: Calendar,
      title: "Events",
      description: "Cultural festivals and networking opportunities",
      color: "text-igsa-green"
    },
    {
      icon: MapPin,
      title: "Location",
      description: "Everything about living in State College",
      color: "text-igsa-orange"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Interactive Particle India Map Background */}
        <ParticleIndiaMap />

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 pointer-events-none">
          <div className="transition-all duration-1000 ease-in-out">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 animate-fade-in">
              <div className="pointer-events-auto">
                <InteractiveText
                  text={heroSlides[currentSlide].title}
                  gradient={heroSlides[currentSlide].gradient}
                  className={`bg-gradient-to-r ${heroSlides[currentSlide].gradient} bg-clip-text text-transparent`}
                />
              </div>
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-700 mb-6 animate-slide-up">
              {heroSlides[currentSlide].subtitle}
            </h2>
            <p>
              <AutoFitText
                text={heroSlides[currentSlide].description}
                className="sm:text-base md:text-lg lg:text-xl leading-tight tracking-tight sm:whitespace-normal"
                minPx={9}
                maxPx={13}
              />
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up delay-400 pointer-events-auto">
            <Link
              to="/about"
              className="bg-gradient-to-r from-igsa-saffron to-igsa-orange text-white px-8 py-4 rounded-full font-semibold flex items-center gap-2 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
            >
              Learn About Us <ChevronRight className="w-5 h-5" />
            </Link>
            <Link
              to="/events"
              className="border-2 border-igsa-green text-igsa-green px-8 py-4 rounded-full font-semibold hover:bg-igsa-green hover:text-white transition-all duration-300"
            >
              Upcoming Events
            </Link>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center space-x-2 mt-8 pointer-events-auto">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-igsa-saffron scale-125' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-igsa-saffron rounded-full flex justify-center">
            <div className="w-1 h-3 bg-igsa-saffron rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Join IGSA?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're more than just a student organization - we're a family that supports, 
              celebrates, and grows together in State College.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="text-center p-6 rounded-xl bg-gradient-to-b from-white to-gray-50 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300"
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 mb-4`}>
                    <Icon className={`w-8 h-8 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-20 bg-gradient-to-r from-igsa-saffron/5 to-igsa-orange/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get Started</h2>
            <p className="text-xl text-gray-600">Everything you need is just a click away</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/resources" className="group">
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transform group-hover:-translate-y-2 transition-all duration-300">
                <div className="text-center">
                  <BookOpen className="w-12 h-12 text-igsa-blue mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Resources</h3>
                  <p className="text-gray-600 mb-6">Pre-arrival guides, post-arrival support, and living tips</p>
                  <div className="flex items-center justify-center text-igsa-blue font-semibold">
                    Explore Resources <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>

            <Link to="/events" className="group">
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transform group-hover:-translate-y-2 transition-all duration-300">
                <div className="text-center">
                  <Calendar className="w-12 h-12 text-igsa-green mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Events</h3>
                  <p className="text-gray-600 mb-6">Cultural festivals, mixers, and community gatherings</p>
                  <div className="flex items-center justify-center text-igsa-green font-semibold">
                    View Events <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>

            <Link to="/about" className="group">
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transform group-hover:-translate-y-2 transition-all duration-300">
                <div className="text-center">
                  <Users className="w-12 h-12 text-igsa-saffron mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">About Us</h3>
                  <p className="text-gray-600 mb-6">Learn about our mission, team, and community</p>
                  <div className="flex items-center justify-center text-igsa-saffron font-semibold">
                    About IGSA <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-igsa-saffron to-igsa-orange rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">I</span>
              </div>
              <span className="text-2xl font-bold">IGSA</span>
            </div>
            <p className="text-gray-400 mb-4">
              Indian Graduate Student Association - State College
            </p>
            <p className="text-gray-500 text-sm">
              Building community, celebrating culture, supporting success
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
