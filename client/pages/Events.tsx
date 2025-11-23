import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Calendar, MapPin, Users, Clock, Star, Image, Phone, Mail, ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  location: string;
  type: string;
  image?: string;
  color: string;
  time: string;
  organizer: string;
  contact: string;
  phone?: string;
  capacity?: string;
  registration?: string;
  details: string;
  highlights: string[];
  requirements?: string;
}

export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  // Fallback events in case API fails
  const fallbackEvents: Event[] = [
    {
      id: "campus-tour",
      name: "Campus Tour",
      description: "Guided tour of the university campus for new students",
      date: "Throughout the semester",
      location: "Campus-wide",
      type: "Orientation",
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop",
      color: "from-igsa-blue to-igsa-green",
      time: "2:00 PM - 4:00 PM",
      organizer: "IGSA Orientation Team",
      contact: "orientation@psuigsa.org",
      phone: "+1 (814) 555-0123",
      capacity: "50 students",
      registration: "https://forms.psuigsa.org/campus-tour",
      details: "Join us for a comprehensive campus tour designed specifically for new international graduate students. Our experienced student volunteers will guide you through key locations including academic buildings, libraries, dining facilities, recreational centers, and important administrative offices. This tour is essential for getting familiar with the campus layout and will include insider tips about student life at Penn State.",
      highlights: [
        "Visit all major academic buildings and libraries",
        "Tour student recreation facilities and dining options", 
        "Meet current international graduate students",
        "Learn about campus resources and support services",
        "Get insider tips about navigating campus life"
      ],
      requirements: "Comfortable walking shoes recommended"
    },
  ];

  useEffect(() => {
    const loadEvents = async () => {
      try {
        // Fetch manifest file from static content folder
        const manifestResponse = await fetch('/content/events/manifest.json');
        
        if (!manifestResponse.ok) {
          console.warn('Could not load manifest, using fallback events');
          setEvents(fallbackEvents);
          setLoading(false);
          return;
        }
        
        const eventFiles: string[] = await manifestResponse.json();
        
        // Fetch each markdown file
        const eventPromises = eventFiles
          .filter(file => file.endsWith('.md'))
          .map(async (filename) => {
            try {
              const url = `/content/events/${filename}`;
              const contentResponse = await fetch(url);
              const markdown = await contentResponse.text();
              
              // Parse frontmatter
              const match = markdown.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
              if (!match) return null;
              
              const frontmatterStr = match[1];
              const content = match[2];
              const frontmatter: any = {};
              
              frontmatterStr.split('\n').forEach(line => {
                if (!line || !line.trim()) return;
                const colonIndex = line.indexOf(':');
                if (colonIndex === -1) return;
                
                const key = line.substring(0, colonIndex).trim();
                let value: any = line.substring(colonIndex + 1).trim();
                
                // Skip if value is not a string
                if (typeof value !== 'string') return;
                
                // Parse YAML values
                if (value === 'true') {
                  value = true;
                } else if (value === 'false') {
                  value = false;
                } else if (!isNaN(Number(value)) && value !== '') {
                  value = Number(value);
                } else if (value.startsWith('[') && value.endsWith(']')) {
                  try {
                    value = JSON.parse(value.replace(/'/g, '"'));
                  } catch {
                    // Keep as string if parse fails
                  }
                } else if (value.startsWith('"') && value.endsWith('"')) {
                  value = value.slice(1, -1);
                }
                
                frontmatter[key] = value;
              });
              
              return {
                id: filename.replace('.md', ''),
                details: content,
                highlights: [], // Default empty array
                ...frontmatter
              };
            } catch (error) {
              console.error(`Error loading event ${filename}:`, error);
              return null;
            }
          });
        
        const loadedEvents = (await Promise.all(eventPromises))
          .filter((e): e is Event => e !== null && e.published !== false)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        
        console.log('Loaded events from GitHub:', loadedEvents);
        setEvents(loadedEvents.length > 0 ? loadedEvents : fallbackEvents);
      } catch (error) {
        console.error("Error loading events:", error);
        setEvents(fallbackEvents);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  const selectedEventData = events.find((e) => e.id === selectedEvent);

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
              <button
                key={index}
                onClick={() => setSelectedEvent(event.id)}
                className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden text-left w-full"
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
              </button>
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

      {/* Event Details Modal */}
      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedEvent && (() => {
            const event = events.find(e => e.id === selectedEvent);
            if (!event) return null;

            return (
              <>
                <DialogHeader>
                  <div className="flex items-start space-x-4 mb-4">
                    <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${event.color} flex items-center justify-center flex-shrink-0`}>
                      <Calendar className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <DialogTitle className="text-2xl font-bold text-gray-900 mb-2">
                        {event.name}
                      </DialogTitle>
                      <DialogDescription className="text-lg text-gray-600">
                        {event.description}
                      </DialogDescription>
                    </div>
                  </div>
                </DialogHeader>

                {/* Event Image */}
                <div className="relative h-48 rounded-lg overflow-hidden mb-6">
                  <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r ${event.color} opacity-30`}></div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                      {event.type}
                    </span>
                  </div>
                </div>

                {/* Event Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-igsa-saffron" />
                      <div>
                        <p className="font-semibold text-gray-900">Date</p>
                        <p className="text-gray-600">{event.date}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-igsa-blue" />
                      <div>
                        <p className="font-semibold text-gray-900">Time</p>
                        <p className="text-gray-600">{event.time}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-igsa-green" />
                      <div>
                        <p className="font-semibold text-gray-900">Location</p>
                        <p className="text-gray-600">{event.location}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-igsa-orange" />
                      <div>
                        <p className="font-semibold text-gray-900">Capacity</p>
                        <p className="text-gray-600">{event.capacity}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-igsa-saffron" />
                      <div>
                        <p className="font-semibold text-gray-900">Contact</p>
                        <p className="text-gray-600">{event.contact}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-igsa-blue" />
                      <div>
                        <p className="font-semibold text-gray-900">Phone</p>
                        <p className="text-gray-600">{event.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Event Description */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">About This Event</h4>
                  <p className="text-gray-600 leading-relaxed">{event.details}</p>
                </div>

                {/* Event Highlights */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Event Highlights</h4>
                  <ul className="space-y-2">
                    {event.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-igsa-saffron rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Requirements */}
                {event.requirements && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Requirements</h4>
                    <div className="bg-igsa-blue/5 border-l-4 border-igsa-blue p-4 rounded-r-lg">
                      <p className="text-gray-700">{event.requirements}</p>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                  <a
                    href={event.registration}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center bg-gradient-to-r from-igsa-saffron to-igsa-orange text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Register Now
                  </a>
                  <a
                    href={`mailto:${event.contact}?subject=Inquiry about ${event.name}`}
                    className="flex items-center justify-center border-2 border-igsa-blue text-igsa-blue px-6 py-3 rounded-lg font-semibold hover:bg-igsa-blue hover:text-white transition-colors"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Contact Organizer
                  </a>
                </div>
              </>
            );
          })()}
        </DialogContent>
      </Dialog>
    </div>
  );
}
