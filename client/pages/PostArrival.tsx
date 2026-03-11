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
            <h4 className="text-xl font-semibold mb-4 text-igsa-saffron">Orientation &amp; Check-in</h4>
            <h5 className="text-lg font-semibold mt-4">International Student Orientation</h5>
            <p>
              All newly admitted international students at Penn State University Park are required to attend the International Student Welcome and orientation programmes organised by Penn State Global and the Directorate of International Student and Scholar Advising (DISSA). These sessions cover immigration basics, academic expectations, campus services, and practical tips to help you settle in. They usually run shortly before the semester starts and include presentations, Q&amp;A, and chances to meet other new students—so plan to attend.
            </p>
            <p>
              International Student Welcome (ISW) is an in-person, on-campus program that introduces you to University Park resources and the Penn State student experience. University Park undergraduates, graduates, and exchange students should check the <a className="underline text-igsa-saffron" href="https://global.psu.edu/isw" target="_blank" rel="noopener noreferrer">ISW page</a> for dates, check-in times, and registration details.
            </p>
            <p>
              Note: some departments or programs run additional, mandatory orientation activities—always check your department emails and program pages so you don’t miss anything important.
            </p>
            <h5 className="text-lg font-semibold mt-4">Complete SEVIS check-in with the Global Programs office</h5>
            <p>
              After arriving in the United States and before the start of classes, international students must complete the official Immigration Check-In process through Penn State Global. This process confirms your arrival and activates your immigration record in the Student and Exchange Visitor Information System (SEVIS). To complete the check-in, students must submit required documentation through the iStart system, including a copy of the I-20 or DS-2019, visa information, I-94 arrival record, and local address and contact details. The information is reviewed by International Student and Scholar Advising staff to register your legal status in SEVIS. Failure to complete this step may result in a hold on your LionPATH account that prevents course registration and could jeopardise your immigration status.
            </p>
            <h5 className="text-lg font-semibold mt-4">Register for academic courses and finalise your schedule</h5>
            <p>
              During the orientation period, students will complete course registration and confirm their academic schedule using LionPATH, Penn State’s student information system. International students must enrol full-time to maintain their visa status, and academic advisors or programme coordinators often assist with selecting appropriate courses that align with degree requirements. This step ensures that students are properly enrolled for the semester, understand the structure of their programme, and begin their academic planning at Penn State with a clear course schedule. Maintaining full-time enrolment is an important requirement for students in F-1 or J-1 visa status.
            </p>
            <h5 className="text-lg font-semibold mt-4">Obtain your Penn State ID</h5>
            <p>
              New students will need to obtain their official Penn State ID card. The ID card is used across campus for building access, library services, dining, and many student services. To receive a card, your student record must show that you are enrolled in at least one class in LionPATH and that you have accepted the Student Financial Responsibility Agreement — without an active student record the ID office cannot issue the card. Policy <a className="underline text-igsa-saffron" href="https://policy.psu.edu/policies/ad24" target="_blank" rel="noopener noreferrer">AD24</a>.
            </p>
            <h5 className="text-lg font-semibold mt-4">Connect with your academic advisor and department</h5>
            <p>
              Meeting with your academic advisor and department is an important step in beginning your graduate programme. Advisors help students understand programme requirements, academic policies, and long-term degree planning. These meetings may also introduce students to research expectations, departmental resources, and faculty members within their field of study. Establishing early communication with your department helps ensure that you have the guidance and academic support needed to successfully navigate your programme at Penn State.
            </p>
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
            <h4 className="text-xl font-semibold mb-4 text-igsa-orange">Maintaining Your F‑1 or J‑1 Status</h4>
            <p>
              Your immigration status is your responsibility. You must follow the rules below to
              stay in status while studying in the United States.
            </p>

            <h5 className="text-lg font-semibold mt-6">Common responsibilities for all visa holders</h5>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Complete SEVIS check‑in (follow instructions from ISSA) shortly after arrival.</li>
              <li>Keep your U.S. local address and contact information up to date — update within 10 days using the U.S. Local Address Update form in <a className="underline" href="https://istart.gp.psu.edu/istart/controllers/start/StartEngine.cfm" target="_blank" rel="noopener noreferrer">iStart</a>. Also keep all of your contact details current in <a className="underline" href="https://accounts.psu.edu/" target="_blank" rel="noopener noreferrer">Account Management</a>.</li>
              <li>Maintain required health insurance and any program-specific coverage.</li>
              <li>Keep your passport and immigration documents (I‑20 or DS‑2019) valid; request extensions before the end date.</li>
              <li>Read and respond to communications from ISSA / Global Programs — they contain important reporting and compliance instructions.</li>
            </ul>

            <h5 className="text-lg font-semibold mt-6">DHS full‑time enrollment minimums</h5>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Undergraduate and Law students in F‑1 or J‑1 status must enroll in a minimum of 12 credits per semester to meet Department of Homeland Security (DHS) full‑time requirements.</li>
              <li>Graduate students in F‑1 or J‑1 status must enroll in a minimum of 9 credits per semester to meet DHS full‑time requirements.</li>
            </ul>

            <h5 className="text-lg font-semibold mt-6">If you are an F‑1 student</h5>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Enroll full‑time each term, or obtain prior approval for an authorized reduced course load.</li>
              <li>Enroll in the required number of in‑person credits if your program requires it — check Enrollment Requirements.</li>
              <li>Obtain work authorization before beginning any employment (on‑campus jobs, CPT, OPT): consult ISSA for eligibility and application steps.</li>
              <li>If you will stop enrolling (graduation, leave, withdrawal), notify ISSA using the Exit form in iStart so your SEVIS record is handled correctly.</li>
            </ul>

            <h5 className="text-lg font-semibold mt-6">If you are a J‑1 student</h5>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Enroll full‑time or secure approval for an authorized reduced course load when appropriate.</li>
              <li>Meet mandatory health insurance requirements for J‑1 participants.</li>
              <li>Obtain prior authorization for any employment and apply for program extensions before your DS‑2019 end date, if needed.</li>
            </ul>

            <h4 className="text-xl font-semibold mb-4 mt-6 text-igsa-orange">Travel Requirements</h4>
            <p>
              Traveling as an F-1 or J-1 student requires careful planning to ensure compliance with U.S. immigration regulations. Below are the key requirements and recommendations:
            </p>

            <h6 className="text-lg font-semibold mt-6">Required Travel Documents</h6>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Valid passport (must be valid at least 6 months into the future).</li>
              <li>Valid U.S. visa in your passport (except for citizens of Canada and Bermuda).</li>
              <li>Valid I-20 (F-1) or DS-2019 (J-1) with a travel signature. Request a travel signature in <a className="underline" href="https://istart.gp.psu.edu/istart/controllers/start/StartEngine.cfm" target="_blank" rel="noopener noreferrer">iStart</a>.</li>
            </ul>

            <h6 className="text-lg font-semibold mt-6">Additional Recommendations</h6>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Carry transcripts and enrollment verification for the next semester.</li>
              <li>Check your I-94 arrival record after returning to the U.S. to ensure accuracy.</li>
            </ul>

            <h6 className="text-lg font-semibold mt-6">Important Notes</h6>
            <p>
              Re-entry is not permitted during the grace period at the end of your F-1 or J-1 status. If your visa has expired, you must renew it before re-entering the U.S. For more details, visit the <a className="underline" href="https://global.psu.edu/travel" target="_blank" rel="noopener noreferrer">Travel Resources</a> page.
            </p>

            <h5 className="text-lg font-semibold mt-6">Documents to Always Carry with You</h5>
            <p>When traveling within the United States (for example, to another state) — you are required to always carry paper or electronic copies of the following documents with you:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Your passport photo page</li>
              <li>Your most recent <a className="underline" href="https://i94.cbp.dhs.gov/home" target="_blank" rel="noopener noreferrer">I-94</a> arrival record</li>
              <li>Your signed I-20 or DS-2019</li>
              <li>Your visa</li>
            </ul>

            <p className="mt-4 font-semibold">Recommended:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Students: your class schedule for the current semester</li>
              <li>OPT/STEM OPT: your EAD and an employment letter or proof of employment (if applicable)</li>
            </ul>

            <p className="mt-4 font-semibold">Helpful:</p>
            <p>
              A copy of AILA’s <a className="underline" href="https://www.aila.org/aila-files/20036845-F2B6-4749-9E38-E47CBA77C3EE/Know-Your-Rights-2025-Update-2.pdf" target="_blank" rel="noopener noreferrer">Know Your Rights</a> document (PDF) to reference if U.S. immigration officers visit or question you.
            </p>

            <h5 className="text-lg font-semibold mt-6">Inviting Family or Friends to Visit</h5>
            <p>If you would like to invite family or friends to the U.S., provide them with the following documents to support their visitor visa application and interview:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>A letter of invitation from you (in your language and English) that includes the relationship to you, purpose of the visit, dates, where the visitor(s) will sleep and eat, and any other important information.</li>
              <li>Evidence you can support them during the visit if you provide room and board (bank statement, assistantship information, apartment lease, etc.).</li>
              <li>Evidence that you are a full-time student (request enrollment verification through LionPATH).</li>
              <li>Copy of your I-20 or DS-2019.</li>
            </ul>
            <p className="mt-3">Visitors must show ties to their home country and evidence they intend to return abroad and not remain in the U.S.</p>

            <div className="bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-400 p-6 rounded-r-lg mt-6">
              <p className="text-red-700 font-medium">
                <strong>Need help?</strong> Contact Penn State Global / ISSA or submit a question in <a className="underline text-red-700" href="https://istart.gp.psu.edu/istart/controllers/start/StartEngine.cfm" target="_blank" rel="noopener noreferrer">iStart</a>.
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
