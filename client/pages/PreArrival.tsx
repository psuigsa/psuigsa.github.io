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
      title: 'How to reach Penn State',
      icon: '📍',
      description: 'Air, train, and road options to reach State College',
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
            <h4 className="text-xl font-semibold mb-4 text-igsa-saffron">How to reach Penn State</h4>

            <p>
              Pennsylvania State University (University Park campus) is located in State College, PA
              in Centre County. You can reach State College from major US cities by air, train, or road.
            </p>

            <h5 className="text-lg font-semibold mt-6">Air</h5>
            <p className="ml-4">
              The preferred choice for first-time visitors is to fly into University Park Airport (SCE),
              about 7 miles from campus. Connecting flights to SCE are available from Chicago, Newark,
              Cincinnati, Detroit, Washington D.C., and Philadelphia. When possible, book a single
              ticket from your international origin to SCE (total travel time is commonly 24–30 hours)
              to reduce the risk and cost of missed connections. Note that some carriers (for
              example Air India and Qatar) may offer two checked-bag allowances; combinations of
              carriers (e.g., Air India + United) can sometimes be used to obtain extra checked
              baggage—verify baggage rules before booking. You may also fly to major nearby airports
              (New York, Pittsburgh, Newark, Philadelphia) and continue to State College by road.
            </p>

            <h5 className="text-lg font-semibold mt-6">Train</h5>
            <p className="ml-4">
              State College does not have direct rail service. The nearest Amtrak stations are in
              Altoona (≈44 miles), Lewistown (≈32 miles) and Huntingdon (≈31 miles). From any of
              these stations you can take a taxi to State College (taxi fares are typically around
              $100 one-way; drivers often prefer cash).
            </p>

            <h5 className="text-lg font-semibold mt-6">Road (Bus / Car)</h5>
            <p className="ml-4">
              Bus service connects State College with several major cities (Megabus, Fullington
              Trailways, Greyhound). Fares vary by route (for example, Megabus from NYC to SCE is
              often about $50); note that many bus services allow only one large bag and may charge
              for a second piece. If you drive, State College sits on I-99 / US-322 and is reachable
              via major highways. Car-rental companies servicing long-distance one-way trips include
              Enterprise, National, Avis and Hertz (one-way fees vary; check company policies and
              insurance). After you receive your student ID you may be eligible for student discounts
              on some rentals.
            </p>

            <div className="bg-gradient-to-r from-igsa-saffron/10 to-igsa-orange/10 border-l-4 border-igsa-saffron p-6 rounded-r-lg mt-6">
              <p className="text-igsa-saffron font-medium">
                <strong>Tip:</strong> If you arrive at a larger airport, compare ground-transport
                costs and schedules (shuttle, bus, taxi or car rental) to find the most convenient
                and economical route to State College.
              </p>
            </div>
          </div>
        );

      case 'housing':
        return (
          <div className="prose max-w-none">
            <h4 className="text-xl font-semibold mb-4 text-igsa-blue">Housing Overview</h4>

            <p>
              State College is a university town with a large student population. You will find a wide
              range of apartments managed by private owners and professional property-management
              companies. Below are commonly recommended complexes, tips for searching, and trusted
              resources to help you find housing.
            </p>

            <h5 className="text-lg font-semibold mt-6">Popular complexes (frequently used by graduate students)</h5>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium">North side</p>
                <ul className="list-disc list-inside mt-2">
                  <li><a href="https://www.vairovillage.com/" target="_blank" rel="noopener noreferrer" className="text-igsa-blue hover:underline">Vairo Village</a></li>
                  <li><a href="https://www.apartments.com/park-forest-apartments-state-college-pa/y9xwyqt/" target="_blank" rel="noopener noreferrer" className="text-igsa-blue hover:underline">Park Forest Apartments</a></li>
                  <li><a href="https://www.statecollegecollective.com/" target="_blank" rel="noopener noreferrer" className="text-igsa-blue hover:underline">State College Collective (Copper Beach Townhomes)</a></li>
                  <li><a href="https://www.apartments.com/park-crest-terrace-state-college-pa/dt71rfh/" target="_blank" rel="noopener noreferrer" className="text-igsa-blue hover:underline">Park Crest Terrace</a></li>
                  <li><a href="https://www.toftrees.net/" target="_blank" rel="noopener noreferrer" className="text-igsa-blue hover:underline">Toftrees Apartments</a></li>
                </ul>
              </div>

              <div>
                <p className="font-medium">South side</p>
                <ul className="list-disc list-inside mt-2">
                  <li><a href="https://www.continentalrealestate.net/property/southgate-apartments/" target="_blank" rel="noopener noreferrer" className="text-igsa-blue hover:underline">Southgate Apartments</a></li>
                  <li><a href="https://nittanygarden.apartmentstore.com/" target="_blank" rel="noopener noreferrer" className="text-igsa-blue hover:underline">Nittany Garden Apartments</a></li>
                  <li><a href="http://www.apartmentsstatecollege.com/penn-state-housing/psu/Executive-House/id/46" target="_blank" rel="noopener noreferrer" className="text-igsa-blue hover:underline">Executive House Apartments</a></li>
                  <li><a href="https://www.lionsgateapts.com/" target="_blank" rel="noopener noreferrer" className="text-igsa-blue hover:underline">Lions Gate Apartments</a></li>
                </ul>
              </div>
            </div>

            <h5 className="text-lg font-semibold mt-6">Other options</h5>
            <ul className="list-disc list-inside mt-2">
              <li><a href="https://www.morgan-properties.com/apartments/pa/state-college/briarwood/" target="_blank" rel="noopener noreferrer" className="text-igsa-blue hover:underline">Briarwood Apartments</a></li>
              <li><a href="https://www.apartmentratings.com/pa/state-college/pheasant-run-townhouse_814234360816801/" target="_blank" rel="noopener noreferrer" className="text-igsa-blue hover:underline">Pheasant Run Townhomes</a></li>
              <li><a href="https://www.apartments.com/paramont-woods-state-college-pa/xvwtmjm/" target="_blank" rel="noopener noreferrer" className="text-igsa-blue hover:underline">Paramont Woods</a></li>
            </ul>

            <h5 className="text-lg font-semibold mt-6">Professional property managers</h5>
            <p>
              <a href="https://www.arpm.com/" target="_blank" rel="noopener noreferrer" className="text-igsa-blue hover:underline">Associated Realty Property Management (ARPM)</a>,
              &nbsp;
              <a href="https://www.continentalrealestate.net/" target="_blank" rel="noopener noreferrer" className="text-igsa-blue hover:underline">Continental Real Estate</a>, and other local managers handle many off-campus complexes. Check their websites for availability and requirements.
            </p>

            <h5 className="text-lg font-semibold mt-6">Searching tips & safety</h5>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>Be cautious with third-party listings and avoid sending money before you have signed a lease in person.</li>
              <li>Your apartment is confirmed only after you pay the deposit and sign the lease — keep written records of all agreements.</li>
              <li>Compare total monthly costs (rent plus utilities) rather than rent alone. Ask management for typical utility estimates if not listed.</li>
              <li>Look up reviews on Google and other sites. If you have questions, email IGSA for first-hand insights from other students.</li>
            </ul>

            <h5 className="text-lg font-semibold mt-6">Temporary accommodation</h5>
            <p>
              IGSA tries to provide basic temporary accommodation to incoming Indian graduate students for a few days while leases start. This is a goodwill service provided by volunteers at no cost. If you need temporary housing, please fill out the temporary-accommodation request form as soon as possible so we can coordinate.
            </p>
            <p>
              Penn State also offers short-term and graduate-family housing options — see <a href="https://housing.psu.edu/graduate-family-housing" target="_blank" rel="noopener noreferrer" className="text-igsa-blue hover:underline">Graduate and Family Housing</a> and general arrival information at <a href="https://arrival.psu.edu/arrival-schedule-up" target="_blank" rel="noopener noreferrer" className="text-igsa-blue hover:underline">PSU Arrival</a>.
            </p>

            <h4 className="text-xl font-semibold mb-4 mt-8 text-igsa-blue">Useful Resources</h4>
            <ul className="list-none space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <a
                  href="https://studentaffairs.psu.edu/housing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-igsa-blue hover:underline"
                >
                  Penn State Housing website
                </a>
              </li>

              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <a
                  href="https://www.apartments.com/state-college-pa/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-igsa-blue hover:underline"
                >
                  Apartments.com — State College listings
                </a>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <a
                  href="https://www.apartmentsstatecollege.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-igsa-blue hover:underline"
                >
                  ApartmentsStateCollege.com — local listings
                </a>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <a
                  href="https://pennstate.craigslist.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-igsa-blue hover:underline"
                >
                  Craigslist — Penn State area listings
                </a>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <a
                  href="https://www.facebook.com/groups/2079398628740383/?ref=share&mibextid=KtfwRi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-igsa-blue hover:underline"
                >
                  Facebook group: State College Housing & Rentals
                </a>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-igsa-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <a
                  href="https://www.facebook.com/groups/penn.state.housing.psu.sublease.rentals/?ref=share&mibextid=KtfwRi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-igsa-blue hover:underline"
                >
                  Facebook group: Penn State Housing — Sublease & Rentals
                </a>
              </li>
            </ul>

            <div className="bg-gradient-to-r from-igsa-blue/10 to-igsa-green/10 border-l-4 border-igsa-blue p-6 rounded-r-lg mt-6">
                <p className="text-igsa-blue font-medium">
                  <strong>Tip:</strong> For temporary accommodation, reach out to IGSA. IGSA volunteers can accommodate you as a guest for a few days while you finalize permanent arrangements. Please submit the temporary-accommodation request form early so we can coordinate volunteers.
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
            <h4 className="text-xl font-semibold mb-4 text-igsa-orange">Essentials</h4>

            <p>
              And now you are ready to pack your bags and board that flight to your new life. But are
              you confused about what you will need and what you should carry? Here are a few
              suggestions to clear at least some of your confusion.
            </p>

            <h5 className="text-lg font-semibold mt-6">Traveling with Agricultural Produce</h5>
            <p className="ml-4">
              You may choose to bring family-recipe masalas and the secret ingredients for your
              favorite recipes. But do consider declaring these items if you think they fall into the
              category of being an "Agricultural Produce". The United States Customs and Border
              Protection requires such declarations. These items can potentially be removed at the
              port-of-entry. You can read more about these regulations at
              &nbsp;
              <a
                href="https://www.cbp.gov/travel/clearing-cbp/bringing-agricultural-products-united-states"
                target="_blank"
                rel="noopener noreferrer"
                className="text-igsa-orange hover:underline"
              >
                CBP — Bringing agricultural products
              </a>
              .
            </p>

            <h5 className="text-lg font-semibold mt-6">Traveling with Perishable Goods</h5>
            <p className="ml-4">
              We advise you not to carry perishable goods that are not sealed properly — either by
              you or by the manufacturer. These may get taken away at Customs. Please make sure
              any homemade pickles or achar bottles are factory-sealed if you plan to pack them in
              checked luggage.
            </p>

            <h5 className="text-lg font-semibold mt-6">Carrying Kitchen Utensils</h5>
            <p className="ml-4">
              You can choose to carry everyday essential kitchen utensils and tools with you as long
              as they are secure in your checked luggage. If you choose not to, you can buy them in
              the US at stores like Walmart, Target or on Amazon.
            </p>

            <h5 className="text-lg font-semibold mt-6">Winter Clothing</h5>
            <p className="ml-4">
              State College is in the Northeastern United States and we get cold winters. If you do
              not already have ultra-warm winter coats, our advice is to buy them in the US — you
              can often find good quality winter clothing during sales at department stores or
              online retailers such as Amazon, The North Face, Columbia, or Burlington Coat Factory.
            </p>

            <h5 className="text-lg font-semibold mt-6">US Customs — International Visitors</h5>
            <p className="ml-4">
              If you are in doubt about what you can bring, consult the US Customs and Border
              Protection guidance for international visitors:
              &nbsp;
              <a
                href="https://www.cbp.gov/travel/international-visitors"
                target="_blank"
                rel="noopener noreferrer"
                className="text-igsa-orange hover:underline"
              >
                CBP — International Visitors
              </a>
              .
            </p>

            <h5 className="text-lg font-semibold mt-6">Need more help?</h5>
            <p className="ml-4">
              We may be able to answer specific questions based on our experience living in the
              US. We are not qualified to provide legal advice, but we may be able to provide more
              insights into your concern. Email us at
              &nbsp;
              <a href="mailto:psu.igsa@gmail.com" className="text-igsa-orange hover:underline">
                psu.igsa@gmail.com
              </a>
              .
            </p>

            <div className="bg-gradient-to-r from-igsa-orange/10 to-igsa-saffron/10 border-l-4 border-igsa-orange p-6 rounded-r-lg mt-6">
              <p className="text-igsa-orange font-medium">
                <strong>Tip:</strong> Pack essentials and travel light. You can always buy larger
                items locally or have family ship additional items after you settle in.
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
