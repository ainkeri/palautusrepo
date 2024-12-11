import React from "react";
import { Entry } from "../../types";
import { Card, Stack, Typography } from "@mui/material";

import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";

interface Props {
  entry: Entry;
}

const HospitalEntry: React.FC<Props> = ({ entry }: Props) => {
  return (
    <Card>
      <Stack direction="row" alignItems="center" spacing={3} p={2} useFlexGap>
        <Stack direction="column" spacing={0.5} useFlexGap>
          <Typography>
            {entry.date} <HealthAndSafetyIcon />
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

export default HospitalEntry;
