import { useState } from "react";
import { useMutation } from "@apollo/client";
import Select from "react-select";
import { UPDATE_AUTHOR, ALL_AUTHORS } from "../queries";

const Authors = ({ show, authors }) => {
  const [born, setBorn] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState(null);

  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  if (!show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    const bornInt = parseInt(born);

    if (selectedAuthor) {
      updateAuthor({
        variables: { name: selectedAuthor.value, born: bornInt },
      });

      setBorn("");
      setSelectedAuthor(null);
    }
  };

  const authorOptions = authors.map((a) => ({
    value: a.name,
    label: a.name,
  }));

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h3>Set birthyear</h3>
        <form onSubmit={submit}>
          <div>
            <Select
              defaultValue={selectedAuthor}
              onChange={setSelectedAuthor}
              options={authorOptions}
            />
          </div>
          <div>
            born
            <input
              type="number"
              value={born}
              onChange={({ target }) => setBorn(target.value)}
            />
          </div>
          <button type="submit">update author</button>
        </form>
      </div>
    </div>
  );
};

export default Authors;
