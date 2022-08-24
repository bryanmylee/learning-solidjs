import { createSignal, type JSX, type Setter } from "solid-js";
import { Book } from "./App";

interface AddBookProps {
  setBooks: Setter<Book[]>;
}

const emptyBook: Book = { title: "", author: "" };

export function AddBook(props: AddBookProps) {
  const [newBook, setNewBook] = createSignal(emptyBook);

  const addBook: JSX.EventHandler<HTMLFormElement, Event> = (ev) => {
    ev.preventDefault();
    props.setBooks((prevBooks) => [...prevBooks, newBook()]);
    setNewBook(emptyBook);
  };
  return (
    <form onSubmit={addBook}>
      <div>
        <label for="title">Book name</label>
        <input
          id="title"
          value={newBook().title}
          onInput={(ev) => {
            setNewBook({ ...newBook(), title: ev.currentTarget.value });
          }}
        />
      </div>
      <div>
        <label for="author">Author</label>
        <input
          id="author"
          value={newBook().author}
          onInput={(ev) => {
            setNewBook({ ...newBook(), author: ev.currentTarget.value });
          }}
        />
      </div>
      <button type="submit">Add book</button>
    </form>
  );
}
