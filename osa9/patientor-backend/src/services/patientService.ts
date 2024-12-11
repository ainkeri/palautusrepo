import { v1 as uuid } from "uuid";

import patientData from "../../data/patients.ts";

import {
  NonSensitivePatientInfo,
  Patient,
  NewPatient,
  Entry,
  EntryWithoutId,
} from "../types.ts";

const patients: Patient[] = patientData;

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
    entries: [],
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (entry: EntryWithoutId, patientId: string): Entry => {
  const patient = patients.find((p) => p.id === patientId);

  if (!patient?.entries) {
    throw new Error("Patient not found");
  }

  const id = uuid();

  const newEntry: Entry = {
    id: id,
    ...entry,
  };

  console.log(newEntry);

  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  getPatientById,
  addPatient,
  addEntry,
};
