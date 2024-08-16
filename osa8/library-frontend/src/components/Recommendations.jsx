const Recommendations = ({ show, user, books }) => {
  if (!show) {
    return null;
  }

  const usersFavoriteGenre = user.me.favoriteGenre;

  const favoriteGenresBooks = books.filter((b) =>
    b.genres.includes(usersFavoriteGenre)
  );

  return (
    <div>
      <h2>recommendations</h2>
      <div>
        books in your favorite genre <b>{usersFavoriteGenre}</b>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {favoriteGenresBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendations;
