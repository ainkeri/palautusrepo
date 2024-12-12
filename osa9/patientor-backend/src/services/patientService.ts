import { v1 as uuid } from "uuid";

import patientData from "../../data/patients.ts";

import {
  NonSensitivePatientInfo,
  NewPatient,
  Entry,
  EntryWithoutId,
  Patient,
} from "../types.ts";

const patients: NonSensitivePatientInfo[] = patientData;
const allPatients: Patient[] = patientData;

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

const addPatient = (entry: NewPatient): NonSensitivePatientInfo => {
  const id = uuid();
  const newPatient = {
    id: id,
    ...entry,
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (entry: EntryWithoutId, patientId: string): Entry => {
  const wantedPatient = allPatients.find((p) => p.id === patientId);

  if (!wantedPatient?.entries) {
    throw new Error("Patient not found");
  }

  const id = uuid();

  const newEntry: Entry = {
    id: id,
    ...entry,
  };

  console.log(newEntry);
  wantedPatient.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  getPatientById,
  addPatient,
  addEntry,
};
