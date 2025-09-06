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

export default function PostArrival() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const sections = [
    {
      id: 'orientation',
      title: 'Orientation & Check-in',
      icon: '🎓',
      description: 'Essential first steps and university orientation programs',
      gradient: 'from-igsa-saffron to-igsa-orange',
      textColor: 'text-igsa-saffron'
    },
    {
      id: 'essentials',
      title: 'First Week Essentials',
      icon: '✅',
      description: 'Banking, phone, SSN, and other immediate necessities',
      gradient: 'from-igsa-blue to-igsa-green',
      textColor: 'text-igsa-blue'
    },
    {
      id: 'campus',
      title: 'Campus Resources',
      icon: '🏫',
      description: 'Libraries, health services, and academic support',
      gradient: 'from-igsa-green to-igsa-blue',
      textColor: 'text-igsa-green'
    },
    {
      id: 'legal',
      title: 'Legal Requirements',
      icon: '📋',
      description: 'SEVIS check-in, work authorization, and compliance',
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
      case 'orientation':
        return (
          <div className="prose max-w-none">
            <h4 className="text-xl font-semibold mb-4 text-igsa-saffron">International Student Orientation</h4>
            <ul className="list-none space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-saffron rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Attend mandatory international student orientation sessions</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-saffron rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Complete SEVIS check-in at Global Programs office</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-saffron rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Register for academic courses and finalize schedule</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-saffron rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Obtain Penn State ID card and access credentials</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-saffron rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Connect with academic advisor and department</span>
              </li>
            </ul>
            
            <h4 className="text-xl font-semibold mb-4 mt-8 text-igsa-saffron">Graduate Student Orientation</h4>
            <ul className="list-none space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-orange rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Attend department-specific graduate orientation</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-orange rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Meet with research advisor and lab members</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-orange rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Join IGSA welcome events and social activities</span>
              </li>
            </ul>

            <div className="bg-gradient-to-r from-igsa-saffron/10 to-igsa-orange/10 border-l-4 border-igsa-saffron p-6 rounded-r-lg mt-6">
              <p className="text-igsa-saffron font-medium">
                <strong>Important:</strong> Orientation is mandatory and must be completed within your first semester.
              </p>
            </div>
          </div>
        );

      case 'essentials':
        return (
          <div className="prose max-w-none">
            <h4 className="text-xl font-semibold mb-4 text-igsa-blue">Banking & Finance</h4>
            <ul className="list-none space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Open a US bank account (recommended: PNC, Wells Fargo)</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Apply for Social Security Number (if eligible for work)</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Set up direct deposit for assistantship payments</span>
              </li>
            </ul>

            <h4 className="text-xl font-semibold mb-4 mt-8 text-igsa-blue">Communication & Transportation</h4>
            <ul className="list-none space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-green rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Get a US phone plan (Verizon, AT&T, T-Mobile)</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-green rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Download CATA bus app for local transportation</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-green rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Consider getting a Pennsylvania driver's license</span>
              </li>
            </ul>

            <h4 className="text-xl font-semibold mb-4 mt-8 text-igsa-blue">Shopping & Essentials</h4>
            <ul className="list-none space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Visit Target, Walmart for household essentials</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Explore local grocery stores (Wegmans, Giant)</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Find international food markets for familiar ingredients</span>
              </li>
            </ul>

            <div className="bg-gradient-to-r from-igsa-blue/10 to-igsa-green/10 border-l-4 border-igsa-blue p-6 rounded-r-lg mt-6">
              <p className="text-igsa-blue font-medium">
                <strong>Tip:</strong> IGSA offers shopping trips and buddy programs to help new students with these essentials.
              </p>
            </div>
          </div>
        );

      case 'campus':
        return (
          <div className="prose max-w-none">
            <h4 className="text-xl font-semibold mb-4 text-igsa-green">Academic Resources</h4>
            <ul className="list-none space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-green rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span><strong>Libraries:</strong> Paterno Library, subject-specific libraries</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-green rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span><strong>Writing Center:</strong> Free tutoring and writing support</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-green rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span><strong>Research Computing:</strong> High-performance computing resources</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-green rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span><strong>Statistical Consulting:</strong> Help with data analysis</span>
              </li>
            </ul>

            <h4 className="text-xl font-semibold mb-4 mt-8 text-igsa-green">Health & Wellness</h4>
            <ul className="list-none space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>University Health Services for medical care</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Counseling and Psychological Services (CAPS)</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Recreational facilities and fitness centers</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Dental and vision services</span>
              </li>
            </ul>

            <h4 className="text-xl font-semibold mb-4 mt-8 text-igsa-green">Technology & IT</h4>
            <ul className="list-none space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-green rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Campus WiFi setup and VPN access</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-green rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Software licensing and downloads</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-green rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Computer labs and printing services</span>
              </li>
            </ul>

            <div className="bg-gradient-to-r from-igsa-green/10 to-green-100 border-l-4 border-igsa-green p-6 rounded-r-lg mt-6">
              <p className="text-igsa-green font-medium">
                <strong>Pro Tip:</strong> Many services are free for students - take advantage of them!
              </p>
            </div>
          </div>
        );

      case 'legal':
        return (
          <div className="prose max-w-none">
            <h4 className="text-xl font-semibold mb-4 text-igsa-orange">SEVIS & Immigration</h4>
            <ul className="list-none space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-orange rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Complete SEVIS check-in within 30 days of arrival</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-orange rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Report any address changes to Global Programs</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-orange rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Maintain full-time enrollment status</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-orange rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Keep passport and I-20 documents current</span>
              </li>
            </ul>

            <h4 className="text-xl font-semibold mb-4 mt-8 text-igsa-orange">Work Authorization</h4>
            <ul className="list-none space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-saffron rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>On-campus employment (TA, RA, GA positions)</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-saffron rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>CPT for internships and practical training</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-saffron rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>OPT planning for post-graduation employment</span>
              </li>
            </ul>

            <h4 className="text-xl font-semibold mb-4 mt-8 text-igsa-orange">Tax Obligations</h4>
            <ul className="list-none space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-orange rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Understand tax treaty benefits (if applicable)</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-orange rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>File annual tax returns (Form 1040NR or 8843)</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-orange rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Attend tax workshops offered by IGSA</span>
              </li>
            </ul>

            <div className="bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-400 p-6 rounded-r-lg mt-6">
              <p className="text-red-700 font-medium">
                <strong>Critical:</strong> Non-compliance with immigration regulations can result in loss of status. Always consult Global Programs for guidance.
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
      <section className="pt-24 pb-16 bg-gradient-to-r from-igsa-blue/10 to-igsa-green/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Link
              to="/resources"
              className="inline-flex items-center text-igsa-blue hover:text-igsa-green mb-6 transition-colors"
            >
              ← Back to Resources
            </Link>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Post-Arrival <span className="text-igsa-blue">Guide</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Essential steps and resources for your first few weeks in State College
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
                      <span>Learn More</span>
                      <ChevronDownIcon className="w-5 h-5 ml-2 transform rotate-[-90deg]" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // ...existing detailed view code structure...
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
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Need Personal Assistance?</h3>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                IGSA volunteers can help guide you through these post-arrival steps and connect you with the right resources.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="bg-gradient-to-r from-igsa-saffron to-igsa-orange text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-shadow"
                >
                  Get Help from IGSA
                </Link>
                <Link
                  to="/resources"
                  className="border-2 border-igsa-blue text-igsa-blue px-8 py-3 rounded-full font-semibold hover:bg-igsa-blue hover:text-white transition-colors"
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
