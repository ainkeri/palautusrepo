import { useState, SyntheticEvent } from "react";

import {
  TextField,
  Grid,
  Button,
  SelectChangeEvent,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  useTheme,
  Theme,
} from "@mui/material";

import { Diagnosis, EntryFormValues } from "../../types";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
  codes: Diagnosis[];
}

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

const AddHealthCheckEntryForm = ({ onCancel, onSubmit, codes }: Props) => {
  const theme = useTheme();
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [description, setDescription] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState<number>(0);
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const type = "HealthCheck";

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      date,
      specialist,
      type,
      description,
      healthCheckRating,
      diagnosisCodes,
    });
  };

  const handleChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <div style={{ marginBottom: "16px", marginTop: "16px" }}>
          <TextField
            label="Date"
            fullWidth
            value={date}
            type="date"
            InputLabelProps={{ shrink: true }}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <div style={{ marginBottom: "16px" }}>
          {" "}
          <TextField
            label="Specialist"
            fullWidth
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
          />
        </div>
        <div style={{ marginBottom: "16px" }}>
          {" "}
          <TextField
            label="Description"
            fullWidth
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
        </div>
        <div style={{ marginBottom: "16px" }}>
          {" "}
          <TextField
            label="Healthcheck rating"
            fullWidth
            type="number"
            value={healthCheckRating}
            onChange={({ target }) =>
              setHealthCheckRating(Number(target.value))
            }
          />
        </div>
        <div style={{ marginBottom: "16px" }}>
          <FormControl sx={{ width: 269 }}>
            <InputLabel id="multiple-diagnosis-codes-label">
              Diagnosis codes
            </InputLabel>
            <Select
              labelId="multiple-diagnosis-codes-label"
              id="multiple-diagnosis-name"
              multiple
              value={diagnosisCodes}
              onChange={handleChange}
              input={<OutlinedInput label="Diagnosis code" />}
              MenuProps={MenuProps}
            >
              {codes.map((c) => (
                <MenuItem
                  key={c.name}
                  value={c.code}
                  style={getStyles(c.code, diagnosisCodes, theme)}
                >
                  {c.code}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
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

export default AddHealthCheckEntryForm;
