import HousingRatings from "@/components/HousingRatings";

export default function HousingGuide() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Housing Information</h1>
      {/* ...other housing info content... */}
      <HousingRatings />
    </div>
  );
}
