import Navigation from "@/components/Navigation";
import { Users, Target, Heart, Globe } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-igsa-saffron/10 to-igsa-orange/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              About <span className="text-igsa-saffron">IGSA</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The Indian Graduate Student Association is a vibrant community dedicated to 
              supporting Indian graduate students in their academic and cultural journey.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                To create a supportive and inclusive community for Indian graduate students, 
                fostering academic excellence, cultural celebration, and lifelong connections.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                We bridge the gap between home and your new academic journey, providing 
                resources, support, and a sense of belonging in State College.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Formed in the Spring of 2003, this student-run organization acts as a platform to 
                integrate Indian graduate students and post-doctoral scholars at Penn State representing 
                India and the Indian community. Our goal is to provide incoming Indian graduate students 
                and scholars the know-how of navigating the graduate/professional life in State College, 
                Pennsylvania and help smoothen their transition to a new place. We welcome current and incoming 
                Indian Graduate students into our organization.
              </p>
              <p className="text-lg text-gray-600">
                Main motivation behind the formation of IGSA is to create a platform for Indian graduate students 
                and research scholars to connect with each other and have a sense of belongingness in a foreign land. 
                Occassionally, we also hold events to celebrate the rich and diverse Indian culture and encourage 
                participation from all members of the Indian community and friends from other nationalities. 
                Our events are aimed to introduce and showcase the Indian culture to American and International 
                Communities at Penn State.  We, as an organization, encourage and collaborate with other communities 
                and groups at University Park, such as the Indian Culture and Language Club, Penn State Vedic Society, 
                Hindu Student Council, Association of India's Development, Penn State JaDhoom, Natya, Penn State Cricket Club among others.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <Users className="w-12 h-12 text-igsa-saffron mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Community</h3>
                <p className="text-gray-600 text-sm">Building lasting friendships</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <Target className="w-12 h-12 text-igsa-blue mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Academic</h3>
                <p className="text-gray-600 text-sm">Supporting your success</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <Heart className="w-12 h-12 text-igsa-green mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Cultural</h3>
                <p className="text-gray-600 text-sm">Celebrating our heritage</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <Globe className="w-12 h-12 text-igsa-orange mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Global</h3>
                <p className="text-gray-600 text-sm">Connecting cultures</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Do</h2>
            <p className="text-xl text-gray-600">Supporting you every step of the way</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-igsa-saffron to-igsa-orange rounded-full flex items-center justify-center mb-6 mx-auto">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Orientation & Support</h3>
              <p className="text-gray-600 text-center">
                Help new students settle in with pre-arrival guidance and post-arrival support
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-igsa-blue to-igsa-green rounded-full flex items-center justify-center mb-6 mx-auto">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Cultural Events</h3>
              <p className="text-gray-600 text-center">
                Organize festivals like Diwali, Durga Puja, and Pongal to celebrate our heritage
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-igsa-green to-igsa-blue rounded-full flex items-center justify-center mb-6 mx-auto">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Networking</h3>
              <p className="text-gray-600 text-center">
                Connect students with alumni, professionals, and academic opportunities
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Event Details Section - This will be used for individual event pages */}
      <section id="event-details" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Events</h2>
            <p className="text-xl text-gray-600">Celebrating culture and building community</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8">
            <p className="text-gray-600 text-center">
              This section will display detailed information about specific events when accessed via event links. 
              Each event will have its own gallery and detailed description.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
