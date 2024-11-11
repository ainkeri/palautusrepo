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
}

const parseArguments2 = (args: string[]): ExerciseDays => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 15) throw new Error("Too many arguments");

  let argsSliced = args.slice(2);
  let numberDays = argsSliced.map((d) => {
    return Number(d);
  });
  console.log(argsSliced);
  const arr: number[] = [];

  for (var i = 0; i < argsSliced.length; i++) {
    if (!isNaN(numberDays[i])) {
      arr.push(numberDays[i]);
    } else {
      throw new Error("Provided values were not numbers");
    }
  }
  return {
    trainingDays: arr,
  };
};

const calculateExercises = (trainingDays: number[]): Result => {
  let targetGoal = trainingDays[0];
  let sumOfTrainingDays = 0;
  let sumHours = 0;
  let successOrNot = false;
  let ratingOf = 0;
  let ratingOfDesc = "";

  console.log(trainingDays);

  for (var i = 0; i < trainingDays.length; i++) {
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
    periodLength: trainingDays.length - 1,
    trainingDays: sumOfTrainingDays - 1,
    success: successOrNot,
    rating: ratingOf,
    ratingDescription: ratingOfDesc,
    target: targetGoal,
    average: sumHours / trainingDays.length,
  };
};

try {
  const { trainingDays } = parseArguments2(process.argv);
  console.log(calculateExercises(trainingDays));
} catch (error: unknown) {
  let errorMessage = "Something bad happened";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
