import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { read, utils } from "xlsx";

const NSE_COMPANY_LIST_URL =
  "https://nsearchives.nseindia.com/content/indices/ind_nifty500list.csv";
const GOOGLE_NEWS_RSS_BASE_URL = "https://news.google.com/rss/search";
const NSE_MARKET_CAP_URL =
  "https://nsearchives.nseindia.com//web/mediaattachment/2026-01/Average_MCAP_July2025ToDecember2025_20260102201101.xlsx";
const NSE_MARKET_CAP_FALLBACK_URL =
  "https://nsearchives.nseindia.com/web/sites/default/files/inline-files/Top%20500%20Companies%20as%20on%2031.03.2025_0.xlsx";
const MARKET_CAP_BASIS = "Average market capitalisation from 2025-07-01 to 2025-12-31";
const MARKET_CAP_FALLBACK_BASIS = "Market cap snapshot as of 2025-03-31";
const OUTPUT_FILE = path.resolve(process.cwd(), "data/company-news.json");
const REQUEST_HEADERS = {
  "user-agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36",
  accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "accept-language": "en-IN,en;q=0.9",
  "cache-control": "no-cache",
};
const NEWS_CONCURRENCY = 8;
const NEWS_WINDOW = "30d";

function parseCsvRow(row) {
  const values = [];
  let current = "";
  let inQuotes = false;

  for (let index = 0; index < row.length; index += 1) {
    const character = row[index];

    if (character === '"') {
      const isEscapedQuote = inQuotes && row[index + 1] === '"';

      if (isEscapedQuote) {
        current += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }

      continue;
    }

    if (character === "," && !inQuotes) {
      values.push(current.trim());
      current = "";
      continue;
    }

    current += character;
  }

  values.push(current.trim());
  return values;
}

function parseCsv(csvText) {
  const rows = csvText
    .split(/\r?\n/)
    .map((row) => row.trim())
    .filter(Boolean);

  if (rows.length === 0) {
    return [];
  }

  const headers = parseCsvRow(rows[0]);

  return rows.slice(1).map((row) => {
    const values = parseCsvRow(row);

    return headers.reduce((record, header, index) => {
      record[header] = values[index] ?? "";
      return record;
    }, {});
  });
}

function stripCdata(value) {
  return value
    .replace(/^<!\[CDATA\[/, "")
    .replace(/\]\]>$/, "")
    .trim();
}

function decodeHtmlEntities(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function stripHtml(value) {
  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function extractTag(block, tagName) {
  const matcher = new RegExp(`<${tagName}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tagName}>`, "i");
  const match = block.match(matcher);

  if (!match) {
    return "";
  }

  return stripHtml(decodeHtmlEntities(stripCdata(match[1])));
}

function formatSourceFromTitle(title) {
  const parts = title.split(" - ").map((part) => part.trim()).filter(Boolean);
  return parts.length > 1 ? parts[parts.length - 1] : "";
}

function formatHeadline(title, source) {
  if (!source) {
    return title;
  }

  const suffix = ` - ${source}`;
  return title.endsWith(suffix) ? title.slice(0, -suffix.length).trim() : title;
}

function buildSummary(companyName, headline) {
  if (!headline) {
    return `No recent headline was found for ${companyName} during this sync run.`;
  }

  return `Latest tracked headline for ${companyName}: ${headline}`;
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: REQUEST_HEADERS,
    redirect: "follow",
  });

  if (!response.ok) {
    throw new Error(`Request failed with ${response.status} for ${url}`);
  }

  return response.text();
}

async function fetchBuffer(url) {
  const response = await fetch(url, {
    headers: REQUEST_HEADERS,
    redirect: "follow",
  });

  if (!response.ok) {
    throw new Error(`Request failed with ${response.status} for ${url}`);
  }

  return Buffer.from(await response.arrayBuffer());
}

async function fetchCompanyList() {
  const csvText = await fetchText(NSE_COMPANY_LIST_URL);
  const rows = parseCsv(csvText);

  return rows.map((row, index) => ({
    rank: index + 1,
    companyName: row["Company Name"] || row["Company Name "],
    symbol: row.Symbol || "",
    industry: row.Industry || "",
    series: row.Series || "",
    isin: row["ISIN Code"] || "",
  }));
}

function parseNumber(value) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value !== "string") {
    return null;
  }

  const parsed = Number(value.replace(/,/g, "").trim());
  return Number.isFinite(parsed) ? parsed : null;
}

function normalizeCompanyName(name) {
  return String(name)
    .toUpperCase()
    .replace(/\bLIMITED\b/g, "")
    .replace(/\bLTD\b/g, "")
    .replace(/\bLTD\.\b/g, "")
    .replace(/[^A-Z0-9]/g, "");
}

async function fetchMarketCapMap() {
  const workbookBuffer = await fetchBuffer(NSE_MARKET_CAP_URL);
  const workbook = read(workbookBuffer, { type: "buffer" });
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = utils.sheet_to_json(worksheet, { defval: "" });
  const marketCapMap = new Map();

  for (const row of rows) {
    const symbol = String(row.Symbol || "").trim();

    if (!symbol) {
      continue;
    }

    const marketCapInLakhs = parseNumber(
      row["Average market capitalisation from July  01, 2025 to December 31, 2025 (Rs. In lakhs)"],
    );

    marketCapMap.set(symbol, {
      marketCapInCrores:
        marketCapInLakhs !== null ? Number((marketCapInLakhs / 100).toFixed(2)) : null,
      marketCapBasis: MARKET_CAP_BASIS,
    });
  }

  return marketCapMap;
}

async function fetchFallbackMarketCapMap() {
  const workbookBuffer = await fetchBuffer(NSE_MARKET_CAP_FALLBACK_URL);
  const workbook = read(workbookBuffer, { type: "buffer" });
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = utils.sheet_to_json(worksheet, { defval: "" });
  const marketCapMap = new Map();
  const marketCapNameMatches = [];

  for (const row of rows) {
    const isin = String(row.ISIN || "").trim();
    const companyName = String(row["Company Name"] || "").trim();
    const marketCapRecord = {
      marketCapInCrores: parseNumber(row["Market cap as on 31.03.2025 (Rs in Crores)"]),
      marketCapBasis: MARKET_CAP_FALLBACK_BASIS,
    };

    if (!isin) {
      if (companyName) {
        marketCapNameMatches.push({
          companyName: normalizeCompanyName(companyName),
          ...marketCapRecord,
        });
      }

      continue;
    }

    marketCapMap.set(isin, marketCapRecord);
    marketCapNameMatches.push({
      companyName: normalizeCompanyName(companyName),
      ...marketCapRecord,
    });
  }

  return {
    byIsin: marketCapMap,
    byName: marketCapNameMatches,
  };
}

function parseLatestNews(xmlText, companyName) {
  const matches = [...xmlText.matchAll(/<item>([\s\S]*?)<\/item>/gi)];
  const firstItem = matches[0]?.[1];

  if (!firstItem) {
    return {
      headline: "No recent headline found during sync.",
      summary: buildSummary(companyName, ""),
      source: "Google News",
      publishedAt: null,
      url: null,
    };
  }

  const rawTitle = extractTag(firstItem, "title");
  const source = extractTag(firstItem, "source") || formatSourceFromTitle(rawTitle) || "Google News";
  const headline = formatHeadline(rawTitle, source);
  const publishedAt = extractTag(firstItem, "pubDate") || null;
  const url = extractTag(firstItem, "link") || null;

  return {
    headline,
    summary: buildSummary(companyName, headline),
    source,
    publishedAt,
    url,
  };
}

async function fetchCompanyNews(company) {
  const query = `"${company.companyName}" India when:${NEWS_WINDOW}`;
  const url = `${GOOGLE_NEWS_RSS_BASE_URL}?q=${encodeURIComponent(
    query,
  )}&hl=en-IN&gl=IN&ceid=IN:en`;

  try {
    const rssText = await fetchText(url);
    const latestNews = parseLatestNews(rssText, company.companyName);

    return {
      ...company,
      latestNews,
    };
  } catch (error) {
    return {
      ...company,
      latestNews: {
        headline: "Unable to fetch headline during sync.",
        summary: buildSummary(company.companyName, ""),
        source: "Google News",
        publishedAt: null,
        url: null,
      },
      syncError: error instanceof Error ? error.message : "Unknown news sync error",
    };
  }
}

async function mapWithConcurrency(items, concurrency, mapper) {
  const results = new Array(items.length);
  let nextIndex = 0;

  const workers = Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (true) {
      const currentIndex = nextIndex;
      nextIndex += 1;

      if (currentIndex >= items.length) {
        break;
      }

      results[currentIndex] = await mapper(items[currentIndex], currentIndex);

      if ((currentIndex + 1) % 25 === 0 || currentIndex === items.length - 1) {
        console.log(`Synced ${currentIndex + 1}/${items.length} companies`);
      }
    }
  });

  await Promise.all(workers);
  return results;
}

async function main() {
  console.log("Fetching NSE Nifty 500 company list...");
  const companies = await fetchCompanyList();

  if (companies.length === 0) {
    throw new Error("The NSE company list came back empty.");
  }

  console.log("Fetching market caps...");
  const marketCapMap = await fetchMarketCapMap();
  const fallbackMarketCapMap = await fetchFallbackMarketCapMap();
  const companiesWithMarketCap = companies.map((company) => {
    const normalizedCompanyName = normalizeCompanyName(company.companyName);
    const fallbackByName = fallbackMarketCapMap.byName.find(
      (record) =>
        record.companyName === normalizedCompanyName ||
        record.companyName.startsWith(normalizedCompanyName) ||
        normalizedCompanyName.startsWith(record.companyName),
    );
    const marketCapRecord =
      marketCapMap.get(company.symbol) ||
      fallbackMarketCapMap.byIsin.get(company.isin) ||
      fallbackByName || {
      marketCapInCrores: null,
      marketCapBasis: MARKET_CAP_BASIS,
    };

    return {
      ...company,
      marketCapInCrores: marketCapRecord.marketCapInCrores,
      marketCapBasis: marketCapRecord.marketCapBasis,
    };
  });

  console.log(`Fetched ${companies.length} companies. Syncing latest headlines...`);
  const enrichedCompanies = await mapWithConcurrency(
    companiesWithMarketCap,
    NEWS_CONCURRENCY,
    async (company) => fetchCompanyNews(company),
  );

  const dataset = {
    generatedAt: new Date().toISOString(),
    sources: {
      companies: NSE_COMPANY_LIST_URL,
      news: "Google News RSS search",
      marketCaps: `${NSE_MARKET_CAP_URL} | fallback: ${NSE_MARKET_CAP_FALLBACK_URL}`,
    },
    companies: enrichedCompanies,
  };

  await mkdir(path.dirname(OUTPUT_FILE), { recursive: true });
  await writeFile(OUTPUT_FILE, `${JSON.stringify(dataset, null, 2)}\n`, "utf8");

  console.log(`Wrote company news JSON to ${OUTPUT_FILE}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
