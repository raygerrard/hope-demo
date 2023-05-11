import * as React from 'react';
import { Box, InputAdornment, TextField } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useDispatch, useSelector } from 'react-redux';
import { updateMemberSearchTerm } from './memberSlice';
import { SearchOutlined } from '@mui/icons-material';

export default function SearchMembersForm() {
    const memberSearchTerm = useSelector((state) => state.members.memberSearchTerm);
    const dispatch = useDispatch();

    const updateSearchTerm = (event) => {
        dispatch(updateMemberSearchTerm(event.target.value));
    };

    return (
        <Grid container spacing={2} alignItems='center'>
            <Grid xs>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <TextField InputProps={{
                        endAdornment: <InputAdornment position="end"><SearchOutlined /></InputAdornment>,
                    }} fullWidth value={memberSearchTerm} onChange={updateSearchTerm} id="input-with-sx" label="Search the name..." variant="filled" />
                </Box>
            </Grid>
        </Grid>
    );
};