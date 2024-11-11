interface BmiValues {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers");
  }
};

const calculateBmi = (height: number, weight: number) => {
  const BMI = weight / (height / 100) ** 2;

  if (BMI < 18.5) {
    console.log("Underweight");
  }
  if (18.5 <= BMI && BMI <= 24.9) {
    console.log("Normal weight");
  }
  if (25 <= BMI && BMI <= 29.9) {
    console.log("Overweight");
  }
  if (BMI >= 30) {
    console.log("Obese");
  }
};

try {
  const { height, weight } = parseArguments(process.argv);
  calculateBmi(height, weight);
} catch (error: unknown) {
  let errorMessage = "Something bad happened";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
