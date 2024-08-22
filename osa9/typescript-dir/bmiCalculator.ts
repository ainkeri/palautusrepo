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
  }
};

console.log(calculateBmi(180, 74));
