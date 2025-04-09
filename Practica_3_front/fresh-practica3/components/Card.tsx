import { FunctionalComponent } from "preact/src/index.js";

type Props = {
  book: {
    id: string;
    title: string;
    cover_i?: number;
    author: string;
  };
};

const Card: FunctionalComponent<Props> = ({ book }) => {
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
    : "https://via.placeholder.com/150x220?text=No+Cover";

  return (
    <div class="book-card">
      <img src={coverUrl} alt={book.title} class="book-card-image" />
      <div class="book-card-content">
        <h3 class="book-card-title">{book.title}</h3>
        <p class="book-card-author">{book.author}</p>
        <a href={`/book/${book.id}`} class="book-card-link">Ver detalles →</a>
      </div>
    </div>
  );
};

export default Card;