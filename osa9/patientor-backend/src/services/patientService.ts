import { v1 as uuid } from "uuid";

import patientData from "../../data/patients.ts";

import { NonSensitivePatientInfo, Patient, NewPatient } from "../types.ts";

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

const getPatientById = (id: string): NonSensitivePatientInfo | undefined => {
  const patient = patients.find((p) => p.id === id);
  return patient;
};

const addPatient = (entry: NewPatient): Patient => {
  const id = uuid();
  const newPatient = {
    id: id,
    ...entry,
  };

  console.log(newPatient);

  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getPatientById,
  addPatient,
};
