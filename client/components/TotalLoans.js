import * as React from 'react';
import { Typography, Button} from '@mui/material';

/* COMPONENTS */
import Title from './Title';

export default function TotalLoans() {
  return (
    <React.Fragment>
      <Title>Total Loan Amounts</Title>
      <Typography component="p" variant="h4">
        $5,247,982,024.98
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        YTD
      </Typography>
      <Typography component="p" variant="h4">
        $452,560,348.12
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        MTD
      </Typography>
      <div>
        <Button sx={{ backgroundColor: "#2b6777" }} variant="contained">
          View Loans
        </Button>
      </div>
    </React.Fragment>
  );
}
