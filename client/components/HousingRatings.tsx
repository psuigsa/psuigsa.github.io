import { useEffect, useMemo, useState } from "react";
import { ChevronDown, ChevronUp, SlidersHorizontal } from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Raw row coming from housing-ratings.json (mirrors the Google Sheet columns). */
interface RawEntry {
  "I am": string;
  "Apartment": string;
  "Enter name of your apartment": string;
  "House rent per month": string;
  "Security deposit": string;
  "Does your apartment have a community space": string;
  "Pet Friendly": string;
  "Behaviour of management/landlord": string;
  "Bus Accessibility": string;
  "Natural light": string;
  "Overall ": string;
  "Anything else you would like to share.": string;
  [key: string]: string;
}

/** All numeric rating fields and their display labels. */
const RATING_FIELDS: { key: keyof RawEntry; label: string }[] = [
  { key: "Overall ", label: "Overall" },
  { key: "Behaviour of management/landlord", label: "Management" },
  { key: "Bus Accessibility", label: "Bus Accessibility" },
  { key: "Natural light", label: "Natural Light" },
];

type SortKey =
  | "Overall "
  | "Behaviour of management/landlord"
  | "Bus Accessibility"
  | "Natural light"
  | "rent"
  | "reviews";

/** Aggregated data per apartment. */
interface ApartmentSummary {
  name: string;
  entries: RawEntry[];
  avgRatings: Record<string, number>;
  rentRange: { min: number; max: number } | null;
  petFriendly: string;
  communitySpace: string;
  reviewCount: number;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function parseNum(val: string | undefined): number | null {
  if (!val) return null;
  const n = parseFloat(val.trim());
  return isNaN(n) ? null : n;
}

function getApartmentName(entry: RawEntry): string {
  const free = entry["Enter name of your apartment"]?.trim();
  const dropdown = entry["Apartment"]?.trim();
  return free || dropdown || "Unknown";
}

function yesNoMajority(values: string[]): string {
  const filled = values.map((v) => v?.trim().toLowerCase()).filter(Boolean);
  if (!filled.length) return "Unknown";
  const yesCount = filled.filter((v) => v === "yes").length;
  const noCount = filled.filter((v) => v === "no").length;
  if (yesCount > 0 && noCount > 0) return "Mixed";
  if (yesCount > 0) return "Yes";
  if (noCount > 0) return "No";
  return "Unknown";
}

function buildSummaries(entries: RawEntry[]): ApartmentSummary[] {
  const map = new Map<string, RawEntry[]>();
  for (const e of entries) {
    const name = getApartmentName(e);
    if (!map.has(name)) map.set(name, []);
    map.get(name)!.push(e);
  }

  const summaries: ApartmentSummary[] = [];
  for (const [name, rows] of map.entries()) {
    const avgRatings: Record<string, number> = {};
    for (const { key } of RATING_FIELDS) {
      const nums = rows
        .map((r) => parseNum(r[key]))
        .filter((n): n is number => n !== null);
      if (nums.length)
        avgRatings[key] = nums.reduce((a, b) => a + b, 0) / nums.length;
    }

    const rents = rows
      .map((r) => parseNum(r["House rent per month"]))
      .filter((n): n is number => n !== null);
    const rentRange = rents.length
      ? { min: Math.min(...rents), max: Math.max(...rents) }
      : null;

    summaries.push({
      name,
      entries: rows,
      avgRatings,
      rentRange,
      petFriendly: yesNoMajority(rows.map((r) => r["Pet Friendly"])),
      communitySpace: yesNoMajority(
        rows.map((r) => r["Does your apartment have a community space"])
      ),
      reviewCount: rows.length,
    });
  }
  return summaries;
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

/** Horizontal score bar for a rating out of 10. */
function ScoreBar({ label, value }: { label: string; value: number }) {
  const pct = Math.round((value / 10) * 100);
  const color =
    value >= 8
      ? "bg-igsa-green"
      : value >= 5
      ? "bg-igsa-saffron"
      : "bg-red-400";
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-700 font-medium">{label}</span>
        <span className="text-gray-600 font-semibold">{value.toFixed(1)}/10</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${color} transition-all`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

/** Badge pill for Yes/No/Mixed attributes. */
function Badge({ label, value }: { label: string; value: string }) {
  const color =
    value === "Yes"
      ? "bg-green-100 text-green-700"
      : value === "No"
      ? "bg-red-50 text-red-500"
      : value === "Mixed"
      ? "bg-yellow-50 text-yellow-600"
      : "bg-gray-100 text-gray-400";
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${color}`}
    >
      {label}: {value}
    </span>
  );
}

/** Expandable list of individual reviews for an apartment. */
function ReviewList({ entries }: { entries: RawEntry[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-4 border-t border-gray-100 pt-4">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 text-sm text-igsa-blue hover:text-igsa-green font-medium transition-colors"
      >
        {open ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
        {open ? "Hide" : "Show"} individual reviews ({entries.length})
      </button>

      {open && (
        <div className="mt-3 space-y-4">
          {entries.map((e, i) => {
            const comment = e["Anything else you would like to share."]?.trim();
            const rent = parseNum(e["House rent per month"]);
            const deposit = e["Security deposit"]?.trim();
            const studentType = e["I am"]?.trim();
            return (
              <div key={i} className="bg-gray-50 rounded-lg p-4 text-sm">
                <div className="flex flex-wrap gap-2 mb-2">
                  {studentType && (
                    <span className="bg-igsa-blue/10 text-igsa-blue text-xs px-2 py-0.5 rounded-full">
                      {studentType}
                    </span>
                  )}
                  {rent && (
                    <span className="bg-gray-200 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                      ${rent}/mo
                    </span>
                  )}
                  {deposit && (
                    <span className="bg-gray-200 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                      Deposit: {deposit}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 mb-2">
                  {RATING_FIELDS.map(({ key, label }) => {
                    const n = parseNum(e[key]);
                    if (n === null) return null;
                    return (
                      <span key={key} className="text-xs text-gray-600">
                        <span className="font-medium">{label}:</span> {n}/10
                      </span>
                    );
                  })}
                </div>
                {comment && (
                  <p className="text-gray-700 italic mt-1">"{comment}"</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function HousingRatings() {
  const [rawData, setRawData] = useState<RawEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortKey, setSortKey] = useState<SortKey>("Overall ");
  const [sortDir, setSortDir] = useState<"desc" | "asc">("desc");
  const [filterPet, setFilterPet] = useState(false);
  const [filterCommunity, setFilterCommunity] = useState(false);
  const [filterType, setFilterType] = useState<
    "all" | "graduate" | "undergraduate"
  >("all");

  useEffect(() => {
    fetch("/data/housing-ratings.json")
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data: RawEntry[]) => {
        setRawData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const summaries = useMemo(() => buildSummaries(rawData), [rawData]);

  const filtered = useMemo(() => {
    let list = [...summaries];

    if (filterPet)
      list = list.filter(
        (a) => a.petFriendly === "Yes" || a.petFriendly === "Mixed"
      );
    if (filterCommunity)
      list = list.filter(
        (a) => a.communitySpace === "Yes" || a.communitySpace === "Mixed"
      );
    if (filterType !== "all") {
      list = list.filter((a) =>
        a.entries.some((e) =>
          e["I am"]?.toLowerCase().includes(filterType)
        )
      );
    }

    list.sort((a, b) => {
      let aVal = 0,
        bVal = 0;
      if (sortKey === "rent") {
        aVal = a.rentRange?.min ?? Infinity;
        bVal = b.rentRange?.min ?? Infinity;
      } else if (sortKey === "reviews") {
        aVal = a.reviewCount;
        bVal = b.reviewCount;
      } else {
        aVal = a.avgRatings[sortKey] ?? 0;
        bVal = b.avgRatings[sortKey] ?? 0;
      }
      return sortDir === "desc" ? bVal - aVal : aVal - bVal;
    });

    return list;
  }, [summaries, filterPet, filterCommunity, filterType, sortKey, sortDir]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "desc" ? "asc" : "desc"));
    } else {
      setSortKey(key);
      setSortDir(key === "rent" ? "asc" : "desc");
    }
  };

  if (loading) {
    return (
      <div className="mt-8 text-center text-gray-500 py-8">
        Loading ratings…
      </div>
    );
  }

  if (!summaries.length) {
    return (
      <div className="mt-10 bg-gray-50 rounded-xl p-8 text-center">
        <p className="text-gray-500 mb-2">No ratings submitted yet.</p>
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSfO-MGtkJVZSdAh1elYPYFBD-1QHOz0PunhNnW31bXatxt-fQ/viewform?usp=sharing&ouid=104265089151019541177"
          target="_blank"
          rel="noopener noreferrer"
          className="text-igsa-blue hover:underline font-medium text-sm"
        >
          Be the first to rate your apartment →
        </a>
      </div>
    );
  }

  const totalReviews = summaries.reduce((s, a) => s + a.reviewCount, 0);

  return (
    <div className="mt-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h4 className="text-xl font-semibold text-igsa-blue">
          Student Ratings &amp; Reviews
          <span className="ml-2 text-sm font-normal text-gray-500">
            ({totalReviews} review{totalReviews !== 1 ? "s" : ""} ·{" "}
            {summaries.length} apartment{summaries.length !== 1 ? "s" : ""})
          </span>
        </h4>
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSfO-MGtkJVZSdAh1elYPYFBD-1QHOz0PunhNnW31bXatxt-fQ/viewform?usp=sharing&ouid=104265089151019541177"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-igsa-blue hover:text-igsa-green font-medium transition-colors shrink-0"
        >
          + Submit your rating
        </a>
      </div>

      {/* Filters & Sort Controls */}
      <div className="bg-gray-50 rounded-xl p-4 mb-6 flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
          <SlidersHorizontal className="w-4 h-4" />
          Sort &amp; Filter:
        </div>

        {/* Sort buttons */}
        {(
          [
            { key: "Overall " as SortKey, label: "Overall" },
            {
              key: "Behaviour of management/landlord" as SortKey,
              label: "Management",
            },
            { key: "Bus Accessibility" as SortKey, label: "Bus" },
            { key: "Natural light" as SortKey, label: "Natural Light" },
            { key: "rent" as SortKey, label: "Rent" },
            { key: "reviews" as SortKey, label: "Most Reviewed" },
          ] as const
        ).map(({ key, label }) => (
          <button
            key={key}
            onClick={() => toggleSort(key)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              sortKey === key
                ? "bg-igsa-blue text-white border-igsa-blue"
                : "bg-white text-gray-600 border-gray-200 hover:border-igsa-blue hover:text-igsa-blue"
            }`}
          >
            {label}
            {sortKey === key &&
              (sortDir === "desc" ? (
                <ChevronDown className="w-3.5 h-3.5" />
              ) : (
                <ChevronUp className="w-3.5 h-3.5" />
              ))}
          </button>
        ))}

        <div className="w-px h-5 bg-gray-300 hidden sm:block" />

        {/* Toggle filters */}
        {(
          [
            { flag: filterPet, setter: setFilterPet, label: "🐾 Pet Friendly" },
            {
              flag: filterCommunity,
              setter: setFilterCommunity,
              label: "🏢 Community Space",
            },
          ] as const
        ).map(({ flag, setter, label }) => (
          <button
            key={label}
            onClick={() => setter((v: boolean) => !v)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              flag
                ? "bg-igsa-green text-white border-igsa-green"
                : "bg-white text-gray-600 border-gray-200 hover:border-igsa-green hover:text-igsa-green"
            }`}
          >
            {label}
          </button>
        ))}

        {/* Student type filter */}
        <select
          value={filterType}
          onChange={(e) =>
            setFilterType(e.target.value as typeof filterType)
          }
          className="px-3 py-1.5 rounded-full text-sm font-medium border border-gray-200 bg-white text-gray-600 hover:border-igsa-blue focus:outline-none focus:border-igsa-blue cursor-pointer transition-colors"
        >
          <option value="all">All students</option>
          <option value="graduate">Graduate</option>
          <option value="undergraduate">Undergraduate</option>
        </select>
      </div>

      {filtered.length === 0 && (
        <div className="text-center text-gray-400 py-6 text-sm">
          No apartments match the selected filters.
        </div>
      )}

      {/* Apartment cards */}
      <div className="space-y-6">
        {filtered.map((apt) => (
          <div
            key={apt.name}
            className="bg-white border border-gray-100 rounded-xl shadow-sm p-6"
          >
            {/* Header row */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
              <div>
                <h5 className="text-lg font-bold text-gray-900">{apt.name}</h5>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge label="Pet Friendly" value={apt.petFriendly} />
                  <Badge label="Community Space" value={apt.communitySpace} />
                  {apt.rentRange && (
                    <span className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full bg-blue-50 text-igsa-blue">
                      {apt.rentRange.min === apt.rentRange.max
                        ? `$${apt.rentRange.min}/mo`
                        : `$${apt.rentRange.min}–$${apt.rentRange.max}/mo`}
                    </span>
                  )}
                  <span className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-500">
                    {apt.reviewCount} review{apt.reviewCount !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>

              {/* Overall score callout */}
              {apt.avgRatings["Overall "] !== undefined && (
                <div className="text-center bg-gradient-to-br from-igsa-saffron/10 to-igsa-orange/10 rounded-xl px-5 py-3 shrink-0">
                  <div className="text-3xl font-bold text-igsa-saffron leading-none">
                    {apt.avgRatings["Overall "].toFixed(1)}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">/ 10 Overall</div>
                </div>
              )}
            </div>

            {/* Score bars (excluding Overall which is shown as the callout) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              {RATING_FIELDS.filter(
                ({ key }) =>
                  key !== "Overall " && apt.avgRatings[key] !== undefined
              ).map(({ key, label }) => (
                <ScoreBar key={key} label={label} value={apt.avgRatings[key]} />
              ))}
            </div>

            <ReviewList entries={apt.entries} />
          </div>
        ))}
      </div>

      <p className="mt-6 text-sm text-gray-400 text-center">
        Ratings are student-submitted and updated automatically every few hours.
      </p>
    </div>
  );
}
