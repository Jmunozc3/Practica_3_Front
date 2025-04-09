import { FunctionalComponent } from "preact/src/index.js";
import Card from "./Card.tsx"; 

type AuthorProps = {
  name: string;
  bio?: string;
  books: {
    title: string;
    key: string;
    cover_i?: number;
  }[];
};

const Author: FunctionalComponent<AuthorProps> = ({ name, bio, books }) => {
  return (
    <div class="author-detail">
      <h1 class="author-name">{name}</h1>
      {bio && <p class="author-bio">{bio}</p>}

      <div class="author-books-grid">
        {books.slice(0, 6).map((book) => {
          const bookInfo = {
            id: book.key,
            title: book.title,
            cover_i: book.cover_i,
            author: name,
          };
          return (
            <Card
              key={book.key} 
              book={bookInfo}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Author;