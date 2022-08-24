import { createMemo, For } from "solid-js";
import { Book } from "./App";

interface BookListProps {
  books: Book[];
}

export function BookList(props: BookListProps) {
  // Derived signals are not stored in memory unlike reactive values in Svelte.
  // `books.length` will be called for every access to `totalBooks`.
  const totalBooks = () => props.books.length;
  // Memos are stored in memory.
  // `books.length` will only be called when it changes.
  const savedTotalBooks = createMemo(() => props.books.length);

  return (
    <>
      <h2>My books ({totalBooks()})</h2>
      <h2
        style={{
          // `style` is a wrapper for `style.setProperty`.
          // Use kebab-case.
          "font-size": "1rem",
        }}
      >
        My more efficient books ({savedTotalBooks()})
      </h2>
      <ul>
        <For each={props.books}>
          {(book) => (
            <li>
              {book.title}
              <span style={{ "font-style": "italic" }}> ({book.author})</span>
            </li>
          )}
        </For>
      </ul>
    </>
  );
}
