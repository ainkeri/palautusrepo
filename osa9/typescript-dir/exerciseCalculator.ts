interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (args: number[]): Result => {
  let sumOfTrainingDays = 0;
  let sumHours = 0;
  let successOrNot = false;
  let ratingOf = 0;
  let ratingOfDesc = "";

  for (const day of args) {
    if (day > 0) {
      sumOfTrainingDays += 1;
      sumHours += day;
    }
  }

  if (sumOfTrainingDays >= 4) {
    successOrNot = true;
  }

  if (sumHours < 5) {
    ratingOf = 1;
    ratingOfDesc = "You could do better";
  }

  if (sumHours >= 5 && sumHours <= 7) {
    ratingOf = 2;
    ratingOfDesc = "Good job";
  }

  if (sumHours > 7) {
    ratingOf = 3;
    ratingOfDesc = "Excellent job!!!";
  }

  return {
    periodLength: Number(args.length),
    trainingDays: sumOfTrainingDays,
    success: successOrNot,
    rating: ratingOf,
    ratingDescription: ratingOfDesc,
    target: 5,
    average: sumHours / args.length,
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1]));
console.log(calculateExercises([3, 0, 0, 0, 0, 3, 1]));
