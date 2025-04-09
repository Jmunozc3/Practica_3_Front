import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Card from "../components/Card.tsx";
import Axios from "https://esm.sh/axios@1.8.1";

const featuredBooks: string[] = [
  "To Kill a Mockingbird",
  "1984",
  "The Great Gatsby",
  "Pride and Prejudice",
  "The Hobbit",
  "Moby-Dick",
  "Jane Eyre",
  "War and Peace",
  "The Catcher in the Rye",
  "Brave New World",
  "The Lord of the Rings",
  "Crime and Punishment",
  "The Alchemist",
  "The Picture of Dorian Gray",
  "Harry Potter and the Sorcerer's Stone",
];

type Book = {
  id: string;
  cover_i?: number;
  title: string;
  author: string;
};

export const handler: Handlers<Book[]> = {
  async GET(_req: Request, ctx: FreshContext) {
    const results: Book[] = [];

    for (const title of featuredBooks) {
      const res = await Axios.get(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(title)}`,
      );
      const book = res.data.docs[0];

      if (book) {
        results.push({
          id: book.key.replace("/works/", ""),
          cover_i: book.cover_i,
          title: book.title,
          author: book.author_name ? book.author_name[0] : "Unknown Author",
        });
      }
    }

    return ctx.render(results);
  },
};

const Page = (props: PageProps<Book[]>) => {
  const books = props.data;

  return (
    <div class="books-grid">
      {books.map((book) => (
        <Card
          book={book}
        />
      ))}
    </div>
  );
};

export default Page;
