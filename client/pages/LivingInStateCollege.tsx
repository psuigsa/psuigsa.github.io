import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";

// Simple chevron component
function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export default function LivingInStateCollege() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const sections = [
    {
      id: 'transportation',
      title: 'Transportation',
      icon: '🚌',
      description: 'Buses, driving, biking, and getting around town',
      gradient: 'from-igsa-saffron to-igsa-orange',
      textColor: 'text-igsa-saffron'
    },
    {
      id: 'dining',
      title: 'Dining & Groceries',
      icon: '🍽️',
      description: 'Restaurants, grocery stores, and international food',
      gradient: 'from-igsa-blue to-igsa-green',
      textColor: 'text-igsa-blue'
    },
    {
      id: 'recreation',
      title: 'Recreation & Entertainment',
      icon: '🎯',
      description: 'Parks, activities, nightlife, and weekend fun',
      gradient: 'from-igsa-green to-igsa-blue',
      textColor: 'text-igsa-green'
    },
    {
      id: 'services',
      title: 'Local Services',
      icon: '🏪',
      description: 'Healthcare, banking, postal, and essential services',
      gradient: 'from-igsa-orange to-igsa-saffron',
      textColor: 'text-igsa-orange'
    }
  ];

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setTimeout(() => {
      contentRef.current?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest' 
      });
    }, 100);
  };

  const renderSectionContent = (sectionId: string) => {
    switch (sectionId) {
      case 'transportation':
        return (
          <div className="prose max-w-none">
            <h4 className="text-xl font-semibold mb-4 text-igsa-saffron">Public Transportation</h4>
            <ul className="list-none space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-saffron rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span><strong>CATA Bus System:</strong> Free with Penn State ID, covers campus and town</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-saffron rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Download CATA app for real-time bus tracking</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-saffron rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Key routes: Blue Loop, White Loop, Red Link</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-saffron rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Night service available for safe late-night transportation</span>
              </li>
            </ul>
            
            <h4 className="text-xl font-semibold mb-4 mt-8 text-igsa-saffron">Driving & Parking</h4>
            <ul className="list-none space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-orange rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Pennsylvania driver's license (required after 60 days)</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-orange rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Campus parking permits available (expensive but convenient)</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-orange rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Car rental options: Enterprise, Hertz, Budget</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-orange rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Zipcar available for short-term car sharing</span>
              </li>
            </ul>

            <h4 className="text-xl font-semibold mb-4 mt-8 text-igsa-saffron">Biking & Walking</h4>
            <ul className="list-none space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-saffron rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Bike-friendly campus with dedicated lanes</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-saffron rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Bike registration and security tips</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-saffron rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Winter considerations for biking and walking</span>
              </li>
            </ul>

            <div className="bg-gradient-to-r from-igsa-saffron/10 to-igsa-orange/10 border-l-4 border-igsa-saffron p-6 rounded-r-lg mt-6">
              <p className="text-igsa-saffron font-medium">
                <strong>Pro Tip:</strong> Download the CATA app and always carry your Penn State ID for free bus rides!
              </p>
            </div>
          </div>
        );

      case 'dining':
        return (
          <div className="prose max-w-none">
            <h4 className="text-xl font-semibold mb-4 text-igsa-blue">Grocery Stores</h4>
            <ul className="list-none space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span><strong>Wegmans:</strong> Premium grocery with great selection and prepared foods</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span><strong>Giant:</strong> Large chain with good prices and variety</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span><strong>Weis Markets:</strong> Local chain with competitive prices</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span><strong>ALDI:</strong> Budget-friendly option with basics</span>
              </li>
            </ul>

            <h4 className="text-xl font-semibold mb-4 mt-8 text-igsa-blue">International Food</h4>
            <ul className="list-none space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-green rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span><strong>Asian stores:</strong> HMart, Kam's Oriental Food Market</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-green rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span><strong>Middle Eastern:</strong> Jerusalem Bakery, Medlar Field Market</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-green rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span><strong>Indian/South Asian:</strong> India Pavilion, Spice Bazaar</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-green rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span><strong>Latino:</strong> Compare Foods, local Mexican markets</span>
              </li>
            </ul>

            <h4 className="text-xl font-semibold mb-4 mt-8 text-igsa-blue">Popular Restaurants</h4>
            <ul className="list-none space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span><strong>Fine Dining:</strong> The Tavern, Allen Street Grill</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span><strong>Casual:</strong> Chipotle, Panera, Five Guys</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span><strong>International:</strong> Tadashi, India Pavilion, El Mariachi</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span><strong>Student Favorites:</strong> Canyon Pizza, Primanti Bros</span>
              </li>
            </ul>

            <div className="bg-gradient-to-r from-igsa-blue/10 to-igsa-green/10 border-l-4 border-igsa-blue p-6 rounded-r-lg mt-6">
              <p className="text-igsa-blue font-medium">
                <strong>Money Saving Tip:</strong> Many restaurants offer student discounts - always ask and show your Penn State ID!
              </p>
            </div>
          </div>
        );

      case 'recreation':
        return (
          <div className="prose max-w-none">
            <h4 className="text-xl font-semibold mb-4 text-igsa-green">Outdoor Activities</h4>
            <ul className="list-none space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-green rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span><strong>Parks:</strong> Millbrook Marsh, Shaver's Creek, Tussey Mountain</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-green rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span><strong>Hiking:</strong> Mount Nittany, Penn's Cave area trails</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-green rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span><strong>Winter Sports:</strong> Tussey Mountain skiing, ice skating</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-green rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span><strong>Water Activities:</strong> Whipple Dam, fishing spots</span>
              </li>
            </ul>

            <h4 className="text-xl font-semibold mb-4 mt-8 text-igsa-green">Campus Recreation</h4>
            <ul className="list-none space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span><strong>IM Building:</strong> Gym, pool, basketball, racquetball</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span><strong>White Building:</strong> Rock climbing, fitness classes</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span><strong>Intramural Sports:</strong> Join teams or leagues</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span><strong>Group Fitness:</strong> Yoga, spin, Zumba classes</span>
              </li>
            </ul>

            <h4 className="text-xl font-semibold mb-4 mt-8 text-igsa-green">Entertainment & Nightlife</h4>
            <ul className="list-none space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-green rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span><strong>Theatre:</strong> State Theatre, Pavilion Theatre</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-green rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span><strong>Music Venues:</strong> BJC, Webster's Bookstore Cafe</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-green rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span><strong>Bars & Pubs:</strong> Local Whiskey, The Gaff, Champs</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-green rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span><strong>Festivals:</strong> Arts Festival, First Night celebrations</span>
              </li>
            </ul>

            <div className="bg-gradient-to-r from-igsa-green/10 to-green-100 border-l-4 border-igsa-green p-6 rounded-r-lg mt-6">
              <p className="text-igsa-green font-medium">
                <strong>Social Tip:</strong> Join IGSA events and sports clubs to meet people and explore the area together!
              </p>
            </div>
          </div>
        );

      case 'services':
        return (
          <div className="prose max-w-none">
            <h4 className="text-xl font-semibold mb-4 text-igsa-orange">Healthcare Services</h4>
            <ul className="list-none space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-orange rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span><strong>Mount Nittany Medical Center:</strong> Main hospital facility</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-orange rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span><strong>Urgent Care:</strong> Patient First, Penn State Health</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-orange rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span><strong>Pharmacies:</strong> CVS, Walgreens, Rite Aid</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-orange rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span><strong>Dental:</strong> Various private practices downtown</span>
              </li>
            </ul>

            <h4 className="text-xl font-semibold mb-4 mt-8 text-igsa-orange">Banking & Financial</h4>
            <ul className="list-none space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-saffron rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span><strong>Major Banks:</strong> PNC, Wells Fargo, BB&T, M&T Bank</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-saffron rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span><strong>Credit Unions:</strong> PSECU (Penn State employees)</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-saffron rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span><strong>ATMs:</strong> Widely available on campus and downtown</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-saffron rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span><strong>Money Transfer:</strong> Western Union, remittance services</span>
              </li>
            </ul>

            <h4 className="text-xl font-semibold mb-4 mt-8 text-igsa-orange">Postal & Shipping</h4>
            <ul className="list-none space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-orange rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span><strong>US Post Office:</strong> Downtown location on Foster Avenue</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-orange rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span><strong>Campus Mail:</strong> HUB mail services for packages</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-orange rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span><strong>Shipping:</strong> UPS Store, FedEx Office locations</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-orange rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span><strong>International:</strong> DHL for overseas shipping</span>
              </li>
            </ul>

            <h4 className="text-xl font-semibold mb-4 mt-8 text-igsa-orange">Utilities & Home Services</h4>
            <ul className="list-none space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-orange rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span><strong>Internet:</strong> Comcast Xfinity, Verizon Fios</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-orange rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span><strong>Electric:</strong> West Penn Power, PPL Electric</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-orange rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span><strong>Home Improvement:</strong> Home Depot, Lowe's</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-orange rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span><strong>Laundry:</strong> Coin laundries, on-campus facilities</span>
              </li>
            </ul>

            <div className="bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-400 p-6 rounded-r-lg mt-6">
              <p className="text-red-700 font-medium">
                <strong>Important:</strong> Always verify service provider coverage in your specific area before signing up for utilities.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-igsa-green/10 to-igsa-saffron/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Link
              to="/resources"
              className="inline-flex items-center text-igsa-blue hover:text-igsa-green mb-6 transition-colors"
            >
              ← Back to Resources
            </Link>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Living in <span className="text-igsa-green">State College</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your complete guide to life in Happy Valley - from transportation to entertainment
            </p>
          </div>
        </div>
      </section>

      <section className="py-16" ref={contentRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!activeSection ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {sections.map((section) => (
                <div
                  key={section.id}
                  onClick={() => handleSectionClick(section.id)}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden cursor-pointer"
                >
                  <div className={`h-24 bg-gradient-to-r ${section.gradient} flex items-center justify-center relative overflow-hidden`}>
                    <span className="text-4xl z-10">{section.icon}</span>
                    <div className="absolute top-2 right-4 w-16 h-16 bg-white/20 rounded-full"></div>
                    <div className="absolute -bottom-2 -left-2 w-20 h-20 bg-white/10 rounded-full"></div>
                  </div>

                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-igsa-saffron transition-colors">
                      {section.title}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {section.description}
                    </p>

                    <div className={`flex items-center ${section.textColor} font-semibold group-hover:translate-x-2 transition-transform`}>
                      <span>Explore</span>
                      <ChevronDownIcon className="w-5 h-5 ml-2 transform rotate-[-90deg]" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${sections.find(s => s.id === activeSection)?.gradient} flex items-center justify-center mr-6`}>
                    <span className="text-2xl text-white">
                      {sections.find(s => s.id === activeSection)?.icon}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      {sections.find(s => s.id === activeSection)?.title}
                    </h2>
                    <p className="text-gray-600">
                      {sections.find(s => s.id === activeSection)?.description}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveSection(null)}
                  className="text-gray-500 hover:text-gray-700 p-3 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="prose-lg max-w-none">
                {renderSectionContent(activeSection)}
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-200">
                <button
                  onClick={() => setActiveSection(null)}
                  className="inline-flex items-center text-igsa-blue hover:text-igsa-green transition-colors font-semibold"
                >
                  ← Back to overview
                </button>
              </div>
            </div>
          )}

          {!activeSection && (
            <div className="mt-16 text-center bg-gradient-to-r from-igsa-green/5 to-igsa-saffron/5 rounded-2xl p-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Discover More of State College</h3>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Connect with IGSA members who know the area well and can share their favorite local spots and hidden gems.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="bg-gradient-to-r from-igsa-saffron to-igsa-orange text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-shadow"
                >
                  Connect with IGSA
                </Link>
                <Link
                  to="/resources"
                  className="border-2 border-igsa-green text-igsa-green px-8 py-3 rounded-full font-semibold hover:bg-igsa-green hover:text-white transition-colors"
                >
                  More Resources
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
