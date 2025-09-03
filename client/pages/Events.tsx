import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Calendar, MapPin, Users, Clock, Star, Image } from "lucide-react";

export default function Events() {
  const events = [
    {
      id: "campus-tour",
      name: "Campus Tour",
      description: "Guided tour of the university campus for new students",
      date: "Throughout the semester",
      location: "Campus-wide",
      type: "Orientation",
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop",
      color: "from-igsa-blue to-igsa-green"
    },
    {
      id: "fall-mixer",
      name: "Fall Mixer",
      description: "Welcome event to meet fellow Indian graduate students",
      date: "September 2024",
      location: "Student Union",
      type: "Social",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop",
      color: "from-igsa-saffron to-igsa-orange"
    },
    {
      id: "durga-puja",
      name: "Durga Puja",
      description: "Traditional Bengali festival celebrating Goddess Durga",
      date: "October 2024",
      location: "Community Center",
      type: "Cultural",
      image: "https://images.unsplash.com/photo-1605538883669-825200433431?w=400&h=300&fit=crop",
      color: "from-igsa-green to-igsa-blue"
    },
    {
      id: "diwali-mela",
      name: "Diwali Mela",
      description: "Festival of lights celebration with food, music, and festivities",
      date: "November 2024",
      location: "HUB Lawn",
      type: "Cultural",
      image: "https://images.unsplash.com/photo-1605793142928-ad954685d2e7?w=400&h=300&fit=crop",
      color: "from-igsa-saffron to-igsa-gold"
    },
    {
      id: "pongal",
      name: "Pongal",
      description: "South Indian harvest festival celebration",
      date: "January 2025",
      location: "Cultural Center",
      type: "Cultural",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      color: "from-igsa-orange to-igsa-saffron"
    },
    {
      id: "jashn",
      name: "Jashn",
      description: "Annual cultural extravaganza showcasing Indian arts and talents",
      date: "April 2025",
      location: "Eisenhower Auditorium",
      type: "Cultural",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
      color: "from-igsa-blue to-igsa-green"
    }
  ];

  const eventTypes = [
    { name: "All Events", count: events.length, color: "bg-gray-100 text-gray-700" },
    { name: "Cultural", count: events.filter(e => e.type === "Cultural").length, color: "bg-igsa-saffron/10 text-igsa-saffron" },
    { name: "Social", count: events.filter(e => e.type === "Social").length, color: "bg-igsa-blue/10 text-igsa-blue" },
    { name: "Orientation", count: events.filter(e => e.type === "Orientation").length, color: "bg-igsa-green/10 text-igsa-green" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-igsa-saffron/10 to-igsa-orange/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              IGSA <span className="text-igsa-saffron">Events</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join us in celebrating culture, building connections, and creating unforgettable memories
            </p>
          </div>
        </div>
      </section>

      {/* Event Categories */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {eventTypes.map((type, index) => (
              <div
                key={index}
                className={`px-4 py-2 rounded-full ${type.color} font-medium cursor-pointer hover:shadow-md transition-shadow`}
              >
                {type.name} ({type.count})
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <Link
                key={index}
                to={`/about#event-${event.id}`}
                className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden"
              >
                {/* Event Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${event.color} opacity-80`}></div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                      {event.type}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <div className="bg-white/90 p-2 rounded-full">
                      <Image className="w-5 h-5 text-gray-700" />
                    </div>
                  </div>
                </div>

                {/* Event Details */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-igsa-saffron transition-colors">
                    {event.name}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                    {event.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-2 text-igsa-saffron" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="w-4 h-4 mr-2 text-igsa-blue" />
                      {event.location}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-igsa-saffron font-medium">
                      <Star className="w-4 h-4 mr-1" />
                      View Gallery
                    </div>
                    <div className="text-gray-400">
                      <Users className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-igsa-blue/5 to-igsa-green/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Stay Updated</h2>
          <p className="text-xl text-gray-600 mb-8">
            Don't miss out on our upcoming events and cultural celebrations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-igsa-saffron to-igsa-orange text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-shadow">
              Join Our Newsletter
            </button>
            <button className="border-2 border-igsa-blue text-igsa-blue px-8 py-3 rounded-full font-semibold hover:bg-igsa-blue hover:text-white transition-colors">
              Follow on Social Media
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
