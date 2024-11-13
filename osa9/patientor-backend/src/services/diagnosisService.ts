import diagnosisData from "../../data/diagnoses.ts";

import { Diagnosis } from "../types.ts";

const diagnoses: Diagnosis[] = diagnosisData;

const getDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};

const addDiagnosis = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnosis,
};
