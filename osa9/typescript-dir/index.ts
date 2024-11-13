import express from "express";
import calculateBmi from "./bmiCalculator";
import calculateExercises from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;

  const heightNum = Number(height);
  const weightNum = Number(weight);

  if (isNaN(Number(height)) || isNaN(Number(weight))) {
    res.status(400).json({ error: "malformatted parameters" });
  } else {
    const bmiCalc = calculateBmi(heightNum, weightNum);
    res.json({ weight: weightNum, height: heightNum, bmi: bmiCalc });
  }
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    res.status(400).send({ error: "parameters missing" });
  }

  if (!Array.isArray(daily_exercises) || isNaN(Number(target))) {
    res.status(400).send({ error: "malformatted parameters" });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculateExercises(daily_exercises, Number(target));
  res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
