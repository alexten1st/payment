import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardFields from "./cardFields"
export default function ActionAreaCard() {
  return (
    <Card sx={{ maxWidth: 545 }}>
        <CardContent>
<CardFields></CardFields>

        </CardContent>
    </Card>
  );
}