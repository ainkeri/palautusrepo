import { useState, SyntheticEvent } from "react";

import { TextField, Grid, Button } from "@mui/material";

import { EntryFormValues } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

const AddOccupationalHealthcareEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [description, setDescription] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [sickLeave, setSickLeave] = useState<{
    startDate: string;
    endDate: string;
  }>({
    startDate: "",
    endDate: "",
  });
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const type = "OccupationalHealthcare";

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      date,
      specialist,
      type,
      description,
      employerName,
      sickLeave:
        sickLeave.startDate && sickLeave.endDate ? sickLeave : undefined,
      diagnosisCodes,
    });
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <TextField
          label="Date"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="Employer name"
          fullWidth
          value={employerName}
          onChange={({ target }) => setEmployerName(target.value)}
        />
        <TextField
          label="Sick leave (start date)"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={sickLeave.startDate}
          onChange={({ target }) =>
            setSickLeave({ ...sickLeave, startDate: target.value })
          }
        />
        <TextField
          label="Sick leave (end date)"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={sickLeave.endDate}
          onChange={({ target }) =>
            setSickLeave({ ...sickLeave, endDate: target.value })
          }
        />
        <TextField
          label="Diagnosis codes"
          fullWidth
          value={diagnosisCodes.join(", ")}
          onChange={({ target }) =>
            setDiagnosisCodes(
              target.value.split(",").map((code) => code.trim())
            )
          }
        />

        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddOccupationalHealthcareEntryForm;
