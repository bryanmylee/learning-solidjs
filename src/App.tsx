import { createSignal, Show } from "solid-js";
import { AddBook } from "./AddBook";
import { BookList } from "./BookList";

export type Book = {
  title: string;
  author: string;
};

const initialBooks: Book[] = [
  { title: "Code Complete", author: "Steve McConnell" },
  { title: "The Hobbit", author: "J.R.R. Tolkien" },
  { title: "Living a Feminist Life", author: "Sarah Ahmed" },
];

interface BookshelfProps {
  name: string;
}

// We cannot destructure props in SolidJS, otherwise we lose reactivity.
// Under the hood, a proxy is used to track when props are accessed.
// If we destructure the props, we lose out on the proxy's features.
function Bookshelf(props: BookshelfProps) {
  const [books, setBooks] = createSignal(initialBooks);
  const [showForm, setShowForm] = createSignal(false);

  const toggleForm = () => setShowForm(!showForm());

  return (
    <div>
      <h1>{props.name}'s Bookshelf</h1>
      {/* It's best practice to call a signal when passing as a prop */}
      <BookList books={books()} />
      <Show
        when={showForm()}
        fallback={<button onClick={toggleForm}>Add a book</button>}
      >
        <AddBook setBooks={setBooks} />
        <button onClick={toggleForm}>Finished adding books</button>
      </Show>
    </div>
  );
}

function App() {
  return <Bookshelf name="Solid" />;
}

export default App;
