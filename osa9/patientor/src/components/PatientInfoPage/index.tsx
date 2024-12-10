import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Patient } from "../../types";

import axios from "axios";
import { apiBaseUrl } from "../../constants";

import patientService from "../../services/patients";

import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";

const PatientInfoPage = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
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

  if (!patient) {
    return <p>Loading patient data...</p>;
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
            {p.diagnosisCodes?.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PatientInfoPage;
