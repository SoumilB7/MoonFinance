"use client";

import { useState } from "react";

type LatestNews = {
  headline: string;
  summary: string;
  source: string;
  publishedAt: string | null;
  url: string | null;
};

type CompanyNews = {
  rank: number;
  companyName: string;
  symbol: string;
  industry: string;
  marketCapInCrores: number | null;
  marketCapBasis: string;
  latestNews: LatestNews;
};

type SortOption = "rank" | "market-cap-desc" | "market-cap-asc";

function formatDate(value: string | null) {
  if (!value) {
    return "Not available";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatMarketCap(value: number | null) {
  if (!value || !Number.isFinite(value)) {
    return "Not available";
  }

  if (value >= 100000) {
    return `Rs ${(value / 100000).toFixed(2)} L Cr`;
  }

  return `Rs ${value.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
    minimumFractionDigits: value >= 1000 ? 0 : 2,
  })} Cr`;
}

function sortCompanies(companies: CompanyNews[], sortOption: SortOption) {
  const sortedCompanies = [...companies];

  if (sortOption === "market-cap-desc") {
    sortedCompanies.sort(
      (left, right) => (right.marketCapInCrores ?? -1) - (left.marketCapInCrores ?? -1),
    );
    return sortedCompanies;
  }

  if (sortOption === "market-cap-asc") {
    sortedCompanies.sort(
      (left, right) =>
        (left.marketCapInCrores ?? Number.MAX_SAFE_INTEGER) -
        (right.marketCapInCrores ?? Number.MAX_SAFE_INTEGER),
    );
    return sortedCompanies;
  }

  sortedCompanies.sort((left, right) => left.rank - right.rank);
  return sortedCompanies;
}

function getSortLabel(sortOption: SortOption) {
  if (sortOption === "market-cap-desc") {
    return "Market cap: high to low";
  }

  if (sortOption === "market-cap-asc") {
    return "Market cap: low to high";
  }

  return "NSE list order";
}

export default function CompanyDetailsClient({ companies }: { companies: CompanyNews[] }) {
  const [sortOption, setSortOption] = useState<SortOption>("market-cap-desc");
  const sortedCompanies = sortCompanies(companies, sortOption);

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 rounded-3xl border border-gray-200 bg-gray-50 p-5 text-sm text-gray-600 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p>
            Showing all top 500 companies in a responsive card grid. On desktop, the grid renders
            4 cards per row.
          </p>
          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-gray-400">
            Active sort: {getSortLabel(sortOption)}
          </p>
          <p className="mt-2 text-xs text-gray-500">
            Market-cap sorting uses official NSE market-cap data stored in the JSON.
          </p>
        </div>

        <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
          Sort companies
          <select
            value={sortOption}
            onChange={(event) => setSortOption(event.target.value as SortOption)}
            className="rounded-full border border-gray-300 bg-white px-4 py-3 text-sm text-black outline-none transition focus:border-black"
          >
            <option value="rank">NSE list order</option>
            <option value="market-cap-desc">Market cap: high to low</option>
            <option value="market-cap-asc">Market cap: low to high</option>
          </select>
        </label>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {sortedCompanies.map((company) => (
          <article
            key={company.symbol || `${company.rank}-${company.companyName}`}
            className="flex h-full flex-col rounded-3xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-600">
                  #{company.rank}
                </span>
                <h2 className="mt-3 text-xl font-semibold leading-7 text-black">
                  {company.companyName}
                </h2>
              </div>
              <span className="rounded-full border border-gray-200 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-600">
                {company.symbol || "N/A"}
              </span>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm font-medium text-gray-500">Industry</p>
                <p className="mt-1 text-sm leading-6 text-gray-700">
                  {company.industry || "Industry not available"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Market cap</p>
                <p className="mt-1 text-sm leading-6 text-gray-700">
                  {formatMarketCap(company.marketCapInCrores)}
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-2xl bg-gray-50 p-4">
              <p className="text-sm font-medium text-gray-500">Latest headline</p>
              <p className="mt-2 text-base font-semibold leading-7 text-black">
                {company.latestNews.headline}
              </p>
              <p className="mt-3 text-sm leading-6 text-gray-600">{company.latestNews.summary}</p>
            </div>

            <div className="mt-5 flex flex-1 flex-col justify-end">
              <div className="flex items-center justify-between gap-4 text-sm text-gray-500">
                <span>{company.latestNews.source}</span>
                <span>{formatDate(company.latestNews.publishedAt)}</span>
              </div>

              {company.latestNews.url ? (
                <a
                  href={company.latestNews.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center justify-center rounded-full border border-black px-4 py-2 text-sm font-medium text-black transition hover:bg-black hover:text-white"
                >
                  Read source
                </a>
              ) : (
                <span className="mt-4 inline-flex items-center justify-center rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-400">
                  Source unavailable
                </span>
              )}
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
