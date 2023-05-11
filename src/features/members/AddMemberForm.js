import * as React from 'react';
import { TextField, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useDispatch, useSelector } from 'react-redux';
import { createMember, updateNewMemberName } from './memberSlice';

export default function AddMemberForm() {
    const newMemberName = useSelector((state) => state.members.newMemberName);
    const dispatch = useDispatch();

    const updateNewMember = (event) => {
        dispatch(updateNewMemberName(event.target.value));
    };

    const createNewMember = (event) => {
        dispatch(createMember());
    };

    return (
        <Grid marginY={2} container spacing={2} alignItems='center'>
            <Grid xs>
                <TextField fullWidth value={newMemberName} onChange={updateNewMember} label="Add new member..." variant="filled" />
            </Grid>
            <Grid>
                <Button size='large' variant='contained' onClick={createNewMember}>
                    Add
                </Button>
            </Grid>
        </Grid>
    );
};