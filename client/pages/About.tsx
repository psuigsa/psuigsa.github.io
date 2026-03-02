import Navigation from "@/components/Navigation";
import { Users, Target, Heart, Globe } from "lucide-react";
import BoardMembers from "@/components/BoardMembers";

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
                To create a supportive and inclusive community for Indian students at Penn State, fostering academic excellence, cultural celebration, and lifelong connections.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                We strive to bridge the gap between home and a new academic journey by providing resources, guidance, and a strong sense of belonging in State College.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Formed in the Spring of 2003, the Indian Graduate Student Association (IGSA) is a student-run organisation dedicated to integrating Indian graduate students and post-doctoral scholars at Penn State. Representing India and the broader Indian community, IGSA serves as a platform to help incoming students navigate graduate and professional life in State College, Pennsylvania, and to ease their transition into a new academic and cultural environment.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Although IGSA is primarily a graduate student association, we warmly welcome undergraduate students as well. Any undergraduate student coming to Penn State is encouraged to seek guidance, support, and community through IGSA. We believe in extending assistance to all members of the Indian student community and fostering an inclusive environment where everyone feels at home.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                The central motivation behind the formation of IGSA is to create meaningful connections among Indian students and scholars, nurturing a sense of belonging while living away from home. Throughout the year, we organise events that celebrate the rich and diverse cultural heritage of India, while encouraging participation from members of all communities. Our events aim to introduce and showcase Indian culture to the American and international communities at Penn State.
              </p>
              <p className="text-lg text-gray-600">
                As an organisation, we actively collaborate with other student groups at University Park, including the Society for Indian Music and Arts, Indian Culture and Language Club, Association for India’s Development, Penn State JaDhoom, Natya, Raaga, and others, strengthening cross-community engagement and cultural exchange.
              </p>
            </div>
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">IGSA Board</h2>
              <BoardMembers />
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
