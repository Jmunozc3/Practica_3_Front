import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Axios from "https://esm.sh/axios@1.8.1";
import { SearchResults } from "../../components/SearchResults.tsx";

type SearchResult = {
  key: string;
  cover_i?: number;
  title?: string;
  author_name?: string[];
};

type SearchResponse = {
  docs: SearchResult[];
};

type SearchPageData = {
  query: string;
  results: SearchResult[];
};

export const handler: Handlers<SearchPageData> = {
  async GET(req, ctx: FreshContext) {

    const url = new URL(req.url);
    const query = url.searchParams.get("q") || "";
    let results: SearchResult[] = [];

    if (query) {
      const res = await Axios.get<SearchResponse>(
       `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
      );
      results = res.data.docs.slice(0, 12);
    }

    return ctx.render({ query, results });
  },
};

export default function SearchPage({ data }: PageProps<SearchPageData>) {
  const { query, results } = data;
  return <SearchResults query={query} results={results} />;
}