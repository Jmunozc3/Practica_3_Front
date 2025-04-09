import { FunctionalComponent } from "preact/src/index.js";
import Card from "./Card.tsx";

type SearchResult = {
  key: string;
  cover_i?: number;
  title?: string;
  author_name?: string[];
};

type SearchResultsProps = {
  query: string;
  results: SearchResult[];
};

export const SearchResults: FunctionalComponent<SearchResultsProps> = ({
  query,
  results,
}) => {
  return (
    <div>
      <div class="searchContainer">
        <h1>Search Books in Library</h1>
        <form action="/search" method="GET">
          <input
            type="text"
            name="q"
            placeholder="Search titles"
            defaultValue={query}
          />
          <button type="submit">Buscar</button>
        </form>
      </div>
      {query && results.length === 0
        ? <p>No se encontraron libros con ese título.</p>
        : (
          <div class="books-grid">
            {results.map((result) => (
              <Card
                key={result.key}
                book={{
                  id: result.key.replace("/works/", ""),
                  title: result.title || "Not available",
                  cover_i: result.cover_i,
                  author: result.author_name
                    ? result.author_name[0]
                    : "Unknown",
                }}
              />
            ))}
          </div>
        )}
    </div>
  );
};