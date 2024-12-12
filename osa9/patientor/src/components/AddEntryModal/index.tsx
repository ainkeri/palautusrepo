import {
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Alert,
  DialogContentText,
} from "@mui/material";

import { useState } from "react";

import AddHealthCheckEntryForm from "./AddHealthCheckEntryModal";
import { Diagnosis, EntryFormValues } from "../../types";
import AddOccupationalHealthcareEntryForm from "./AddOccupationalHealthcareEntryModal";
import AddHospitalEntryForm from "./AddHospitalEntryModal";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
  allDiagnosisCodes: Diagnosis[];
}

const AddEntryModal = ({
  modalOpen,
  onClose,
  onSubmit,
  error,
  allDiagnosisCodes,
}: Props) => {
  const [entryType, setEntryType] = useState<string>("HealthCheck");

  const handleEntryTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setEntryType(event.target.value);
  };

  return (
    <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
      <DialogTitle>Add a new entry</DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText>Select entry type:</DialogContentText>
        <select
          aria-label="Select entry type"
          name="entry-type"
          value={entryType}
          onChange={handleEntryTypeChange}
        >
          <option value="HealthCheck">HealthCheck</option>
          <option value="OccupationalHealthcare">
            Occupational Healthcare
          </option>
          <option value="Hospital">Hospital</option>
        </select>
        {error && <Alert severity="error">{error}</Alert>}
        {entryType == "HealthCheck" && (
          <AddHealthCheckEntryForm
            onSubmit={onSubmit}
            onCancel={onClose}
            codes={allDiagnosisCodes}
          />
        )}
        {entryType == "OccupationalHealthcare" && (
          <AddOccupationalHealthcareEntryForm
            onSubmit={onSubmit}
            onCancel={onClose}
            codes={allDiagnosisCodes}
          />
        )}
        {entryType == "Hospital" && (
          <AddHospitalEntryForm
            onSubmit={onSubmit}
            onCancel={onClose}
            codes={allDiagnosisCodes}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddEntryModal;
