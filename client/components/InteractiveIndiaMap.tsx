import { useState } from "react";
import { cn } from "@/lib/utils";

interface StateInfo {
  name: string;
  capital: string;
  language: string;
  color: string;
}

const stateData: Record<string, StateInfo> = {
  "andhra-pradesh": { name: "Andhra Pradesh", capital: "Amaravati", language: "Telugu", color: "fill-igsa-saffron" },
  "arunachal-pradesh": { name: "Arunachal Pradesh", capital: "Itanagar", language: "Hindi", color: "fill-igsa-orange" },
  "assam": { name: "Assam", capital: "Dispur", language: "Assamese", color: "fill-igsa-green" },
  "bihar": { name: "Bihar", capital: "Patna", language: "Hindi", color: "fill-igsa-blue" },
  "chhattisgarh": { name: "Chhattisgarh", capital: "Raipur", language: "Hindi", color: "fill-igsa-saffron" },
  "goa": { name: "Goa", capital: "Panaji", language: "Konkani", color: "fill-igsa-orange" },
  "gujarat": { name: "Gujarat", capital: "Gandhinagar", language: "Gujarati", color: "fill-igsa-green" },
  "haryana": { name: "Haryana", capital: "Chandigarh", language: "Hindi", color: "fill-igsa-blue" },
  "himachal-pradesh": { name: "Himachal Pradesh", capital: "Shimla", language: "Hindi", color: "fill-igsa-saffron" },
  "jharkhand": { name: "Jharkhand", capital: "Ranchi", language: "Hindi", color: "fill-igsa-orange" },
  "karnataka": { name: "Karnataka", capital: "Bengaluru", language: "Kannada", color: "fill-igsa-green" },
  "kerala": { name: "Kerala", capital: "Thiruvananthapuram", language: "Malayalam", color: "fill-igsa-blue" },
  "madhya-pradesh": { name: "Madhya Pradesh", capital: "Bhopal", language: "Hindi", color: "fill-igsa-saffron" },
  "maharashtra": { name: "Maharashtra", capital: "Mumbai", language: "Marathi", color: "fill-igsa-orange" },
  "manipur": { name: "Manipur", capital: "Imphal", language: "Manipuri", color: "fill-igsa-green" },
  "meghalaya": { name: "Meghalaya", capital: "Shillong", language: "English", color: "fill-igsa-blue" },
  "mizoram": { name: "Mizoram", capital: "Aizawl", language: "Mizo", color: "fill-igsa-saffron" },
  "nagaland": { name: "Nagaland", capital: "Kohima", language: "English", color: "fill-igsa-orange" },
  "odisha": { name: "Odisha", capital: "Bhubaneswar", language: "Odia", color: "fill-igsa-green" },
  "punjab": { name: "Punjab", capital: "Chandigarh", language: "Punjabi", color: "fill-igsa-blue" },
  "rajasthan": { name: "Rajasthan", capital: "Jaipur", language: "Hindi", color: "fill-igsa-saffron" },
  "sikkim": { name: "Sikkim", capital: "Gangtok", language: "Nepali", color: "fill-igsa-orange" },
  "tamil-nadu": { name: "Tamil Nadu", capital: "Chennai", language: "Tamil", color: "fill-igsa-green" },
  "telangana": { name: "Telangana", capital: "Hyderabad", language: "Telugu", color: "fill-igsa-blue" },
  "tripura": { name: "Tripura", capital: "Agartala", language: "Bengali", color: "fill-igsa-saffron" },
  "uttar-pradesh": { name: "Uttar Pradesh", capital: "Lucknow", language: "Hindi", color: "fill-igsa-orange" },
  "uttarakhand": { name: "Uttarakhand", capital: "Dehradun", language: "Hindi", color: "fill-igsa-green" },
  "west-bengal": { name: "West Bengal", capital: "Kolkata", language: "Bengali", color: "fill-igsa-blue" }
};

export default function InteractiveIndiaMap() {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [hoveredState, setHoveredState] = useState<string | null>(null);

  const handleStateClick = (stateId: string) => {
    setSelectedState(selectedState === stateId ? null : stateId);
  };

  const handleStateHover = (stateId: string | null) => {
    setHoveredState(stateId);
  };

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-igsa-saffron/10 via-igsa-orange/5 to-igsa-green/10"></div>
      
      {/* Interactive India Map */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30 hover:opacity-60 transition-opacity duration-500">
        <svg
          viewBox="0 0 800 600"
          className="w-full h-full max-w-4xl max-h-96"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Simplified India Map - Major States */}
          
          {/* Rajasthan */}
          <path
            id="rajasthan"
            d="M150 200 L250 180 L280 220 L260 280 L200 300 L120 280 Z"
            className={cn(
              "transition-all duration-300 cursor-pointer stroke-gray-400 stroke-1",
              hoveredState === "rajasthan" ? "fill-igsa-saffron scale-105" : "fill-igsa-saffron/50",
              selectedState === "rajasthan" && "fill-igsa-saffron animate-pulse"
            )}
            onClick={() => handleStateClick("rajasthan")}
            onMouseEnter={() => handleStateHover("rajasthan")}
            onMouseLeave={() => handleStateHover(null)}
          />
          
          {/* Gujarat */}
          <path
            id="gujarat"
            d="M80 280 L150 260 L180 320 L140 380 L80 360 Z"
            className={cn(
              "transition-all duration-300 cursor-pointer stroke-gray-400 stroke-1",
              hoveredState === "gujarat" ? "fill-igsa-green scale-105" : "fill-igsa-green/50",
              selectedState === "gujarat" && "fill-igsa-green animate-pulse"
            )}
            onClick={() => handleStateClick("gujarat")}
            onMouseEnter={() => handleStateHover("gujarat")}
            onMouseLeave={() => handleStateHover(null)}
          />
          
          {/* Maharashtra */}
          <path
            id="maharashtra"
            d="M180 320 L280 300 L320 360 L280 420 L200 440 L160 380 Z"
            className={cn(
              "transition-all duration-300 cursor-pointer stroke-gray-400 stroke-1",
              hoveredState === "maharashtra" ? "fill-igsa-orange scale-105" : "fill-igsa-orange/50",
              selectedState === "maharashtra" && "fill-igsa-orange animate-pulse"
            )}
            onClick={() => handleStateClick("maharashtra")}
            onMouseEnter={() => handleStateHover("maharashtra")}
            onMouseLeave={() => handleStateHover(null)}
          />
          
          {/* Karnataka */}
          <path
            id="karnataka"
            d="M200 440 L280 420 L300 480 L260 520 L200 500 Z"
            className={cn(
              "transition-all duration-300 cursor-pointer stroke-gray-400 stroke-1",
              hoveredState === "karnataka" ? "fill-igsa-blue scale-105" : "fill-igsa-blue/50",
              selectedState === "karnataka" && "fill-igsa-blue animate-pulse"
            )}
            onClick={() => handleStateClick("karnataka")}
            onMouseEnter={() => handleStateHover("karnataka")}
            onMouseLeave={() => handleStateHover(null)}
          />
          
          {/* Tamil Nadu */}
          <path
            id="tamil-nadu"
            d="M260 520 L320 500 L340 560 L300 580 L260 560 Z"
            className={cn(
              "transition-all duration-300 cursor-pointer stroke-gray-400 stroke-1",
              hoveredState === "tamil-nadu" ? "fill-igsa-saffron scale-105" : "fill-igsa-saffron/50",
              selectedState === "tamil-nadu" && "fill-igsa-saffron animate-pulse"
            )}
            onClick={() => handleStateClick("tamil-nadu")}
            onMouseEnter={() => handleStateHover("tamil-nadu")}
            onMouseLeave={() => handleStateHover(null)}
          />
          
          {/* Kerala */}
          <path
            id="kerala"
            d="M240 560 L260 520 L280 560 L260 580 Z"
            className={cn(
              "transition-all duration-300 cursor-pointer stroke-gray-400 stroke-1",
              hoveredState === "kerala" ? "fill-igsa-green scale-105" : "fill-igsa-green/50",
              selectedState === "kerala" && "fill-igsa-green animate-pulse"
            )}
            onClick={() => handleStateClick("kerala")}
            onMouseEnter={() => handleStateHover("kerala")}
            onMouseLeave={() => handleStateHover(null)}
          />
          
          {/* Uttar Pradesh */}
          <path
            id="uttar-pradesh"
            d="M280 220 L400 200 L420 260 L380 300 L300 280 Z"
            className={cn(
              "transition-all duration-300 cursor-pointer stroke-gray-400 stroke-1",
              hoveredState === "uttar-pradesh" ? "fill-igsa-orange scale-105" : "fill-igsa-orange/50",
              selectedState === "uttar-pradesh" && "fill-igsa-orange animate-pulse"
            )}
            onClick={() => handleStateClick("uttar-pradesh")}
            onMouseEnter={() => handleStateHover("uttar-pradesh")}
            onMouseLeave={() => handleStateHover(null)}
          />
          
          {/* Madhya Pradesh */}
          <path
            id="madhya-pradesh"
            d="M280 280 L380 260 L400 320 L360 360 L280 340 Z"
            className={cn(
              "transition-all duration-300 cursor-pointer stroke-gray-400 stroke-1",
              hoveredState === "madhya-pradesh" ? "fill-igsa-blue scale-105" : "fill-igsa-blue/50",
              selectedState === "madhya-pradesh" && "fill-igsa-blue animate-pulse"
            )}
            onClick={() => handleStateClick("madhya-pradesh")}
            onMouseEnter={() => handleStateHover("madhya-pradesh")}
            onMouseLeave={() => handleStateHover(null)}
          />
          
          {/* West Bengal */}
          <path
            id="west-bengal"
            d="M480 300 L520 280 L540 340 L500 360 Z"
            className={cn(
              "transition-all duration-300 cursor-pointer stroke-gray-400 stroke-1",
              hoveredState === "west-bengal" ? "fill-igsa-saffron scale-105" : "fill-igsa-saffron/50",
              selectedState === "west-bengal" && "fill-igsa-saffron animate-pulse"
            )}
            onClick={() => handleStateClick("west-bengal")}
            onMouseEnter={() => handleStateHover("west-bengal")}
            onMouseLeave={() => handleStateHover(null)}
          />
          
          {/* Bihar */}
          <path
            id="bihar"
            d="M420 260 L480 240 L500 280 L460 300 L420 280 Z"
            className={cn(
              "transition-all duration-300 cursor-pointer stroke-gray-400 stroke-1",
              hoveredState === "bihar" ? "fill-igsa-green scale-105" : "fill-igsa-green/50",
              selectedState === "bihar" && "fill-igsa-green animate-pulse"
            )}
            onClick={() => handleStateClick("bihar")}
            onMouseEnter={() => handleStateHover("bihar")}
            onMouseLeave={() => handleStateHover(null)}
          />
          
          {/* Punjab */}
          <path
            id="punjab"
            d="M260 160 L320 140 L340 180 L300 200 L280 180 Z"
            className={cn(
              "transition-all duration-300 cursor-pointer stroke-gray-400 stroke-1",
              hoveredState === "punjab" ? "fill-igsa-orange scale-105" : "fill-igsa-orange/50",
              selectedState === "punjab" && "fill-igsa-orange animate-pulse"
            )}
            onClick={() => handleStateClick("punjab")}
            onMouseEnter={() => handleStateHover("punjab")}
            onMouseLeave={() => handleStateHover(null)}
          />
          
          {/* Haryana */}
          <path
            id="haryana"
            d="M300 180 L340 160 L360 200 L320 220 Z"
            className={cn(
              "transition-all duration-300 cursor-pointer stroke-gray-400 stroke-1",
              hoveredState === "haryana" ? "fill-igsa-blue scale-105" : "fill-igsa-blue/50",
              selectedState === "haryana" && "fill-igsa-blue animate-pulse"
            )}
            onClick={() => handleStateClick("haryana")}
            onMouseEnter={() => handleStateHover("haryana")}
            onMouseLeave={() => handleStateHover(null)}
          />
          
          {/* Assam */}
          <path
            id="assam"
            d="M580 260 L620 240 L640 280 L600 300 Z"
            className={cn(
              "transition-all duration-300 cursor-pointer stroke-gray-400 stroke-1",
              hoveredState === "assam" ? "fill-igsa-green scale-105" : "fill-igsa-green/50",
              selectedState === "assam" && "fill-igsa-green animate-pulse"
            )}
            onClick={() => handleStateClick("assam")}
            onMouseEnter={() => handleStateHover("assam")}
            onMouseLeave={() => handleStateHover(null)}
          />
        </svg>
      </div>

      {/* State Information Popup */}
      {selectedState && stateData[selectedState] && (
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-2xl border border-igsa-saffron/20 animate-fade-in z-20 max-w-xs">
          <h3 className="text-xl font-bold text-igsa-saffron mb-2">
            {stateData[selectedState].name}
          </h3>
          <div className="space-y-1 text-sm text-gray-700">
            <p><span className="font-medium">Capital:</span> {stateData[selectedState].capital}</p>
            <p><span className="font-medium">Language:</span> {stateData[selectedState].language}</p>
          </div>
          <button
            onClick={() => setSelectedState(null)}
            className="mt-3 text-xs text-igsa-blue hover:text-igsa-saffron transition-colors"
          >
            Click to close
          </button>
        </div>
      )}

      {/* Hover tooltip */}
      {hoveredState && stateData[hoveredState] && !selectedState && (
        <div className="absolute top-4 left-4 bg-black/80 text-white px-3 py-1 rounded-lg text-sm animate-fade-in z-10">
          {stateData[hoveredState].name}
        </div>
      )}
    </div>
  );
}
