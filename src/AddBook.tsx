import {
  createResource,
  createSignal,
  For,
  Show,
  type JSX,
  type Setter,
} from "solid-js";
import { Book } from "./App";
import { searchBooks } from "./searchBooks";

interface AddBookProps {
  setBooks: Setter<Book[]>;
}

export function AddBook(props: AddBookProps) {
  const [input, setInput] = createSignal("");
  const [query, setQuery] = createSignal("");
  // Whenever the signal `query` updates to a value other than `null`,
  // `undefined`, or `false`, the second argument will run with the value of
  // the signal.
  // `data` is type Resource<T> which is a signal but it also has properties
  // `loading` and `error`.
  const [data] = createResource(query, searchBooks);

  const handleSearch: JSX.EventHandler<HTMLFormElement, Event> = (ev) => {
    ev.preventDefault();
    setQuery(input());
  };

  const handleAddBook = (book: Book, ev: MouseEvent) => {
    console.log("clicked", ev.currentTarget);
    props.setBooks((prevBooks) => [...prevBooks, book]);
  };

  return (
    <>
      <form onSubmit={handleSearch}>
        <div>
          <label for="title">Search books</label>
          <input
            id="title"
            value={input()}
            onInput={(ev) => {
              setInput(ev.currentTarget.value);
            }}
          />
        </div>
        <button type="submit">Search</button>
      </form>
      <Show when={!data.loading} fallback={<>Searching...</>}>
        <ul>
          <For each={data()}>
            {(book) => (
              <li>
                {book.title} by {book.author}
                <button
                  type="button"
                  aria-label={`Add ${book.title} by ${book.author} to the bookshelf`}
                  // Pass an array to avoid creating additional closures for
                  // performance while still supporting delegated event
                  // handling.
                  // The handler will be called with `book` as its first
                  // argument and the native event as its second.
                  onClick={[handleAddBook, book]}
                >
                  Add
                </button>
              </li>
            )}
          </For>
        </ul>
      </Show>
    </>
  );
}
