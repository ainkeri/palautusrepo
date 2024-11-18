import { Diary } from "./types";

interface DiaryProps {
  diary: Diary;
}

const DiaryInfo = ({ diary }: DiaryProps) => {
  return (
    <div>
      <b>{diary.date}</b>
      <div>
        <p>visibility: {diary.visibility}</p>
        <p>weather: {diary.weather}</p>
      </div>
    </div>
  );
};

export default DiaryInfo;
