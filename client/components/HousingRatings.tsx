import React, { useEffect, useState } from "react";

interface Rating {
  [key: string]: string;
}

const HousingRatings: React.FC = () => {
  const [ratings, setRatings] = useState<Rating[]>([]);

  useEffect(() => {
    fetch("/data/housing-ratings.json")
      .then((res) => res.json())
      .then((data) => setRatings(data));
  }, []);

  if (!ratings.length) return <div>Loading housing ratings...</div>;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Student Ratings & Reviews</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr>
              {Object.keys(ratings[0]).map((header) => (
                <th key={header} className="px-4 py-2 border-b bg-gray-50 text-left text-sm font-semibold text-gray-700">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ratings.map((row, i) => (
              <tr key={i} className="hover:bg-gray-50">
                {Object.values(row).map((val, j) => (
                  <td key={j} className="px-4 py-2 border-b text-sm text-gray-800">{val}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HousingRatings;
