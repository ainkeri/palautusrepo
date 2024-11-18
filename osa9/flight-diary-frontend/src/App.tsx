import { useEffect, useState } from "react";
import axios from "axios";
import DiaryInfo from "./DiaryInfo";
import { Diary } from "./types";
import { getAllDiaries, createDiary } from "./diaryService";

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState("");
  const [visibility, setVisibility] = useState("");
  const [comment, setComment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const diaryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      await createDiary({
        date: date,
        weather: weather,
        visibility: visibility,
        comment: comment,
      }).then((data) => {
        setDiaries(diaries.concat(data));
      });
      setDate("");
      setWeather("");
      setVisibility("");
      setComment("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <h2>Add new entry</h2>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      <div>
        <form onSubmit={diaryCreation}>
          <div>
            date:
            <input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </div>
          <div>
            weather: sunny
            <input
              type="radio"
              name="weather"
              value={weather}
              checked={weather === "sunny"}
              onChange={() => setWeather("sunny")}
            />
            rainy
            <input
              type="radio"
              name="weather"
              value={weather}
              checked={weather === "rainy"}
              onChange={() => setWeather("rainy")}
            />
            cloudy
            <input
              type="radio"
              name="weather"
              value={weather}
              checked={weather === "cloudy"}
              onChange={() => setWeather("cloudy")}
            />
            stormy
            <input
              type="radio"
              name="weather"
              value={weather}
              checked={weather === "stormy"}
              onChange={() => setWeather("stormy")}
            />
            windy
            <input
              type="radio"
              name="weather"
              value={weather}
              checked={weather === "windy"}
              onChange={() => setWeather("windy")}
            />
          </div>
          <div>
            visibility: great
            <input
              type="radio"
              name="visibility"
              value={visibility}
              checked={visibility === "great"}
              onChange={() => setVisibility("great")}
            />
            good
            <input
              type="radio"
              name="visibility"
              value={visibility}
              checked={visibility === "good"}
              onChange={() => setVisibility("good")}
            />
            ok
            <input
              type="radio"
              name="visibility"
              value={visibility}
              checked={visibility === "ok"}
              onChange={() => setVisibility("ok")}
            />
            poor
            <input
              type="radio"
              name="visibility"
              value={visibility}
              checked={visibility === "poor"}
              onChange={() => setVisibility("poor")}
            />
          </div>
          <div>
            comment:
            <input
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />
          </div>
          <button type="submit">add</button>
        </form>
      </div>

      <h2>Diary entries</h2>

      {diaries.map((d) => (
        <DiaryInfo key={d.id} diary={d} />
      ))}
    </div>
  );
};

export default App;
