interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseDays {
  trainingDays: number[];
  targetVal: number;
}

const parseArguments2 = (args: string[]): ExerciseDays => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 15) throw new Error("Too many arguments");

  const dailyExercises = args.slice(2, args.length - 1).map((arg) => {
    if (isNaN(Number(arg))) {
      throw new Error("Provided values were not numbers");
    }
    return Number(arg);
  });

  const target = Number(args[args.length - 1]);
  if (isNaN(target)) {
    throw new Error("Provided target was not a number");
  } else {
    return {
      trainingDays: dailyExercises,
      targetVal: target,
    };
  }
};

const calculateExercises = (
  trainingDays: number[],
  targetVal: number
): Result => {
  const targetGoal = targetVal;
  let sumOfTrainingDays = 0;
  let sumHours = 0;
  let successOrNot = false;
  let ratingOf = 0;
  let ratingOfDesc = "";

  for (let i = 0; i < trainingDays.length; i++) {
    if (trainingDays[i] > 0) {
      sumOfTrainingDays += 1;
      sumHours += trainingDays[i];
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
    periodLength: trainingDays.length,
    trainingDays: sumOfTrainingDays,
    success: successOrNot,
    rating: ratingOf,
    ratingDescription: ratingOfDesc,
    target: targetGoal,
    average: sumHours / trainingDays.length,
  };
};

try {
  const { trainingDays, targetVal } = parseArguments2(process.argv);
  console.log(calculateExercises(trainingDays, targetVal));
} catch (error: unknown) {
  let errorMessage = "Something bad happened";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}

export default calculateExercises;
