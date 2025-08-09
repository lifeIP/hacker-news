import { Grid, GridProps } from '@mui/material';
import React from 'react';

interface Props extends GridProps {
  children: React.ReactNode;
}

export default function Center(props: Props) {
    return (
        <Grid container
            direction="column"
            alignItems="center"
            justifyContent="center"
        >
            {props.children}
        </Grid>
    )
}