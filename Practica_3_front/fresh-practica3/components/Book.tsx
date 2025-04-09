import { FunctionalComponent } from "preact/src/index.js";

type BookDetails = {
  title: string;
  description?: string;
  first_publish_date: string;
  number_of_pages?: number;
  cover_i?: number;
  author: {
    name: string;
    id: string;
  };
};

const Book: FunctionalComponent<BookDetails> = ({
  title,
  description,
  first_publish_date,
  number_of_pages,
  cover_i,
  author,
}) => {
  return (
    <div class="book-detail-container">
      {cover_i && (
        <img
          src={`https://covers.openlibrary.org/b/id/${cover_i}-L.jpg`}
          alt={title}
          class="book-cover"
        />
      )}
      <div class="book-detail-content">
        <h1 class="book-detail-title">{title}</h1>

        {description && <p class="book-description">{description}</p>}

        <div class="book-info">
          {first_publish_date && (
            <p>
              <strong>Año de publicación:</strong> {first_publish_date}
            </p>
          )}

          {number_of_pages && (
            <p>
              <strong>Número de páginas:</strong> {number_of_pages}
            </p>
          )}

          {author.id && (
            <p>
              <strong>Autor:</strong>{" "}
              <a href={`/author/${author.id}`}>{author.name}</a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Book;