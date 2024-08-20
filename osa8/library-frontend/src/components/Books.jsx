import { useQuery } from "@apollo/client";
import { useState } from "react";
import { FILTERED_BOOKS } from "../queries";

const Books = ({ show, books }) => {
  const [chosenGenre, setChosenGenre] = useState("all genres");
  const result = useQuery(FILTERED_BOOKS, {
    variables: { genres: chosenGenre },
    skip: chosenGenre === "all genres",
  });

  if (!show) {
    return null;
  }

  if (result.loading) {
    return <div>loading....</div>;
  }

  const displayedBooks =
    chosenGenre === "all genres" ? books : result.data.bookGenres;

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {displayedBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>{}</p>
      <div>
        <button onClick={() => setChosenGenre("thriller")}>thriller</button>
        <button onClick={() => setChosenGenre("comedy")}>comedy</button>
        <button onClick={() => setChosenGenre("romance")}>romance</button>
        <button onClick={() => setChosenGenre("horror")}>horror</button>
        <button onClick={() => setChosenGenre("all genres")}>all genres</button>
      </div>
    </div>
  );
};

export default Books;
