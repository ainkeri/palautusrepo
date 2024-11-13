import patientData from "../../data/patients.ts";

import { NonSensitivePatientInfo } from "../types.ts";

const patients: NonSensitivePatientInfo[] = patientData;

const getPatients = (): NonSensitivePatientInfo[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = () => {
  return null;
};

export default {
  getPatients,
  addPatient,
};
