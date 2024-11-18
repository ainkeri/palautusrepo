import { useEffect, useState } from "react";
import axios from "axios";
import DiaryInfo from "./DiaryInfo";
import { Diary } from "./types";
import { getAllDiaries } from "./diaryService";

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);

  return (
    <div>
      <h2>Add new entry</h2>

      <h2>Diary entries</h2>

      {diaries.map((d) => (
        <DiaryInfo key={d.id} diary={d} />
      ))}
    </div>
  );
};

export default App;
