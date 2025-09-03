import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { ArrowLeft, Construction, MessageCircle } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description: string;
  backLink: string;
  backText: string;
}

export default function PlaceholderPage({ 
  title, 
  description, 
  backLink, 
  backText 
}: PlaceholderPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navigation />
      
      <section className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Back Navigation */}
            <Link
              to={backLink}
              className="inline-flex items-center text-igsa-blue hover:text-igsa-saffron transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to {backText}
            </Link>

            {/* Construction Icon */}
            <div className="w-24 h-24 bg-gradient-to-br from-igsa-saffron to-igsa-orange rounded-full flex items-center justify-center mx-auto mb-8">
              <Construction className="w-12 h-12 text-white" />
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {title}
            </h1>

            {/* Description */}
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              {description}
            </p>

            {/* Status Message */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Coming Soon!
              </h2>
              <p className="text-gray-600 mb-6">
                We're working hard to bring you comprehensive resources and information for this section. 
                This page will be filled with detailed guides, tips, and everything you need to know.
              </p>
              <div className="flex items-center justify-center text-igsa-saffron">
                <MessageCircle className="w-5 h-5 mr-2" />
                <span className="font-medium">Have specific questions? Reach out to us!</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to={backLink}
                className="bg-gradient-to-r from-igsa-saffron to-igsa-orange text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-shadow"
              >
                Browse Other Resources
              </Link>
              <Link
                to="/about"
                className="border-2 border-igsa-blue text-igsa-blue px-8 py-3 rounded-full font-semibold hover:bg-igsa-blue hover:text-white transition-colors"
              >
                Contact IGSA
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
