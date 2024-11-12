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

const calculateBmi = (height: number, weight: number): string => {
  const BMI = weight / (height / 100) ** 2;

  if (BMI < 18.5) {
    return "Underweight";
  }
  if (18.5 <= BMI && BMI <= 24.9) {
    return "Normal weight";
  }
  if (25 <= BMI && BMI <= 29.9) {
    return "Overweight";
  }
  if (BMI >= 30) {
    return "Obese";
  } else {
    return "Nothing";
  }
};

if (require.main === module) {
  try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    let errorMessage = "Something bad happened";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
}

export default calculateBmi;
