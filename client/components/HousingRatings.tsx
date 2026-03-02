import { useEffect, useState } from "react";
import { Star } from "lucide-react";

interface RatingEntry {
  [key: string]: string;
}

/** Returns true if the value looks like a numeric star rating (1–5). */
function isStarRating(value: string): boolean {
  const num = parseFloat(value);
  return !isNaN(num) && num >= 1 && num <= 5;
}

/** Renders filled/half/empty stars for a value between 1 and 5. */
function StarDisplay({ value }: { value: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i <= Math.round(value)
              ? "fill-igsa-saffron text-igsa-saffron"
              : "text-gray-300"
          }`}
        />
      ))}
      <span className="ml-1 text-sm text-gray-600">({value.toFixed(1)})</span>
    </span>
  );
}

export default function HousingRatings() {
  const [ratings, setRatings] = useState<RatingEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/data/housing-ratings.json")
      .then((res) => {
        if (!res.ok) throw new Error("Ratings data not available yet.");
        return res.json();
      })
      .then((data: RatingEntry[]) => {
        setRatings(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="mt-8 text-center text-gray-500 py-8">
        Loading ratings…
      </div>
    );
  }

  if (error || ratings.length === 0) {
    return (
      <div className="mt-8 text-center text-gray-400 py-8">
        No ratings available yet. Be the first to{" "}
        <a
          href="https://docs.google.com/spreadsheets/d/1LF_Fj7MqPxDGmKMf4171YIHshCoBOEk-jyrn2byhW-g"
          target="_blank"
          rel="noopener noreferrer"
          className="text-igsa-blue hover:underline"
        >
          submit a review
        </a>
        .
      </div>
    );
  }

  const headers = Object.keys(ratings[0]);

  // Determine which columns are rating columns vs text columns
  const ratingColumns = headers.filter((h) =>
    ratings.some((r) => isStarRating(r[h]))
  );
  const textColumns = headers.filter((h) => !ratingColumns.includes(h));

  return (
    <div className="mt-10">
      <h4 className="text-xl font-semibold mb-6 text-igsa-blue">
        Student Ratings &amp; Reviews
      </h4>

      <div className="space-y-6">
        {ratings.map((entry, idx) => {
          // Use the first text column as a title (e.g. apartment name)
          const titleKey = textColumns[0];
          const title = titleKey ? entry[titleKey] : `Entry ${idx + 1}`;

          return (
            <div
              key={idx}
              className="bg-white border border-gray-100 rounded-xl shadow-sm p-6"
            >
              {/* Title */}
              {titleKey && (
                <h5 className="text-lg font-semibold text-gray-900 mb-4">
                  {title}
                </h5>
              )}

              {/* Star ratings */}
              {ratingColumns.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  {ratingColumns.map((col) => {
                    const val = parseFloat(entry[col]);
                    if (isNaN(val)) return null;
                    return (
                      <div key={col} className="flex flex-col gap-1">
                        <span className="text-sm font-medium text-gray-700">
                          {col}
                        </span>
                        <StarDisplay value={val} />
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Remaining text fields (skip the title field) */}
              {textColumns.slice(1).map((col) =>
                entry[col] ? (
                  <div key={col} className="mt-3">
                    <span className="text-sm font-medium text-gray-700">
                      {col}:{" "}
                    </span>
                    <span className="text-sm text-gray-600">{entry[col]}</span>
                  </div>
                ) : null
              )}
            </div>
          );
        })}
      </div>

      <p className="mt-6 text-sm text-gray-500 text-center">
        Have you lived here?{" "}
        <a
          href="https://docs.google.com/spreadsheets/d/1LF_Fj7MqPxDGmKMf4171YIHshCoBOEk-jyrn2byhW-g"
          target="_blank"
          rel="noopener noreferrer"
          className="text-igsa-blue hover:underline font-medium"
        >
          Submit your own rating →
        </a>
      </p>
    </div>
  );
}
