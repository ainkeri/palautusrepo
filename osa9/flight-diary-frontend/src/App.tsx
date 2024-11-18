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

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();

    createDiary({
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
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <div>
        <form onSubmit={diaryCreation}>
          <div>
            date:
            <input
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </div>
          <div>
            weather:
            <input
              value={weather}
              onChange={(event) => setWeather(event.target.value)}
            />
          </div>
          <div>
            visibility:
            <input
              value={visibility}
              onChange={(event) => setVisibility(event.target.value)}
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
