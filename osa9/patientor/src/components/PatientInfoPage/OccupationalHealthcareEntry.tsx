import React from "react";
import { Entry } from "../../types";
import { Card, Stack, Typography } from "@mui/material";

import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
interface Props {
  entry: Entry;
}

const OccupationalHealthcareEntry: React.FC<Props> = ({ entry }: Props) => {
  return (
    <Card>
      <Stack direction="row" alignItems="center" spacing={3} p={2} useFlexGap>
        <Stack direction="column" spacing={0.5} useFlexGap>
          <Typography>
            {entry.date} <MedicalInformationIcon />
          </Typography>
          <Typography>
            <i>{entry.description}</i>
          </Typography>
          <Typography>diagnose by {entry.specialist}</Typography>
        </Stack>
      </Stack>
    </Card>
  );
};

export default OccupationalHealthcareEntry;
