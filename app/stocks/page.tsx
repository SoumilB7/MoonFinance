import CompanyDetailsClient from "@/app/stocks/CompanyDetailsClient";
import Footer from "@/app/components/Footer";
import companyNewsData from "@/data/company-news.json";

type CompanyNews = {
  rank: number;
  companyName: string;
  symbol: string;
  industry: string;
  marketCapInCrores: number | null;
  marketCapBasis: string;
  latestNews: {
    headline: string;
    summary: string;
    source: string;
    publishedAt: string | null;
    url: string | null;
  };
};

type CompanyNewsDataset = {
  generatedAt: string;
  sources: {
    companies: string;
    news: string;
    marketCaps?: string;
  };
  companies: CompanyNews[];
};

const dataset = companyNewsData as CompanyNewsDataset;

function formatGeneratedAt(value: string) {
  if (!value) {
    return "Pending first sync";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function getIndustryCount(companies: CompanyNews[]) {
  return new Set(companies.map((company) => company.industry).filter(Boolean)).size;
}

function getMarketCapCoverage(companies: CompanyNews[]) {
  return companies.filter((company) => company.marketCapInCrores !== null).length;
}

export default function CompanyDetailsPage() {
  const companies = dataset.companies;

  return (
    <main className="min-h-screen bg-white text-black">
      <section className="border-b border-gray-200 bg-gradient-to-b from-white to-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-gray-200 bg-white px-4 py-1 text-sm font-medium text-gray-700">
              Company Details
            </span>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-black">
              India&apos;s Top 500 Companies and Their Latest Headlines
            </h1>
            <p className="mt-4 text-base leading-7 text-gray-600">
              A card-based view of the NSE top 500 companies, paired with the most recent tracked
              headline for each company and official NSE market-cap data stored in the dataset.
              The layout stays in line with the existing Moon Finance aesthetic and shows 4 cards
              per row on desktop.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-gray-500">Tracked companies</p>
              <p className="mt-2 text-3xl font-semibold text-black">{companies.length}</p>
            </div>
            <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-gray-500">Industries covered</p>
              <p className="mt-2 text-3xl font-semibold text-black">{getIndustryCount(companies)}</p>
            </div>
            <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-gray-500">Last refreshed</p>
              <p className="mt-2 text-lg font-semibold text-black">{formatGeneratedAt(dataset.generatedAt)}</p>
            </div>
            <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-gray-500">Market cap source</p>
              <p className="mt-2 text-lg font-semibold text-black">
                Official NSE data
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="mb-6 text-sm text-gray-600">
          <p>Data refresh timestamp: {formatGeneratedAt(dataset.generatedAt)}</p>
          <p className="mt-1">
            Market-cap coverage: {getMarketCapCoverage(companies)}/{companies.length} companies
          </p>
        </div>

        <CompanyDetailsClient companies={companies} />
      </section>

      <Footer />
    </main>
  );
}
