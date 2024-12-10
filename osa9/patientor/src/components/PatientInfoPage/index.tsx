import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Diagnosis, Patient } from "../../types";

import axios from "axios";
import { apiBaseUrl } from "../../constants";

import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnoses";

import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";

const PatientInfoPage = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);
  const [error, setError] = useState<string>();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/patients/${id}`);

    const fetchPatientById = async () => {
      try {
        if (id) {
          const patient = await patientService.getPatientById(id);
          setPatient(patient);
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

  if (!patient) {
    return <p>Loading patient data...</p>;
  }

  if (diagnosis.length === 0) {
    return <p>Loading diagnosis data...</p>;
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
      {patient.entries?.map((p) => (
        <div key={p.id}>
          <p>
            {p.date} <i>{p.description}</i>
          </p>
          <ul>
            {p.diagnosisCodes?.map((d) => {
              const matchingDiagnosis = diagnosis.find((ds) => ds.code === d);
              return (
                <li key={d}>
                  {d}: {matchingDiagnosis ? matchingDiagnosis.name : "Unknown"}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PatientInfoPage;
