const App = () => {
  const [x, setX] = useState(1);
  console.log(x);
  return (
    <div>
      {x}
      <button onClick={() => setX(10)}>press</button>
    </div>
  );
};
