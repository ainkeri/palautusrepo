import { useState, SyntheticEvent } from "react";

import {
  TextField,
  Grid,
  Button,
  DialogContent,
  DialogContentText,
  Theme,
  useTheme,
  SelectChangeEvent,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
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

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
  codes: Diagnosis[];
}

const AddOccupationalHealthcareEntryForm = ({
  onCancel,
  onSubmit,
  codes,
}: Props) => {
  const theme = useTheme();
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
            type="date"
            label="Date"
            fullWidth
            value={date}
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
            label="Employer name"
            fullWidth
            value={employerName}
            onChange={({ target }) => setEmployerName(target.value)}
          />
        </div>
        <DialogContentText>Sickleave</DialogContentText>
        <DialogContent>
          <div style={{ marginBottom: "16px" }}>
            {" "}
            <TextField
              label="start date"
              placeholder="YYYY-MM-DD"
              fullWidth
              value={sickLeave.startDate}
              type="date"
              InputLabelProps={{ shrink: true }}
              onChange={({ target }) =>
                setSickLeave({ ...sickLeave, startDate: target.value })
              }
            />
          </div>
          <div style={{ marginBottom: "16px" }}>
            {" "}
            <TextField
              label="end date"
              placeholder="YYYY-MM-DD"
              fullWidth
              value={sickLeave.endDate}
              type="date"
              InputLabelProps={{ shrink: true }}
              onChange={({ target }) =>
                setSickLeave({ ...sickLeave, endDate: target.value })
              }
            />
          </div>
        </DialogContent>
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

export default AddOccupationalHealthcareEntryForm;
