import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";

// Simple chevron component to replace Heroicons
function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export default function PreArrival() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const sections = [
    {
      id: 'visa',
      title: 'Visa Guidelines',
      icon: '📋',
      description: 'F-1 student visa requirements and interview tips',
      gradient: 'from-igsa-saffron to-igsa-orange',
      textColor: 'text-igsa-saffron'
    },
    {
      id: 'housing',
      title: 'Housing Information',
      icon: '🏠',
      description: 'On-campus and off-campus housing options',
      gradient: 'from-igsa-blue to-igsa-green',
      textColor: 'text-igsa-blue'
    },
    {
      id: 'documents',
      title: 'Essential Documents',
      icon: '📄',
      description: 'Important documents to carry and prepare',
      gradient: 'from-igsa-green to-igsa-blue',
      textColor: 'text-igsa-green'
    },
    {
      id: 'packing',
      title: 'Packing Checklist',
      icon: '🎒',
      description: 'What to bring and what to buy locally',
      gradient: 'from-igsa-orange to-igsa-saffron',
      textColor: 'text-igsa-orange'
    }
  ];

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
    // Smooth scroll to content area after state update
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
      case 'visa':
        return (
          <div className="prose max-w-none">
            <h4 className="text-xl font-semibold mb-4 text-igsa-saffron">F-1 Student Visa Requirements</h4>
            <ul className="list-none space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-saffron rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Valid passport (must be valid for at least 6 months beyond intended stay)</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-saffron rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Form I-20 issued by Penn State</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-saffron rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>SEVIS fee payment receipt</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-saffron rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Form DS-160 confirmation page</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-saffron rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Visa application fee payment receipt</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-saffron rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Academic transcripts and standardized test scores</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-saffron rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Financial documents proving ability to cover expenses</span>
              </li>
            </ul>
            
            <h4 className="text-xl font-semibold mb-4 mt-8 text-igsa-saffron">Visa Interview Tips</h4>
            <ul className="list-none space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-orange rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Arrive early and dress professionally</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-orange rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Bring all required documents in organized folders</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-orange rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Be prepared to explain your study plans and career goals</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-orange rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Demonstrate strong ties to your home country</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-orange rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Show proof of financial support</span>
              </li>
            </ul>

            <div className="bg-gradient-to-r from-igsa-saffron/10 to-igsa-orange/10 border-l-4 border-igsa-saffron p-6 rounded-r-lg mt-6">
              <p className="text-igsa-saffron font-medium">
                <strong>Important:</strong> Schedule your visa appointment well in advance as processing times vary by country.
              </p>
            </div>
          </div>
        );

      case 'housing':
        return (
          <div className="prose max-w-none">
            <h4 className="text-xl font-semibold mb-4 text-igsa-blue">On-Campus Housing Options</h4>
            <ul className="list-none space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span><strong>Graduate Halls:</strong> Eastview Terrace, Nittany Apartments</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span><strong>Family Housing:</strong> Available for graduate students with families</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span><strong>Meal Plans:</strong> Various options available for on-campus residents</span>
              </li>
            </ul>

            <h4 className="text-xl font-semibold mb-4 mt-8 text-igsa-blue">Off-Campus Housing</h4>
            <ul className="list-none space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-green rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Popular areas: Downtown State College, Park Forest, Toftrees</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-green rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Consider proximity to campus and bus routes</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-green rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Budget for utilities, internet, and parking</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-green rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Start searching early, especially for fall semester</span>
              </li>
            </ul>

            <h4 className="text-xl font-semibold mb-4 mt-8 text-igsa-blue">Useful Resources</h4>
            <ul className="list-none space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Penn State Housing website</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Local real estate websites (Rent.com, Apartments.com)</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Facebook housing groups for State College</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>IGSA housing assistance program</span>
              </li>
            </ul>

            <div className="bg-gradient-to-r from-igsa-blue/10 to-igsa-green/10 border-l-4 border-igsa-blue p-6 rounded-r-lg mt-6">
              <p className="text-igsa-blue font-medium">
                <strong>Tip:</strong> Consider temporary housing (Airbnb, hotels) for your first week while you finalize permanent arrangements.
              </p>
            </div>
          </div>
        );

      case 'documents':
        return (
          <div className="prose max-w-none">
            <h4 className="text-xl font-semibold mb-4 text-igsa-green">Documents to Carry</h4>
            <ul className="list-none space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-green rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Passport with valid F-1 visa</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-green rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Form I-20 (original, signed)</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-green rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>SEVIS fee payment receipt</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-green rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Academic transcripts and degree certificates</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-green rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Standardized test scores (GRE, TOEFL, IELTS)</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-green rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Financial documents and bank statements</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-green rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Medical records and vaccination certificates</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-green rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Prescription medications (with doctor's note)</span>
              </li>
            </ul>

            <h4 className="text-xl font-semibold mb-4 mt-8 text-igsa-green">Documents for Later Use</h4>
            <ul className="list-none space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Birth certificate</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Marriage certificate (if applicable)</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Driver's license from home country</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>International driving permit</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Insurance documents</span>
              </li>
            </ul>

            <div className="bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-400 p-6 rounded-r-lg mt-6">
              <p className="text-red-700 font-medium">
                <strong>Important:</strong> Keep copies of all important documents in both physical and digital formats. Store originals safely.
              </p>
            </div>
          </div>
        );

      case 'packing':
        return (
          <div className="prose max-w-none">
            <h4 className="text-xl font-semibold mb-4 text-igsa-orange">Essential Items</h4>
            <ul className="list-none space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-orange rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Weather-appropriate clothing (State College has cold winters!)</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-orange rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Professional attire for presentations and interviews</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-orange rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Comfortable shoes and boots</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-orange rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Personal hygiene items</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-orange rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Prescription medications (3-month supply recommended)</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-orange rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Laptop and necessary chargers</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-orange rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>International adapter/converter</span>
              </li>
            </ul>

            <h4 className="text-xl font-semibold mb-4 mt-8 text-igsa-orange">Items to Buy in the US</h4>
            <ul className="list-none space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-saffron rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Bedding and pillows</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-saffron rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Kitchen utensils and cookware</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-saffron rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Heavy winter clothing (often better value in US)</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-saffron rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Electronics (different voltage requirements)</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-saffron rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Furniture and home décor</span>
              </li>
            </ul>

            <h4 className="text-xl font-semibold mb-4 mt-8 text-igsa-orange">Cultural/Personal Items</h4>
            <ul className="list-none space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-orange rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Special spices and food items from home</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-orange rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Traditional clothing for cultural events</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-orange rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Gifts for new friends and colleagues</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-orange rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Photos and small mementos</span>
              </li>
            </ul>

            <div className="bg-gradient-to-r from-igsa-green/10 to-green-100 border-l-4 border-igsa-green p-6 rounded-r-lg mt-6">
              <p className="text-igsa-green font-medium">
                <strong>Pro Tip:</strong> Pack light initially. You can always have family send additional items later or buy them locally.
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
      <section className="pt-24 pb-16 bg-gradient-to-r from-igsa-saffron/10 to-igsa-orange/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Link
              to="/resources"
              className="inline-flex items-center text-igsa-blue hover:text-igsa-green mb-6 transition-colors"
            >
              ← Back to Resources
            </Link>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Pre-Arrival <span className="text-igsa-saffron">Resources</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Essential information and preparation guides for students planning to arrive in State College
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
                  {/* Header with gradient */}
                  <div className={`h-24 bg-gradient-to-r ${section.gradient} flex items-center justify-center relative overflow-hidden`}>
                    <span className="text-4xl z-10">{section.icon}</span>
                    {/* Decorative elements */}
                    <div className="absolute top-2 right-4 w-16 h-16 bg-white/20 rounded-full"></div>
                    <div className="absolute -bottom-2 -left-2 w-20 h-20 bg-white/10 rounded-full"></div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-igsa-saffron transition-colors">
                      {section.title}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {section.description}
                    </p>

                    {/* Action Button */}
                    <div className={`flex items-center ${section.textColor} font-semibold group-hover:translate-x-2 transition-transform`}>
                      <span>Learn More</span>
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
            <div className="mt-16 text-center bg-gradient-to-r from-igsa-blue/5 to-igsa-green/5 rounded-2xl p-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Need Additional Help?</h3>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Our IGSA volunteers are here to help you with personalized guidance for your pre-arrival preparations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="bg-gradient-to-r from-igsa-saffron to-igsa-orange text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-shadow"
                >
                  Contact IGSA
                </Link>
                <Link
                  to="/resources"
                  className="border-2 border-igsa-blue text-igsa-blue px-8 py-3 rounded-full font-semibold hover:bg-igsa-blue hover:text-white transition-colors"
                >
                  Explore More Resources
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
