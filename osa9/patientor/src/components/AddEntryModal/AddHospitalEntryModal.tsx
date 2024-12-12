import { useState, SyntheticEvent } from "react";

import { TextField, Grid, Button } from "@mui/material";

import { EntryFormValues } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

const AddHospitalEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [description, setDescription] = useState("");
  const [discharge, setDischarge] = useState<{
    date: string;
    criteria: string;
  }>({
    date: "",
    criteria: "",
  });
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const type = "Hospital";

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      date,
      specialist,
      type,
      description,
      discharge,
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
          label="Discharge (date)"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={discharge.date}
          onChange={({ target }) =>
            setDischarge({ ...discharge, date: target.value })
          }
        />
        <TextField
          label="Discharge (criteria)"
          fullWidth
          value={discharge.criteria}
          onChange={({ target }) =>
            setDischarge({ ...discharge, criteria: target.value })
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

export default AddHospitalEntryForm;
