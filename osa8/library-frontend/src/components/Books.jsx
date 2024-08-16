import { useState } from "react";

const Books = ({ show, books }) => {
  const [chosenGenre, setChosenGenre] = useState("all genres");

  if (!show) {
    return null;
  }

  const filteredBooks = books.filter((b) => b.genres.includes(chosenGenre));

  console.log(filteredBooks);

  if (chosenGenre == "all genres")
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
            {books.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <button onClick={() => setChosenGenre("thriller")}>thriller</button>
          <button onClick={() => setChosenGenre("comedy")}>comedy</button>
          <button onClick={() => setChosenGenre("romance")}>romance</button>
          <button onClick={() => setChosenGenre("horror")}>horror</button>
          <button onClick={() => setChosenGenre("all genres")}>
            all genres
          </button>
        </div>
      </div>
    );

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
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
