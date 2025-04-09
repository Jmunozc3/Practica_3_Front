import { FreshContext, PageProps } from "$fresh/server.ts";
import Axios from "https://esm.sh/axios@1.8.1";
import Book from "../../components/Book.tsx";

type BookDetails = {
  title: string;
  description?: string;
  first_publish_date: string;
  created?: string;
  number_of_pages?: number;
  cover_i?: number;
  author: {
    name: string;
    id: string;
  };
};

export const handler = async (
  _req: Request,
  ctx: FreshContext<unknown, BookDetails>,
) => {
  const bookId = ctx.params.id;
  try {
    const response = await Axios.get(
      `https://openlibrary.org/works/${bookId}.json`,
    );
    const data = response.data;
    const authorId = data.authors && data.authors[0]
      ? data.authors[0].author.key.replace("/authors/", "")
      : "";

    const authorData = await Axios.get(
      `https://openlibrary.org/works/${authorId}.json`,
    );

    const author_name = authorData.data.name;

    const bookDetails: BookDetails = {
      title: data.title,
      description: data.description
        ? data.description
        : "Description not available",
      first_publish_date: data.first_publish_date ||
        new Date(data.created?.value).getFullYear().toString(),
      number_of_pages: data.number_of_pages || null,
      cover_i: data.covers[0],
      author: {
        name: authorData ? author_name : "Unknown",
        id: authorId,
      },
    };

    return ctx.render(bookDetails);
  } catch (_e) {
    return ctx.render();
  }
};

const BookPage = ({ data }: PageProps<BookDetails>) => {
  if (!data) {
    return <p>Book not found.</p>;
  }

  return (
    <div>
      <Book {...data} />
    </div>
  );
};

export default BookPage;