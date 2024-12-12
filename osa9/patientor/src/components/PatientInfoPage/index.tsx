import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Diagnosis, Entry, EntryFormValues, Patient } from "../../types";

import axios from "axios";
import { apiBaseUrl } from "../../constants";

import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnoses";

import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import HospitalEntry from "./HospitalEntry";
import HealthCheckEntry from "./HealthCheckEntry";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";
import AddEntryModal from "../AddEntryModal";
import { Button } from "@mui/material";

const PatientInfoPage = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const { id } = useParams<{ id: string }>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/patients/${id}`);

    const fetchPatientById = async () => {
      try {
        if (id) {
          const patient = await patientService.getPatientById(id);
          setPatient(patient);
          setEntries(patient.entries || []);
        }
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          if (e?.response?.data && typeof e?.response?.data === "string") {
            const message = e.response.data.replace(
              "Something went wrong. Error: ",
              ""
            );
            console.error(message);
            setError(message);
          } else {
            setError("Unrecognized axios error");
          }
        } else {
          console.error("Unknown error", e);
          setError("Unknown error");
        }
      }
    };
    void fetchPatientById();
  }, [id]);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/diagnoses`);

    const fetchDiagnosisList = async () => {
      const diagnosis = await diagnosisService.getAllDiagnoses();
      setDiagnosis(diagnosis);
    };
    void fetchDiagnosisList();
  }, []);

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      if (id) {
        const entry = await patientService.createEntry(id, values);
        setEntries(entries.concat(entry));
        setModalOpen(false);
      }
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e.response?.data && typeof e.response?.data === "object") {
          const errorData = e.response.data as {
            error?: string;
          };

          if (errorData.error) {
            const message = errorData.error[0] ?? "Valiation error occured.";
            console.error(`${message.message}`);
            setError(`${message.message}`);
          } else {
            setError("Unrecognized error structure from server.");
          }
        } else if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            ""
          );
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  if (!patient) {
    return <p>Loading patient data...</p>;
  }

  if (diagnosis.length === 0) {
    return <p>Loading diagnosis data...</p>;
  }

  if (!entries) {
    return <p>Loading entry data...</p>;
  }

  return (
    <div className="PatientInfoPage">
      <h2>
        {patient.name}
        {patient.gender === "male" ? (
          <MaleIcon></MaleIcon>
        ) : patient.gender === "female" ? (
          <FemaleIcon></FemaleIcon>
        ) : (
          <p></p>
        )}
      </h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <h3>entries</h3>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
      <div>
        {entries.map((entry) => (
          <EntryDetails key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntry entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntry entry={entry} />;
    case "HealthCheck":
      return <HealthCheckEntry entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default PatientInfoPage;
function assertNever(_entry: never): React.ReactNode {
  throw new Error("Function not implemented.");
}
